# Cover Image Rendering — Workstream C (next-gen-portfolio) Design

**Date:** 2026-07-20
**Repo:** `next-gen-portfolio` (branch `feature/blog-cover-render`)
**Parent spec:** `daily-dev-digest/docs/superpowers/specs/2026-07-20-cover-image-generation-design.md` §8
**Depends on:** Workstream B (`portfolio-blog` branch `feature/cover-image-field`, commit `860c8e9`)

## 1. Problem

Workstreams A and B are complete: the digest generates a cover image per post and
`blogs.json` now carries `coverImage` / `coverImageAlt`. Nothing renders them.
`BlogSingle.js` has a literal `{/* TODO: BLOG IMAGE LOGIC IS HERE */}` where the
image block belongs, and no route serves `/blog-images/…`, so the covers are
invisible to the site.

This workstream makes them visible.

## 2. Field contract (inherited from B — do not redefine)

| Field | Type | Value |
|---|---|---|
| `coverImage` | `string` | `/blog-images/<name>.jpg`, or `""` when absent |
| `coverImageAlt` | `string` | Alt text, or `""` when absent |

**Both keys are always present.** B follows the repo's existing `data.x \|\| ""`
convention (same as `subtitle`, `sourceUrl`), so consumers test **truthiness**,
never key presence. `coverImage` is already sanitized at the source by B's
`sanitizeImagePath()` — it is either `""` or a safe site-relative path. Workstream
C does not re-sanitize; it trusts B's guard and treats the value as opaque.

As of today: 2 of 240 posts have a cover. 238 do not.

## 3. Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Card aspect ratio | **16:9**, cropped from the 1024×1024 source | Standard blog-card ratio; keeps cards compact in a 2–3 column grid |
| Article placement | **Below title/meta, above body** | Reader gets the topic before the art; the image doubles as a divider |
| Missing cover | **Render no image block at all** | Zero visual regression for the 238 legacy posts; no placeholder noise |
| Image storage | **Gitignore `public/blog-images/`** | ~260KB/day would grow this repo ~95MB/yr with binaries already versioned in `portfolio-blog` |
| Stale-reference safety | **Prune `coverImage` at fetch time** | See §5 — closes the broken-image hole that gitignoring alone opens |

## 4. Data flow

```
portfolio-blog (cloned at prebuild)
  generated/blogs.json  ──→  public/blogs.json
  images/*.jpg          ──→  public/blog-images/*.jpg   [NEW]
                                  │
                                  ├─→ BlogSingle.js         16:9 card image
                                  └─→ BlogDetailsPrimary.js cover below title
```

## 5. The pruning step (the non-obvious part)

`fetch-blog-content.mjs` is fail-soft: when the clone fails it calls
`keepBackup()`, which serves the **committed** `public/blogs.json` and exits 0 so
the site always builds.

That backup lists `coverImage` paths. If `public/blog-images/` is gitignored, a
failed clone means the JSON references images that were never committed and did
not arrive — every covered post renders a broken image icon.

**Fix:** after copying, walk `public/blogs.json` and blank `coverImage` /
`coverImageAlt` for any entry whose file is not present on disk. Degradation then
lands on the fallback already chosen (no image block) instead of a broken icon.

This runs on **both** paths — successful fetch and `keepBackup()` — because the
backup JSON is exactly the case that goes stale.

## 6. Changes

### `scripts/fetch-blog-content.mjs`

- Add an image-directory copy alongside the existing `COPIES` file list:
  `images/` → `public/blog-images/`. Missing dir ⇒ log and skip, never fail the
  build (it is optional, unlike the three JSON files).
- Add `pruneMissingCovers()` (§5), called after the copy and inside
  `keepBackup()` before it exits.
- Log counts: images copied, covers pruned.

### `src/components/shared/blogs/BlogSingle.js`

- Replace the `TODO` comment and the commented-out Swiper block with a
  `next/image` in a `relative aspect-[16/9] overflow-hidden` wrapper, rendered
  only when `coverImage` is truthy.
- `alt={coverImageAlt || ""}` — use the brief-derived alt text when present. The
  `""` fallback is deliberate, not lazy: an empty alt marks the image decorative
  so screen readers skip it rather than announcing a filename next to the title
  it already read.
- The category badge is already absolutely positioned top-right; with an image
  present it lands on the image, which is the original design intent. Its
  position is unchanged for cover-less cards.
- Destructure the two new fields from `blog`.

### `src/components/sections/blog-details/BlogDetailsPrimary.js`

- Insert a 16:9 cover between the title/meta block and the article body, gated
  on `coverImage` truthiness.
- Same alt rule.

### `.gitignore`

- Add `public/blog-images/`.

## 7. Why no `next/image` config change

`coverImage` is a site-relative static path (`/blog-images/…`) served from
`public/`, not a remote URL, so `next.config` needs no `remotePatterns` or
`domains` entry. Source images are 1024×1024 JPEG; Next resizes at request time.

## 8. Failure modes

| Failure | Behavior |
|---|---|
| Clone fails / no token | `keepBackup()` → covers pruned → text-only cards; build succeeds |
| `images/` missing in clone | Log + skip; pruning blanks the references |
| One image file missing | Only that post degrades to no image block |
| Legacy post (`coverImage: ""`) | No image block; card renders as today |
| Malicious front-matter path | Already `""` from B's `sanitizeImagePath()` |

## 9. Testing

Following the repo's existing `scripts/test-*.mjs` convention (plain Node
scripts, no framework):

- **`pruneMissingCovers(blogs, imagesDir)`** (exported; filesystem access is
  confined to an injectable existence check so tests need no real files):
  entry whose file exists → untouched;
  entry whose file is missing → both fields `""`; entry already `""` → untouched;
  empty array → no crash.
- **Fetch script integration:** images dir copied into `public/blog-images/`;
  missing dir does not throw or exit non-zero.
- **Components:** a post with `coverImage` renders one `img`; a post with `""`
  renders no image element and no empty wrapper (no layout gap).

## 10. Out of scope

- **No backfill.** The 238 legacy posts stay image-less (parent spec §2).
- **No card layout redesign** beyond adding the image block.
- **No `verify-safety.mjs` change** in `portfolio-blog` — B established
  `sanitizeImagePath()` as the authoritative guard at the source.
