#!/usr/bin/env node
/**
 * Build Leo config from portfolio-data and sync to Cloudflare KV.
 * Self-contained for Vercel — does not require a local ai-voice-bot checkout.
 *
 * Usage:
 *   node scripts/sync-leo.mjs [--dry-run]
 *
 * Env:
 *   CLOUDFLARE_API_TOKEN          required on Vercel; optional locally (skips sync with warning)
 *   CLOUDFLARE_ACCOUNT_ID         optional (Wrangler can infer from token)
 *   PORTFOLIO_KV_NAMESPACE_ID     default: production Leo KV namespace
 *   PORTFOLIO_DATA_DIR / PORTFOLIO_DATA_BASE_URL  — see build-leo-config.mjs
 *
 * Does NOT rotate LLM secrets on every build — those stay as Cloudflare Worker secrets.
 */

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dryRun = process.argv.includes("--dry-run");
const buildScript = join(__dirname, "build-leo-config.mjs");
const outDir = join(__dirname, ".leo-build");
const namespaceId =
  process.env.PORTFOLIO_KV_NAMESPACE_ID || "0ac98a2a6f5f428aafa4dd9e1d3f2feb";

/**
 * Pinned so a Vercel build can't pick up a new wrangler major mid-flight — `kv key put`
 * flags have moved across versions (v3 has no --remote at all).
 *
 * Ideally wrangler would be a devDependency, but this repo carries both a package-lock.json
 * and a yarn.lock, and adding it churns ~15k lines of lockfile that don't belong in this PR.
 * Worth doing as a follow-up alongside a deliberate lockfile refresh.
 */
const WRANGLER = `wrangler@${process.env.WRANGLER_VERSION || "4.42.0"}`;

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: "inherit", env: process.env, ...opts });
  if (r.status !== 0) process.exit(r.status || 1);
}

/**
 * Returns true on success. A KV failure is NOT fatal: the site itself only needs
 * public/leo-widget-config.json, which is already written by this point, and KV keeps its
 * last synced value. Killing the deploy over a Cloudflare hiccup would mean an expired
 * token or a CF incident blocks shipping the portfolio.
 */
function kvPut(key, value) {
  const dir = mkdtempSync(join(tmpdir(), "leo-sync-"));
  const path = join(dir, key.replace(/\W+/g, "_"));
  try {
    writeFileSync(path, value, "utf8");
    console.log(`→ KV put ${key} (${value.length} bytes) namespace=${namespaceId}`);
    if (dryRun) {
      console.log("  (dry-run) skip wrangler");
      return true;
    }
    const args = ["--yes", WRANGLER, "kv", "key", "put", key, "--namespace-id", namespaceId, "--remote", "--path", path];
    const r = spawnSync("npx", args, { stdio: "inherit", env: process.env });
    if (r.status !== 0) {
      console.error(`[sync-leo] wrangler kv key put ${key} FAILED — Leo keeps its previously synced ${key}.`);
      return false;
    }
    return true;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

if (!existsSync(buildScript)) {
  console.error("missing build-leo-config.mjs");
  process.exit(1);
}

run(process.execPath, [buildScript]);

// Vercel builds a preview for every branch and every PR. They all share one production KV
// namespace, so an ungated sync means any preview silently repoints live Leo.
const isProductionDeploy = !process.env.VERCEL || process.env.VERCEL_ENV === "production";
if (!isProductionDeploy) {
  console.log(
    `[sync-leo] VERCEL_ENV=${process.env.VERCEL_ENV} — built local artifacts only; production KV untouched.`,
  );
  process.exit(0);
}

const hasToken = Boolean(process.env.CLOUDFLARE_API_TOKEN?.trim());
if (!hasToken) {
  if (process.env.VERCEL) {
    console.error(
      "CLOUDFLARE_API_TOKEN is required on Vercel so prebuild can sync Leo config to KV.",
    );
    process.exit(1);
  }
  console.warn(
    "[sync-leo] CLOUDFLARE_API_TOKEN not set — built local artifacts only; skipped Cloudflare KV sync.",
  );
  process.exit(0);
}

const appConfigPath = join(outDir, "app-config.json");
const contextPath = join(outDir, "context.txt");
if (!existsSync(appConfigPath) || !existsSync(contextPath)) {
  console.error("build outputs missing under scripts/.leo-build/");
  process.exit(1);
}

const results = [
  kvPut("app_config", readFileSync(appConfigPath, "utf8")),
  kvPut("context", readFileSync(contextPath, "utf8")),
];

if (results.every(Boolean)) {
  console.log("Leo KV sync complete.");
} else {
  // Loud, but exit 0 — the site build continues and Leo runs on its last synced config.
  console.error(
    "[sync-leo] KV sync INCOMPLETE. The site will still deploy, but Leo is running on stale " +
      "config. Check CLOUDFLARE_API_TOKEN scope/expiry and Cloudflare status, then redeploy.",
  );
}
