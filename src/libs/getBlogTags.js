import getBlogs from "./getBlogs";

// Derive the tag list from the actual posts (like getBlogCategories), instead
// of a static fake-data file. Returns unique tag strings, most-frequent first.
const getBlogTags = () => {
  const blogs = getBlogs();
  const counts = new Map();
  blogs?.forEach((blog) => {
    blog?.tags?.forEach((tag) => {
      if (!tag) return;
      counts.set(tag, (counts.get(tag) || 0) + 1);
    });
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
};

export default getBlogTags;
