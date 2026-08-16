import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  localDataDir,
  readLocal,
  remoteContentUrl,
  fetchAllContent,
} from "../portfolioData.js";
import { RAW_BASE } from "../contentMapping.js";
import { seedContent, getContent } from "../contentStore.js";

test("remoteContentUrl points at the admin CDN data path", () => {
  assert.equal(
    remoteContentUrl("skills"),
    `${RAW_BASE}/data/skills.json`
  );
});

test("PORTFOLIO_DATA_DIR local read wins without network", () => {
  const dir = mkdtempSync(join(tmpdir(), "portfolio-data-"));
  const dataDir = join(dir, "data");
  mkdirSync(dataDir);
  writeFileSync(
    join(dataDir, "skills.json"),
    JSON.stringify({
      categories: [
        {
          name: "Local",
          skills: [{ name: "LocalSkill", icon: "/images/skills/x.png" }],
        },
      ],
    })
  );

  const prev = process.env.PORTFOLIO_DATA_DIR;
  process.env.PORTFOLIO_DATA_DIR = dir;
  try {
    assert.equal(localDataDir(), dir);
    const local = readLocal("skills");
    assert.equal(local.categories[0].skills[0].name, "LocalSkill");
    assert.equal(readLocal("missing-file"), null);
  } finally {
    if (prev === undefined) delete process.env.PORTFOLIO_DATA_DIR;
    else process.env.PORTFOLIO_DATA_DIR = prev;
    rmSync(dir, { recursive: true, force: true });
  }
});

test("readLocal returns null when PORTFOLIO_DATA_DIR is unset", () => {
  const prev = process.env.PORTFOLIO_DATA_DIR;
  delete process.env.PORTFOLIO_DATA_DIR;
  try {
    assert.equal(localDataDir(), "");
    assert.equal(readLocal("skills"), null);
  } finally {
    if (prev !== undefined) process.env.PORTFOLIO_DATA_DIR = prev;
  }
});

test("fetchAllContent maps canon and falls back when a remote fetch fails", async () => {
  const prevDir = process.env.PORTFOLIO_DATA_DIR;
  delete process.env.PORTFOLIO_DATA_DIR;

  const canon = {
    profile: {
      firstName: "M",
      lastName: "K",
      headline: "H",
      bio: "",
      avatar: "",
      email: "a@b.c",
      phone: "",
      location: "",
      resumeUrl: "/files/resume.pdf",
    },
    experience: { jobs: [] },
    education: { degrees: [], certifications: [] },
    achievements: { items: [{ title: "A", description: "D", year: "2024" }] },
    skills: { categories: [] },
    projects: { items: [] },
    services: { items: [] },
    testimonials: { items: [] },
    socials: { links: [] },
    capabilities: { items: [] },
    writing: { sectionTitle: "Writing", homepageLimit: 3 },
  };

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const name = String(url).match(/data\/(\w+)\.json/)[1];
    if (name === "skills") return { ok: false, status: 500 };
    return { ok: true, json: async () => canon[name] };
  };

  try {
    const bundle = await fetchAllContent();
    // skills failed remotely; bundled public/fakedata/skills.json must apply
    assert.ok(Array.isArray(bundle.skills) && bundle.skills.length > 0, "skills bundled fallback");
    assert.ok(Array.isArray(bundle.portfolio), "portfolio mapped");
    assert.ok(Array.isArray(bundle.resume) && bundle.resume.length === 3);
    assert.deepEqual(bundle.resume[2].resumeItems, [
      { date: "2024", title: "A", desc: "D" },
    ]);
    assert.ok(Array.isArray(bundle.services));
    assert.ok(Array.isArray(bundle.socials));
    assert.ok(Array.isArray(bundle.testimonials));
    assert.equal(bundle.profile.firstName, "M");
    assert.equal(
      bundle.profile.resumeUrl,
      `${RAW_BASE}/files/resume.pdf`
    );
  } finally {
    globalThis.fetch = originalFetch;
    if (prevDir !== undefined) process.env.PORTFOLIO_DATA_DIR = prevDir;
  }
});

test("contentStore seed merges and ignores nullish", () => {
  seedContent({ skills: [1, 2] });
  assert.deepEqual(getContent("skills"), [1, 2]);
  seedContent({ portfolio: ["p"] });
  assert.deepEqual(getContent("skills"), [1, 2]);
  seedContent(null);
  seedContent(undefined);
  assert.deepEqual(getContent("portfolio"), ["p"]);
});
