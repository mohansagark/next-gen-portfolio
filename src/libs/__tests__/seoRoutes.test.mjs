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

test("legacy portfolio/services routes permanently redirect", () => {
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
  assert.doesNotMatch(portfolio, /Personal Portfolio React/);
  assert.match(services, /permanentRedirect/);
  assert.match(services, /\/capabilities\//);
  assert.doesNotMatch(services, /Personal Portfolio React/);
});
