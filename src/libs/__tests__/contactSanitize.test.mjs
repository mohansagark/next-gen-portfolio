import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeContactPayload } from "../contactForm.js";

test("sanitizeContactPayload accepts a valid enquiry", () => {
  const result = sanitizeContactPayload({
    name: "Ada Lovelace",
    email: "ada@example.com",
    company: "Analytical Engines",
    phone: "+1 555 0100",
    reason: "Building an AI product",
    message: "We need help shipping a production copilot.",
    token: "turnstile-token-abc",
  });

  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, []);
  assert.equal(result.data.email, "ada@example.com");
  assert.equal(result.data.reason, "Building an AI product");
});

test("sanitizeContactPayload rejects missing fields", () => {
  const result = sanitizeContactPayload({
    name: "A",
    email: "not-an-email",
    message: "short",
    token: "",
  });

  assert.equal(result.ok, false);
  assert.ok(result.errors.includes("name"));
  assert.ok(result.errors.includes("email"));
  assert.ok(result.errors.includes("message"));
  assert.ok(result.errors.includes("token"));
});

test("sanitizeContactPayload trims and caps lengths", () => {
  const result = sanitizeContactPayload({
    name: `  ${"N".repeat(200)}  `,
    email: "  USER@Example.COM ",
    message: "x".repeat(6000),
    token: "tok",
  });

  assert.equal(result.data.name.length, 120);
  assert.equal(result.data.email, "user@example.com");
  assert.equal(result.data.message.length, 5000);
});
