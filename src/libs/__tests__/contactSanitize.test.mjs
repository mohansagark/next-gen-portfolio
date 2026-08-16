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

test("sanitizeContactPayload accepts user_email and select aliases", () => {
  const result = sanitizeContactPayload({
    name: "Grace Hopper",
    user_email: "grace@example.com",
    select: "General Inquiry",
    message: "Need a production-grade assistant for ops.",
    "cf-turnstile-response": "cf-token",
  });
  assert.equal(result.ok, true);
  assert.equal(result.data.email, "grace@example.com");
  assert.equal(result.data.reason, "General Inquiry");
  assert.equal(result.data.token, "cf-token");
});

test("sanitizeContactPayload rejects oversized tokens", () => {
  const result = sanitizeContactPayload({
    name: "Valid Name",
    email: "ok@example.com",
    message: "Long enough message body here.",
    token: "t".repeat(2049),
  });
  assert.equal(result.ok, false);
  assert.ok(result.errors.includes("token"));
});

test("sanitizeContactPayload defaults reason and caps optional fields", () => {
  const result = sanitizeContactPayload({
    name: "Valid Name",
    email: "ok@example.com",
    company: "C".repeat(200),
    phone: "P".repeat(80),
    message: "Long enough message body here.",
    token: "tok",
  });
  assert.equal(result.ok, true);
  assert.equal(result.data.reason, "General Inquiry");
  assert.equal(result.data.company.length, 120);
  assert.equal(result.data.phone.length, 40);
});

test("sanitizeContactPayload rejects empty or non-object body", () => {
  const empty = sanitizeContactPayload();
  assert.equal(empty.ok, false);
  assert.ok(empty.errors.includes("name"));
  assert.ok(empty.errors.includes("email"));
  assert.ok(empty.errors.includes("message"));
  assert.ok(empty.errors.includes("token"));
});

test("sanitizeContactPayload strips CR/LF from subject-bound fields", () => {
  const result = sanitizeContactPayload({
    name: "Ada\r\nBcc: evil@x.com",
    email: "ada@example.com",
    reason: "Project\nX-Injected: yes",
    message: "We need help shipping a production copilot.",
    token: "turnstile-token-abc",
  });
  assert.equal(result.ok, true);
  assert.equal(result.data.name.includes("\n"), false);
  assert.equal(result.data.name.includes("\r"), false);
  assert.equal(result.data.reason.includes("\n"), false);
  assert.match(result.data.name, /Ada Bcc: evil@x.com/);
});
