import BlogDetailsMain from "@/components/layout/main/BlogDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import getBlogs from "@/libs/getBlogs";
import { notFound } from "next/navigation";

const blogs = getBlogs();

export const metadata = {
  title: "Blog Details - Dev Mohan - Personal Portfolio React NextJs Template",
  description:
    "Blog Details - Dev Mohan - Personal Portfolio React NextJs Template",
};

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
