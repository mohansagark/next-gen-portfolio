import getBlogCategories from "@/libs/getBlogCategories";
import makePath from "@/libs/makePath";
import Link from "next/link";

const BlogCategoriesWidget = () => {
  const categories = getBlogCategories();
  return (
    <div
      className="px-15px md:px-25px py-30px bg-white dark:bg-[#12151a] border border-[#e5e7eb] dark:border-[#262b33] rounded-lg wow fadeInUp"
      data-wow-delay=".3s"
    >
      <h3 className="mb-25px text-[#0b0d10] dark:text-[#f3f4f6] uppercase relative z-0 text-size-lg md:text-xl font-bold">
        Categories
      </h3>

      <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-700 dark:scrollbar-thumb-[#5eead4] scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
        <ul>
          {categories?.length
            ? categories.map(({ category, count }, idx) => (
                <li
                  key={category}
                  className="flex items-center justify-between gap-x-5 font-medium"
                >
                  <Link
                    href={`/blogs?category=${makePath(category)}`}
                    className={`${
                      idx === 0
                        ? "pb-2 md:pb-10px pt-0"
                        : idx + 1 === categories.length
                        ? "pt-2 md:pt-10px"
                        : "py-2 md:py-10px"
                    } text-[#374151] dark:text-[#e5e7eb] hover:text-teal-700 dark:hover:text-[#5eead4] transition-all duration-500`}
                  >
                    {category}
                  </Link>
                  <span className="text-teal-700 dark:text-[#5eead4]">
                    ({count})
                  </span>
                </li>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default BlogCategoriesWidget;
