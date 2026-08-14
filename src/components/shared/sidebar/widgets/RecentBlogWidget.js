import countCommentLength from "@/libs/countCommentLength";
import getBlogs from "@/libs/getBlogs";
import sliceText from "@/libs/sliceText";
import Link from "next/link";
import React from "react";

const RecentBlogWidget = () => {
  const recentBlogs = getBlogs()
    ?.filter(({ isBlogQuote }) => !isBlogQuote)
    ?.slice(0, 3);

  return (
    <div
      className="px-15px md:px-25px py-30px bg-white dark:bg-[#12151a] border border-[#e5e7eb] dark:border-[#262b33] rounded-lg wow fadeInUp"
      data-wow-delay=".3s"
    >
      <h3 className="mb-25px text-[#0b0d10] dark:text-[#f3f4f6] uppercase relative z-0 text-size-lg md:text-xl font-bold">
        Recent post
      </h3>

      <div className="flex flex-col gap-y-30px">
        {recentBlogs?.length
          ? recentBlogs?.map(
              ({ id, title, blogTopList, comments }, idx) => (
                <div
                  key={idx}
                  className="group relative w-full overflow-hidden"
                >
                  <div className="w-full min-w-0">
                    <div className="transition-all duration-500">
                      <div className="relative z-0">
                        <div className="relative z-10">
                          <ul className="flex flex-wrap gap-15px md:gap-25px items-center mb-5px">
                            {blogTopList?.length
                              ? blogTopList?.map(
                                  ({ iconName, name, path }, idx) => (
                                    <li
                                      key={20000000 + idx}
                                      className="text-[#374151] dark:text-[#9aa3af] transition-all duration-500"
                                    >
                                      <i
                                        className={`${iconName} mr-1 text-teal-700 dark:text-[#5eead4]`}
                                      ></i>{" "}
                                      {path ? (
                                        <span className="text-[#374151] dark:text-[#9aa3af]">
                                          By {name}
                                        </span>
                                      ) : (
                                        name
                                      )}
                                    </li>
                                  )
                                )
                              : ""}
                            {comments && comments.length > 0 && (
                              <li className="text-[#374151] dark:text-[#9aa3af] transition-all duration-500">
                                <i className="fa-regular fa-comments mr-1 text-teal-700 dark:text-[#5eead4]"></i>{" "}
                                <Link
                                  href={`/blogs/${id}#comment-reply`}
                                  className="text-[#374151] dark:text-[#9aa3af] hover:text-teal-700 dark:hover:text-[#5eead4] transition-all duration-500"
                                >
                                  ({countCommentLength(comments)})
                                </Link>
                              </li>
                            )}
                          </ul>
                          <h3 className="w-full">
                            <Link
                              href={`/blogs/${id}`}
                              className="block w-full text-[#0b0d10] dark:text-[#f3f4f6] hover:text-teal-700 dark:hover:text-[#5eead4] capitalize relative z-0 text-lg font-medium"
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
