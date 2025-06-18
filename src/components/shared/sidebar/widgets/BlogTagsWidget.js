import getBlogTags from "@/libs/getBlogTags";
import makePath from "@/libs/makePath";
import Link from "next/link";

const BlogTagsWidget = () => {
  const tags = getBlogTags();

  return (
    <div
      className="px-15px md:px-25px py-30px bg-cream-light-color dark:bg-primary-color-light rounded-lg wow fadeInUp"
      data-wow-delay=".3s"
    >
      <h3 className="mb-25px text-primary-color dark:text-white-color uppercase relative z-0 text-size-lg md:text-xl font-bold">
        Popular tag
      </h3>
      {/* <!-- list --> */}

      <ul className="flex flex-wrap gap-15px items-center">
        {tags?.length
          ? tags?.map((tag, idx) => (
              <li key={idx} className="font-medium">
                <Link
                  href={`/blogs?tag=${makePath(tag)}`}
                  className="py-10px px-15px hover:bg-primary-color text-primary-color hover:text-white-color dark:text-white-color border border-gray-color-2 hover:border-primary-color capitalize transition-all duration-500 rounded-full leading-1"
                >
                  {tag}
                </Link>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default BlogTagsWidget;
