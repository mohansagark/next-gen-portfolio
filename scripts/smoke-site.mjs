#!/usr/bin/env node
/**
 * Post-build HTTP smoke. Expects `npm run build` already completed.
 * Starts `next start`, checks key routes, then exits hard (no hang).
 *
 * Deferred (needs real secrets / browser widget): Turnstile widget click +
 * live Resend delivery end-to-end.
 *
 * Note: Next.js App Router may serve dynamic notFound()/permanentRedirect()
 * as HTTP 200 with NEXT_HTTP_ERROR_FALLBACK / NEXT_REDIRECT in the HTML body
 * (soft navigation). Smoke asserts status and/or those markers.
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const PORT = process.env.SMOKE_PORT || "3010";
const BASE = `http://127.0.0.1:${PORT}`;
const ROOT = process.cwd();
const BOOT_TIMEOUT_MS = Number(process.env.SMOKE_BOOT_TIMEOUT_MS || 45_000);
const REQUEST_TIMEOUT_MS = Number(process.env.SMOKE_REQUEST_TIMEOUT_MS || 12_000);
const OVERALL_TIMEOUT_MS = Number(process.env.SMOKE_OVERALL_TIMEOUT_MS || 90_000);

function firstStaticSlug(segment) {
  const dir = join(ROOT, ".next/server/app", segment);
  if (!existsSync(dir)) return null;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const name = ent.name.replace(/\.html$/, "");
    if (name.startsWith("(") || name.startsWith("[")) continue;
    if (/^[a-z0-9-]+$/i.test(name)) return name;
  }
  return null;
}

async function fetchTimed(url, init = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  const signal = AbortSignal.timeout(timeoutMs);
  return fetch(url, { ...init, signal });
}

async function waitForServer(timeoutMs = BOOT_TIMEOUT_MS) {
  const start = Date.now();
  let lastErr = null;
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetchTimed(`${BASE}/`, {}, 2_500);
      if (res.status > 0) return;
    } catch (err) {
      lastErr = err;
    }
    await sleep(400);
  }
  throw new Error(
    `Server did not become ready on ${BASE} within ${timeoutMs}ms` +
      (lastErr ? ` (${lastErr.name}: ${lastErr.message})` : "")
  );
}

async function get(path) {
  const res = await fetchTimed(`${BASE}${path}`, { redirect: "manual" });
  const text = await res.text();
  return { status: res.status, text, location: res.headers.get("location") };
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function startServer() {
  const nextBin = join(ROOT, "node_modules/next/dist/bin/next");
  if (!existsSync(nextBin)) {
    throw new Error(`Missing Next binary at ${nextBin}`);
  }

  // Spawn Next directly (not via npx) so we can kill the real server process.
  const child = spawn(
    process.execPath,
    [nextBin, "start", "-p", PORT, "-H", "127.0.0.1"],
    {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      env: {
        ...process.env,
        PORT,
        NODE_ENV: "production",
        // Match CI: don't prefer a developer PORTFOLIO_DATA_DIR checkout.
        PORTFOLIO_DATA_DIR: "",
      },
    }
  );

  let logs = "";
  const append = (d) => {
    logs += d.toString();
    if (logs.length > 20_000) logs = logs.slice(-16_000);
  };
  child.stdout.on("data", append);
  child.stderr.on("data", append);

  return { child, getLogs: () => logs };
}

function forceKill(child) {
  if (!child || child.exitCode != null || child.signalCode) return;
  try {
    child.kill("SIGTERM");
  } catch {
    // ignore
  }
}

async function ensureDead(child) {
  if (!child || child.exitCode != null || child.signalCode) return;
  forceKill(child);
  const deadline = Date.now() + 2_500;
  while (Date.now() < deadline) {
    if (child.exitCode != null || child.signalCode) return;
    await sleep(100);
  }
  try {
    child.kill("SIGKILL");
  } catch {
    // ignore
  }
  await sleep(200);
}

async function runChecks() {
  if (!existsSync(join(ROOT, ".next"))) {
    throw new Error("Missing .next — run `npm run build` before smoke");
  }

  const workSlug = firstStaticSlug("work") || "ivygpt";
  const capSlug =
    firstStaticSlug("capabilities") || "ai-product-experiences";

  console.log(`Starting next start on :${PORT} …`);
  const { child, getLogs } = startServer();

  child.on("exit", (code, signal) => {
    if (code && code !== 0) {
      console.error(`next start exited early code=${code} signal=${signal}`);
    }
  });

  try {
    await waitForServer();
    console.log("Smoke checks:");

    const home = await get("/");
    assert(home.status === 200, `GET / → ${home.status}`);
    console.log(`  ✓ / → ${home.status}`);

    const work = await get(`/work/${workSlug}/`);
    assert(work.status === 200, `GET /work/${workSlug}/ → ${work.status}`);
    console.log(`  ✓ /work/${workSlug}/ → ${work.status}`);

    const caps = await get(`/capabilities/${capSlug}/`);
    assert(
      caps.status === 200,
      `GET /capabilities/${capSlug}/ → ${caps.status}`
    );
    console.log(`  ✓ /capabilities/${capSlug}/ → ${caps.status}`);

    const legacy = await get("/portfolio/308/");
    const legacyNotFound =
      legacy.status === 404 ||
      /Page not found|NEXT_HTTP_ERROR_FALLBACK/i.test(legacy.text);
    assert(
      legacyNotFound,
      `/portfolio/308/ → ${legacy.status} without not-found markers`
    );
    console.log(
      `  ✓ /portfolio/308/ → ${legacy.status} (not-found${legacy.status === 404 ? "" : " soft"})`
    );

    const legacySvc = await get("/services/999/");
    const svcNotFound =
      legacySvc.status === 404 ||
      /Page not found|NEXT_HTTP_ERROR_FALLBACK/i.test(legacySvc.text);
    assert(
      svcNotFound,
      `/services/999/ → ${legacySvc.status} without not-found markers`
    );
    console.log(
      `  ✓ /services/999/ → ${legacySvc.status} (not-found${legacySvc.status === 404 ? "" : " soft"})`
    );

    // Prefer slug-based legacy URL: numeric /portfolio/1 only works when that
    // id exists in the content source (prod CDN currently has no ivygpt → id 1).
    const legacyHit = await get(`/portfolio/${workSlug}/`);
    const redirected =
      [301, 302, 307, 308].includes(legacyHit.status) ||
      (/NEXT_REDIRECT/i.test(legacyHit.text) &&
        new RegExp(`/work/${workSlug}`).test(legacyHit.text));
    assert(
      redirected,
      `/portfolio/${workSlug}/ → ${legacyHit.status} without redirect to /work/${workSlug}/`
    );
    console.log(
      `  ✓ /portfolio/${workSlug}/ → ${legacyHit.status} (redirect to work)`
    );

    const contact = await fetchTimed(`${BASE}/api/contact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "A",
        email: "bad",
        message: "x",
        token: "",
      }),
    });
    assert(
      contact.status === 400,
      `POST /api/contact invalid → ${contact.status}`
    );
    console.log(`  ✓ POST /api/contact (invalid) → ${contact.status}`);
    console.log("Smoke OK");
    return 0;
  } catch (err) {
    console.error("Smoke FAILED:", err.message);
    const logs = getLogs();
    if (logs) console.error("--- server logs ---\n", logs.slice(-4000));
    return 1;
  } finally {
    await ensureDead(child);
  }
}

async function main() {
  let exitCode = 1;
  let timer;
  try {
    exitCode = await Promise.race([
      runChecks(),
      new Promise((_, reject) => {
        timer = setTimeout(() => {
          reject(
            new Error(
              `Smoke overall timeout (${OVERALL_TIMEOUT_MS}ms) — aborting`
            )
          );
        }, OVERALL_TIMEOUT_MS);
      }),
    ]);
  } catch (err) {
    console.error("Smoke FAILED:", err.message);
    exitCode = 1;
  } finally {
    clearTimeout(timer);
  }
  // Hard exit so a lingering child/handle cannot keep the CI step alive.
  process.exit(exitCode);
}

main();
