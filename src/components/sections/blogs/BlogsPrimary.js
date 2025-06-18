import BlogQuote from "@/components/shared/blogs/BlogQuote";
import BlogSingle from "@/components/shared/blogs/BlogSingle";
import Paginations from "@/components/shared/others/Paginations";
import BlogSidebar from "@/components/shared/sidebar/BlogSidebar";
import { useCommonContext } from "@/context_api/CommonContext";
import usePagination from "@/hooks/usePagination";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
    <section id="blogs">
      <div className="py-60px md:py-20 lg:py-100px xl:py-30 dark:bg-black-color">
        <div className="container">
          <div className="lg:grid lg:gap-6 lg:grid-cols-12">
            {/* <!-- blogs --> */}
            <div className="flex flex-col gap-10 lg:col-start-1 lg:col-span-8">
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
            {/* <!-- sidebar --> */}
            <BlogSidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsPrimary;
