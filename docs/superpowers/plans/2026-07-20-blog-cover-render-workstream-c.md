# Blog Cover Rendering — Workstream C (next-gen-portfolio) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Copy generated cover images into the site and render them on the blog card (16:9) and the article page (below the lead, above the body), so the covers produced by Workstreams A and B finally appear on devmohan.in.

**Architecture:** `fetch-blog-content.mjs` gains a cover-image directory copy plus a `pruneMissingCovers()` guard that blanks any `coverImage` whose file did not arrive — this keeps the gitignored image directory from producing broken `<img>` tags when the fail-soft backup path runs. Two components then render `coverImage` gated on truthiness, so the 238 legacy posts are visually unchanged.

**Tech Stack:** Next.js (App Router), `next/image`, Tailwind, Node ESM, `node:assert/strict` test scripts.

## Global Constraints

- **Branch:** all work lands on `feature/blog-cover-render`. Do NOT commit to `master`.
- **Field contract (from Workstream B, commit `860c8e9`):** `coverImage` and `coverImageAlt` are **always present** on every `blogs.json` entry, `""` when absent. Test **truthiness**, never key presence (`'coverImage' in entry` is always true and is a bug).
- **Do NOT re-sanitize `coverImage`.** Workstream B's `sanitizeImagePath()` is the authoritative guard at the source; the value is either `""` or a safe `/blog-images/<name>.jpg`.
- **Missing cover renders NO image block** — no placeholder, no empty wrapper, no layout gap.
- **Zero new dependencies.** Use Node built-ins and the packages already in `package.json`.
- **Test convention:** plain `node scripts/test-*.mjs` scripts with top-level `node:assert/strict` assertions, matching `scripts/test-content-mapping.mjs`. Do NOT add a test framework and do NOT use `node --test`.
- **`blogs.json` serialization:** always write with `JSON.stringify(blogs, null, 2)` — this matches `build-index.mjs:277` and keeps the committed backup diff-free.

---

## File Structure

- **Modify** `scripts/fetch-blog-content.mjs` — add `IMAGES_FROM`/`IMAGES_TO`, `copyImages()`, exported `pruneMissingCovers()`, `applyPrune()`; guard the auto-run so tests can import it.
- **Create** `scripts/test-cover-prune.mjs` — assertions for `pruneMissingCovers()`.
- **Modify** `.gitignore` — ignore `public/blog-images/`.
- **Modify** `src/components/shared/blogs/BlogSingle.js` — replace the `TODO` + dead Swiper comment block with a 16:9 cover.
- **Modify** `src/components/sections/blog-details/BlogDetailsPrimary.js` — cover between the lead and the body.

---

### Task 1: Cover image copy + stale-reference pruning

**Files:**
- Modify: `scripts/fetch-blog-content.mjs`
- Create: `scripts/test-cover-prune.mjs`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: `public/blogs.json` entries with `coverImage: string` / `coverImageAlt: string` (Workstream B).
- Produces: exported `pruneMissingCovers(blogs, exists) -> number`, where `blogs` is the parsed `blogs.json` array (mutated in place) and `exists` is `(filename: string) => boolean` taking a bare filename such as `"my-post.jpg"`. Returns the count pruned. Also produces the populated `public/blog-images/` directory that Tasks 2 and 3 render from.

> **Signature note:** spec §9 sketched this as `pruneMissingCovers(blogs, imagesDir)`. This plan passes the `exists` predicate directly instead, so the function never touches the filesystem and tests need no fixture files. The caller (`applyPrune`) binds the directory.

- [ ] **Step 1: Write the failing test**

Create `scripts/test-cover-prune.mjs`:

```js
import assert from 'node:assert/strict';
import { pruneMissingCovers } from './fetch-blog-content.mjs';

// A cover whose file is present is left completely alone.
{
  const blogs = [{ slug: 'a', coverImage: '/blog-images/a.jpg', coverImageAlt: 'alt a' }];
  const pruned = pruneMissingCovers(blogs, (f) => f === 'a.jpg');
  assert.equal(pruned, 0);
  assert.equal(blogs[0].coverImage, '/blog-images/a.jpg');
  assert.equal(blogs[0].coverImageAlt, 'alt a');
}

// A cover whose file is missing has BOTH fields blanked.
{
  const blogs = [{ slug: 'b', coverImage: '/blog-images/b.jpg', coverImageAlt: 'alt b' }];
  const pruned = pruneMissingCovers(blogs, () => false);
  assert.equal(pruned, 1);
  assert.equal(blogs[0].coverImage, '');
  assert.equal(blogs[0].coverImageAlt, '');
}

// A legacy post already at "" is untouched and NOT counted as pruned.
{
  const blogs = [{ slug: 'c', coverImage: '', coverImageAlt: '' }];
  const pruned = pruneMissingCovers(blogs, () => false);
  assert.equal(pruned, 0);
  assert.equal(blogs[0].coverImage, '');
}

// Empty input does not throw.
assert.equal(pruneMissingCovers([], () => true), 0);

// Mixed set: only the missing one is pruned.
{
  const blogs = [
    { slug: 'a', coverImage: '/blog-images/a.jpg', coverImageAlt: 'a' },
    { slug: 'b', coverImage: '/blog-images/b.jpg', coverImageAlt: 'b' },
    { slug: 'c', coverImage: '', coverImageAlt: '' },
  ];
  const pruned = pruneMissingCovers(blogs, (f) => f === 'a.jpg');
  assert.equal(pruned, 1);
  assert.equal(blogs[0].coverImage, '/blog-images/a.jpg');
  assert.equal(blogs[1].coverImage, '');
  assert.equal(blogs[2].coverImage, '');
}

// A malformed entry must not crash the build.
{
  const blogs = [{ slug: 'd' }, { slug: 'e', coverImage: null }];
  assert.equal(pruneMissingCovers(blogs, () => false), 0);
}

console.log('✓ cover prune tests passed');
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node scripts/test-cover-prune.mjs`
Expected: FAIL — `SyntaxError: The requested module './fetch-blog-content.mjs' does not provide an export named 'pruneMissingCovers'`.

If instead it fails with `ERR_MODULE_NOT_FOUND`, run `npm install` first and re-run — the failure must be the missing export, otherwise the test is not proving anything.

- [ ] **Step 3: Add the image copy and prune functions**

(3a) In `scripts/fetch-blog-content.mjs`, add to the imports at the top:

```js
import { pathToFileURL } from "node:url";
```

(3b) Directly below the existing `COPIES` array, add:

```js
// Cover images are optional: unlike the three JSON files above, a missing
// images/ dir must never fail the build. They are gitignored here because they
// are already versioned in portfolio-blog.
const IMAGES_FROM = "images";
const IMAGES_TO = "public/blog-images";
```

(3c) Below the existing `log()` function, add both functions:

```js
// blogs.json can reference a cover whose file never arrived — the clone failed
// and we fell back to the committed backup JSON, or images/ was absent. Blank
// those references so the frontend renders its no-image fallback instead of a
// broken <img>. `exists` takes a bare filename, e.g. "my-post.jpg".
export function pruneMissingCovers(blogs, exists) {
  let pruned = 0;
  for (const entry of blogs) {
    const src = entry?.coverImage;
    if (typeof src !== "string" || src === "") continue;
    const file = src.split("/").pop();
    if (exists(file)) continue;
    entry.coverImage = "";
    entry.coverImageAlt = "";
    pruned += 1;
  }
  return pruned;
}

function applyPrune() {
  const jsonPath = path.join(ROOT, "public/blogs.json");
  if (!fs.existsSync(jsonPath)) return;
  const imagesDir = path.join(ROOT, IMAGES_TO);
  const have = fs.existsSync(imagesDir)
    ? new Set(fs.readdirSync(imagesDir))
    : new Set();
  const blogs = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const pruned = pruneMissingCovers(blogs, (f) => have.has(f));
  if (pruned > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(blogs, null, 2));
    log(`Pruned ${pruned} cover reference(s) with no image file.`);
  }
}

function copyImages(tmp) {
  const src = path.join(tmp, IMAGES_FROM);
  const dest = path.join(ROOT, IMAGES_TO);
  if (!fs.existsSync(src)) {
    log(`No ${IMAGES_FROM}/ in ${REPO} — skipping cover images.`);
    return 0;
  }
  fs.mkdirSync(dest, { recursive: true });
  let n = 0;
  for (const f of fs.readdirSync(src)) {
    if (!f.toLowerCase().endsWith(".jpg")) continue;
    fs.copyFileSync(path.join(src, f), path.join(dest, f));
    n += 1;
  }
  log(`Copied ${n} cover image(s).`);
  return n;
}
```

- [ ] **Step 4: Wire prune into the fail-soft backup path**

In `keepBackup()`, add the `applyPrune()` call immediately before the successful exit. Replace:

```js
  if (ok) {
    log("Using committed backup copies — build continues.");
    process.exit(0);
  }
```

with:

```js
  if (ok) {
    log("Using committed backup copies — build continues.");
    // The backup JSON may name covers that were never committed (the image dir
    // is gitignored), so prune before the frontend can render a broken <img>.
    applyPrune();
    process.exit(0);
  }
```

- [ ] **Step 5: Wire the copy and prune into the success path**

In `run()`, replace:

```js
  const count = JSON.parse(fs.readFileSync(path.join(ROOT, "public/blogs.json"), "utf-8")).length;
  log(`Fetched ${count} posts from ${REPO}@${BRANCH}.`);
```

with:

```js
  copyImages(tmp);
  applyPrune();

  const count = JSON.parse(fs.readFileSync(path.join(ROOT, "public/blogs.json"), "utf-8")).length;
  log(`Fetched ${count} posts from ${REPO}@${BRANCH}.`);
```

- [ ] **Step 6: Guard the auto-run so the module is importable**

At the bottom of the file, replace:

```js
run();
```

with:

```js
// Only run the fetch when invoked directly (not when imported by tests).
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  run();
}
```

- [ ] **Step 7: Run the tests — verify they pass**

Run: `node scripts/test-cover-prune.mjs`
Expected: `✓ cover prune tests passed`, exit code 0.

- [ ] **Step 8: Gitignore the copied images**

Append to `.gitignore`:

```
# Cover images are copied from portfolio-blog at build time
public/blog-images/
```

- [ ] **Step 9: Integration check — fetch still works end-to-end**

Run: `npm run fetch:blogs`
Expected (no `PORTFOLIO_BLOG_TOKEN` set locally): the script logs
`WARN: PORTFOLIO_BLOG_TOKEN not set` then `Using committed backup copies — build continues.`
and exits 0. Because no images exist locally yet, it should also log
`Pruned 2 cover reference(s) with no image file.` — the two covered posts in the committed backup.

Confirm the build did not break and the prune actually applied:

```bash
node -e "const b=require('./public/blogs.json'); console.log('with cover:', b.filter(e=>e.coverImage).length, '/', b.length);"
```

Expected: `with cover: 0 / 240` — correct, because the images are not present locally. On Vercel (where the token is set) the copy runs first and the count will be non-zero.

- [ ] **Step 10: Commit**

```bash
git add scripts/fetch-blog-content.mjs scripts/test-cover-prune.mjs .gitignore public/blogs.json
git commit -m "feat: copy cover images at build time and prune stale references"
```

---

### Task 2: Render the cover on the blog card (16:9)

**Files:**
- Modify: `src/components/shared/blogs/BlogSingle.js:1-64`

**Interfaces:**
- Consumes: `blog.coverImage` (string, `""` when absent) and `blog.coverImageAlt` (string) from Task 1's pruned `public/blogs.json`.
- Produces: no exports. Visual only.

- [ ] **Step 1: Add the `next/image` import**

In `src/components/shared/blogs/BlogSingle.js`, add below the existing `Link` import:

```js
import Image from "next/image";
```

- [ ] **Step 2: Destructure the two new fields**

Replace:

```js
  const { id, title, desc, blogTopList, category, author, comments } = blog
    ? blog
    : {};
```

with:

```js
  const {
    id,
    title,
    desc,
    blogTopList,
    category,
    author,
    comments,
    coverImage,
    coverImageAlt,
  } = blog ? blog : {};
```

- [ ] **Step 3: Replace the TODO and the dead Swiper block with the cover**

Delete lines 15–64 — that is the `{/* TODO: BLOG IMAGE LOGIC IS HERE */}` comment **and** the entire commented-out Swiper/`detailsImg` block that follows it, ending at the line `        </div> */}`. Replace all of it with:

```jsx
        {coverImage ? (
          <Link
            href={`/blogs/${id}`}
            className="block relative aspect-[16/9] overflow-hidden rounded-t-lg"
          >
            <Image
              src={coverImage}
              alt={coverImageAlt || ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-all duration-[.8s]"
            />
          </Link>
        ) : null}
```

Notes for the implementer:
- `fill` requires a positioned ancestor — the `relative` on the `Link` provides it. Do not remove it.
- `alt={coverImageAlt || ""}` is deliberate: an empty alt marks the cover decorative so a screen reader skips it rather than announcing it next to the post title it just read.
- The category `<Link>` immediately below is absolutely positioned `top-[15px] right-[15px]`. Leave it exactly as-is — with a cover present it now sits on the image, which is the original design intent, and without one it renders as it does today.

- [ ] **Step 4: Verify both branches render correctly**

Run: `npm run dev`

Open `http://localhost:3000/blogs` and confirm:
- The two posts with covers show a 16:9 image with the category pill on top of it.
- Every other card looks **exactly** as before — no gap, no empty box, no shifted spacing.

Note: covers only appear locally if `public/blog-images/` is populated. If it is empty (expected without a token), Task 1's prune blanks every `coverImage` and **all** cards render text-only — that is correct behavior, not a bug. To see a real cover locally, copy one in first:

```bash
mkdir -p public/blog-images && cp ~/Documents/portfolio-blog/images/*.jpg public/blog-images/ && npm run fetch:blogs
```

- [ ] **Step 5: Commit**

```bash
git add src/components/shared/blogs/BlogSingle.js
git commit -m "feat: render 16:9 cover image on blog cards"
```

---

### Task 3: Render the cover on the article page

**Files:**
- Modify: `src/components/sections/blog-details/BlogDetailsPrimary.js:1-100`

**Interfaces:**
- Consumes: `blog.coverImage`, `blog.coverImageAlt` — same contract as Task 2.
- Produces: no exports. Visual only.

- [ ] **Step 1: Add the `next/image` import**

In `src/components/sections/blog-details/BlogDetailsPrimary.js`, add below the existing `Link` import:

```js
import Image from "next/image";
```

- [ ] **Step 2: Destructure the two new fields**

Replace:

```js
  const {
    title,
    desc,
    blogTopList,
    category,
    author,
    comments,
    tags,
    keyTakeaways,
  } = blog ? blog : {};
```

with:

```js
  const {
    title,
    desc,
    blogTopList,
    category,
    author,
    comments,
    tags,
    keyTakeaways,
    coverImage,
    coverImageAlt,
  } = blog ? blog : {};
```

- [ ] **Step 3: Insert the cover between the lead and the body**

Find the lead/summary block and the post body block (around lines 89–100). Insert the cover **between** them — that is, immediately after the closing `) : null}` of the lead block and immediately before the `{/* post body: ... */}` comment:

```jsx
                {/* cover image (absent on legacy posts) */}
                {coverImage ? (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-8">
                    <Image
                      src={coverImage}
                      alt={coverImageAlt || ""}
                      fill
                      sizes="(max-width: 1024px) 100vw, 800px"
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : null}
```

Notes for the implementer:
- This places the cover after the title, byline and lead, and directly above the body — the approved layout.
- `priority` is correct here and **only** here: this is the article's above-the-fold hero. Do not add `priority` to the card image in Task 2, which would preload every image in the grid.

- [ ] **Step 4: Verify both branches render correctly**

Run: `npm run dev`

- Open a covered post, e.g. `http://localhost:3000/blogs/crafting-a-high-velocity-internal-developer-platform-with-ba` — the cover appears below the lead, above the body.
- Open any legacy post — the article renders exactly as before, with no gap where the image would be.

(Same local caveat as Task 2 Step 4: populate `public/blog-images/` first to see a real cover.)

- [ ] **Step 5: Run the full build**

Run: `npm run build`
Expected: build succeeds. `next/image` needs no `remotePatterns` change because `/blog-images/…` is a site-relative static asset served from `public/`.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/blog-details/BlogDetailsPrimary.js
git commit -m "feat: render cover image on the article page"
```

---

## Self-Review

- **Spec coverage:**
  - §3 decisions → 16:9 (Task 2 Step 3), article placement (Task 3 Step 3), no-image fallback (Tasks 2–3 truthiness gates), gitignore (Task 1 Step 8), prune (Task 1 Steps 3–5).
  - §5 pruning on **both** paths → Task 1 Step 4 (`keepBackup`) and Step 5 (`run`). Both are required; wiring only one leaves the broken-image hole open.
  - §6 all four files → Tasks 1–3.
  - §7 no `next/image` config change → Task 3 Step 5 verifies the build.
  - §8 failure modes → Task 1 Step 9 exercises the no-token path directly.
  - §9 testing → Task 1 Step 1 covers prune; component branches verified in Task 2 Step 4 and Task 3 Step 4.
  - §11 future work → intentionally NOT implemented; no task, by instruction.
- **Placeholder scan:** none — every code step contains complete code, every run step an exact command and expected output.
- **Type consistency:** `pruneMissingCovers(blogs, exists) -> number` is defined in Task 1 and not called anywhere else; `coverImage` / `coverImageAlt` are spelled identically in Tasks 1, 2 and 3 and match Workstream B's emitted field names exactly.
- **Deliberate non-goal (YAGNI):** no card layout redesign, no backfill, no `verify-safety.mjs` change, no re-sanitizing of `coverImage` in C.
