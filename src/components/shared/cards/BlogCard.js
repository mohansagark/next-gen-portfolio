import makePath from "@/libs/makePath";
import sliceText from "@/libs/sliceText";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({ blog }) => {
  const { id, img, title, blogTopList, category } = blog ? blog : {};
  const showAbleBlogTopList = blogTopList?.slice(1, 3);

  return (
    <div
      className="group relative flex flex-col items-center wow fadeInUp"
      data-wow-delay={`.${5 + id - 1}s`}
    >
      <div className="rounded-10px relative overflow-hidden max-w-400 w-full">
        <Link href={`/blogs/${id}`} className="rounded-10px overflow-hidden">
          <Image
            src={img}
            alt=""
            className="group-hover:scale-110 transition-all duration-500"
            width={1000}
            height={800}
          />
        </Link>
        <Link
          href={`/blogs?category=${makePath(category)}`}
          className="text-size-13 uppercase px-10px py-7px rounded-50px leading-1 absolute top-[15px] left-[15px] text-white-color bg-gradient-secondary-2 bg-200 hover:bg-100"
        >
          {category}
        </Link>
        <div className="absolute left-0 bottom-5 w-full px-10px lg:px-5 transition-all duration-500">
          <div className="relative z-0 p-15px pb-5 bg-white-color dark:bg-seondary-color rounded-15px w-full after:absolute after:top-0 after:left-0 after:w-full after:h-full after:opacity-0 group-hover:after:opacity-100 after:transition-all after:duration-500 after:z-1 after:bg-gradient-primary after:rounded-15px">
            <div className="relative z-10">
              <ul className="flex gap-5 items-center mb-2">
                {showAbleBlogTopList?.length
                  ? showAbleBlogTopList?.map(
                      ({ name, iconName, path }, idx) => (
                        <li
                          key={idx}
                          className="text-sm font-medium text-primary-color group-hover:text-white-color transition-all duration-500"
                        >
                          <i className={`${iconName} mr-0.5`}></i>{" "}
                          {path ? (
                            <Link
                              href={path}
                              className="text-primary-color group-hover:text-white-color transition-all duration-500"
                            >
                              {name}
                            </Link>
                          ) : (
                            name
                          )}
                        </li>
                      )
                    )
                  : ""}
              </ul>
              <Link
                href={`/blogs/${id}`}
                className="text-primary-color-light dark:text-white-color group-hover:text-white-color w-full capitalize"
              >
                <span className="block text-lg md:text-size-22 font-bold">
                  {sliceText(title, 32, true)}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
