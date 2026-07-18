import BlogDetailsMain from "@/components/layout/main/BlogDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import getBlogs from "@/libs/getBlogs";
import { notFound } from "next/navigation";

const blogs = getBlogs();

const BLOG_BASE = process.env.NEXT_PUBLIC_BLOG_URL || "https://blog.devmohan.in";

export async function generateMetadata(context) {
  const { slug } = await context.params;
  const blog = blogs?.find((b) => b.id === slug);
  return {
    title: blog?.title ? `${blog.title} — Dev Mohan` : "Blog — Dev Mohan",
    description: blog?.summary || "Developer blog by Mohan Sagar.",
    alternates: { canonical: `${BLOG_BASE}/${slug}` },
    openGraph: {
      title: blog?.title,
      description: blog?.summary,
      url: `${BLOG_BASE}/${slug}`,
      type: "article",
    },
  };
}

export default async function BlogDetails(context) {
  const { slug } = await context.params;

  const isExistBlog = blogs?.find((blog) => blog.id === slug);
  if (!isExistBlog) {
    notFound();
  }

  return (
    <PageWrapper isInnerPage={true}>
      <BlogDetailsMain blog={isExistBlog} />
    </PageWrapper>
  );
}

export async function generateStaticParams() {
  return blogs?.map(({ id }) => ({ slug: String(id) }));
}
