import getBlogs from "./getBlogs";

/**
 * Categories sorted by post count descending (name ascending on ties).
 * @returns {{ category: string, count: number }[]}
 */
const getBlogCategories = () => {
  const blogs = getBlogs();
  const counts = {};

  for (const blog of blogs || []) {
    if (!blog?.category) continue;
    counts[blog.category] = (counts[blog.category] || 0) + 1;
  }

  return Object.entries(counts)
    .sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0], undefined, { sensitivity: "base" })
    )
    .map(([category, count]) => ({ category, count }));
};

export default getBlogCategories;
