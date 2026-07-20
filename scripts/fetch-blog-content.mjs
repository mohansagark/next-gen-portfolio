// Fetch pre-built, validated blog artifacts from the private portfolio-blog repo
// at build time and drop them where the app reads them:
//   generated/blogs.json        -> public/blogs.json        (getBlogs)
//   generated/search-index.json -> public/blog-data/search-index.json
//   generated/tags.json         -> public/blog-data/tags.json
//
// Fail-soft: if the fetch fails for any reason (no token, network, repo down),
// we keep the copies already committed in the repo and DO NOT fail the build.
// Those committed copies are the offline backup — the site always builds.
//
// Env:
//   PORTFOLIO_BLOG_TOKEN   GitHub token with read access to the private repo (required for a live fetch)
//   PORTFOLIO_BLOG_REPO    default "mohansagark/portfolio-blog"
//   PORTFOLIO_BLOG_BRANCH  default "main"

import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const REPO = process.env.PORTFOLIO_BLOG_REPO || "mohansagark/portfolio-blog";
const BRANCH = process.env.PORTFOLIO_BLOG_BRANCH || "main";
const TOKEN = process.env.PORTFOLIO_BLOG_TOKEN || "";

const ROOT = process.cwd();
const COPIES = [
  { from: "generated/blogs.json", to: "public/blogs.json" },
  { from: "generated/search-index.json", to: "public/blog-data/search-index.json" },
  { from: "generated/tags.json", to: "public/blog-data/tags.json" },
];

// Cover images are optional: unlike the three JSON files above, a missing
// images/ dir must never fail the build. They are gitignored here because they
// are already versioned in portfolio-blog.
const IMAGES_FROM = "images";
const IMAGES_TO = "public/blog-images";

function log(msg) {
  console.log(`[fetch-blog-content] ${msg}`);
}

// blogs.json can reference a cover whose file never arrived — the clone failed
// and we fell back to the committed backup JSON, or images/ was absent. Blank
// those references so the frontend renders its no-image fallback instead of a
// broken <img>. `exists` takes a bare filename, e.g. "my-post.jpg".
export function pruneMissingCovers(blogs, exists) {
  let pruned = 0;
  for (const entry of blogs) {
    const src = entry?.coverImage;
    if (typeof src !== "string" || src === "") continue;
    const file = src.split("/").pop();
    if (exists(file)) continue;
    entry.coverImage = "";
    entry.coverImageAlt = "";
    pruned += 1;
  }
  return pruned;
}

function applyPrune() {
  const jsonPath = path.join(ROOT, "public/blogs.json");
  if (!fs.existsSync(jsonPath)) return;
  const imagesDir = path.join(ROOT, IMAGES_TO);
  const have = fs.existsSync(imagesDir)
    ? new Set(fs.readdirSync(imagesDir))
    : new Set();
  const blogs = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const pruned = pruneMissingCovers(blogs, (f) => have.has(f));
  if (pruned > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(blogs, null, 2));
    log(`Pruned ${pruned} cover reference(s) with no image file.`);
  }
}

function copyImages(tmp) {
  const src = path.join(tmp, IMAGES_FROM);
  const dest = path.join(ROOT, IMAGES_TO);
  if (!fs.existsSync(src)) {
    log(`No ${IMAGES_FROM}/ in ${REPO} — skipping cover images.`);
    return 0;
  }
  fs.mkdirSync(dest, { recursive: true });
  let n = 0;
  for (const f of fs.readdirSync(src)) {
    if (!f.toLowerCase().endsWith(".jpg")) continue;
    fs.copyFileSync(path.join(src, f), path.join(dest, f));
    n += 1;
  }
  log(`Copied ${n} cover image(s).`);
  return n;
}

function keepBackup(reason) {
  log(`WARN: ${reason}`);
  const ok = COPIES.every(({ to }) => fs.existsSync(path.join(ROOT, to)));
  if (ok) {
    log("Using committed backup copies — build continues.");
    // The backup JSON may name covers that were never committed (the image dir
    // is gitignored), so prune before the frontend can render a broken <img>.
    applyPrune();
    process.exit(0);
  }
  log("ERROR: no committed backup copies present either — cannot proceed.");
  process.exit(1);
}

function run() {
  if (!TOKEN) return keepBackup("PORTFOLIO_BLOG_TOKEN not set");

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-blog-"));
  try {
    const url = `https://x-access-token:${TOKEN}@github.com/${REPO}.git`;
    execSync(`git clone --depth 1 --branch ${BRANCH} ${url} ${tmp}`, {
      stdio: "pipe",
    });
  } catch (e) {
    return keepBackup(`clone failed: ${String(e.message || e).split("\n")[0]}`);
  }

  for (const { from, to } of COPIES) {
    const src = path.join(tmp, from);
    if (!fs.existsSync(src)) return keepBackup(`missing ${from} in ${REPO}`);
    const dest = path.join(ROOT, to);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }

  copyImages(tmp);
  applyPrune();

  const count = JSON.parse(fs.readFileSync(path.join(ROOT, "public/blogs.json"), "utf-8")).length;
  log(`Fetched ${count} posts from ${REPO}@${BRANCH}.`);
  try {
    fs.rmSync(tmp, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
}

// Only run the fetch when invoked directly (not when imported by tests).
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  run();
}
