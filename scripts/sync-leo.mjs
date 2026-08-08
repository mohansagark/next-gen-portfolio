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
import { existsSync, readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dryRun = process.argv.includes("--dry-run");
const buildScript = join(__dirname, "build-leo-config.mjs");
const outDir = join(__dirname, ".leo-build");
const namespaceId =
  process.env.PORTFOLIO_KV_NAMESPACE_ID || "0ac98a2a6f5f428aafa4dd9e1d3f2feb";

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: "inherit", env: process.env, ...opts });
  if (r.status !== 0) process.exit(r.status || 1);
}

function kvPut(key, value) {
  const dir = mkdtempSync(join(tmpdir(), "leo-sync-"));
  const path = join(dir, key.replace(/\W+/g, "_"));
  writeFileSync(path, value, "utf8");
  console.log(`→ KV put ${key} (${value.length} bytes) namespace=${namespaceId}`);
  if (dryRun) {
    console.log("  (dry-run) skip wrangler");
    return;
  }
  const args = [
    "wrangler",
    "kv",
    "key",
    "put",
    key,
    "--namespace-id",
    namespaceId,
    "--path",
    path,
  ];
  const r = spawnSync("npx", args, { stdio: "inherit", env: process.env });
  if (r.status !== 0) {
    console.error(`wrangler kv key put ${key} failed`);
    process.exit(r.status || 1);
  }
}

if (!existsSync(buildScript)) {
  console.error("missing build-leo-config.mjs");
  process.exit(1);
}

run(process.execPath, [buildScript]);

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

kvPut("app_config", readFileSync(appConfigPath, "utf8"));
kvPut("context", readFileSync(contextPath, "utf8"));
console.log("Leo KV sync complete.");
