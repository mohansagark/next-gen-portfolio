// Server-side content fetching from the portfolio-data repo (single source of
// truth), with ISR revalidation. Only ever runs on the server: the root
// layout and the dynamic-route pages call it.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  RAW_BASE,
  mapSkills,
  mapResume,
  mapPortfolio,
  mapServices,
  mapSocials,
  mapTestimonials,
} from "./contentMapping.js";

const FILES = [
  "profile", "experience", "education", "achievements", "skills",
  "projects", "services", "testimonials", "socials",
];

function bundled(name) {
  return JSON.parse(
    readFileSync(join(process.cwd(), "public", "fakedata", `${name}.json`), "utf8")
  );
}

async function fetchJson(name) {
  const res = await fetch(`${RAW_BASE}/data/${name}.json`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  return res.json();
}

export async function fetchAllContent() {
  const results = await Promise.allSettled(FILES.map(fetchJson));
  const canon = {};
  FILES.forEach((name, i) => {
    if (results[i].status === "fulfilled") canon[name] = results[i].value;
    else console.error(`[content] fetch failed for ${name}:`, results[i].reason?.message);
  });

  const bundle = {};
  if (canon.skills) bundle.skills = mapSkills(canon.skills);
  if (canon.experience && canon.education) {
    bundle.resume = mapResume(
      canon.experience,
      canon.education,
      canon.achievements,
      bundled("resume")
    );
  }
  if (canon.projects) bundle.portfolio = mapPortfolio(canon.projects, canon.profile);
  if (canon.services) bundle.services = mapServices(canon.services, bundled("services"));
  if (canon.socials) bundle.socials = mapSocials(canon.socials);
  if (canon.testimonials) bundle.testimonials = mapTestimonials(canon.testimonials);
  if (canon.profile) bundle.profile = canon.profile;
  return bundle;
}
