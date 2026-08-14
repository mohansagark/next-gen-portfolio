const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://devmohan.in";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/globe-samples", "/globe-samples/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
