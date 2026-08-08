// Pure canonical→presentational mapping. No JSON imports and no Next.js
// dependencies here: plain Node must be able to import this file for tests.
// Content + images are served publicly by the portfolio-data Vercel deploy
// (admin.devmohan.in), independent of the GitHub repo's visibility. Using it
// instead of raw.githubusercontent lets portfolio-data be a private repo.
export const RAW_BASE = "https://admin.devmohan.in";
// Uploaded files (e.g. the resume PDF) are served by the admin site's Vercel
// deployment, which serves the portfolio-data repo statically with proper
// content types (GitHub raw would force a download).
export const FILES_BASE = "https://admin.devmohan.in";

// Repo-relative file paths (from the admin's file-upload widget) resolve to
// the admin file host; absolute URLs pass through.
export const resolveFileUrl = (p) =>
  p && p.startsWith("/") ? `${FILES_BASE}${p}` : p || "";

const img = (p) => (p ? `${RAW_BASE}${p}` : "");

const MONTH_NAMES = {
  "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun",
  "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec",
};

export function fmtMonth(ym) {
  if (!ym) return "";
  const [y, m] = ym.split("-");
  return `${MONTH_NAMES[m] || ""} ${y}`.trim();
}

export function fmtRange(startDate, endDate, current) {
  return `${fmtMonth(startDate)} – ${current ? "Present" : fmtMonth(endDate)}`;
}

export const slugify = (s) =>
  (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function mapSkills(skills) {
  return skills.categories.flatMap((c) =>
    c.skills.map((s) => ({ name: s.name, img: img(s.icon), perchant: `${s.proficiency}%` }))
  );
}

export function mapResume(experience, education, achievements, bundledResume) {
  const expSkeleton =
    bundledResume.find((s) => /experience/i.test(s.title)) ||
    { title: "My Experience", iconName: "flaticon-recommendation" };
  const eduSkeleton =
    bundledResume.find((s) => /education/i.test(s.title)) ||
    { title: "My Education & Certifications", iconName: "flaticon-graduation-cap" };
  const achSkeleton =
    bundledResume.find((s) => /achievement/i.test(s.title)) ||
    { title: "Key Achievements", iconName: "flaticon-trophy" };

  const expItems = experience.jobs.map((j) => ({
    date: fmtRange(j.startDate, j.endDate, j.current),
    title: j.role,
    desc: j.location ? `${j.company} (${j.location})` : j.company,
    ...(j.logo ? { logo: img(j.logo) } : {}),
  }));

  // Education vs. certifications is decided by the admin CMS at data-entry
  // time (config.yml has two separate list fields) — trust the split as
  // scraped rather than re-filtering by institution name here.
  const eduItems = education.degrees
    .map((d) => ({
      sort: d.endDate || d.startDate,
      date: fmtRange(d.startDate, d.endDate, false),
      title: [d.degree, d.field].filter(Boolean).join(", "),
      desc: d.location ? `${d.institution}, ${d.location}` : d.institution,
    }))
    .sort((a, b) => (a.sort < b.sort ? 1 : -1))
    .map(({ sort, ...item }) => item);

  // Prefer canonical achievements; fall back to the bundled section's items
  // so the section survives a failed achievements fetch.
  const achItems = achievements
    ? achievements.items.map((a) => ({
        date: a.year,
        title: a.title,
        desc: a.description,
      }))
    : achSkeleton.resumeItems || [];

  return [
    { title: expSkeleton.title, iconName: expSkeleton.iconName, resumeItems: expItems },
    { title: eduSkeleton.title, iconName: eduSkeleton.iconName, resumeItems: eduItems },
    { title: achSkeleton.title, iconName: achSkeleton.iconName, resumeItems: achItems },
  ];
}

export function mapPortfolio(projects, profile) {
  const employee = profile
    ? {
        name: `${profile.firstName} ${profile.lastName}`,
        desig: profile.headline,
        img: img(profile.avatar),
      }
    : undefined;

  return projects.items.map((p, i) => {
    const image = img(p.image);
    return {
      id: i + 1,
      slug: p.slug,
      title: p.title,
      title2: p.subtitle,
      img: image,
      img2: image,
      imgLarge: image,
      detailsImg: image,
      desc: p.description,
      shortDesc: p.shortDescription,
      desc1: p.sections[0]?.body || "",
      desc2: p.sections[1]?.body || "",
      descItems: p.sections.slice(2).map((s) => ({ title: s.title, desc: s.body })),
      category: p.category,
      dataFilter: slugify(p.category),
      tags: p.technologies,
      githubUrl: p.githubUrl,
      url: p.liveUrl,
      featured: p.featured,
      featuredDesc: p.shortDescription,
      featuredImg: image,
      ...(employee ? { employee } : {}),
      statusItem: [
        { title: "Category", desc: p.category || "—" },
        { title: "Technology", desc: (p.technologies || []).slice(0, 3).join(", ") || "—" },
        { title: "Status", desc: "Completed" },
      ],
    };
  });
}

export function mapServices(services, bundledServices) {
  return services.items.map((s, i) => {
    const skel = bundledServices[i] || bundledServices[0] || {};
    const skelProcess = skel.process || {};
    return {
      id: i + 1,
      title: s.title,
      img: img(s.image) || skel.img || "",
      imgSm: skel.imgSm || "",
      iconName: skel.iconName || "",
      desc: s.description,
      shortDesc: s.shortDescription,
      desc1: s.details[0] || "",
      desc2: s.details[1] || "",
      totalProject: s.projectCount,
      process: {
        title: s.process.title,
        img: skelProcess.img || "",
        imgSm: skelProcess.imgSm || "",
        iconName: skelProcess.iconName || "",
        desc: s.process.description,
        processItems: s.process.steps,
      },
    };
  });
}

const SOCIAL_ICONS = {
  facebook: "fa-brands fa-facebook-f",
  instagram: "fa-brands fa-instagram",
  linkedin: "fa-brands fa-linkedin-in",
  github: "fa-brands fa-github",
  medium: "fa-brands fa-medium",
};

export function mapSocials(socials) {
  return socials.links.map((l) => ({
    id: l.platform,
    iconName: SOCIAL_ICONS[l.platform] || `fa-brands fa-${l.platform}`,
    path: l.url,
  }));
}

export function mapTestimonials(testimonials) {
  return testimonials.items.map((t, i) => ({
    id: i + 1,
    authorName: t.author,
    authorDesig: t.role,
    img: img(t.avatar),
    desc: t.quote,
  }));
}
