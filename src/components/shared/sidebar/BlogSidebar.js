"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import BlogCategoriesWidget from "./widgets/BlogCategoriesWidget";
import RecentBlogWidget from "./widgets/RecentBlogWidget";
import makePath from "@/libs/makePath";
import makeText from "@/libs/makeText";

const BlogSidebar = () => {
  const router = useRouter();
  // Seed the box from the URL so a shared/reloaded ?search= link stays in sync.
  const initialSearch = useSearchParams()?.get("search");
  const [searchTerm, setSearchTerm] = useState(
    initialSearch ? makeText(initialSearch) : ""
  );
  const debounceRef = useRef(null);

  // Live search: the /blogs list filters purely client-side off the ?search=
  // query param, so we just keep the URL in step with the box as the user
  // types (and as they delete). replace() keeps history from filling up with a
  // stop per keystroke.
  const applySearch = (value) => {
    router.replace(
      value.trim() ? `/blogs?search=${makePath(value)}` : "/blogs"
    );
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => applySearch(value), 250);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Submitting applies immediately (skip the debounce).
    clearTimeout(debounceRef.current);
    applySearch(searchTerm);
  };

  return (
    <div className="sidebar lg:col-start-9 lg:col-span-4 pt-10 lg:pt-0 mt-60px lg:mt-0 border-t border-gray-color-3 lg:border-none">
      <div className="flex flex-col gap-30px">
        {/* <!-- search --> */}
        <div
          className="px-15px md:px-25px py-30px bg-cream-light-color dark:bg-primary-color-light rounded-lg wow fadeInUp"
          data-wow-delay=".3s"
        >
          <form onSubmit={handleSearch}>
            <div className="flex">
              {/* <!-- search input --> */}
              <div className="flex-grow">
                <input
                  type="search"
                  value={searchTerm}
                  onChange={handleChange}
                  placeholder="Search blogs & categories..."
                  className="text-white-color w-full pl-5 py-4 border border-gray-color-3 bg-cream-light-color dark:bg-black-color focus:border-primary-color rounded-l-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
                />
              </div>
              <div className="min-h-full">
                <button
                  type="submit"
                  className="w-60px h-full bg-primary-color hover:bg-seondary-color rounded-r-lg text-white-color text-xl inline-flex items-center justify-center transition-all duration-500"
                >
                  <i className="fa-light fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* <!-- categories --> */}
        <BlogCategoriesWidget />
        {/* <!-- recent blogs--> */}
        <RecentBlogWidget />
      </div>
    </div>
  );
};

export default BlogSidebar;
