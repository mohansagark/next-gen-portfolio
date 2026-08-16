import getBlogs from "@/libs/getBlogs";
import { fetchAllContent } from "@/libs/portfolioData";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://devmohan.in";
const BLOG_BASE = process.env.NEXT_PUBLIC_BLOG_URL || "https://blog.devmohan.in";

export default async function sitemap() {
  const blogs = getBlogs() || [];
  const content = await fetchAllContent();
  const workItems = content.portfolio || [];
  const capabilities = (content.capabilities?.items || []).filter((c) => c.page);

  const posts = blogs.map((b) => ({
    url: `${BLOG_BASE}/${b.id}`,
    lastModified: new Date(b.dateRaw || b.date || Date.now()),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const work = workItems
    .filter((c) => c.slug)
    .map((c) => ({
      url: `${BASE}/work/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const capabilityRoutes = capabilities
    .filter((c) => c.slug)
    .map((c) => ({
      url: `${BASE}/capabilities/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BLOG_BASE}/`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    ...work,
    ...capabilityRoutes,
    ...posts,
  ];
}
