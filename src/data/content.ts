// Content view-models + module store. Defaults are the site's previous
// hardcoded copy; the store is overwritten by loadContent() before mount
// when portfolio-data is reachable.
export interface Job {
  role: string;
  company: string;
  place: string;
  period: string;
  description: string;
}
export interface Project {
  title: string;
  category: string;
  tools: string;
  image: string;
  link: string;
}
export interface Social {
  platform: string;
  url: string;
}
export interface SiteContent {
  jobs: Job[];
  projects: Project[];
  bio: string;
  email: string;
  socials: Social[];
}

export const defaultContent: SiteContent = {
  jobs: [
    {
      role: "Senior Software Engineer · AI & Frontend",
      company: "ServiceNow",
      place: "Hyderabad",
      period: "NOW",
      description:
        "Leading UX architecture for AI-powered agentic platforms. Built reasoning-trace visualizations and a voice-enabled layer on Amazon Connect unifying multiple CCaaS providers; contributing to the Karuna design system.",
    },
    {
      role: "Senior Software Engineer",
      company: "Invesco",
      place: "Hyderabad",
      period: "2024–25",
      description:
        "Led IVYGPT, an AI platform adopted by 8,000+ users that cut report analysis from 30 days to 30 minutes (~99%). Built document summarization, reusable prompt libraries, and a micro-frontend architecture.",
    },
    {
      role: "SDE-3 · Senior SWE",
      company: "Reliance Jio",
      place: "Bengaluru",
      period: "2022–24",
      description:
        "Led 10 engineers on platforms serving 5M+ users. Improved page load ~90% (5s → 500ms), lifted digital service sales 55%, and drove 200,000+ user conversions.",
    },
    {
      role: "Senior Software Engineer",
      company: "Zentree Labs",
      place: "Srikakulam",
      period: "2021–22",
      description:
        "Built web and mobile banking apps with React Native and real-time monitoring, integrating APIs for reliable data flow across distributed systems.",
    },
    {
      role: "Software Engineer",
      company: "Shell",
      place: "Bangalore",
      period: "2019–20",
      description:
        "Delivered an OTP-based solution that kept ship-maintenance operations running through COVID lockdowns, enabling secure remote access and business continuity.",
    },
    {
      role: "App Development Analyst",
      company: "Accenture",
      place: "Bengaluru",
      period: "2017–19",
      description:
        "Delivered AT&T projects across 25+ sprints and adopted Selenium/UFT automation, cutting regression effort 70%+. Recognized as Star Performer at Mobily.",
    },
  ],
  projects: [
    {
      title: "AI Stock Analysis Bot",
      category: "Automated Stock Market Intelligence",
      tools: "Python, OpenAI GPT, GitHub Actions, Financial APIs",
      image: "/images/stock-bot.png",
      link: "https://github.com/mohansagark/stock-bot",
    },
    {
      title: "Daily Dev Digest",
      category: "AI-Curated Developer Newsletter",
      tools: "Python, Web Scraping, OpenAI, GitHub Actions",
      image: "/images/dev-digest.png",
      link: "https://github.com/mohansagark/daily-dev-digest",
    },
    {
      title: "Portfolio Backend API",
      category: "Authenticated Content Management System",
      tools: "Node.js, Express, JWT, Database",
      image: "/images/backend-service.png",
      link: "https://github.com/mohansagark/next-gen-portfolio-api",
    },
    {
      title: "Modern Portfolio Website",
      category: "Next.js Portfolio with Theme System",
      tools: "Next.js, React, TailwindCSS, Theme System",
      image: "/images/next-gen-portfolio.png",
      link: "https://github.com/mohansagark/next-gen-portfolio",
    },
    {
      title: "Smart Expense Tracker",
      category: "AI-Powered Mobile Expense App",
      tools: "Android Studio, Python, OpenAI, Mobile Development",
      image: "/images/expense-tracker.png",
      link: "https://github.com/mohansagark/ai-expense-tracker",
    },
    {
      title: "React Mini-Games",
      category: "Interactive Browser Games Collection",
      tools: "React, JavaScript, Game Development, Interactive UI",
      image: "/images/react-mini-games.png",
      link: "https://github.com/mohansagark/bitblaze",
    },
  ],
  bio: "I'm a Senior Software Engineer with 9+ years building AI-powered products and high-performance frontend systems at scale—specializing in LLM integrations, agentic workflows, and real-time interfaces. At Invesco I led IVYGPT, an internal AI platform used by 8,000+ users that cut report analysis from 30 days to 30 minutes. At Reliance Jio I led 10 engineers on platforms serving 5M+ users, improving performance ~90%. Now at ServiceNow I build agentic AI platforms with React, Next.js, Python and Node.",
  email: "mohansgr3@gmail.com",
  socials: [
    { platform: "github", url: "https://github.com/mohansagark" },
    { platform: "linkedin", url: "https://www.linkedin.com/in/mohansagark/" },
    { platform: "instagram", url: "https://www.instagram.com/mohansagark" },
  ],
};

let content: SiteContent = defaultContent;

export function setContent(partial: Partial<SiteContent>): void {
  if (partial && typeof partial === "object") {
    content = { ...content, ...partial };
  }
}

export function getContent(): SiteContent {
  return content;
}
