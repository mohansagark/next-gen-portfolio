import getBlogs from "./getBlogs";

// Popular tags with their post counts, most-frequent-first. Mirrors
// getBlogTags (which returns bare strings for the sidebar widget) but keeps
// the count so weight-driven UIs (e.g. the nebula) can size by frequency.
const getPopularTags = () => {
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
    .map(([tag, count]) => ({ tag, count }));
};

export default getPopularTags;
