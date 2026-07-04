import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const bundledResume = JSON.parse(readFileSync('public/fakedata/resume.json', 'utf8'));

const canon = {
  profile: { firstName: 'M', lastName: 'K', headline: 'H', bio: '', avatar: '', email: 'a@b.c', phone: '', location: '', resumeUrl: '' },
  experience: { jobs: [] },
  education: { degrees: [], certifications: [] },
  skills: { categories: [] },
  projects: { items: [] },
  services: { items: [] },
  testimonials: { items: [] },
  socials: { links: [] },
};

globalThis.fetch = async (url) => {
  const name = String(url).match(/data\/(\w+)\.json/)[1];
  if (name === 'skills') return { ok: false, status: 500 }; // simulate one failure
  return { ok: true, json: async () => canon[name] };
};

const { fetchAllContent } = await import('../src/libs/portfolioData.js');
const bundle = await fetchAllContent();

assert.equal(bundle.skills, undefined, 'failed fetch leaves key absent');
assert.ok(Array.isArray(bundle.portfolio), 'portfolio mapped');
assert.ok(Array.isArray(bundle.resume) && bundle.resume.length === 2, 'resume mapped from 2 files');
assert.equal(bundle.resume[0].title, bundledResume[0].title);
assert.ok(Array.isArray(bundle.services));
assert.ok(Array.isArray(bundle.socials));
assert.ok(Array.isArray(bundle.testimonials));
assert.equal(bundle.profile.firstName, 'M');
console.log('fetchAllContent OK');
