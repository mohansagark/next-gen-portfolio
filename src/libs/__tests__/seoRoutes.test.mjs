import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

test("sitemap includes work and capabilities detail routes", () => {
  const src = readFileSync(join(root, "src/app/sitemap.js"), "utf8");
  assert.match(src, /\/work\/\$\{/);
  assert.match(src, /\/capabilities\/\$\{/);
  assert.match(src, /content\.capabilities/);
  assert.match(src, /caseStudies/);
});

test("robots keeps globe-samples disallowed and drops deleted home demos", () => {
  const src = readFileSync(join(root, "src/app/robots.js"), "utf8");
  assert.match(src, /\/globe-samples/);
  assert.doesNotMatch(src, /\/home-2/);
});

test("middleware rewrites blog host and redirects apex /blogs", () => {
  const src = readFileSync(join(root, "src/middleware.js"), "utf8");
  assert.match(src, /blog\.devmohan\.in/);
  assert.match(src, /NextResponse\.rewrite/);
  assert.match(src, /pathname === "\/blogs"/);
  assert.match(src, /308/);
});

test("legacy portfolio/services routes permanently redirect matches only", () => {
  const portfolio = readFileSync(
    join(root, "src/app/portfolio/[id]/page.js"),
    "utf8"
  );
  const services = readFileSync(
    join(root, "src/app/services/[id]/page.js"),
    "utf8"
  );
  assert.match(portfolio, /permanentRedirect/);
  assert.match(portfolio, /\/work\//);
  assert.match(portfolio, /notFound\(/);
  assert.doesNotMatch(portfolio, /Personal Portfolio React/);
  assert.match(services, /permanentRedirect/);
  assert.match(services, /\/capabilities\//);
  assert.match(services, /notFound\(/);
  assert.doesNotMatch(services, /Personal Portfolio React/);
  // Unmatched ids must not permanently redirect to homepage
  assert.doesNotMatch(portfolio, /permanentRedirect\(["'`]\/["'`]\)/);
  assert.doesNotMatch(services, /permanentRedirect\(["'`]\/["'`]\)/);
});

test("work and capabilities pages set their own canonical URLs", () => {
  const work = readFileSync(
    join(root, "src/app/work/[slug]/page.js"),
    "utf8"
  );
  const caps = readFileSync(
    join(root, "src/app/capabilities/[slug]/page.js"),
    "utf8"
  );
  assert.match(work, /alternates:\s*\{\s*canonical:/);
  assert.match(work, /\/work\/\$\{/);
  assert.match(caps, /alternates:\s*\{\s*canonical:/);
  assert.match(caps, /\/capabilities\/\$\{/);
});

test("Turnstile test secret is gated out of production", () => {
  const lib = readFileSync(join(root, "src/libs/contactForm.js"), "utf8");
  assert.match(lib, /MISSING_TURNSTILE/);
  assert.match(lib, /NODE_ENV/);
  assert.match(lib, /1x0000000000000000000000000000000AA/);
});
