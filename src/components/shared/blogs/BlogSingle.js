import makePath from "@/libs/makePath";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import countCommentLength from "@/libs/countCommentLength";
import AuthorDisplay from "@/components/shared/AuthorDisplay";
import { btnMetallicWhiteClass } from "@/components/shared/buttons/ButtonPrimary";

const categoryPillClass = `text-size-13 uppercase px-15px py-10px rounded-50px leading-1 ${btnMetallicWhiteClass}`;

const metaClass = "text-[#374151] dark:text-[#9aa3af]";
const metaAccentClass = "text-teal-700 dark:text-[#5eead4]";

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
            <li key={`${keyPrefix}-${idx}`} className={metaClass}>
              {path ? (
                <AuthorDisplay
                  author={author || name}
                  className={metaClass}
                />
              ) : (
                <>
                  <i
                    className={`${iconName} mr-1 ${metaAccentClass} transition-all duration-500`}
                  ></i>{" "}
                  {name}
                </>
              )}
            </li>
          ))
        : null}
      {comments && comments.length > 0 ? (
        <li key={`${keyPrefix}-comments`} className={metaClass}>
          <i
            className={`fa-regular fa-comments mr-1 ${metaAccentClass} transition-all duration-500`}
          ></i>{" "}
          <Link
            href={`/blogs/${id}#comment-reply`}
            className={`${metaClass} hover:text-teal-700 dark:hover:text-[#5eead4] transition-all duration-500`}
          >
            Comments ({countCommentLength(comments)})
          </Link>
        </li>
      ) : null}
    </>
  );

  return (
    <article className="group relative wow fadeInUp" data-wow-delay=".3s">
      <div className="rounded-2xl relative overflow-hidden border border-[#e5e7eb] dark:border-[#262b33] bg-white dark:bg-[#12151a]">
        {coverImage ? (
          <div className="relative">
            <Link
              href={`/blogs/${id}`}
              className="block relative aspect-[16/9] overflow-hidden rounded-t-2xl"
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
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <ul className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-x-25px md:gap-y-10px md:items-center min-w-0">
                      {renderMetaItems("meta")}
                    </ul>
                    {category ? (
                      <Link
                        href={`/blogs?category=${makePath(category)}`}
                        className={`${categoryPillClass} shrink-0 md:hidden`}
                      >
                        {category}
                      </Link>
                    ) : null}
                  </div>
                ) : (
                  <ul className="flex flex-wrap gap-x-15px gap-y-10px md:gap-25px items-center mb-5">
                    {renderMetaItems("cover")}
                  </ul>
                )}
                <h3 className="mb-15px md:mb-5">
                  <Link
                    href={`/blogs/${id}`}
                    className="text-[#0b0d10] dark:text-[#f3f4f6] hover:text-teal-700 dark:hover:text-[#5eead4] capitalize relative z-0 text-size-22 md:text-3xl font-bold transition-colors duration-300 inline"
                  >
                    {title}
                  </Link>
                </h3>
                <p className="text-[#374151] dark:text-[#9aa3af] mb-5 md:mb-30px">
                  {desc}
                </p>
                <div className="flex justify-end">
                  <Link
                    href={`/blogs/${id}`}
                    className={`inline-flex items-center gap-2 text-size-15 font-medium py-17px px-35px rounded-full leading-1 ${btnMetallicWhiteClass}`}
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
