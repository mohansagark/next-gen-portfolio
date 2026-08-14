import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

test("contact form stack is wired (UI + API + Turnstile + Resend)", () => {
  const routePath = join(root, "src/app/api/contact/route.js");
  const homePath = join(root, "src/components/sections/home/HomeContact.js");
  const libPath = join(root, "src/libs/contactForm.js");
  const clientPath = join(root, "src/libs/sendContactEmail.js");

  assert.equal(existsSync(routePath), true);
  assert.equal(existsSync(homePath), true);
  assert.equal(existsSync(libPath), true);
  assert.equal(existsSync(clientPath), true);

  const route = readFileSync(routePath, "utf8");
  const home = readFileSync(homePath, "utf8");
  const lib = readFileSync(libPath, "utf8");
  const client = readFileSync(clientPath, "utf8");

  assert.match(route, /verifyTurnstileToken/);
  assert.match(route, /sendContactViaResend/);
  assert.match(lib, /siteverify/);
  assert.match(lib, /RESEND_API_KEY/);
  assert.match(client, /\/api\/contact/);
  assert.match(home, /turnstile/);
  assert.match(home, /execution:\s*"execute"/);
  assert.match(home, /appearance:\s*"interaction-only"/);
  assert.match(home, /Building an AI product/);
  assert.match(home, /Send enquiry/);
});
