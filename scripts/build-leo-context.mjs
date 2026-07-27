#!/usr/bin/env node
// Formats ~/Documents/portfolio-data/data/*.json (override with PORTFOLIO_DATA_DIR) into a
// single plain-text block for Leo's PORTFOLIO_CONTEXT secret on the ai-voice-bot worker.
//
// This lives here, not in the ai-voice-bot repo, because ai-voice-bot is a shared/forkable
// package — Mohan's actual portfolio content has no business being committed there.
//
// Usage after editing portfolio-data:
//   node scripts/build-leo-context.mjs | wrangler secret put PORTFOLIO_CONTEXT --config ../ai-voice-bot/worker/wrangler.toml
// (run from a shell that's authenticated with the ai-voice-bot Cloudflare account)

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const dataDir = process.env.PORTFOLIO_DATA_DIR || join(homedir(), "Documents/portfolio-data/data");

function readJson(name) {
  const path = join(dataDir, name);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf-8"));
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

const parts = [];

const profile = readJson("profile.json");
if (profile) {
  parts.push(section(
    "PROFILE",
    `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim() +
      ` — ${profile.headline ?? ""}, based in ${profile.location ?? "unknown location"}.\n${profile.bio ?? ""}`,
  ));
}

const experience = readJson("experience.json");
if (experience?.jobs?.length) {
  const lines = experience.jobs.map((j) =>
    `- ${j.company} — ${j.role}, ${monthYear(j.startDate)}–${j.current ? "present" : monthYear(j.endDate)}: ${j.description}`,
  );
  parts.push(section("EXPERIENCE", lines.join("\n")));
}

const projects = readJson("projects.json");
if (projects?.items?.length) {
  const lines = projects.items.map((p) => {
    const tech = p.technologies?.length ? ` Tech: ${p.technologies.join(", ")}.` : "";
    return `- ${p.title}${p.subtitle ? ` (${p.subtitle})` : ""}: ${p.description ?? p.shortDescription ?? ""}${tech}`;
  });
  parts.push(section("PROJECTS", lines.join("\n")));
}

const skills = readJson("skills.json");
if (skills?.categories?.length) {
  const lines = skills.categories.map((c) => `${c.name}: ${c.skills.map((s) => s.name).join(", ")}`);
  parts.push(section("SKILLS", lines.join("\n")));
}

const education = readJson("education.json");
if (education) {
  const degrees = (education.degrees ?? []).map((d) =>
    `- ${d.institution} — ${d.degree}${d.field ? `, ${d.field}` : ""} (${monthYear(d.startDate)}–${monthYear(d.endDate)})${d.grade ? `, grade ${d.grade}` : ""}`,
  );
  const certs = (education.certifications ?? []).map((c) =>
    `${c.title}${c.provider ? ` (${c.provider}` : ""}${c.issueDate ? `, ${monthYear(c.issueDate)}` : ""}${c.provider ? ")" : ""}`,
  );
  const body = [degrees.join("\n"), certs.length ? `Certifications: ${certs.join("; ")}` : ""].filter(Boolean).join("\n");
  parts.push(section("EDUCATION", body));
}

const achievements = readJson("achievements.json");
if (achievements?.items?.length) {
  const lines = achievements.items.map((a) => `- ${a.title} (${a.year}): ${a.description}`);
  parts.push(section("ACHIEVEMENTS", lines.join("\n")));
}

const services = readJson("services.json");
if (services?.items?.length) {
  const lines = services.items.map((s) => `- ${s.title}: ${s.shortDescription ?? s.description ?? ""}`);
  parts.push(section("SERVICES", lines.join("\n")));
}

const testimonials = readJson("testimonials.json");
if (testimonials?.items?.length) {
  const lines = testimonials.items.map((t) => `- ${t.author} (${t.role}): "${t.quote}"`);
  parts.push(section("TESTIMONIALS", lines.join("\n")));
}

process.stdout.write(parts.join("\n\n"));
