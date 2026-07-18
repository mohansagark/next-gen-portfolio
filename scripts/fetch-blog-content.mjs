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

const REPO = process.env.PORTFOLIO_BLOG_REPO || "mohansagark/portfolio-blog";
const BRANCH = process.env.PORTFOLIO_BLOG_BRANCH || "main";
const TOKEN = process.env.PORTFOLIO_BLOG_TOKEN || "";

const ROOT = process.cwd();
const COPIES = [
  { from: "generated/blogs.json", to: "public/blogs.json" },
  { from: "generated/search-index.json", to: "public/blog-data/search-index.json" },
  { from: "generated/tags.json", to: "public/blog-data/tags.json" },
];

function log(msg) {
  console.log(`[fetch-blog-content] ${msg}`);
}

function keepBackup(reason) {
  log(`WARN: ${reason}`);
  const ok = COPIES.every(({ to }) => fs.existsSync(path.join(ROOT, to)));
  if (ok) {
    log("Using committed backup copies — build continues.");
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

  const count = JSON.parse(fs.readFileSync(path.join(ROOT, "public/blogs.json"), "utf-8")).length;
  log(`Fetched ${count} posts from ${REPO}@${BRANCH}.`);
  try {
    fs.rmSync(tmp, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
}

run();
