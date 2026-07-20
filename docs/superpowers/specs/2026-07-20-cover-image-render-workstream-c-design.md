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

- **No backfill in C.** The 238 legacy posts stay image-less for now; §11.C
  designs the backfill as separate future work.
- **No card layout redesign** beyond adding the image block.
- **No `verify-safety.mjs` change** in `portfolio-blog` — B established
  `sanitizeImagePath()` as the authoritative guard at the source.

---

# 11. Future workstreams — designed, NOT built

Recorded here so C does not foreclose them. Each needs its own plan before any
code is written. Nothing in this section is implemented.

**Already true, not future work:** image failures never block post creation.
`IMAGE_REQUIRED=false` plus best-effort wrapping means a failed render publishes
the post text-only. Verified in production on run `29752659471`. D below is only
the *retry*, not the fail-soft.

## 11.A. Shared foundation — `attach_cover_to_existing_post()`

D and E are the same operation applied to different input sets: **add a cover to
an already-published post**. Today `daily-dev-digest` can only write covers at
creation time (`build_mdx` composes front-matter for a *new* post). Build this
once, in `daily-dev-digest` beside `build_mdx`, reusing `yaml_utils`.

```
attach_cover_to_existing_post(mdx_path, image_bytes, alt, prompt) -> bool
```

- Splices `image` / `image_alt` / `image_prompt` into existing front-matter,
  leaving the body byte-identical.
- **Idempotent:** a post that already has `image` is skipped, not overwritten.
- Preserves `source_url` adjacency — Workstream A's own review flagged the
  front-matter splice as the riskiest surface in the whole pipeline. Mutating
  published posts amplifies that risk, so this function needs the same
  YAML-parse-and-verify test treatment A's `build_mdx` got.
- Writes `images/<slug>.jpg` alongside.

**Non-negotiable:** dry-run mode that reports what *would* change without
writing. Both D and E depend on it.

## 11.B. Workstream D — retry pipeline

**Derive the work queue; do not maintain a ledger.** A separate list of
"posts awaiting an image" is duplicated state that drifts from reality. The truth
already lives in the repo: any `.mdx` whose `image` front-matter is absent. A
derived scan is idempotent, self-healing, and needs no migration or repair when
it disagrees with the filesystem.

The one piece of real state worth keeping is a **give-up list** — slugs that have
failed N times — so a post that can never render (safety-filtered content, a
permanently broken source) is not retried daily forever. It only grows on
repeated failure, and it is advisory: deleting it just retries everything.

- **Trigger:** second GitHub Actions workflow, cron in the IST afternoon
  (~`30 8 * * *` UTC = 14:00 IST), well clear of the 08:00 IST digest run.
- **Bounded per run:** cap at a handful of posts (e.g. 5) so a systematic
  failure — expired `CF_API_TOKEN`, model deprecation — cannot burn budget or
  spam commits before anyone notices.
- **Flow:** scan for cover-less posts → subtract give-up list → take up to N →
  regenerate brief + image → `attach_cover_to_existing_post()` → commit →
  index rebuild fires on `posts/**` as it already does.

## 11.C. Workstream E — one-time legacy backfill

Same operation across every cover-less post (238 today).

- **Cost estimate first, and it must gate execution.** The script prints the
  estimate and requires explicit confirmation before spending anything.
  Per post = 1 Bedrock Nova Pro call (the brief) + 1 Cloudflare Workers AI FLUX
  render.
  **Do not hardcode rates from memory.** At implementation time, read current
  Bedrock and Cloudflare Workers AI pricing and derive the estimate from
  configured unit prices, so the number is auditable and updatable.
- **Dry-run first:** assemble briefs and prompts for all posts, render none,
  show a sample for quality review. A bad house style caught here costs nothing;
  caught after 238 renders it costs the whole run.
- **Batched + resumable:** 238 network round-trips will be interrupted. Track
  completion by the presence of `image` front-matter (same derived-truth
  principle as D), so a re-run naturally resumes.
- **Git safety:** run on a dedicated branch and commit in batches, so the
  238-file mutation is reviewable and revertible rather than one opaque commit.

## 11.D. Why C stays compatible

C renders whatever `blogs.json` contains, so covers attached later by D or E
appear on the next build with **no frontend change**. The §5 prune step is
explicitly retry-friendly: it blanks references to missing files rather than
discarding posts, so a later backfill simply repopulates them.
