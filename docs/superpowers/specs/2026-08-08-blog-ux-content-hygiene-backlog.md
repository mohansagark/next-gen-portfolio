# Blog UX & Content Hygiene — Issue Backlog

**Date:** 2026-08-08  
**Status:** Open — recorded for resolution (not yet implemented)  
**Source:** Product review after cover self-heal rollout  

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

## Out of scope for this note

- Implementing fixes (separate PRs per home repo).
- Changing heal daily limit / cron (already shipped).

## Suggested execution order

1. Quick UI wins: #3, #4, #5, #7, #9  
2. Voice default: #10  
3. Search depth: #6 (may need index fields)  
4. Content hygiene: #2, then #1  
5. FLUX consistency: #8 (research + prompt/steps experiments)
