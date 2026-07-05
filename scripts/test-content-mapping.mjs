import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  mapSkills, mapResume, mapPortfolio, mapServices, mapSocials, mapTestimonials, RAW_BASE, resolveFileUrl,
} from '../src/libs/contentMapping.js';

const bundledResume = JSON.parse(readFileSync('public/fakedata/resume.json', 'utf8'));
const bundledServices = JSON.parse(readFileSync('public/fakedata/services.json', 'utf8'));

// skills
const skills = mapSkills({ categories: [{ name: 'Frontend', skills: [{ name: 'Next.js', proficiency: 91, icon: '/images/skills/nextjs.webp' }] }] });
assert.deepEqual(skills, [{ name: 'Next.js', img: `${RAW_BASE}/images/skills/nextjs.webp`, perchant: '91%' }]);

// resume
const resume = mapResume(
  { jobs: [{ company: 'ServiceNow', role: 'Senior Software Engineer', location: '', startDate: '2025-08', endDate: '', current: true, description: '', highlights: [], technologies: [], logo: '/images/experience/servicenow.jpeg', companyUrl: '' }] },
  { degrees: [{ institution: 'VIT University', degree: 'B.Tech', field: 'Mechanical Engineering', startDate: '2012-08', endDate: '2016-05', grade: '86.2%', location: 'Tamil Nadu', logo: '' }],
    certifications: [{ title: 'React Native', provider: 'LinkedIn', issueDate: '2024-03', expiryDate: '2030-03', credentialUrl: '', badge: '' }] },
  { items: [{ title: 'Engineering Excellence Award', description: 'Awarded at Invesco', year: '2024' }] },
  bundledResume
);
assert.equal(resume.length, 3);
assert.equal(resume[2].title, 'Key Achievements');
assert.equal(resume[2].iconName, 'flaticon-trophy');
assert.deepEqual(resume[2].resumeItems[0], { date: '2024', title: 'Engineering Excellence Award', desc: 'Awarded at Invesco' });
// achievements fetch failure -> bundled items survive
const resumeFallback = mapResume({ jobs: [] }, { degrees: [], certifications: [] }, undefined, bundledResume);
assert.equal(resumeFallback[2].resumeItems.length, 5);
assert.equal(resume[0].title, bundledResume[0].title);
assert.equal(resume[0].iconName, bundledResume[0].iconName);
assert.equal(resume[0].resumeItems[0].date, 'Aug 2025 – Present');
assert.equal(resume[0].resumeItems[0].desc, 'ServiceNow');
assert.equal(resume[0].resumeItems[0].logo, `${RAW_BASE}/images/experience/servicenow.jpeg`);
// certification (2024) sorts before degree (2016)
assert.equal(resume[1].resumeItems[0].title, 'React Native');
assert.equal(resume[1].resumeItems[1].title, 'B.Tech, Mechanical Engineering');
assert.equal(resume[1].resumeItems[1].desc, 'VIT University, Tamil Nadu');

// portfolio
const portfolio = mapPortfolio(
  { items: [{ slug: 'stock-bot', title: 'AI Stock Analysis Bot', subtitle: 'Sub', shortDescription: 'short', description: 'long', sections: [{ title: 'Overview', body: 'o' }, { title: 'Details', body: 'd' }, { title: 'X', body: 'x' }], category: 'AI/Automation', technologies: ['Python', 'OpenAI'], githubUrl: 'https://g', liveUrl: '', featured: true, image: '/images/projects/stock-bot.png' }] },
  { firstName: 'Mohan Sagar', lastName: 'Killamsetty', headline: 'Senior Software Engineer', avatar: '' }
);
const p = portfolio[0];
assert.equal(p.id, 1);
assert.equal(p.title2, 'Sub');
assert.equal(p.desc1, 'o');
assert.equal(p.desc2, 'd');
assert.deepEqual(p.descItems, [{ title: 'X', desc: 'x' }]);
assert.equal(p.dataFilter, 'ai-automation');
assert.deepEqual(p.tags, ['Python', 'OpenAI']);
assert.equal(p.img, `${RAW_BASE}/images/projects/stock-bot.png`);
assert.equal(p.img2, p.img); assert.equal(p.imgLarge, p.img); assert.equal(p.detailsImg, p.img);
assert.equal(p.employee.name, 'Mohan Sagar Killamsetty');
assert.equal(p.statusItem[0].desc, 'AI/Automation');

// services — presentational skeleton comes from bundled services by index
const services = mapServices(
  { items: [{ title: 'Web Development', shortDescription: 's', description: 'd', details: ['a', 'b'], projectCount: '20+ Projects', image: '/images/services/1.png', process: { title: 'P', description: 'pd', steps: ['s1'] } }] },
  bundledServices
);
assert.equal(services[0].iconName, bundledServices[0].iconName);
assert.equal(services[0].imgSm, bundledServices[0].imgSm);
assert.equal(services[0].desc1, 'a');
assert.deepEqual(services[0].process.processItems, ['s1']);
assert.equal(services[0].process.img, bundledServices[0].process.img);

// socials
const socials = mapSocials({ links: [{ platform: 'linkedin', url: 'https://l' }, { platform: 'youtube', url: 'https://y' }] });
assert.deepEqual(socials[0], { id: 'linkedin', iconName: 'fa-brands fa-linkedin-in', path: 'https://l' });
assert.deepEqual(socials[1], { id: 'youtube', iconName: 'fa-brands fa-youtube', path: 'https://y' });

// testimonials
const t = mapTestimonials({ items: [{ author: 'A', role: 'R', quote: 'Q', avatar: '/images/testimonials/a.jpg' }] })[0];
assert.deepEqual(t, { id: 1, authorName: 'A', authorDesig: 'R', img: `${RAW_BASE}/images/testimonials/a.jpg`, desc: 'Q' });

// file-url resolution
import assert2 from 'node:assert/strict';
assert2.equal(resolveFileUrl('/files/resume.pdf'), 'https://admin.devmohan.in/files/resume.pdf');
assert2.equal(resolveFileUrl('https://x.y/r.pdf'), 'https://x.y/r.pdf');
assert2.equal(resolveFileUrl(''), '');

console.log('content mapping OK');
