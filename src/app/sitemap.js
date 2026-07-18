import getBlogs from "@/libs/getBlogs";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://devmohan.in";

// App Router sitemap: emitted as /sitemap.xml at build. Lists every blog post
// so each is crawlable independent of how the /blogs list page renders.
export default function sitemap() {
  const blogs = getBlogs() || [];

  const posts = blogs.map((b) => ({
    url: `${BASE}/blogs/${b.id}`,
    lastModified: new Date(b.dateRaw || b.date || Date.now()),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/blogs", priority: 0.8, changeFrequency: "daily" },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  return [...staticRoutes, ...posts];
}
