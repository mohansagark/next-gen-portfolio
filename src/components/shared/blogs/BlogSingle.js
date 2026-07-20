import makePath from "@/libs/makePath";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import countCommentLength from "@/libs/countCommentLength";
import AuthorDisplay from "@/components/shared/AuthorDisplay";

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

  return (
    <article className="group relative  wow fadeInUp" data-wow-delay=".3s">
      <div className="rounded-lg relative overflow-hidden bg-cream-light-color dark:bg-primary-color-light">
        {coverImage ? (
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
        ) : null}
        <Link
          href={`/blogs?category=${makePath(category)}`}
          className="text-size-13 uppercase px-15px py-10px rounded-50px leading-1 absolute top-[15px] right-[15px] text-white-color bg-gradient-secondary-2 bg-200 hover:bg-100"
        >
          {category}
        </Link>

        <div className="py-25px px-15px md:p-30px -mt-10px">
          <div className="transition-all duration-500">
            <div className="relative z-0">
              <div className="relative z-10">
                <ul className="flex flex-wrap gap-x-15px gap-y-10px md:gap-25px items-center mb-5">
                  {blogTopList?.length
                    ? blogTopList?.map(({ iconName, name, path }, idx) => (
                        <li
                          key={1000 + idx}
                          className="text-primary-color dark:text-white-color "
                        >
                          <i
                            className={`${iconName} mr-1 text-primary-color transition-all duration-500`}
                          ></i>{" "}
                          {path ? (
                            <Link
                              href={`/blogs?author=${makePath(author)}`}
                              className="text-primary-color dark:text-white-color hover:text-primary-color transition-all duration-500 capitalize"
                            >
                              By {name}
                            </Link>
                          ) : (
                            name
                          )}
                        </li>
                      ))
                    : ""}
                  {/* Comments count as separate item */}
                  {comments && comments.length > 0 && (
                    <li className="text-primary-color dark:text-white-color">
                      <i className="fa-regular fa-comments mr-1 text-primary-color transition-all duration-500"></i>{" "}
                      <Link
                        href={`/blogs/${id}#comment-reply`}
                        className="text-primary-color dark:text-white-color hover:text-primary-color transition-all duration-500"
                      >
                        Comments ({countCommentLength(comments)})
                      </Link>
                    </li>
                  )}
                </ul>
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
                <div>
                  <Link
                    href={`/blogs/${id}`}
                    className="text-size-15 font-bold text-white-color capitalize py-17px px-35px bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full leading-1 transition-all duration-300"
                  >
                    Read more
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
