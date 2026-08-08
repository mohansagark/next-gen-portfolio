import BlogDetailsMain from "@/components/layout/main/BlogDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { buildBlogJsonLd } from "@/libs/blogJsonLd";
import getBlogs from "@/libs/getBlogs";
import { notFound } from "next/navigation";

const blogs = getBlogs();

const BLOG_BASE = process.env.NEXT_PUBLIC_BLOG_URL || "https://blog.devmohan.in";

export async function generateMetadata(context) {
  const { slug } = await context.params;
  const blog = blogs?.find((b) => b.id === slug);
  // Social cards need an absolute URL; coverImage is stored site-relative.
  // Legacy posts have coverImage === "", so images stays undefined and the
  // card degrades to a text-only preview rather than a broken thumbnail.
  const cover = blog?.coverImage ? `${BLOG_BASE}${blog.coverImage}` : null;
  const images = cover
    ? [{ url: cover, width: 800, height: 800, alt: blog?.coverImageAlt || blog?.title }]
    : undefined;
  return {
    title: blog?.title ? `${blog.title} — Dev Mohan` : "Blog — Dev Mohan",
    description: blog?.summary || "Developer blog by Mohan Sagar.",
    alternates: { canonical: `${BLOG_BASE}/${slug}` },
    openGraph: {
      title: blog?.title,
      description: blog?.summary,
      url: `${BLOG_BASE}/${slug}`,
      type: "article",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: cover ? "summary_large_image" : "summary",
      title: blog?.title,
      description: blog?.summary,
      ...(cover ? { images: [cover] } : {}),
    },
  };
}

export default async function BlogDetails(context) {
  const { slug } = await context.params;

  const isExistBlog = blogs?.find((blog) => blog.id === slug);
  if (!isExistBlog) {
    notFound();
  }

  const jsonLd = buildBlogJsonLd(isExistBlog, {
    blogBase: BLOG_BASE,
    slug,
  });

  return (
    <PageWrapper isInnerPage={true}>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <BlogDetailsMain blog={isExistBlog} />
    </PageWrapper>
  );
}

export async function generateStaticParams() {
  return blogs?.map(({ id }) => ({ slug: String(id) }));
}
