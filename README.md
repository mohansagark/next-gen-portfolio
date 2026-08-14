# Mohan Sagar — Portfolio

Personal portfolio for **Mohan Sagar** (AI Engineer · Frontend Architect): [devmohan.in](https://devmohan.in).

Next.js app that ships a single homepage IA, case-study and capability detail routes, a contact API (Cloudflare Turnstile + Resend), and a blog surface that mirrors to [blog.devmohan.in](https://blog.devmohan.in).

> System design, data/AI flows, and the multi-repo map: **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

![Next.js](https://img.shields.io/badge/Next.js-15.1.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## What this site is

- **Homepage** (`/`) — one composition via `IndexMain` (hero → credibility → capabilities → work → experience → testimonials → writing → about → contact)
- **Work** (`/work/[slug]`) — case studies from portfolio-data
- **Capabilities** (`/capabilities/[slug]`) — capability detail pages
- **Blogs** (`/blogs`, `/blogs/[slug]`) — listing + posts; canonical blog host is the subdomain
- **Contact** (`/api/contact`) — Turnstile-verified form → Resend email
- **Content SoT** — profile, experience, projects, and related JSON from [portfolio-data](https://github.com/mohansagark/portfolio-data) (local dir or `admin.devmohan.in`), with `public/fakedata/` fallbacks

## Quick start

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/mohansagark/next-gen-portfolio.git
cd next-gen-portfolio
npm install
cp .env.example .env.local   # fill in keys as needed
npm run generate:blogs
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment / keys checklist

Copy `.env.example` → `.env.local` for local dev. **Do not commit secrets.** Where each key lives:

| Key | Where to add | Notes |
| --- | ------------ | ----- |
| `NEXT_PUBLIC_SITE_URL` | Vercel project env + `.env.local` | Canonical URL (default `https://devmohan.in`) |
| `NEXT_PUBLIC_LEO_WORKER_URL` | Vercel project env + `.env.local` | Browser Leo widget Worker URL |
| `PORTFOLIO_BLOG_TOKEN` | Vercel project env (+ local if fetching blogs) | GitHub read token for private `portfolio-blog` at prebuild |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Vercel project env + `.env.local` | Cloudflare Turnstile **dashboard** → create Invisible widget; domains: `localhost`, `127.0.0.1`, `devmohan.in` |
| `TURNSTILE_SECRET` | Vercel project env + `.env.local` | Same Turnstile widget secret (server-only) |
| `RESEND_API_KEY` | Vercel project env + `.env.local` | [Resend dashboard](https://resend.com/api-keys) API key |
| `RESEND_FROM_EMAIL` | Vercel project env + `.env.local` | Verified sender, e.g. `Portfolio <contact@devmohan.in>` (Resend domain) |
| `CONTACT_TO_EMAIL` | Vercel project env + `.env.local` | Inbox that receives enquiries |
| `CLOUDFLARE_API_TOKEN` | Vercel project env | Workers KV edit for Leo sync (`npm run sync:leo` / prebuild) |
| `CLOUDFLARE_ACCOUNT_ID` | Vercel (optional) | Only if Wrangler cannot infer account |
| `PORTFOLIO_KV_NAMESPACE_ID` | Vercel (optional) | Override Leo PORTFOLIO_KV id |
| `PORTFOLIO_DATA_DIR` | `.env.local` only | Local path to `portfolio-data` checkout |
| `PORTFOLIO_DATA_BASE_URL` | Vercel / local (optional) | Default `https://admin.devmohan.in` |

Leo Worker secrets (`GROQ_API_KEY`, `DEEPGRAM_API_KEY`, etc.) belong on the **Cloudflare Worker**, not this Vercel project.

## Project structure (high level)

```
next-gen-portfolio/
├── public/
│   ├── blogs.json           # Generated blog index
│   ├── fakedata/            # Bundled content fallbacks
│   └── img/ / images/       # Static assets
├── src/
│   ├── app/                 # App Router (/, /work, /capabilities, /blogs, /api/contact)
│   ├── blog/posts/          # Local MDX (when present)
│   ├── components/
│   │   ├── layout/          # Header, footer, IndexMain, …
│   │   ├── sections/home/   # Live homepage sections
│   │   └── shared/
│   ├── libs/                # portfolioData, contact, SEO helpers
│   └── …
├── scripts/                 # Blog generate, Leo sync, etc.
└── package.json
```

## Blog

Posts are generated into `public/blogs.json` (`npm run generate:blogs`). Production also pulls from the private portfolio-blog repo when `PORTFOLIO_BLOG_TOKEN` is set. Public reading lives primarily on **blog.devmohan.in**; this app still serves `/blogs` routes for listing/detail and sitemap entries.

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build (runs prebuild hooks) |
| `npm start` | Start production server |
| `npm run lint` | ESLint |
| `npm run generate:blogs` | Convert MDX / refresh blog JSON |

## Deployment

Deploy on Vercel. Set the Vercel project env vars from `.env.example` (site URL, Turnstile, Resend, blog token, Cloudflare token for Leo sync). Build uses `npm run build`.

## Author

**Mohan Sagar**

- Site: [devmohan.in](https://devmohan.in)
- Blog: [blog.devmohan.in](https://blog.devmohan.in)
- GitHub: [@mohansagark](https://github.com/mohansagark)
- LinkedIn: [mohansagark](https://www.linkedin.com/in/mohansagark/)

## License

MIT — see [LICENSE](LICENSE).
