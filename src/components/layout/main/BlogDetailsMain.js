"use client";
import BlogDetailsPrimary from "@/components/sections/blog-details/BlogDetailsPrimary";
import HeroBreadcarumb from "@/components/sections/heros/HeroBreadcarumb";
import getABlog from "@/libs/getABlog";
import getBlogs from "@/libs/getBlogs";
import { useParams } from "next/navigation";

const BlogDetailsMain = ({ blog: passedBlog }) => {
  const params = useParams();
  const allBlogs = getBlogs();
  const blogs = allBlogs?.filter(({ isBlogQuote }) => !isBlogQuote);

  // Use the passed blog or get by slug
  const currentSlug = params?.slug;
  const blog = passedBlog || getABlog(currentSlug);

  // Find current blog index for navigation
  const currentIndex = blogs.findIndex((b) => b.id === blog?.id);
  const totalBlogs = blogs.length;

  // Previous and next blog logic
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : null;
  const nextIndex = currentIndex < totalBlogs - 1 ? currentIndex + 1 : null;

  const prevBlog = prevIndex !== null ? blogs[prevIndex] : null;
  const nextBlog = nextIndex !== null ? blogs[nextIndex] : null;

  const isPrevBlog = prevIndex !== null;
  const isNextBlog = nextIndex !== null;

  const { title } = blog || {};

  return (
    <main>
      <HeroBreadcarumb
        title={title ? title : "Blog Details"}
        text={title ? title : "Blog Details"}
        actualItem={"Blogs"}
        path={"/blogs"}
      />
      <BlogDetailsPrimary
        prevId={prevBlog?.id}
        nextId={nextBlog?.id}
        blog={blog}
        pervblog={prevBlog}
        nextblog={nextBlog}
        isPrevBlog={isPrevBlog}
        isNextBlog={isNextBlog}
      />
    </main>
  );
};

export default BlogDetailsMain;
