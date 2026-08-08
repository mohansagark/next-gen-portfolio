# next-gen-portfolio — Blog UX & SEO Backlog

**Date:** 2026-08-08  
**Status:** Open — recorded for resolution (not yet implemented)  
**Repo:** `next-gen-portfolio` only  
**GitHub:** https://github.com/mohansagark/next-gen-portfolio/issues/26  

**Sister backlog (digest):** https://github.com/mohansagark/daily-dev-digest/issues/12  
`daily-dev-digest` → `docs/superpowers/specs/2026-08-08-content-slug-flux-hygiene-backlog.md`

IDs below are stable cross-repo numbers (gaps are intentional — those IDs live in digest).

## Summary (this repo)

| # | Issue |
|---|---|
| 3 | Social links open in a new tab |
| 4 | Replace Twitter with Medium (`https://mohansagark.medium.com/`) + icon |
| 5 | Categories listed by post count descending |
| 6 | Blog/category search covers title, header, body, tags, related content |
| 7 | Stretch pagination to blog post content width |
| 9 | Copyright year → **2026** |
| 10 | Voice bot defaults to chat; voice only if visitor turns it on |
| 11 | Move “Read more” button to the right side |
| 12 | Author-name hover → small modal with LinkedIn profile card |
| 13 | SEO: single H1 per post (no duplicate hero/article H1) |
| 16 | SEO: article typography — ~18px body, 1.5 line-height, ~65ch measure |
| 17 | SEO: Article + BreadcrumbList (+ FAQPage) JSON-LD |
| 18 | SEO: TOC for long posts |

---

## 3. Social links open in new tab

**Problem:** Social / external links navigate the current tab.

**Desired:** `target="_blank"` + `rel="noopener noreferrer"` on social and other external profile links.

## 4. Medium instead of Twitter

**Problem:** Twitter is configured / shown; Twitter link is not the desired profile.

**Desired:** Use Medium — `https://mohansagark.medium.com/` — with an appropriate Medium icon (replace Twitter/X entry).

## 5. Categories ordered by count (desc)

**Problem:** Categories are sorted alphabetically (or unsorted with counts).

**Desired:** List categories by number of posts **descending** (ties: stable secondary sort, e.g. name).

## 6. Broader blog / category search

**Problem:** Search only matches a narrow set (e.g. title + category).

**Desired:** Searching blogs and categories matches **title/header, body, tags**, and other blog-content-related fields. May need richer fields from `portfolio-blog` `blogs.json` build — coordinate if index is incomplete.

## 7. Pagination width matches blog post

**Problem:** Pagination control is narrower than the blog post content column.

**Desired:** Pagination stretches to the **same width** as the blog post content area.

## 9. Copyright year 2026

**Problem:** Copyright text is stale (not 2026).

**Desired:** Show **2026** (prefer dynamic current year if that’s the site pattern; otherwise hardcode 2026 for now).

## 10. Voice bot defaults to chat

**Problem:** Voice bot engages as voice by default.

**Desired:** Behave as a **chat bot** unless the visitor **manually** enables voice.

## 11. “Read more” button on the right

**Problem:** “Read more” control is not right-aligned.

**Desired:** Place the **Read more** button on the **right** side of the card/row.

## 12. Author hover → LinkedIn profile card modal

**Problem:** Author name is plain text / link with no profile preview.

**Desired:** On hover (and accessible focus), open a **small modal/popover** showing a **LinkedIn profile card** for the author (Mohan’s LinkedIn). Dismiss on mouse leave / Esc / outside click; keyboard-accessible.

## 13. SEO — single H1 per post

**Problem:** Post pages can expose more than one `<h1>` (hero title + article title).

**Desired:** Exactly **one H1** (the post title). Breadcrumb/hero label can be a styled non-heading element.

## 16. SEO — article typography & measure

**Problem:** Wide `max-w-none` prose can exceed ~75ch/line; body may be below long-form comfort size.

**Desired:** Body **~18px** (min 16px), **line-height ~1.5–1.6**, content column **~50–75ch** (`max-width: ~65ch`); WCAG contrast ≥ 4.5:1; font-display swap / no CLS.

## 17. SEO — structured data

**Problem:** Missing or incomplete JSON-LD for articles/breadcrumbs/FAQ.

**Desired:** Emit **Article** (with author) + **BreadcrumbList**; add **FAQPage** when an FAQ section exists. Valid in Rich Results test. FAQ content itself is produced by digest (#15).

## 18. SEO — table of contents (long posts)

**Problem:** Long posts lack in-page navigation for users and crawlers.

**Desired:** Auto TOC from H2/H3 with anchor links when post length exceeds a threshold (e.g. ≥ ~1,500 words or ≥ 4 H2s).

---

## Out of scope (this repo)

- Digest content generation / repair / FLUX / slugs → sister backlog.
- Cover heal cron / daily limit (shipped).
- Breadcrumb full-title display (shipped — no ellipsis).

## Suggested execution order (this repo)

1. Quick UI: #3, #4, #5, #7, #9, #11  
2. Author LinkedIn hover: #12  
3. Voice default: #10  
4. SEO template: #13, #16, #17, #18  
5. Search depth: #6  
