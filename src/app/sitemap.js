import getBlogs from "@/libs/getBlogs";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://devmohan.in";
// The blog lives on its own subdomain; posts are canonical there.
const BLOG_BASE = process.env.NEXT_PUBLIC_BLOG_URL || "https://blog.devmohan.in";

// App Router sitemap: emitted as /sitemap.xml at build. Lists every blog post
// (on the blog subdomain) so each is crawlable independent of list-page rendering.
export default function sitemap() {
  const blogs = getBlogs() || [];

  const posts = blogs.map((b) => ({
    url: `${BLOG_BASE}/${b.id}`,
    lastModified: new Date(b.dateRaw || b.date || Date.now()),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BLOG_BASE}/`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    ...posts,
  ];
}
