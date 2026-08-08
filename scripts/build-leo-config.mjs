#!/usr/bin/env node
/**
 * Build Leo site-config + knowledge context from portfolio-data (SoT).
 *
 * Data source (first match):
 *   1. PORTFOLIO_DATA_DIR (local checkout)
 *   2. ~/Documents/portfolio-data/data (local default)
 *   3. PORTFOLIO_DATA_BASE_URL / https://admin.devmohan.in  (Vercel / CI)
 *
 * Outputs:
 *   scripts/.leo-build/app-config.json
 *   scripts/.leo-build/context.txt
 *   public/leo-widget-config.json
 */

import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const localDataDir =
  process.env.PORTFOLIO_DATA_DIR || join(homedir(), "Documents/portfolio-data/data");
const remoteBase = (
  process.env.PORTFOLIO_DATA_BASE_URL || "https://admin.devmohan.in"
).replace(/\/+$/, "");
const outDir = process.env.LEO_BUILD_DIR || join(__dirname, ".leo-build");

const cache = {};

async function loadJson(name) {
  const file = name.endsWith(".json") ? name : `${name}.json`;
  const key = file.replace(/\.json$/, "");
  if (cache[key] !== undefined) return cache[key];

  const localPath = join(localDataDir, file);
  if (existsSync(localPath)) {
    cache[key] = JSON.parse(readFileSync(localPath, "utf-8"));
    return cache[key];
  }

  const url = `${remoteBase}/data/${file}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    cache[key] = null;
    console.warn(`[build-leo] ${file}: HTTP ${res.status} from ${url}`);
    return null;
  }
  // A host serving an SPA/404 fallback answers 200 with HTML; report that plainly
  // instead of letting res.json() throw an unexplained syntax error.
  const type = res.headers.get("content-type") || "";
  if (!type.includes("json")) {
    cache[key] = null;
    console.warn(`[build-leo] ${file}: expected JSON, got "${type}" from ${url}`);
    return null;
  }
  try {
    cache[key] = await res.json();
  } catch (e) {
    cache[key] = null;
    console.warn(`[build-leo] ${file}: invalid JSON from ${url} — ${e.message}`);
  }
  return cache[key];
}

function monthYear(s) {
  if (!s) return "present";
  const [y, m] = s.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1] ?? m} ${y}`;
}

function section(title, body) {
  return `=== ${title} ===\n${body}`.trim();
}

function truncate(text, maxLen) {
  if (!text || text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLen)}...`;
}

function firstName(full) {
  return String(full || "").trim().split(/\s+/)[0] || "Alex";
}

async function buildContext() {
  const parts = [];
  const profile = await loadJson("profile");
  if (profile) {
    parts.push(section(
      "PROFILE",
      `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim() +
        ` — ${profile.headline ?? ""}, based in ${profile.location ?? "unknown location"}.\n${profile.bio ?? ""}`,
    ));
  }

  const experience = await loadJson("experience");
  if (experience?.jobs?.length) {
    const lines = experience.jobs.map((j) =>
      `- ${j.company} — ${j.role}, ${monthYear(j.startDate)}–${j.current ? "present" : monthYear(j.endDate)}: ${j.description}`,
    );
    parts.push(section("EXPERIENCE", lines.join("\n")));
  }

  const projects = await loadJson("projects");
  if (projects?.items?.length) {
    const lines = projects.items.map((p) => {
      const tech = p.technologies?.length ? ` Tech: ${p.technologies.join(", ")}.` : "";
      return `- ${p.title}${p.subtitle ? ` (${p.subtitle})` : ""}: ${p.description ?? p.shortDescription ?? ""}${tech}`;
    });
    parts.push(section("PROJECTS", lines.join("\n")));
  }

  const skills = await loadJson("skills");
  if (skills?.categories?.length) {
    const lines = skills.categories.map((c) => `${c.name}: ${c.skills.map((s) => s.name).join(", ")}`);
    parts.push(section("SKILLS", lines.join("\n")));
  }

  const education = await loadJson("education");
  if (education) {
    const degrees = (education.degrees ?? []).map((d) =>
      `- ${d.institution} — ${d.degree}${d.field ? `, ${d.field}` : ""} (${monthYear(d.startDate)}–${monthYear(d.endDate)})${d.grade ? `, grade ${d.grade}` : ""}`,
    );
    const byProvider = new Map();
    for (const c of education.certifications ?? []) {
      const key = c.provider || "";
      if (!byProvider.has(key)) byProvider.set(key, []);
      byProvider.get(key).push(c);
    }
    const certs = [];
    for (const [provider, items] of byProvider) {
      if (items.length <= 2) {
        for (const c of items) {
          certs.push(`${c.title}${provider ? ` (${provider}${c.issueDate ? `, ${monthYear(c.issueDate)}` : ""})` : ""}`);
        }
      } else {
        const dates = items.map((c) => c.issueDate).filter(Boolean).sort();
        const range = dates.length
          ? dates[0] === dates[dates.length - 1] ? monthYear(dates[0]) : `${monthYear(dates[0])}–${monthYear(dates[dates.length - 1])}`
          : "";
        certs.push(`${items.length} courses from ${provider}${range ? ` (${range})` : ""}`);
      }
    }
    const body = [degrees.join("\n"), certs.length ? `Certifications: ${certs.join("; ")}` : ""].filter(Boolean).join("\n");
    parts.push(section("EDUCATION", body));
  }

  const achievements = await loadJson("achievements");
  if (achievements?.items?.length) {
    const lines = achievements.items.map((a) => `- ${a.title} (${a.year}): ${a.description}`);
    parts.push(section("ACHIEVEMENTS", lines.join("\n")));
  }

  const services = await loadJson("services");
  if (services?.items?.length) {
    const lines = services.items.map((s) => `- ${s.title}: ${s.shortDescription ?? s.description ?? ""}`);
    parts.push(section("SERVICES", lines.join("\n")));
  }

  const testimonials = await loadJson("testimonials");
  if (testimonials?.items?.length) {
    const lines = testimonials.items.map((t) => `- ${t.author} (${t.role}): "${truncate(t.quote, 140)}"`);
    parts.push(section("TESTIMONIALS", lines.join("\n")));
  }

  return parts.join("\n\n");
}

function buildFacts(profile, experience, achievements, education, extraFacts = []) {
  const facts = [];
  const name = firstName(profile?.firstName);
  if (experience?.jobs?.length) {
    for (const j of experience.jobs.slice(0, 4)) {
      const when = j.current ? "currently" : "previously";
      facts.push(
        `${name} is ${when} at ${j.company} as ${j.role}. ${j.description}`.replace(/\s+/g, " ").trim(),
      );
    }
  }
  if (achievements?.items?.length) {
    for (const a of achievements.items.slice(0, 3)) {
      facts.push(`${name} earned ${a.title} (${a.year}): ${a.description}`);
    }
  }
  if (education?.degrees?.length) {
    for (const d of education.degrees.slice(0, 2)) {
      facts.push(
        `${name} studied at ${d.institution} — ${d.degree}${d.field ? `, ${d.field}` : ""}.`,
      );
    }
  }
  // Anything not derivable from the structured content — availability, preferences —
  // is authored in chatbot.json rather than hardcoded here.
  for (const f of extraFacts) {
    if (typeof f === "string" && f.trim()) facts.push(f.trim());
  }
  return facts.length ? facts : [`${name} is a software engineer.`];
}

/**
 * Mirrors ai-voice-bot/config/schema.json. Nothing downstream re-validates before this blob
 * is written to production KV, and the Worker fails closed on a bad allowlist — so a bad
 * build must stop here rather than take the widget offline.
 */
function validateAppConfig(config) {
  const { allowedOrigins, persona } = config;
  if (!Array.isArray(allowedOrigins) || !allowedOrigins.length) {
    throw new Error(
      "chatbot.json must define allowedOrigins[] (publish via admin.devmohan.in or set PORTFOLIO_DATA_DIR)",
    );
  }
  for (const o of allowedOrigins) {
    if (typeof o !== "string" || !/^https:\/\/[^/]+$/.test(o)) {
      throw new Error(
        `chatbot.json allowedOrigins entry ${JSON.stringify(o)} must be https:// + host only — a browser Origin header never carries a path or trailing slash`,
      );
    }
  }
  if (!persona.owner.name || !persona.owner.role) {
    throw new Error("profile.json must provide firstName and headline (persona.owner)");
  }
  if (!persona.facts.length) throw new Error("persona.facts came out empty — check experience/achievements data");
  if (config.behavior && "mode" in config.behavior) {
    throw new Error("behavior.mode is not syncable — mode is a Worker env var so content edits cannot disable enforcement");
  }
}

async function buildAppConfig() {
  const profile = (await loadJson("profile")) || {};
  const experience = await loadJson("experience");
  const achievements = await loadJson("achievements");
  const education = await loadJson("education");
  const chatbot = (await loadJson("chatbot")) || {};

  const displayName = firstName(profile.firstName);
  const botName = chatbot.botName || "Leo";
  const persona = {
    botName,
    owner: {
      name: displayName,
      role: profile.headline || "Software Engineer",
    },
    bio: profile.bio || "",
    tone: chatbot.tone || "warm, a little playful, and genuinely curious — a friendly guide, never a corporate bio",
    facts: buildFacts(profile, experience, achievements, education, chatbot.extraFacts ?? []),
    do_not: chatbot.do_not || [
      "quote prices",
      "commit to delivery timelines",
      "confirm calendar availability or treat a preferred time as a booked meeting",
    ],
  };

  const widgetDefaults = {
    branding: {
      botName,
      greeting: `Hi, I'm ${botName} — ${displayName}'s assistant. Ask me about their work, projects, or how to get in touch.`,
      themeColor: "#6C5CE7",
      themeColorSecondary: "#6C5CE7",
      position: "bottom-right",
    },
    behavior: {
      autoGreet: true,
      rememberReturning: true,
      language: "en-US",
      proactiveGreet: true,
    },
    privacy: {
      consentText: "I agree to share my info so I can be followed up with.",
      privacyPolicyUrl: null,
    },
    voice: { enabled: true, speakByDefault: false, ttsVoice: "hannah" },
  };

  // Merge per section, so filling in one CMS subsection can't drop the other three.
  const authored = chatbot.widget || {};
  const widget = Object.fromEntries(
    Object.entries(widgetDefaults).map(([k, v]) => [k, { ...v, ...(authored[k] ?? {}) }]),
  );

  // Sveltia may store "" instead of null for optional URL fields.
  if (widget.privacy.privacyPolicyUrl === "") widget.privacy.privacyPolicyUrl = null;

  const instructions =
    typeof chatbot.instructions === "string" && chatbot.instructions.trim()
      ? chatbot.instructions.trim()
      : undefined;

  const config = {
    allowedOrigins: chatbot.allowedOrigins,
    persona,
    ...(instructions ? { instructions } : {}),
    behavior: chatbot.behavior || {
      defaultProvider: "groq",
      maxMessageChars: 2000,
      maxTurnsPerSession: 30,
      ttsVoice: "hannah",
      maxTtsChars: 1200,
    },
    widget,
  };
  validateAppConfig(config);
  return config;
}

async function main() {
  const usingLocal = existsSync(join(localDataDir, "profile.json"));
  console.log(
    usingLocal
      ? `[build-leo] reading local data from ${localDataDir}`
      : `[build-leo] fetching data from ${remoteBase}`,
  );

  mkdirSync(outDir, { recursive: true });
  const appConfig = await buildAppConfig();
  const context = await buildContext();

  const appConfigPath = join(outDir, "app-config.json");
  const contextPath = join(outDir, "context.txt");
  const widgetPublicPath = join(repoRoot, "public", "leo-widget-config.json");

  writeFileSync(appConfigPath, JSON.stringify(appConfig, null, 2));
  writeFileSync(contextPath, context);
  mkdirSync(join(repoRoot, "public"), { recursive: true });
  writeFileSync(widgetPublicPath, JSON.stringify(appConfig.widget, null, 2));

  console.log(`Wrote ${appConfigPath}`);
  console.log(`Wrote ${contextPath} (${context.length} bytes)`);
  console.log(`Wrote ${widgetPublicPath}`);
}

// `--optional` (used by predev): a fresh clone with no portfolio-data checkout and no network
// shouldn't be unable to run `npm run dev`. LeoLoader falls back to its inline defaults when
// /leo-widget-config.json is absent. Builds that actually ship config never pass this flag.
const optional = process.argv.includes("--optional");

main().catch((e) => {
  const msg = e.message || e;
  if (optional) {
    console.warn(`[build-leo] skipped: ${msg}`);
    console.warn("[build-leo] dev server will use LeoLoader's built-in widget defaults.");
    process.exit(0);
  }
  console.error(msg);
  process.exit(1);
});
