import BlogQuote from "@/components/shared/blogs/BlogQuote";
import BlogSingle from "@/components/shared/blogs/BlogSingle";
import Paginations from "@/components/shared/others/Paginations";
import BlogSidebar from "@/components/shared/sidebar/BlogSidebar";
import BlogSearchWidget from "@/components/shared/sidebar/widgets/BlogSearchWidget";
import { useCommonContext } from "@/context_api/CommonContext";
import usePagination from "@/hooks/usePagination";
import React from "react";

const BlogsPrimary = () => {
  const { filteredBlogs } = useCommonContext();
  const limit = 6;
  // get pagination details
  const {
    currentItems,
    currentpage,
    setCurrentpage,
    paginationItems,
    currentPaginationItems,
    totalPages,
    handleCurrentPage,
    firstItem,
    lastItem,
  } = usePagination(filteredBlogs, limit);
  const totalBlogs = filteredBlogs?.length;
  const totalBlogsToShow = currentItems?.length;
  return (
    <section id="blogs" className="scroll-mt-24 lg:scroll-mt-28">
      <div className="py-12 sm:py-16 md:py-20 bg-[#f3f4f6] dark:bg-black-color">
        <div className="container">
          <div className="flex flex-col gap-10 lg:grid lg:gap-6 lg:grid-cols-12">
            {/* Mobile only: search above the blog list */}
            <div className="order-1 lg:hidden">
              <BlogSearchWidget />
            </div>

            {/* <!-- blogs --> */}
            <div className="order-2 lg:order-1 flex flex-col gap-10 lg:col-start-1 lg:col-span-8">
              {currentItems?.length
                ? currentItems?.map((blog, idx) =>
                    blog?.isBlogQuote ? (
                      <BlogQuote key={idx} blog={blog} />
                    ) : (
                      <BlogSingle key={idx} blog={blog} />
                    )
                  )
                : ""}

              {/* <!-- pagination --> */}
              {totalBlogsToShow < totalBlogs ? (
                <Paginations
                  paginationDetails={{
                    currentItems,
                    currentpage,
                    setCurrentpage,
                    paginationItems,
                    currentPaginationItems,
                    totalPages,
                    handleCurrentPage,
                    firstItem,
                    lastItem,
                  }}
                />
              ) : (
                ""
              )}
            </div>

            {/* Categories / recent / tags: after posts on mobile, right column on desktop */}
            <BlogSidebar mobileSearchElsewhere />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsPrimary;
