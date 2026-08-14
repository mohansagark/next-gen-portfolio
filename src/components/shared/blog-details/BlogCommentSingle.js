import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCommentSingle = ({ comment }) => {
  const { authorName, date, desc, img } = comment || {};
  return (
    <div className="group flex flex-col md:flex-row gap-5 relative overflow-hidden pb-30px border-b border-[#e5e7eb] dark:border-[#262b33]">
      <div>
        <Link href="#" className="overflow-hidden w-30">
          <Image
            src={img}
            alt=""
            className="w-full"
            width={2000}
            height={2000}
          />
        </Link>
      </div>
      <div>
        <div className="relative z-10">
          <h3>
            <Link
              href="#"
              className="text-[#0b0d10] dark:text-[#f3f4f6] hover:text-teal-700 dark:hover:text-[#5eead4] capitalize relative z-0 text-lg md:text-size-22 font-bold mb-1.5"
            >
              {authorName}
            </Link>
          </h3>
          <p className="text-sm text-[#6b7280] dark:text-[#9aa3af] mb-15px">
            {date}
          </p>
          <p className="text-[#374151] dark:text-[#9aa3af] mb-25px">
            {desc}
          </p>
          <div>
            <Link
              href="#comment-reply"
              className="px-5 py-1 text-teal-700 dark:text-[#5eead4] hover:text-white dark:hover:text-[#0b0d10] border border-teal-700 dark:border-[#5eead4] hover:bg-teal-700 dark:hover:bg-[#5eead4] inline-block transition-colors"
            >
              Reply
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCommentSingle;
