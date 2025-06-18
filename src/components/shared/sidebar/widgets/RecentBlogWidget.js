import countCommentLength from "@/libs/countCommentLength";
import getBlogs from "@/libs/getBlogs";
import sliceText from "@/libs/sliceText";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecentBlogWidget = () => {
  const recentBlogs = getBlogs()
    ?.filter(({ isBlogQuote }) => !isBlogQuote)
    ?.slice(0, 3);

  return (
    <div
      className="px-15px md:px-25px py-30px bg-cream-light-color dark:bg-primary-color-light rounded-lg wow fadeInUp"
      data-wow-delay=".3s"
    >
      <h3 className="mb-25px text-primary-color dark:text-white-color uppercase relative z-0 text-size-lg md:text-xl font-bold">
        Recent post
      </h3>

      <div className="flex flex-col gap-y-30px">
        {recentBlogs?.length
          ? recentBlogs?.map(
              ({ id, smallImg, title, blogTopList, comments }, idx) => (
                <div
                  key={idx}
                  className="group flex gap-x-5 relative overflow-hidden bg-cream-light-color dark:bg-primary-color-light"
                >
                  <div>
                    <Link
                      href={`/blogs/${id}`}
                      className="overflow-hidden w-20 h-20"
                    >
                      <Image
                        src={smallImg}
                        alt=""
                        width={142}
                        height={142}
                        className="w-20 h-20 group-hover:scale-110 transition-all duration-[.8s]"
                      />
                    </Link>
                  </div>

                  <div>
                    <div className="transition-all duration-500">
                      <div className="relative z-0">
                        <div className="relative z-10">
                          <ul className="flex gap-15px md:gap-25px items-center mb-5px">
                            {blogTopList?.length
                              ? blogTopList
                                  ?.slice(1, 3)
                                  ?.map(({ iconName, name, path }, idx) => (
                                    <li
                                      key={20000000 + idx}
                                      className="text-primary-color dark:text-white-color transition-all duration-500"
                                    >
                                      <i
                                        className={`${iconName} mr-1 text-primary-color`}
                                      ></i>{" "}
                                      {path ? (
                                        <Link
                                          href={`/blogs/${id}#comment-reply`}
                                          className="text-primary-color dark:text-white-color hover:text-primary-color transition-all duration-500"
                                        >
                                          ({countCommentLength(comments)})
                                        </Link>
                                      ) : (
                                        name
                                      )}
                                    </li>
                                  ))
                              : ""}
                          </ul>
                          <h3>
                            <Link
                              href={`/blogs/${id}`}
                              className="text-primary-color-light dark:text-white-color  hover:text-primary-color dark:hover:text-primary-color capitalize relative z-0 text-lg font-medium"
                            >
                              {sliceText(title, 32, true)}
                            </Link>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          : ""}
      </div>
    </div>
  );
};

export default RecentBlogWidget;
