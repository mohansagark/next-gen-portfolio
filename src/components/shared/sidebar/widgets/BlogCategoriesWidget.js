import countCommentLength from "@/libs/countCommentLength";
import countDataLength from "@/libs/countDataLength";
import filterItems from "@/libs/filterItems";
import getBlogCategories from "@/libs/getBlogCategories";
import getBlogs from "@/libs/getBlogs";
import makePath from "@/libs/makePath";
import Link from "next/link";

const BlogCategoriesWidget = () => {
  const categories = getBlogCategories();
  const blogs = getBlogs();
  return (
    <div
      className="px-15px md:px-25px py-30px bg-cream-light-color dark:bg-primary-color-light rounded-lg wow fadeInUp"
      data-wow-delay=".3s"
    >
      <h3 className="mb-25px text-primary-color dark:text-white-color uppercase relative z-0 text-size-lg md:text-xl font-bold">
        Categories
      </h3>
      {/* <!-- list --> */}

      <ul>
        {categories?.length
          ? categories?.map((category, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between gap-x-5 font-medium"
              >
                <Link
                  href={`/blogs?category=${makePath(category)}`}
                  className={`${
                    idx === 0
                      ? "pb-2 md:pb-10px pt-0"
                      : idx + 1 === countCommentLength(categories)
                      ? "pt-2 md:pt-10px"
                      : "py-2 md:py-10px"
                  }  text-primary-color-light dark:text-white-color hover:text-primary-color dark:hover:text-primary-color  transition-all duration-500`}
                >
                  {category}
                </Link>
                <span className="text-primary-color">
                  (
                  {countDataLength(
                    filterItems(blogs, "category", makePath(category))
                  )}
                  )
                </span>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default BlogCategoriesWidget;
