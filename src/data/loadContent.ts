// Fetches canonical content from the portfolio-data repo before the app
// mounts, maps it to view-models, and seeds the content store. Any file
// that fails or exceeds the overall timeout keeps its bundled default.
import { defaultContent, setContent, type Job, type Project, type Social, type SiteContent } from "./content";

export const RAW_BASE = "https://raw.githubusercontent.com/mohansagark/portfolio-data/main";
// Uploaded files (e.g. the resume PDF) are served by the admin site's Vercel
// deployment, which serves the portfolio-data repo statically with proper
// content types (GitHub raw would force a download).
export const FILES_BASE = "https://admin.devmohan.in";
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
interface CanonEducation {
  degrees: {
    institution: string; degree: string; field: string;
    startDate: string; endDate: string; grade: string; location: string; logo: string;
  }[];
  certifications: {
    title: string; provider: string; issueDate: string; expiryDate: string;
    credentialUrl: string; badge: string;
  }[];
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

export function mapProfile(prof: CanonProfile): { bio: string; email: string; resumeUrl: string } {
  const resumeUrl = prof.resumeUrl
    ? prof.resumeUrl.startsWith("/")
      ? `${FILES_BASE}${prof.resumeUrl}`
      : prof.resumeUrl
    : defaultContent.resumeUrl;
  return {
    bio: prof.bio,
    email: prof.email || defaultContent.email,
    resumeUrl,
  };
}

export function mapEducation(edu: CanonEducation): { degrees: string[]; certifications: string[] } {
  return {
    degrees: edu.degrees.map((d) => {
      const title = [d.degree, d.field].filter(Boolean).join(", ");
      const years = `${d.startDate.slice(0, 4)}–${d.endDate.slice(0, 4)}`;
      return `${title} — ${d.institution}, ${years}`;
    }),
    certifications: edu.certifications.map((c) => c.title),
  };
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
    const [exp, proj, prof, soc, edu] = await Promise.allSettled([
      get("experience"),
      get("projects"),
      get("profile"),
      get("socials"),
      get("education"),
    ]);
    const partial: Partial<SiteContent> = {};
    // Each mapping is guarded so one malformed payload can't discard the
    // other files' updates — that key simply keeps its bundled default.
    const attempt = (fn: () => void) => {
      try {
        fn();
      } catch {
        /* keep default for this key */
      }
    };
    if (exp.status === "fulfilled")
      attempt(() => (partial.jobs = mapJobs(exp.value as { jobs: CanonJob[] })));
    if (proj.status === "fulfilled")
      attempt(() => (partial.projects = mapProjects(proj.value as { items: CanonProject[] })));
    if (prof.status === "fulfilled")
      attempt(() => {
        const p = mapProfile(prof.value as CanonProfile);
        partial.bio = p.bio;
        partial.email = p.email;
        partial.resumeUrl = p.resumeUrl;
      });
    if (soc.status === "fulfilled")
      attempt(() => (partial.socials = mapSocials(soc.value as CanonSocials)));
    if (edu.status === "fulfilled")
      attempt(() => (partial.education = mapEducation(edu.value as CanonEducation)));
    setContent(partial);
  } catch {
    // allSettled never rejects; this guards fetch-setup errors. Defaults stand.
  } finally {
    clearTimeout(timer);
  }
}
