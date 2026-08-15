#!/usr/bin/env node
/**
 * Post-build HTTP smoke. Expects `npm run build` already completed.
 * Starts `next start`, checks key routes, then exits.
 *
 * Deferred (needs real secrets / browser widget): Turnstile widget click +
 * live Resend delivery end-to-end.
 *
 * Note: Next.js App Router may serve dynamic notFound()/permanentRedirect()
 * as HTTP 200 with NEXT_HTTP_ERROR_FALLBACK / NEXT_REDIRECT in the HTML body
 * (soft navigation). Smoke asserts status and/or those markers.
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const PORT = process.env.SMOKE_PORT || "3010";
const BASE = `http://127.0.0.1:${PORT}`;
const ROOT = process.cwd();

function firstStaticSlug(segment) {
  const dir = join(ROOT, ".next/server/app", segment);
  if (!existsSync(dir)) return null;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const name = ent.name.replace(/\.html$/, "");
    if (name.startsWith("(") || name.startsWith("[")) continue;
    if (/^[a-z0-9-]+$/i.test(name)) return name;
  }
  return null;
}

async function waitForServer(timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${BASE}/`);
      if (res.status > 0) return;
    } catch {
      // not up yet
    }
    await sleep(500);
  }
  throw new Error(`Server did not become ready on ${BASE}`);
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
  const text = await res.text();
  return { status: res.status, text, location: res.headers.get("location") };
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function main() {
  if (!existsSync(join(ROOT, ".next"))) {
    throw new Error("Missing .next — run `npm run build` before smoke");
  }

  const workSlug = firstStaticSlug("work") || "ivygpt";
  const capSlug =
    firstStaticSlug("capabilities") || "ai-product-experiences";

  console.log(`Starting next start on :${PORT} …`);
  const child = spawn(
    "npx",
    ["next", "start", "-p", PORT, "-H", "127.0.0.1"],
    {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, PORT },
    }
  );

  let logs = "";
  child.stdout.on("data", (d) => {
    logs += d.toString();
  });
  child.stderr.on("data", (d) => {
    logs += d.toString();
  });

  const shutdown = () => {
    if (!child.killed) child.kill("SIGTERM");
  };
  process.on("exit", shutdown);
  process.on("SIGINT", () => {
    shutdown();
    process.exit(130);
  });

  try {
    await waitForServer();
    console.log("Smoke checks:");

    const home = await get("/");
    assert(home.status === 200, `GET / → ${home.status}`);
    console.log(`  ✓ / → ${home.status}`);

    const work = await get(`/work/${workSlug}/`);
    assert(work.status === 200, `GET /work/${workSlug}/ → ${work.status}`);
    console.log(`  ✓ /work/${workSlug}/ → ${work.status}`);

    const caps = await get(`/capabilities/${capSlug}/`);
    assert(
      caps.status === 200,
      `GET /capabilities/${capSlug}/ → ${caps.status}`
    );
    console.log(`  ✓ /capabilities/${capSlug}/ → ${caps.status}`);

    // Unknown legacy id: hard 404 or soft not-found body
    const legacy = await get("/portfolio/308/");
    const legacyNotFound =
      legacy.status === 404 ||
      /Page not found|NEXT_HTTP_ERROR_FALLBACK/i.test(legacy.text);
    assert(
      legacyNotFound,
      `/portfolio/308/ → ${legacy.status} without not-found markers`
    );
    console.log(
      `  ✓ /portfolio/308/ → ${legacy.status} (not-found${legacy.status === 404 ? "" : " soft"})`
    );

    const legacySvc = await get("/services/999/");
    const svcNotFound =
      legacySvc.status === 404 ||
      /Page not found|NEXT_HTTP_ERROR_FALLBACK/i.test(legacySvc.text);
    assert(
      svcNotFound,
      `/services/999/ → ${legacySvc.status} without not-found markers`
    );
    console.log(
      `  ✓ /services/999/ → ${legacySvc.status} (not-found${legacySvc.status === 404 ? "" : " soft"})`
    );

    // Known legacy id should redirect (HTTP 308 or NEXT_REDIRECT + /work/)
    const legacyHit = await get("/portfolio/1/");
    const redirected =
      [301, 302, 307, 308].includes(legacyHit.status) ||
      (/NEXT_REDIRECT/i.test(legacyHit.text) && /\/work\//.test(legacyHit.text));
    assert(
      redirected,
      `/portfolio/1/ → ${legacyHit.status} without redirect to /work/`
    );
    console.log(
      `  ✓ /portfolio/1/ → ${legacyHit.status} (redirect to work)`
    );

    const contact = await fetch(`${BASE}/api/contact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "A",
        email: "bad",
        message: "x",
        token: "",
      }),
    });
    assert(
      contact.status === 400,
      `POST /api/contact invalid → ${contact.status}`
    );
    console.log(`  ✓ POST /api/contact (invalid) → ${contact.status}`);
    console.log("Smoke OK");
  } catch (err) {
    console.error("Smoke FAILED:", err.message);
    if (logs) console.error("--- server logs ---\n", logs.slice(-4000));
    process.exitCode = 1;
  } finally {
    shutdown();
    await sleep(500);
  }
}

main();
