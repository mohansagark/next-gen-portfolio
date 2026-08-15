import test from "node:test";
import assert from "node:assert/strict";
import {
  RAW_BASE,
  mapSkills,
  mapResume,
  mapPortfolio,
  mapServices,
  mapSocials,
  mapTestimonials,
  mapCapabilities,
  resolveFileUrl,
  fmtMonth,
  fmtRange,
  slugify,
} from "../contentMapping.js";

// Inline skeletons (public/fakedata no longer ships resume/services JSON).
const bundledResume = [
  { title: "My Experience", iconName: "flaticon-recommendation" },
  {
    title: "My Education & Certifications",
    iconName: "flaticon-graduation-cap",
  },
  {
    title: "Key Achievements",
    iconName: "flaticon-trophy",
    resumeItems: [
      { date: "2024", title: "A1", desc: "d1" },
      { date: "2023", title: "A2", desc: "d2" },
      { date: "2022", title: "A3", desc: "d3" },
      { date: "2021", title: "A4", desc: "d4" },
      { date: "2020", title: "A5", desc: "d5" },
    ],
  },
];

const bundledServices = [
  {
    iconName: "flaticon-web",
    imgSm: "/images/services/sm.png",
    process: { img: "/images/services/process.png", imgSm: "", iconName: "" },
  },
];

const REMOTE_ICON = "https://cdn.simpleicons.org/vuedotjs/4FC08D.png";

const skillsWith = (icon) => ({
  categories: [{ skills: [{ name: "Vue", icon, proficiency: 70 }] }],
});

test("repo-relative skill icons resolve against the admin host", () => {
  const [skill] = mapSkills(skillsWith("/images/skills/react.png"));
  assert.equal(skill.img, `${RAW_BASE}/images/skills/react.png`);
});

test("absolute skill icon URLs are left untouched", () => {
  const [skill] = mapSkills(skillsWith(REMOTE_ICON));
  assert.equal(skill.img, REMOTE_ICON);
});

test("protocol-relative skill icon URLs are left untouched", () => {
  const [skill] = mapSkills(skillsWith("//cdn.simpleicons.org/react.png"));
  assert.equal(skill.img, "//cdn.simpleicons.org/react.png");
});

test("a missing skill icon stays empty rather than becoming the bare host", () => {
  const [skill] = mapSkills(skillsWith(""));
  assert.equal(skill.img, "");
});

test("mapSkills keeps the first occurrence when a name appears in multiple categories", () => {
  const mapped = mapSkills({
    categories: [
      {
        name: "Frontend",
        skills: [{ name: "TypeScript", icon: "/images/skills/typescript.svg" }],
      },
      {
        name: "Languages",
        skills: [
          { name: "JavaScript", icon: "/images/skills/js.png" },
          { name: "TypeScript", icon: "/images/skills/typescript.svg" },
        ],
      },
    ],
  });
  assert.deepEqual(
    mapped.map((s) => s.name),
    ["TypeScript", "JavaScript"]
  );
  assert.equal(mapped[0].group, "Frontend");
});

test("mapSkills includes proficiency and omits fake percent when missing", () => {
  const mapped = mapSkills({
    categories: [
      {
        name: "Frontend",
        skills: [
          { name: "Next.js", proficiency: 91, icon: "/images/skills/nextjs.webp" },
          { name: "CSS", icon: "/images/skills/css.png" },
        ],
      },
    ],
  });
  assert.deepEqual(mapped[0], {
    name: "Next.js",
    img: `${RAW_BASE}/images/skills/nextjs.webp`,
    perchant: "91%",
    group: "Frontend",
  });
  assert.equal(mapped[1].perchant, "");
});

test("absolute project cover URLs are left untouched", () => {
  const projects = mapPortfolio(
    {
      items: [
        {
          slug: "demo",
          title: "Demo",
          category: "Web",
          image: REMOTE_ICON,
          technologies: [],
          sections: [],
        },
      ],
    },
    { firstName: "Mohan", lastName: "Sagar", headline: "Engineer", avatar: REMOTE_ICON }
  );
  assert.equal(projects[0].img, REMOTE_ICON);
  assert.equal(projects[0].employee.img, REMOTE_ICON);
});

test("mapPortfolio maps sections, slugify filter, and profile employee", () => {
  const portfolio = mapPortfolio(
    {
      items: [
        {
          slug: "stock-bot",
          title: "AI Stock Analysis Bot",
          subtitle: "Sub",
          shortDescription: "short",
          description: "long",
          sections: [
            { title: "Overview", body: "o" },
            { title: "Details", body: "d" },
            { title: "X", body: "x" },
          ],
          category: "AI/Automation",
          technologies: ["Python", "OpenAI"],
          githubUrl: "https://g",
          liveUrl: "",
          featured: true,
          image: "/images/projects/stock-bot.png",
        },
      ],
    },
    {
      firstName: "Mohan Sagar",
      lastName: "Killamsetty",
      headline: "Senior Software Engineer",
      avatar: "",
    }
  );
  const p = portfolio[0];
  assert.equal(p.id, 1);
  assert.equal(p.title2, "Sub");
  assert.equal(p.desc1, "o");
  assert.equal(p.desc2, "d");
  assert.deepEqual(p.descItems, [{ title: "X", desc: "x" }]);
  assert.equal(p.dataFilter, "ai-automation");
  assert.deepEqual(p.tags, ["Python", "OpenAI"]);
  assert.equal(p.img, `${RAW_BASE}/images/projects/stock-bot.png`);
  assert.equal(p.employee.name, "Mohan Sagar Killamsetty");
  assert.equal(p.statusItem[0].desc, "AI/Automation");
});

test("mapResume builds experience education achievements with logos", () => {
  const resume = mapResume(
    {
      jobs: [
        {
          company: "ServiceNow",
          role: "Senior Software Engineer",
          location: "",
          startDate: "2025-08",
          endDate: "",
          current: true,
          description: "",
          highlights: [],
          technologies: [],
          logo: "/images/experience/servicenow.jpeg",
          companyUrl: "",
        },
      ],
    },
    {
      degrees: [
        {
          institution: "Vellore Institute of Technology",
          degree: "B.Tech",
          field: "Mechanical Engineering",
          startDate: "2012-08",
          endDate: "2016-05",
          grade: "86.2%",
          location: "Tamil Nadu",
          logo: "",
        },
      ],
      certifications: [
        {
          title: "React Native",
          provider: "LinkedIn",
          issueDate: "2024-03",
          expiryDate: "2030-03",
          credentialUrl: "",
          badge: "",
        },
      ],
    },
    { items: [{ title: "Engineering Excellence Award", description: "Awarded at Invesco", year: "2024" }] },
    bundledResume
  );
  assert.equal(resume.length, 3);
  assert.equal(resume[0].resumeItems[0].date, "Aug 2025 – Present");
  assert.equal(resume[0].resumeItems[0].logo, `${RAW_BASE}/images/experience/servicenow.jpeg`);
  assert.equal(resume[1].resumeItems.length, 1);
  assert.equal(resume[1].resumeItems[0].title, "B.Tech, Mechanical Engineering");
  assert.deepEqual(resume[2].resumeItems[0], {
    date: "2024",
    title: "Engineering Excellence Award",
    desc: "Awarded at Invesco",
  });
});

test("mapResume falls back to bundled achievements when fetch is missing", () => {
  const resumeFallback = mapResume(
    { jobs: [] },
    { degrees: [], certifications: [] },
    undefined,
    bundledResume
  );
  assert.equal(resumeFallback[2].resumeItems.length, 5);
});

test("mapServices pulls presentational skeleton from bundled services", () => {
  const services = mapServices(
    {
      items: [
        {
          title: "Web Development",
          shortDescription: "s",
          description: "d",
          details: ["a", "b"],
          projectCount: "20+ Projects",
          image: "/images/services/1.png",
          process: { title: "P", description: "pd", steps: ["s1"] },
        },
      ],
    },
    bundledServices
  );
  assert.equal(services[0].iconName, bundledServices[0].iconName);
  assert.equal(services[0].desc1, "a");
  assert.deepEqual(services[0].process.processItems, ["s1"]);
});

test("mapSocials filters hidden links and maps known icon classes", () => {
  const socials = mapSocials({
    links: [
      { platform: "linkedin", url: "https://l", primary: true },
      { platform: "youtube", url: "https://y" },
      { platform: "x", url: "https://x", hiddenOnSite: true },
    ],
  });
  assert.equal(socials.length, 2);
  assert.deepEqual(socials[0], {
    id: "linkedin",
    iconName: "fa-brands fa-linkedin-in",
    path: "https://l",
    primary: true,
  });
  assert.equal(socials[1].iconName, "fa-brands fa-youtube");
});

test("mapTestimonials maps avatar URLs and featured flag", () => {
  const t = mapTestimonials({
    items: [
      {
        author: "A",
        role: "R",
        quote: "Q",
        avatar: "/images/testimonials/a.jpg",
        featured: true,
      },
    ],
  })[0];
  assert.deepEqual(t, {
    id: 1,
    authorName: "A",
    authorDesig: "R",
    img: `${RAW_BASE}/images/testimonials/a.jpg`,
    desc: "Q",
    featured: true,
  });
});

test("mapCapabilities preserves slugs and page payloads", () => {
  const caps = mapCapabilities({
    sectionTitle: "What I build",
    items: [
      {
        id: "ai-surfaces",
        slug: "ai-product-experiences",
        title: "AI product experiences",
        body: "body",
        page: { headline: "h" },
      },
    ],
  });
  assert.equal(caps.items[0].slug, "ai-product-experiences");
  assert.equal(caps.items[0].page.headline, "h");
});

test("resolveFileUrl already passes absolute URLs through", () => {
  assert.equal(resolveFileUrl("https://example.com/cv.pdf"), "https://example.com/cv.pdf");
  assert.equal(resolveFileUrl("/files/cv.pdf"), `${RAW_BASE}/files/cv.pdf`);
  assert.equal(resolveFileUrl(""), "");
});

test("fmtMonth fmtRange and slugify helpers", () => {
  assert.equal(fmtMonth("2025-08"), "Aug 2025");
  assert.equal(fmtRange("2025-08", "", true), "Aug 2025 – Present");
  assert.equal(slugify("AI / Employer"), "ai-employer");
});
