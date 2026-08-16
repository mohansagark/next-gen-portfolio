import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const WORK_COVERS = [
  "ivygpt-cover.png",
  "servicenow-agentic-cover.png",
  "jio-platforms-cover.png",
  "daily-dev-digest-cover.png",
  "claude-graph-cover.png",
  "ai-voice-bot-cover.png",
];

const EXPERIENCE_LOGOS = [
  "accenture.png",
  "servicenow.png",
  "invesco.png",
  "reliance.png",
  "zentreelabs.png",
  "shell.png",
];

test("light theme body text is dark enough to read", () => {
  const css = readFileSync(join(root, "src/app/globals.css"), "utf8");
  const rootMatch = css.match(/:root\s*{([\s\S]*?)}\s*\.dark/);
  assert.ok(rootMatch, "expected :root block before .dark");
  assert.match(rootMatch[1], /--body-color:\s*#374151/i);
  assert.match(rootMatch[1], /--gray-color2:\s*#374151/i);
  assert.match(css, /\.dark\s*{[\s\S]*--body-color:\s*#c6ccd6/i);
});

test("tailwind exposes gray-color2 alias for secondary text", () => {
  const cfg = readFileSync(join(root, "tailwind.config.cjs"), "utf8");
  assert.match(cfg, /const grayColor2 = "#374151"/);
  assert.match(cfg, /"gray-color2":\s*grayColor2/);
});

test("hero Resume uses button styling, not a faint text link", () => {
  const hero = readFileSync(
    join(root, "src/components/sections/home/HomeHero.js"),
    "utf8"
  );
  assert.match(hero, /Resume/);
  assert.match(hero, /rounded-full border/);
  assert.doesNotMatch(
    hero,
    /Resume[\s\S]{0,120}underline-offset-4/
  );
});

test("contact copy is open to startups worldwide", () => {
  const contact = readFileSync(
    join(root, "src/components/sections/home/HomeContact.js"),
    "utf8"
  );
  assert.match(contact, /Open to startups worldwide/);
  assert.doesNotMatch(contact, /Open to US & UK startup conversations/);
});

test("experience logos resolve to local responsive assets", () => {
  const exp = readFileSync(
    join(root, "src/components/sections/home/HomeExperience.js"),
    "utf8"
  );
  // Full-bleed cover (not padded contain on a white chip) so colored logo BGs fill corners.
  assert.match(exp, /object-cover/);
  assert.doesNotMatch(exp, /object-contain p-/);
  assert.match(exp, /grid-cols-2/);
  assert.match(exp, /splitLocationMode/);
  for (const file of EXPERIENCE_LOGOS) {
    assert.ok(
      existsSync(join(root, "public/images/experience", file)),
      `missing ${file}`
    );
  }
});

test("selected work uses realistic cover images instead of chart SVGs", () => {
  const visual = readFileSync(
    join(root, "src/components/sections/home/CaseStudyVisual.js"),
    "utf8"
  );
  assert.doesNotMatch(visual, /<svg/);
  assert.match(visual, /COVER_BY_SLUG/);
  for (const file of WORK_COVERS) {
    assert.ok(
      existsSync(join(root, "public/images/work", file)),
      `missing work cover ${file}`
    );
  }
});
