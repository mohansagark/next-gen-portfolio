import assert from "node:assert/strict";
import { period, mapJobs, mapProjects, mapProfile, mapSocials, mapEducation, loadContent, RAW_BASE } from "../src/data/loadContent";
import { getContent } from "../src/data/content";

// period derivation
assert.equal(period("2025-08", "", true), "NOW");
assert.equal(period("2022-09", "2024-07", false), "2022–24");
assert.equal(period("2024-01", "2024-06", false), "2024");
assert.equal(period("2019-03", "2020-12", false), "2019–20");

// jobs
const jobs = mapJobs({
  jobs: [{ company: "ServiceNow", role: "Senior Software Engineer", location: "Hyderabad", startDate: "2025-08", endDate: "", current: true, description: "desc", highlights: [], technologies: [], logo: "", companyUrl: "" }],
});
assert.deepEqual(jobs[0], { role: "Senior Software Engineer", company: "ServiceNow", place: "Hyderabad", period: "NOW", description: "desc" });

// projects: canonical image wins; empty image falls back to default by title
const projects = mapProjects({
  items: [
    { slug: "s", title: "AI Stock Analysis Bot", subtitle: "Sub", shortDescription: "", description: "", sections: [], category: "", technologies: ["Python", "OpenAI"], githubUrl: "https://g", liveUrl: "", featured: false, image: "/images/projects/stock-bot.png" },
    { slug: "d", title: "Daily Dev Digest", subtitle: "S2", shortDescription: "", description: "", sections: [], category: "", technologies: [], githubUrl: "", liveUrl: "https://live", featured: false, image: "" },
  ],
});
assert.equal(projects[0].image, `${RAW_BASE}/images/projects/stock-bot.png`);
assert.equal(projects[0].tools, "Python, OpenAI");
assert.equal(projects[0].category, "Sub");
assert.equal(projects[0].link, "https://g");
assert.equal(projects[1].image, "/images/dev-digest.png", "empty canonical image falls back to bundled default by title");
assert.equal(projects[1].link, "https://live", "liveUrl used when githubUrl empty");

// profile + socials
assert.deepEqual(
  mapProfile({ firstName: "M", lastName: "K", headline: "", bio: "B", avatar: "", email: "e@x.y", phone: "", location: "", resumeUrl: "https://r" }),
  { bio: "B", email: "e@x.y", resumeUrl: "https://r" }
);
assert.equal(
  mapProfile({ firstName: "", lastName: "", headline: "", bio: "", avatar: "", email: "", phone: "", location: "", resumeUrl: "" }).resumeUrl,
  "/Mohan_Sagar_Resume.pdf",
  "empty canonical resumeUrl falls back to bundled default"
);
assert.deepEqual(mapSocials({ links: [{ platform: "github", url: "https://g" }] }), [{ platform: "github", url: "https://g" }]);

// education
const edu = mapEducation({
  degrees: [{ institution: "VIT University", degree: "B.Tech", field: "Mechanical Engineering", startDate: "2012-08", endDate: "2016-05", grade: "", location: "", logo: "" }],
  certifications: [{ title: "AMD: AI Developer", provider: "AMD", issueDate: "2025-06", expiryDate: "", credentialUrl: "", badge: "" }, { title: "React: Software Architecture", provider: "LinkedIn Learning", issueDate: "2025-01", expiryDate: "", credentialUrl: "", badge: "" }],
});
assert.deepEqual(edu.degrees, ["B.Tech, Mechanical Engineering — VIT University, 2012–2016"]);
assert.deepEqual(edu.certifications, ["AMD: AI Developer", "React: Software Architecture"]);

// loadContent with one failure: seeded keys update, failed key keeps default
(globalThis as { fetch: unknown }).fetch = async (url: unknown) => {
  const name = String(url).match(/data\/(\w+)\.json/)![1];
  if (name === "projects") return { ok: false, status: 500 };
  const canned: Record<string, unknown> = {
    experience: { jobs: [{ company: "C", role: "R", location: "L", startDate: "2020-01", endDate: "2021-01", current: false, description: "D", highlights: [], technologies: [], logo: "", companyUrl: "" }] },
    profile: { firstName: "", lastName: "", headline: "", bio: "fetched bio", avatar: "", email: "f@e.tch", phone: "", location: "", resumeUrl: "" },
    socials: { links: [{ platform: "github", url: "https://gh" }] },
  };
  return { ok: true, json: async () => canned[name] };
};
await loadContent();
assert.equal(getContent().bio, "fetched bio");
assert.equal(getContent().jobs[0].company, "C");
assert.equal(getContent().projects.length, 6, "failed projects fetch keeps 6 defaults");
// education stub returned undefined payload -> mapping throws -> key keeps default
assert.deepEqual(getContent().education.certifications, ["React: Software Architecture", "AMD: AI Developer"], "malformed education payload keeps default");
console.log("loadContent OK");
