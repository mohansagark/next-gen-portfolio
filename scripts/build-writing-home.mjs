#!/usr/bin/env node
/**
 * Slim homepage writing list so the home route does not bundle public/blogs.json (~2.4MB).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const blogs = JSON.parse(
  fs.readFileSync(path.join(root, "public/blogs.json"), "utf8"),
);
const writingPath = path.join(root, "public/fakedata/writing.json");
const writing = fs.existsSync(writingPath)
  ? JSON.parse(fs.readFileSync(writingPath, "utf8"))
  : {};
const preferred = writing.preferredSlugs || [];
const limit = Math.max(1, Number(writing.homepageLimit) || 3);
const imagesDir = path.join(root, "public/blog-images");
const have = fs.existsSync(imagesDir)
  ? new Set(fs.readdirSync(imagesDir))
  : new Set();

function resolveCover(b) {
  const raw = b.coverImage || b.img || b.image || "";
  if (raw) {
    const file = raw.split("/").pop();
    if (file && have.has(file)) return `/blog-images/${file}`;
    if (raw.startsWith("http") || raw.startsWith("//")) return raw;
  }
  // Covers are often stored as {id}.jpg even when blogs.json coverImage was pruned.
  const id = b.id || b.slug;
  if (id && have.has(`${id}.jpg`)) return `/blog-images/${id}.jpg`;
  if (id && have.has(`${id}.jpeg`)) return `/blog-images/${id}.jpeg`;
  if (id && have.has(`${id}.png`)) return `/blog-images/${id}.png`;
  return "";
}

const filtered = (blogs || []).filter((b) => !b.isBlogQuote);
const pick = preferred
  .map((id) => filtered.find((b) => b.id === id || b.slug === id))
  .filter(Boolean);
const items = (pick.length ? pick : filtered).slice(0, limit).map((b) => ({
  id: b.id,
  slug: b.slug || b.id,
  title: b.title,
  date: b.date || b.dateRaw || "",
  coverImage: resolveCover(b),
}));
const out = path.join(root, "public/writing-home.json");
fs.writeFileSync(out, JSON.stringify(items, null, 2) + "\n");
console.log(
  `[build-writing-home] wrote ${items.length} posts → ${out} (covers: ${items.filter((i) => i.coverImage).length})`,
);
