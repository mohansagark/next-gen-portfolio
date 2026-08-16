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
  assert.match(src, /content\.portfolio/);
  assert.match(src, /\/privacy/);
});

test("robots drops deleted demo routes including globe-samples", () => {
  const src = readFileSync(join(root, "src/app/robots.js"), "utf8");
  assert.doesNotMatch(src, /\/globe-samples/);
  assert.doesNotMatch(src, /\/home-2/);
});

test("middleware wires resolveBlogHostAction for blog host / apex blogs", () => {
  const src = readFileSync(join(root, "src/middleware.js"), "utf8");
  assert.match(src, /resolveBlogHostAction/);
  assert.match(src, /NextResponse\.rewrite/);
  assert.match(src, /NextResponse\.redirect/);
});

test("legacy portfolio/services routes use redirect helpers + notFound", () => {
  const portfolio = readFileSync(
    join(root, "src/app/portfolio/[id]/page.js"),
    "utf8"
  );
  const services = readFileSync(
    join(root, "src/app/services/[id]/page.js"),
    "utf8"
  );
  assert.match(portfolio, /findLegacyPortfolioMatch/);
  assert.match(portfolio, /legacyPortfolioTarget/);
  assert.match(portfolio, /permanentRedirect/);
  assert.match(portfolio, /notFound\(/);
  assert.doesNotMatch(portfolio, /Personal Portfolio React/);
  assert.match(services, /findLegacyCapabilityMatch/);
  assert.match(services, /legacyCapabilityTarget/);
  assert.match(services, /permanentRedirect/);
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

test("privacy page is canonical, linked from the footer, and names Leo storage", () => {
  const page = readFileSync(join(root, "src/app/privacy/page.js"), "utf8");
  const notice = readFileSync(
    join(root, "src/components/layout/main/PrivacyNotice.js"),
    "utf8"
  );
  const footer = readFileSync(
    join(root, "src/components/layout/footer/Footer.js"),
    "utf8"
  );
  const leo = readFileSync(
    join(root, "src/components/shared/others/LeoLoader.js"),
    "utf8"
  );
  assert.match(page, /\/privacy/);
  assert.match(page, /alternates:\s*\{\s*canonical:/);
  assert.match(notice, /voicebot\.devmohan\.in/);
  assert.match(notice, /Durable Object/);
  assert.match(notice, /D1/);
  assert.match(notice, /come into force/);
  assert.match(notice, /On this page/);
  assert.match(footer, /homeLink\("\/privacy"\)/);
  assert.match(leo, /https:\/\/www\.devmohan\.in\/privacy/);
});

test("Turnstile test secret is gated out of production", () => {
  const lib = readFileSync(join(root, "src/libs/contactForm.js"), "utf8");
  assert.match(lib, /MISSING_TURNSTILE/);
  assert.match(lib, /NODE_ENV/);
  assert.match(lib, /1x0000000000000000000000000000000AA/);
});
