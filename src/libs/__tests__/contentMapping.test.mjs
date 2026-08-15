import test from "node:test";
import assert from "node:assert/strict";

import {
  RAW_BASE,
  mapSkills,
  mapPortfolio,
  resolveFileUrl,
} from "../contentMapping.js";

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
    { name: "Mohan", headline: "Engineer", avatar: REMOTE_ICON }
  );
  assert.equal(projects[0].img, REMOTE_ICON);
});

test("resolveFileUrl already passes absolute URLs through", () => {
  assert.equal(resolveFileUrl("https://example.com/cv.pdf"), "https://example.com/cv.pdf");
  assert.equal(resolveFileUrl("/files/cv.pdf"), `${RAW_BASE}/files/cv.pdf`);
});
