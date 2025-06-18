"use client";
import BlogDetailsPrimary from "@/components/sections/blog-details/BlogDetailsPrimary";
import HeroBreadcarumb from "@/components/sections/heros/HeroBreadcarumb";
import filter from "@/libs/filter";
import getABlog from "@/libs/getABlog";
import getBlogs from "@/libs/getBlogs";
import { useParams } from "next/navigation";

const BlogDetailsMain = () => {
  const params = useParams();
  const currentId = parseInt(params?.id ? params?.id : 0);
  const allBlogs = getBlogs();
  const blogs = allBlogs?.filter(({ isBlogQuote }) => !isBlogQuote);
  const prevId = currentId > 1 ? currentId - 1 : 1;
  const totalBlog = blogs?.length;
  const nextId = currentId < totalBlog ? currentId + 1 : totalBlog;
  const blog = getABlog(currentId);
  const pervblog = getABlog(prevId);
  const nextblog = getABlog(nextId);
  const isPrevBlog = currentId > 1;
  const isNextBlog = currentId < totalBlog;
  const { title } = blog || {};

  return (
    <main>
      <HeroBreadcarumb
        title={title ? title : "Block Details"}
        text={title ? title : "Blogs Details"}
        actualItem={"Blogs"}
        path={"/blogs"}
      />
      <BlogDetailsPrimary
        prevId={prevId}
        nextId={nextId}
        blog={blog}
        pervblog={pervblog}
        nextblog={nextblog}
        isPrevBlog={isPrevBlog}
        isNextBlog={isNextBlog}
      />
    </main>
  );
};

export default BlogDetailsMain;
