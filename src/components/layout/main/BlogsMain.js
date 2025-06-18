"use client";
import BlogsPrimary from "@/components/sections/blogs/BlogsPrimary";
import HeroBreadcarumb from "@/components/sections/heros/HeroBreadcarumb";
import CommonContext from "@/context_api/CommonContext";
import useSearch from "@/hooks/useSearch";
import filterItems from "@/libs/filterItems";
import getBlogs from "@/libs/getBlogs";
import makeText from "@/libs/makeText";
import { usePathname, useSearchParams } from "next/navigation";

const BlogsMain = () => {
  const allBlogs = getBlogs();
  const category = useSearchParams()?.get("category");
  const tag = useSearchParams()?.get("tag");
  const author_role = useSearchParams()?.get("author_role");
  const currentPath = usePathname();
  const search = useSearchParams()?.get("search");
  // get searched blogs
  const {
    searchedItems,
    isShowSearch,
    handleSearch,
    handleSearchString,
    startSearch,
    closeSearch,
    isShowQuickSearchResult,
    setIsShowQuickSearchResult,
  } = useSearch(allBlogs, currentPath);

  const filteredBlogs = filterItems(
    allBlogs,
    category
      ? "category"
      : tag
      ? "tags"
      : author_role
      ? "role"
      : search
      ? "search"
      : "",
    category
      ? category
      : tag
      ? tag
      : author_role
      ? author_role
      : search
      ? search
      : ""
  );

  return (
    <main>
      <HeroBreadcarumb
        title={
          category
            ? `Category: ${makeText(category)}`
            : tag
            ? `Tag: ${makeText(tag)}`
            : author_role
            ? `Author Role: ${author_role}`
            : search
            ? `Search: ${makeText(search)}`
            : "Blogs"
        }
        text={
          category
            ? `${makeText(category)}`
            : tag
            ? ` ${makeText(tag)}`
            : author_role
            ? `${author_role}`
            : search
            ? `${makeText(search)}`
            : "Blogs"
        }
        actualItem={category || tag || author_role || search ? "Blogs" : false}
        path={category || tag || author_role || search ? "/blogs" : false}
        isBlog={true}
      />
      <CommonContext value={{ filteredBlogs }}>
        <BlogsPrimary />
      </CommonContext>
    </main>
  );
};

export default BlogsMain;
