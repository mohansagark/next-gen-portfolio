#!/usr/bin/env node
// Deprecated entrypoint — knowledge + app config now come from portfolio-data via
// build-leo-config.mjs / sync-leo.mjs (KV keys `context` + `app_config`).
// Kept so old docs/commands fail loudly with the new path.

console.error(`build-leo-context.mjs has been replaced.

Use:
  node scripts/build-leo-config.mjs   # write app-config + context + public widget JSON
  node scripts/sync-leo.mjs           # push to Cloudflare KV (requires wrangler auth)

See ai-voice-bot/config/STORAGE.md for the storage map.
`);
process.exit(1);
