const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://devmohan.in";

// App Router robots: emitted as /robots.txt at build.
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
