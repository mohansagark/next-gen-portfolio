// Fetches canonical content from the portfolio-data repo before the app
// mounts, maps it to view-models, and seeds the content store. Any file
// that fails or exceeds the overall timeout keeps its bundled default.
import { defaultContent, setContent, type Job, type Project, type Social, type SiteContent } from "./content";

export const RAW_BASE = "https://raw.githubusercontent.com/mohansagark/portfolio-data/main";
const TIMEOUT_MS = 3000;

interface CanonJob {
  company: string; role: string; location: string;
  startDate: string; endDate: string; current: boolean;
  description: string; highlights: string[]; technologies: string[];
  logo: string; companyUrl: string;
}
interface CanonProject {
  slug: string; title: string; subtitle: string; shortDescription: string;
  description: string; sections: { title: string; body: string }[];
  category: string; technologies: string[]; githubUrl: string; liveUrl: string;
  featured: boolean; image: string;
}
interface CanonProfile {
  firstName: string; lastName: string; headline: string; bio: string;
  avatar: string; email: string; phone: string; location: string; resumeUrl: string;
}
interface CanonSocials {
  links: { platform: string; url: string }[];
}

export function period(startDate: string, endDate: string, current: boolean): string {
  if (current) return "NOW";
  const sy = startDate.slice(0, 4);
  const ey = endDate.slice(0, 4);
  if (!ey) return sy;
  if (sy === ey) return ey;
  return `${sy}–${ey.slice(2)}`;
}

export function mapJobs(exp: { jobs: CanonJob[] }): Job[] {
  return exp.jobs.map((j) => ({
    role: j.role,
    company: j.company,
    place: j.location,
    period: period(j.startDate, j.endDate, j.current),
    description: j.description,
  }));
}

export function mapProjects(proj: { items: CanonProject[] }): Project[] {
  return proj.items.map((p) => ({
    title: p.title,
    category: p.subtitle,
    tools: p.technologies.join(", "),
    image: p.image
      ? `${RAW_BASE}${p.image}`
      : defaultContent.projects.find((d) => d.title === p.title)?.image ?? "",
    link: p.githubUrl || p.liveUrl,
  }));
}

export function mapProfile(prof: CanonProfile): { bio: string; email: string } {
  return { bio: prof.bio, email: prof.email };
}

export function mapSocials(soc: CanonSocials): Social[] {
  return soc.links.map((l) => ({ platform: l.platform, url: l.url }));
}

export async function loadContent(): Promise<void> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  const get = async (name: string): Promise<unknown> => {
    const res = await fetch(`${RAW_BASE}/data/${name}.json`, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
    return res.json();
  };
  try {
    const [exp, proj, prof, soc] = await Promise.allSettled([
      get("experience"),
      get("projects"),
      get("profile"),
      get("socials"),
    ]);
    const partial: Partial<SiteContent> = {};
    if (exp.status === "fulfilled") partial.jobs = mapJobs(exp.value as { jobs: CanonJob[] });
    if (proj.status === "fulfilled") partial.projects = mapProjects(proj.value as { items: CanonProject[] });
    if (prof.status === "fulfilled") {
      const p = mapProfile(prof.value as CanonProfile);
      partial.bio = p.bio;
      partial.email = p.email;
    }
    if (soc.status === "fulfilled") partial.socials = mapSocials(soc.value as CanonSocials);
    setContent(partial);
  } catch {
    // allSettled never rejects; this guards fetch-setup errors. Defaults stand.
  } finally {
    clearTimeout(timer);
  }
}
