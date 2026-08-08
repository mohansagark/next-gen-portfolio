import { extractFaqPairs } from "./extractHeadings";

const LINKEDIN = "https://www.linkedin.com/in/mohansagark/";
const SITE = "https://devmohan.in";

/**
 * Build Article + BreadcrumbList (+ FAQPage when FAQ exists) JSON-LD graphs.
 */
export function buildBlogJsonLd(blog, { blogBase, slug } = {}) {
  if (!blog) return null;
  const base = (blogBase || process.env.NEXT_PUBLIC_BLOG_URL || "https://blog.devmohan.in").replace(
    /\/$/,
    ""
  );
  const url = `${base}/${slug || blog.id}`;
  const cover = blog.coverImage
    ? blog.coverImage.startsWith("http")
      ? blog.coverImage
      : `${base}${blog.coverImage}`
    : undefined;

  const article = {
    "@type": "Article",
    headline: blog.title,
    description: blog.summary || blog.desc || undefined,
    datePublished: blog.dateRaw || undefined,
    dateModified: blog.dateRaw || undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      name: blog.author || "Mohan Sagar",
      url: LINKEDIN,
    },
    publisher: {
      "@type": "Organization",
      name: "Dev Mohan",
      url: SITE,
    },
    ...(cover ? { image: [cover] } : {}),
    ...(blog.tags?.length ? { keywords: blog.tags.join(", ") } : {}),
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blogs", item: `${SITE}/blogs` },
      { "@type": "ListItem", position: 3, name: blog.title, item: url },
    ],
  };

  const graph = [article, breadcrumb];
  const faq = extractFaqPairs(blog.html || "");
  if (faq.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faq.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
