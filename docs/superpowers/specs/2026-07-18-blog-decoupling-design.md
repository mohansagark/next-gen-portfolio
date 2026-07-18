# Blog Decoupling & AI-Refined Pipeline — Design

**Date:** 2026-07-18
**Author:** Mohan (with Claude)
**Status:** Draft for review

## Problem & Goal

Today the blog is coupled to the portfolio app and the content is low quality:

- All 236 blog posts live as `.mdx` files committed directly into `next-gen-portfolio`
  (`src/blog/posts/`, on the `master` / Next.js "devmohan" app).
- The `daily-dev-digest` pipeline (Python, GitHub Actions cron 4×/day) scrapes RSS
  feeds, generates `.mdx` **mechanically** (regex "first-N-sentences" summary, keyword
  tags, source body reproduced ~verbatim — a quality *and* plagiarism problem), then
  clones `next-gen-portfolio`, commits the `.mdx` into it, and fires a Vercel deploy hook.
- There is no separation between content and app: a bad scraped post can break the app
  build, and every post requires a full app rebuild.

**Goals:**

1. Move posts out of the app into a dedicated **private** repo that is the single source of truth.
2. Rewrite the pipeline to produce **one high-quality, genuinely transformed post per day**
   using an LLM on **Amazon Bedrock**.
3. Serve the blog from the app with **search, tag-filter, and pagination**, with no runtime
   database, no runtime network dependency, and no risk that blog content breaks the portfolio build.

## Non-Goals (explicitly out of scope)

- No database (Aurora/DynamoDB/etc.). Evaluated and rejected: search/tag-filter/pagination are
  all precomputable; there are no runtime-write features (comments/reactions/view-counts) wanted now.
  If those are ever wanted, the additive path is KV counters + giscus, not a DB — no rework of reads.
- No runtime LLM calls. AI runs only at generation time in the pipeline.
- No change to the Vite `feature/3D-portfolio` app — the blog lives in the Next.js `master` app (`devmohan`).

## Architecture Overview

```
daily-dev-digest  (Python, GitHub Actions — cron 1×/day)
  scrape RSS ─► select single best candidate ─► LLM rewrite (Bedrock, Sonnet 5)
     │                                              (transform + attribute source)
     ├─► validate .mdx (frontmatter schema + parseable body)
     ├─► git push 1 .mdx to  portfolio-blog (PRIVATE)  ◄── single source of truth
     └─► curl Vercel deploy hook ─► rebuild next-gen-portfolio

portfolio-blog  (PRIVATE repo, .mdx + YAML frontmatter)
  posts/*.mdx           the 236 migrated posts + 1/day new
  CI (GitHub Actions):  validate + precompile md ─► sanitized HTML ─► index artifacts
                        posts.json, search-index.json, tags.json  (committed or built)

next-gen-portfolio @ master  (Next.js 16, Vercel — modified)
  build step: authenticated pull of portfolio-blog@main (read token) ─► bundled
  build step: consume pre-validated index artifact (HTML + metadata)
  route/pages: /blogs list + /blogs/[slug] (or blog.devmohan.in via middleware)
        - render precompiled HTML inside site layout, styled via `prose`
        - client-side search / tag-filter / pagination over the index
  SSG: post pages prerendered to static HTML (generateStaticParams)
  (the 236 committed .mdx are removed from the app)
```

## Key Design Decisions

### 1. Repo as source of truth; static index; no DB
Search, tag-filter, and pagination are read-only and precomputable. A build-time index
(`posts.json` + `search-index.json` + `tags.json`) + client-side search (MiniSearch/Fuse.js)
delivers all three at $0 infra and near-zero maintenance. A DB was rejected as negative-ROI
for these features.

### 2. Posts are data, not compiled code (build-failure isolation)
Scraped posts are plain markdown bodies (no JSX). Treat them as **runtime data**, not compiled
MDX modules:
- Precompile markdown → **sanitized** HTML **once, upstream** in `portfolio-blog` CI
  (`remark`/`rehype` + `rehype-sanitize` + syntax highlighting via `rehype-highlight`/Shiki).
- The app consumes a pre-validated HTML+metadata artifact and SSG-prerenders pages.
- Consequence: a malformed post **cannot break** `next build` — it's caught in `portfolio-blog`
  CI (fail-soft: quarantine/skip bad file, continue), never reaches the app. Vercel also keeps
  the last successful deploy live on any build failure, so production never goes down.
- **Security:** content is scraped (untrusted) → sanitize once in CI; sanitizer allowlist must
  preserve style/highlight hooks (`h1–h6, p, ul, ol, li, pre, code, a, img, blockquote, table`
  + highlight classes).

### 3. Styling
- **Page chrome** (list cards, tag chips, pagination, post-page shell): the app's own JSX +
  existing Tailwind theme + `darkMode:"class"` → identical to the rest of `next-gen-portfolio`.
- **Article body:** classless HTML wrapped in `@tailwindcss/typography` `prose`
  (already installed): `<article className="prose dark:prose-invert max-w-none">`, tuned in
  `tailwind.config.cjs` to match brand. Inherits site fonts/theme automatically.

### 4. Deployment topology (subdomain — optional fast-follow)
- **Topology A (recommended):** single Next.js app; `blog.devmohan.in` via host-based
  middleware rewrite → `/blogs/*`. One codebase, one deploy, one deploy-hook.
- Extras when enabled: `blog` CNAME + Vercel domain; 301 redirects from old `/blog(s)/*`;
  separate `sitemap.xml` + `robots.txt`; canonical URLs on the blog host; `NEXT_PUBLIC_SITE_URL`.
- The migration ships first on `devmohan.in/blogs`; subdomain is a rework-free later flip.

### 5. Private repo auth
- `portfolio-blog` is **private**.
- Pipeline **write:** token with write access (extends today's `BLOG_REPO_TOKEN` pattern).
- App build **read:** fine-grained read PAT / deploy key / GitHub App available in the Vercel
  build env to clone `portfolio-blog@main`. Token lives in build only; never at runtime.

### 6. AI refine step on Amazon Bedrock
- **Frequency:** cron 4×/day → **1×/day**; `MAX_TOTAL = 1`. The run **selects the single best
  candidate** article of the day and invests the LLM in one high-quality post (quality over volume).
- **Model:** **Amazon Nova Pro** on Bedrock (region `us-east-1`; exact ID confirmed at build time,
  e.g. `amazon.nova-pro-v1:0` or the `us.amazon.nova-pro-v1:0` cross-region profile), model
  **configurable via env**. Upgrade paths (one-line swap): **Nova Premier** (higher quality) or
  **Claude Sonnet 5** (`us.anthropic.claude-sonnet-5`) if/when Anthropic access is granted.
  - *Why Nova Pro (not Claude):* This account cannot complete Anthropic onboarding on the
    `bedrock-runtime` path — `AccessDeniedException: not available for this account` and the FTU
    `PutUseCaseForModelAccess` form rejects every payload with `Invalid form data` (account-level
    entitlement issue, pursue via AWS Support / check Billing → payment method). Nova Pro needs no
    FTU/marketplace gate and is more than sufficient for an automated daily digest; Claude is a
    later env-var swap, not a blocker.
- **Client:** Bedrock **Converse API via `boto3`** (model-agnostic → makes the Nova/Llama/Claude
  bake-off trivial). Replaces the `openai` dep in `requirements.txt`.
- **Auth:** AWS credentials in GitHub Actions via **OIDC role** (recommended; no long-lived keys)
  or static `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY` + `AWS_REGION=us-east-1`. Requires
  `bedrock:InvokeModel` IAM permission on the model/inference-profile ARN.
- **Cost:** ~1 post/day ≈ **~$0.28/month** on Nova Pro — trivial vs the $200 AWS credit (~50+ yrs).
- **Prompt:** rewrite scraped content into an original, well-structured post in a consistent
  voice + attribute the source (fixes the plagiarism issue). Dedupe on ideas, not just URLs.
  Prompt quality matters more than model choice at this tier.

## Sub-Projects (each its own implementation plan)

1. **Create `portfolio-blog` (private) + migrate** the 236 `.mdx` from `master:src/blog/posts/`.
2. **`portfolio-blog` CI:** validate frontmatter/body; precompile md→sanitized HTML + syntax
   highlight; emit `posts.json` / `search-index.json` / `tags.json` (fail-soft on bad files).
3. **Repoint pipeline:** clone `portfolio-blog` (not `next-gen-portfolio`); cron 1×/day;
   `MAX_TOTAL=1`; best-candidate selection; keep the deploy-hook trigger.
4. **AI refine step:** Bedrock Converse (Sonnet 5, configurable) + rewrite prompt + source
   attribution; AWS OIDC auth in Actions; swap `openai` dep for `boto3`.
5. **`next-gen-portfolio` build + reads:** authenticated pull of `portfolio-blog`; consume index
   artifact; render precompiled HTML via `prose` inside site layout; client-side search/tag/
   pagination; SSG; remove the 236 committed `.mdx`.
6. **(Optional) `blog.devmohan.in`:** middleware host routing + redirects + sitemap/robots/
   canonical + `NEXT_PUBLIC_SITE_URL`.

## Workflow

- All work happens on a **`feature/blog-decoupling`** branch cut from **`master`**.
- Merge to `master` only after the whole thing is **verified (app + pipeline exercised end-to-end),
  self-reviewed/critiqued, and tested green**.

## Resolved Decisions (formerly open items)

- **Base branch:** `master` (Next.js `devmohan` app) is canonical for the blog. Work on
  `feature/blog-decoupling`; the Vite `feature/3D-portfolio` app is untouched.
- **Bedrock:** region `us-east-1`; **Nova Pro accessible and confirmed** (Playground). Anthropic
  models blocked at account level — deferred to AWS Support, not a blocker.
- **Client:** Converse API (boto3) — chosen for the model-agnostic bake-off.

## Remaining Risks

- Confirm the exact Nova Pro invocation ID (bare vs `us.` cross-region profile) at build time.
- If AWS Support enables Anthropic access later, validate the Sonnet 5 swap end-to-end.
```
