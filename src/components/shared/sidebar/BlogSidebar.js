import BlogCategoriesWidget from "./widgets/BlogCategoriesWidget";
import BlogSearchWidget from "./widgets/BlogSearchWidget";
import PopularTagsNebula from "./widgets/PopularTagsNebula";
import RecentBlogWidget from "./widgets/RecentBlogWidget";

const BlogSidebar = () => {
  return (
    <div className="sidebar order-3 lg:order-2 lg:col-start-9 lg:col-span-4 pt-10 lg:pt-0 mt-60px lg:mt-0 border-t border-gray-color-3 lg:border-none">
      <div className="flex flex-col gap-30px">
        {/* Desktop/right column: search stays with the sidebar */}
        <div className="hidden lg:block">
          <BlogSearchWidget />
        </div>
        <BlogCategoriesWidget />
        <RecentBlogWidget />
        <PopularTagsNebula />
      </div>
    </div>
  );
};

export default BlogSidebar;
