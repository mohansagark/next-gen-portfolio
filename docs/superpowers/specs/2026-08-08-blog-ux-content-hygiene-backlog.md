# Blog UX & Content Hygiene — Issue Backlog

**Date:** 2026-08-08  
**Status:** Open — recorded for resolution (not yet implemented)  
**Source:** Product review after cover self-heal rollout; SEO structure/typography research 2026-08-08  

Cross-cutting backlog. Own each item in the repo noted under **Home**. Linked GitHub issues track execution.

## Summary

| # | Issue | Home |
|---|---|---|
| 1 | Valid slug generation + cleanup | `daily-dev-digest` (+ `portfolio-blog` data) |
| 2 | Consolidate Takeaways / Key Takeaways → **Key Takeaways** | `daily-dev-digest` (generate/repair) |
| 3 | Social links open in a new tab | `next-gen-portfolio` |
| 4 | Replace Twitter with Medium (`https://mohansagark.medium.com/`) + icon | `next-gen-portfolio` |
| 5 | Categories listed by post count descending | `next-gen-portfolio` |
| 6 | Blog/category search covers title, header, body, tags, related content | `next-gen-portfolio` (+ index fields from `portfolio-blog` if needed) |
| 7 | Stretch pagination to blog post content width | `next-gen-portfolio` |
| 8 | FLUX cover quality inconsistent run-to-run | `daily-dev-digest` |
| 9 | Copyright year → **2026** | `next-gen-portfolio` |
| 10 | Voice bot defaults to chat; voice only if visitor turns it on | `next-gen-portfolio` |
| 11 | Move “Read more” button to the right side | `next-gen-portfolio` |
| 12 | Author-name hover → small modal with LinkedIn profile card | `next-gen-portfolio` |
| 13 | SEO: single H1 per post (no duplicate hero/article H1) | `next-gen-portfolio` |
| 14 | SEO: answer-first opener + Key Takeaways high on page | `daily-dev-digest` (+ page template) |
| 15 | SEO: question-style H2s + FAQ section in generate/repair | `daily-dev-digest` |
| 16 | SEO: article typography — ~18px body, 1.5 line-height, ~65ch measure | `next-gen-portfolio` |
| 17 | SEO: Article + BreadcrumbList (+ FAQPage) JSON-LD | `next-gen-portfolio` |
| 18 | SEO: TOC for long posts | `next-gen-portfolio` |

---

## 1. Valid slug generation and cleanup

**Home:** `daily-dev-digest` (create/repair path); cleanup may rewrite `portfolio-blog` slugs + image paths + index.

**Problem:** Some published slugs are truncated, trailing-hyphen, or otherwise invalid/unstable (e.g. `from-zero-to-chat-my-journey-building-a-`, `what-is-o4-mini-high-all-you-need-to-kno`).

**Desired:** Deterministic, URL-safe slug rules (length, charset, no trailing `-`); one-time cleanup of existing bad slugs with redirects or index rewrites as needed.

## 2. Consolidate takeaways sections → Key Takeaways

**Home:** `daily-dev-digest` generate + repair prompts / post-processors; optional pass over existing MDX.

**Problem:** Posts can contain both a “Takeaways” and a “Key Takeaways” section (or near-duplicates).

**Desired:** Single section titled **Key Takeaways** everywhere (new posts + repair/hygiene for legacy).

## 3. Social links open in new tab

**Home:** `next-gen-portfolio` shared social components (and any in-post social/share links).

**Problem:** Social / external links navigate the current tab.

**Desired:** `target="_blank"` + `rel="noopener noreferrer"` on social and other external profile links.

## 4. Medium instead of Twitter

**Home:** `next-gen-portfolio` (`Socials3.js` and any other social config).

**Problem:** Twitter is configured / shown; Twitter link is not the desired profile.

**Desired:** Use Medium — `https://mohansagark.medium.com/` — with an appropriate Medium icon (replace Twitter/X entry).

## 5. Categories ordered by count (desc)

**Home:** `next-gen-portfolio` (`getBlogCategories.js`, `BlogCategoriesWidget.js`).

**Problem:** Categories are sorted alphabetically (or unsorted with counts).

**Desired:** List categories by number of posts **descending** (ties: stable secondary sort, e.g. name).

## 6. Broader blog / category search

**Home:** `next-gen-portfolio` search/filter (`filterItems.js`, blog sidebar search); may need richer fields in `blogs.json` from `portfolio-blog` build.

**Problem:** Search only matches a narrow set (e.g. title + category).

**Desired:** Searching blogs and categories matches **title/header, body, tags**, and other blog-content-related fields.

## 7. Pagination width matches blog post

**Home:** `next-gen-portfolio` blogs list / pagination UI.

**Problem:** Pagination control is narrower than the blog post content column.

**Desired:** Pagination stretches to the **same width** as the blog post content area.

## 8. FLUX image quality consistency

**Home:** `daily-dev-digest` (`image_client.py`, cover hook prompts, `IMAGE_STEPS`, model choice).

**Problem:** Editorial photo quality varies — sometimes strong, sometimes weak — for the same pipeline.

**Desired:** Tighter prompt/seed/steps (or model) policy so heal/create covers are more consistently good; document knobs and any A/B findings.

## 9. Copyright year 2026

**Home:** `next-gen-portfolio` footer / copyright component.

**Problem:** Copyright text is stale (not 2026).

**Desired:** Show **2026** (prefer dynamic current year if that’s the site pattern; otherwise hardcode 2026 for now).

## 10. Voice bot defaults to chat

**Home:** `next-gen-portfolio` (`LeoLoader.js` / `AiVoiceBotConfig`).

**Problem:** Voice bot engages as voice by default.

**Desired:** Behave as a **chat bot** unless the visitor **manually** enables voice.

---

## 11. “Read more” button on the right

**Home:** `next-gen-portfolio` blog card / list components (e.g. `BlogSingle.js` and related).

**Problem:** “Read more” control is not right-aligned.

**Desired:** Place the **Read more** button on the **right** side of the card/row.

## 12. Author hover → LinkedIn profile card modal

**Home:** `next-gen-portfolio` blog list + detail author UI.

**Problem:** Author name is plain text / link with no profile preview.

**Desired:** On hover (and accessible focus), open a **small modal/popover** showing a **LinkedIn profile card** for the author (Mohan’s LinkedIn). Dismiss on mouse leave / Esc / outside click; keyboard-accessible.


## 13. SEO — single H1 per post

**Home:** `next-gen-portfolio` (breadcrumb hero + `BlogDetailsPrimary`).

**Problem:** Post pages can expose more than one `<h1>` (hero title + article title), which weakens heading semantics for crawlers.

**Desired:** Exactly **one H1** (the post title). Breadcrumb/hero label can be a styled `<p>`/`<div>` or demote duplicate to non-heading.

## 14. SEO — answer-first + Key Takeaways placement

**Home:** `daily-dev-digest` generate/repair prompts; confirm template order on `next-gen-portfolio`.

**Problem:** Posts may bury the main answer under long preamble.

**Desired:** Open with a **40–60 word direct answer**, then a single **Key Takeaways** block near the top (ties to #2).

## 15. SEO — question H2s + FAQ

**Home:** `daily-dev-digest` generate + repair prompts; optional legacy hygiene.

**Problem:** Flat/label-style H2s and missing FAQ reduce passage ranking and AI-overview citation odds.

**Desired:** Prefer **question-style H2s** (PAA-shaped); add a short **FAQ** section when natural; keep strict H2→H3 hierarchy (no skipped levels, no body H1).

## 16. SEO — article typography & measure

**Home:** `next-gen-portfolio` article `prose` styles (`BlogDetailsPrimary`).

**Problem:** Wide `max-w-none` prose can exceed ~75ch/line; body may be below long-form comfort size.

**Desired:** Body **~18px** (min 16px), **line-height ~1.5–1.6**, content column **~50–75ch** (`max-width: ~65ch`); WCAG contrast ≥ 4.5:1; font-display swap / no CLS.

## 17. SEO — structured data

**Home:** `next-gen-portfolio` blog detail page.

**Problem:** Missing or incomplete JSON-LD for articles/breadcrumbs/FAQ.

**Desired:** Emit **Article** (with author) + **BreadcrumbList**; add **FAQPage** when an FAQ section exists. Valid in Rich Results test.

## 18. SEO — table of contents (long posts)

**Home:** `next-gen-portfolio` blog detail (optional generate of anchor IDs in digest).

**Problem:** Long posts lack in-page navigation for users and crawlers.

**Desired:** Auto TOC from H2/H3 with anchor links when post length exceeds a threshold (e.g. ≥ ~1,500 words or ≥ 4 H2s).

---

## Out of scope for this note

- Implementing fixes (separate PRs per home repo).
- Changing heal daily limit / cron (already shipped).
- Breadcrumb full-title display (shipped — no ellipsis).

## Suggested execution order

1. Quick UI wins: #3, #4, #5, #7, #9, #11  
2. Author LinkedIn hover card: #12 (+ E-E-A-T with #17 author schema)  
3. Voice default: #10  
4. SEO template: #13, #16, #17, #18  
5. Search depth: #6 (may need index fields)  
6. Content SEO hygiene: #14, #15, #2, then #1  
7. FLUX consistency: #8 (research + prompt/steps experiments)
