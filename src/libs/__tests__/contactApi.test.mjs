import test from "node:test";
import assert from "node:assert/strict";
import { createRateLimiter, RATE_MAX } from "../contactRateLimit.js";
import { verifyTurnstileToken } from "../contactForm.js";
import { handleContactPost } from "../contactApiHandler.js";

function jsonRequest(body, { ip = "203.0.113.10", headers = {} } = {}) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validBody = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  phone: "+1 555 0100",
  reason: "Building an AI product",
  message: "We need help shipping a production copilot.",
  token: "turnstile-token-abc",
  consent: true,
};

test("createRateLimiter returns false after RATE_MAX requests from same IP", () => {
  const allow = createRateLimiter({ max: 5, windowMs: 60_000 });
  for (let i = 0; i < RATE_MAX; i++) {
    assert.equal(allow("10.0.0.1"), true, `request ${i + 1} should pass`);
  }
  assert.equal(allow("10.0.0.1"), false);
  assert.equal(allow("10.0.0.2"), true, "other IP still allowed");
});

test("handleContactPost returns 429 after rate limit is exceeded", async () => {
  const allow = createRateLimiter({ max: 2, windowMs: 60_000 });
  const deps = {
    allowRequest: allow,
    verifyTurnstileToken: async () => ({ success: true }),
    sendContactViaResend: async () => ({ id: "email_1" }),
  };

  const first = await handleContactPost(jsonRequest(validBody), deps);
  const second = await handleContactPost(jsonRequest(validBody), deps);
  const third = await handleContactPost(jsonRequest(validBody), deps);

  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.equal(third.status, 429);
  const body = await third.json();
  assert.equal(body.ok, false);
  assert.match(body.error, /too many requests/i);
});

test("verifyTurnstileToken throws MISSING_TURNSTILE in production without secret", async () => {
  const prevEnv = process.env.NODE_ENV;
  const prevSecret = process.env.TURNSTILE_SECRET;
  const prevSecretKey = process.env.TURNSTILE_SECRET_KEY;
  delete process.env.TURNSTILE_SECRET;
  delete process.env.TURNSTILE_SECRET_KEY;
  process.env.NODE_ENV = "production";

  try {
    await assert.rejects(
      () => verifyTurnstileToken("any-token"),
      (err) => err?.code === "MISSING_TURNSTILE"
    );
  } finally {
    process.env.NODE_ENV = prevEnv;
    if (prevSecret !== undefined) process.env.TURNSTILE_SECRET = prevSecret;
    if (prevSecretKey !== undefined) {
      process.env.TURNSTILE_SECRET_KEY = prevSecretKey;
    }
  }
});

test("handleContactPost returns 503 MISSING_TURNSTILE path in production", async () => {
  const prevEnv = process.env.NODE_ENV;
  const prevSecret = process.env.TURNSTILE_SECRET;
  const prevSecretKey = process.env.TURNSTILE_SECRET_KEY;
  delete process.env.TURNSTILE_SECRET;
  delete process.env.TURNSTILE_SECRET_KEY;
  process.env.NODE_ENV = "production";

  try {
    const missing = new Error("TURNSTILE_SECRET is not configured");
    missing.code = "MISSING_TURNSTILE";
    const res = await handleContactPost(jsonRequest(validBody), {
      allowRequest: () => true,
      verifyTurnstileToken: async () => {
        throw missing;
      },
      sendContactViaResend: async () => ({ id: "x" }),
    });
    assert.equal(res.status, 503);
    const body = await res.json();
    assert.equal(body.ok, false);
    assert.match(body.error, /TURNSTILE_SECRET/i);
  } finally {
    process.env.NODE_ENV = prevEnv;
    if (prevSecret !== undefined) process.env.TURNSTILE_SECRET = prevSecret;
    if (prevSecretKey !== undefined) {
      process.env.TURNSTILE_SECRET_KEY = prevSecretKey;
    }
  }
});

test("handleContactPost returns 400 for invalid JSON", async () => {
  const res = await handleContactPost(jsonRequest("{not-json", {}), {
    allowRequest: () => true,
  });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.match(body.error, /invalid json/i);
});

test("handleContactPost returns 400 for invalid form fields before captcha", async () => {
  const res = await handleContactPost(
    jsonRequest({ name: "A", email: "bad", message: "short", token: "" }),
    {
      allowRequest: () => true,
      verifyTurnstileToken: async () => {
        throw new Error("should not call turnstile");
      },
    }
  );
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.equal(body.ok, false);
  assert.ok(body.fields.includes("name"));
  assert.ok(body.fields.includes("email"));
  assert.ok(body.fields.includes("message"));
  assert.ok(body.fields.includes("token"));
});

test("handleContactPost returns 403 when captcha fails", async () => {
  const res = await handleContactPost(jsonRequest(validBody), {
    allowRequest: () => true,
    verifyTurnstileToken: async () => ({ success: false }),
    sendContactViaResend: async () => ({ id: "x" }),
  });
  assert.equal(res.status, 403);
  const body = await res.json();
  assert.match(body.error, /captcha/i);
});

test("handleContactPost success path with mocked Turnstile and Resend", async () => {
  let sent;
  const res = await handleContactPost(jsonRequest(validBody), {
    allowRequest: () => true,
    verifyTurnstileToken: async (token, ip) => {
      assert.equal(token, validBody.token);
      assert.equal(ip, "203.0.113.10");
      return { success: true };
    },
    sendContactViaResend: async (payload) => {
      sent = payload;
      return { id: "re_test_123" };
    },
  });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.deepEqual(body, { ok: true, id: "re_test_123" });
  assert.equal(sent.email, "ada@example.com");
  assert.equal(sent.name, "Ada Lovelace");
});

test("verifyTurnstileToken posts to siteverify when secret is set", async () => {
  const prevSecret = process.env.TURNSTILE_SECRET;
  process.env.TURNSTILE_SECRET = "test-secret";

  const originalFetch = globalThis.fetch;
  let seen;
  globalThis.fetch = async (url, init) => {
    seen = { url: String(url), body: init.body.toString() };
    return {
      ok: true,
      json: async () => ({ success: true, hostname: "devmohan.in" }),
    };
  };

  try {
    const result = await verifyTurnstileToken("tok-1", "1.2.3.4");
    assert.equal(result.success, true);
    assert.match(seen.url, /siteverify/);
    assert.match(seen.body, /secret=test-secret/);
    assert.match(seen.body, /response=tok-1/);
    assert.match(seen.body, /remoteip=1\.2\.3\.4/);
  } finally {
    globalThis.fetch = originalFetch;
    if (prevSecret === undefined) delete process.env.TURNSTILE_SECRET;
    else process.env.TURNSTILE_SECRET = prevSecret;
  }
});
