// Server-side content fetching from the portfolio-data repo (single source of
// truth), with ISR revalidation. Only ever runs on the server: the root
// layout and the dynamic-route pages call it.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  RAW_BASE,
  resolveFileUrl,
  mapSkills,
  mapResume,
  mapPortfolio,
  mapServices,
  mapSocials,
  mapTestimonials,
  mapCapabilities,
} from "./contentMapping.js";

const FILES = [
  "profile",
  "experience",
  "education",
  "achievements",
  "skills",
  "projects",
  "services",
  "testimonials",
  "socials",
  "capabilities",
  "writing",
];

function bundled(name) {
  const p = join(process.cwd(), "public", "fakedata", `${name}.json`);
  if (!existsSync(p)) return null;
  return JSON.parse(readFileSync(p, "utf8"));
}

function localDataDir() {
  return process.env.PORTFOLIO_DATA_DIR || "";
}

function readLocal(name) {
  const dir = localDataDir();
  if (!dir) return null;
  const p = join(dir, "data", `${name}.json`);
  if (!existsSync(p)) return null;
  return JSON.parse(readFileSync(p, "utf8"));
}

async function fetchJson(name) {
  const local = readLocal(name);
  if (local) return local;

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
    else {
      const fallback = bundled(name);
      if (fallback) {
        console.warn(`[content] using bundled fallback for ${name}`);
        canon[name] = fallback;
      } else {
        console.error(
          `[content] fetch failed for ${name}:`,
          results[i].reason?.message
        );
      }
    }
  });

  const bundle = {};
  if (canon.skills) bundle.skills = mapSkills(canon.skills);
  if (canon.skills) bundle.skillGroups = canon.skills.categories || [];
  if (canon.experience && canon.education) {
    const resumeBundle = bundled("resume") || [];
    bundle.resume = mapResume(
      canon.experience,
      canon.education,
      canon.achievements,
      resumeBundle
    );
    bundle.experience = (canon.experience.jobs || []).filter(
      (j) => j.showOnHomepage !== false
    );
    bundle.education = {
      degrees: canon.education.degrees || [],
      certifications: canon.education.certifications || [],
    };
    if (canon.achievements) {
      bundle.achievements = canon.achievements.items || [];
    }
  }
  if (canon.projects) {
    bundle.portfolio = mapPortfolio(canon.projects, canon.profile);
    bundle.caseStudies = (canon.projects.items || [])
      .filter((p) => p.featured)
      .sort((a, b) => (a.priority || 99) - (b.priority || 99));
    bundle.homeCaseStudies = bundle.caseStudies.filter(
      (p) => p.showOnHomepage !== false
    );
  }
  if (canon.services) {
    const servicesBundle = bundled("services") || [];
    bundle.services = mapServices(canon.services, servicesBundle);
  }
  if (canon.socials) bundle.socials = mapSocials(canon.socials);
  if (canon.testimonials) {
    bundle.testimonials = mapTestimonials(canon.testimonials);
    bundle.featuredTestimonials = mapTestimonials({
      items: (canon.testimonials.items || []).filter((t) => t.featured),
    });
  }
  if (canon.capabilities) {
    bundle.capabilities = mapCapabilities(canon.capabilities);
  }
  if (canon.writing) {
    bundle.writing = {
      sectionTitle: canon.writing.sectionTitle || "Writing",
      sectionSubcopy: canon.writing.sectionSubcopy || "",
      homepageLimit: Number(canon.writing.homepageLimit) || 3,
      preferredSlugs: Array.isArray(canon.writing.preferredSlugs)
        ? canon.writing.preferredSlugs.filter(Boolean)
        : [],
    };
  }
  if (canon.profile) {
    bundle.profile = {
      ...canon.profile,
      resumeUrl: resolveFileUrl(canon.profile.resumeUrl),
    };
  }
  return bundle;
}
