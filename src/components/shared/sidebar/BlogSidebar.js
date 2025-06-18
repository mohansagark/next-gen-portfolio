import Image from "next/image";
import Link from "next/link";
import BlogCategoriesWidget from "./widgets/BlogCategoriesWidget";
import BlogTagsWidget from "./widgets/BlogTagsWidget";
import RecentBlogWidget from "./widgets/RecentBlogWidget";

const BlogSidebar = () => {
  return (
    <div className="sidebar lg:col-start-9 lg:col-span-4 pt-10 lg:pt-0 mt-60px lg:mt-0 border-t border-gray-color-3 lg:border-none">
      <div className="flex flex-col gap-30px">
        {/* <!-- search --> */}
        <div
          className="px-15px md:px-25px py-30px bg-cream-light-color dark:bg-primary-color-light rounded-lg wow fadeInUp"
          data-wow-delay=".3s"
        >
          <form>
            <div className="flex">
              {/* <!-- first name --> */}
              <div className="flex-grow">
                <input
                  type="search"
                  placeholder="Search..."
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
        {/* <!-- tags --> */}
        <BlogTagsWidget />
      </div>
    </div>
  );
};

export default BlogSidebar;
