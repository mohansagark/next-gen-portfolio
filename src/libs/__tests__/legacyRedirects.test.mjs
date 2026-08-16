import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  findLegacyPortfolioMatch,
  legacyPortfolioTarget,
  findLegacyCapabilityMatch,
  legacyCapabilityTarget,
  resolveBlogHostAction,
} from "../legacyRedirects.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

const portfolio = [
  { id: 1, slug: "ivygpt", title: "IVYGPT" },
  { id: 2, slug: "servicenow-agentic", title: "Agentic" },
];

const capabilities = [
  { id: "ai-surfaces", slug: "ai-product-experiences", title: "AI" },
  { id: "agentic", slug: "agentic-systems", title: "Agentic" },
];

test("legacy portfolio id maps to /work/[slug]", () => {
  const match = findLegacyPortfolioMatch(portfolio, "1");
  assert.equal(match.slug, "ivygpt");
  assert.equal(legacyPortfolioTarget(match), "/work/ivygpt");
});

test("legacy portfolio slug match also resolves", () => {
  const match = findLegacyPortfolioMatch(portfolio, "servicenow-agentic");
  assert.equal(legacyPortfolioTarget(match), "/work/servicenow-agentic");
});

test("unknown legacy portfolio id yields notFound decision (null target)", () => {
  const match = findLegacyPortfolioMatch(portfolio, "308");
  assert.equal(match, null);
  assert.equal(legacyPortfolioTarget(match), null);
  assert.equal(legacyPortfolioTarget({ id: 9 }), null);
});

test("legacy capability id or slug maps to /capabilities/[slug]", () => {
  assert.equal(
    legacyCapabilityTarget(findLegacyCapabilityMatch(capabilities, "ai-surfaces")),
    "/capabilities/ai-product-experiences"
  );
  assert.equal(
    legacyCapabilityTarget(
      findLegacyCapabilityMatch({ items: capabilities }, "agentic-systems")
    ),
    "/capabilities/agentic-systems"
  );
});

test("unknown legacy service/capability id yields notFound decision", () => {
  assert.equal(findLegacyCapabilityMatch(capabilities, "999"), null);
  assert.equal(legacyCapabilityTarget(null), null);
});

test("resolveBlogHostAction rewrites blog host short URLs", () => {
  assert.deepEqual(
    resolveBlogHostAction({ host: "blog.devmohan.in", pathname: "/" }),
    { type: "rewrite", pathname: "/blogs" }
  );
  assert.deepEqual(
    resolveBlogHostAction({
      host: "blog.devmohan.in",
      pathname: "/my-post",
    }),
    { type: "rewrite", pathname: "/blogs/my-post" }
  );
});

test("resolveBlogHostAction strips /blogs on blog host", () => {
  assert.deepEqual(
    resolveBlogHostAction({
      host: "blog.devmohan.in",
      pathname: "/blogs/hello",
    }),
    { type: "redirect", pathname: "/hello", status: 308 }
  );
});

test("resolveBlogHostAction redirects apex /blogs to blog host", () => {
  assert.deepEqual(
    resolveBlogHostAction({ host: "devmohan.in", pathname: "/blogs/x" }),
    {
      type: "redirect",
      host: "blog.devmohan.in",
      protocol: "https:",
      pathname: "/x",
      status: 308,
    }
  );
});

test("resolveBlogHostAction leaves localhost /blogs alone", () => {
  assert.equal(
    resolveBlogHostAction({ host: "localhost", pathname: "/blogs" }),
    null
  );
});

test("source smokes still document sitemap robots and canonicals", () => {
  const sitemap = readFileSync(join(root, "src/app/sitemap.js"), "utf8");
  assert.match(sitemap, /\/work\/\$\{/);
  assert.match(sitemap, /\/capabilities\/\$\{/);

  const robots = readFileSync(join(root, "src/app/robots.js"), "utf8");
  assert.doesNotMatch(robots, /\/globe-samples/);

  const work = readFileSync(join(root, "src/app/work/[slug]/page.js"), "utf8");
  assert.match(work, /alternates:\s*\{\s*canonical:/);
});
