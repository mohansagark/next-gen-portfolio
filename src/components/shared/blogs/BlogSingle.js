import makePath from "@/libs/makePath";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import countCommentLength from "@/libs/countCommentLength";
import AuthorDisplay from "@/components/shared/AuthorDisplay";

const categoryPillClass =
  "text-size-13 uppercase px-15px py-10px rounded-50px leading-1 text-white-color bg-gradient-secondary-2 bg-200 hover:bg-100";

const BlogSingle = ({ blog }) => {
  const {
    id,
    title,
    desc,
    blogTopList,
    category,
    author,
    comments,
    coverImage,
    coverImageAlt,
  } = blog ? blog : {};

  const renderMetaItems = (keyPrefix) => (
    <>
      {blogTopList?.length
        ? blogTopList.map(({ iconName, name, path }, idx) => (
            <li
              key={`${keyPrefix}-${idx}`}
              className="text-primary-color dark:text-white-color"
            >
              {path ? (
                <AuthorDisplay
                  author={author || name}
                  className="text-primary-color dark:text-white-color"
                />
              ) : (
                <>
                  <i
                    className={`${iconName} mr-1 text-primary-color transition-all duration-500`}
                  ></i>{" "}
                  {name}
                </>
              )}
            </li>
          ))
        : null}
      {comments && comments.length > 0 ? (
        <li
          key={`${keyPrefix}-comments`}
          className="text-primary-color dark:text-white-color"
        >
          <i className="fa-regular fa-comments mr-1 text-primary-color transition-all duration-500"></i>{" "}
          <Link
            href={`/blogs/${id}#comment-reply`}
            className="text-primary-color dark:text-white-color hover:text-primary-color transition-all duration-500"
          >
            Comments ({countCommentLength(comments)})
          </Link>
        </li>
      ) : null}
    </>
  );

  return (
    <article className="group relative  wow fadeInUp" data-wow-delay=".3s">
      <div className="rounded-lg relative overflow-hidden bg-cream-light-color dark:bg-primary-color-light">
        {coverImage ? (
          <div className="relative">
            <Link
              href={`/blogs/${id}`}
              className="block relative aspect-[16/9] overflow-hidden rounded-t-lg"
            >
              <Image
                src={coverImage}
                alt={coverImageAlt || ""}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-all duration-[.8s]"
              />
            </Link>
            {category ? (
              <Link
                href={`/blogs?category=${makePath(category)}`}
                className={`${categoryPillClass} absolute top-[15px] right-[15px] z-10`}
              >
                {category}
              </Link>
            ) : null}
          </div>
        ) : category ? (
          // No cover, desktop: previous absolute top-right tag
          <Link
            href={`/blogs?category=${makePath(category)}`}
            className={`${categoryPillClass} absolute top-[15px] right-[15px] z-10 hidden md:inline-flex`}
          >
            {category}
          </Link>
        ) : null}

        <div className="py-25px px-15px md:p-30px -mt-10px">
          <div className="transition-all duration-500">
            <div className="relative z-0">
              <div className="relative z-10">
                {!coverImage ? (
                  <>
                    {/* Mobile: date + author stacked left, tag right */}
                    <div className="flex md:hidden items-start justify-between gap-3 mb-5">
                      <ul className="flex flex-col gap-2 min-w-0">
                        {renderMetaItems("mobile")}
                      </ul>
                      {category ? (
                        <Link
                          href={`/blogs?category=${makePath(category)}`}
                          className={`${categoryPillClass} shrink-0`}
                        >
                          {category}
                        </Link>
                      ) : null}
                    </div>
                    {/* Desktop: previous horizontal meta row */}
                    <ul className="hidden md:flex flex-wrap gap-x-15px gap-y-10px md:gap-25px items-center mb-5">
                      {renderMetaItems("desktop")}
                    </ul>
                  </>
                ) : (
                  <ul className="flex flex-wrap gap-x-15px gap-y-10px md:gap-25px items-center mb-5">
                    {renderMetaItems("cover")}
                  </ul>
                )}
                <h3 className="mb-15px md:mb-5">
                  <Link
                    href={`/blogs/${id}`}
                    className="text-primary-color  dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize relative z-0 text-size-22 md:text-3xl font-bold bg-[0_100%] [background-size:0_1px] bg-no-repeat bg-gradient-primary-3 hover:[background-size:100%_1px] transition-all duration-[.8s] inline"
                  >
                    {title}
                  </Link>
                </h3>
                <p className="text-primary-color-light dark:text-white-color mb-5 md:mb-30px">
                  {desc}
                </p>
                <div className="flex justify-end">
                  <Link
                    href={`/blogs/${id}`}
                    className="inline-flex items-center gap-2 text-size-15 font-bold text-white-color py-17px px-35px bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full leading-1 transition-all duration-300"
                  >
                    View Full Post
                    <i className="fal fa-arrow-right text-sm" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogSingle;
