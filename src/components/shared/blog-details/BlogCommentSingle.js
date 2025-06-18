import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCommentSingle = ({ comment }) => {
  const { authorName, date, desc, img } = comment || {};
  return (
    <div className="group flex flex-col md:flex-row gap-5 relative overflow-hidden pb-30px border-b border-border-color dark:border-gray-color-3">
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
              className="text-primary-color-light dark:text-white-color hover:text-white-color dark:hover:text-primary-color capitalize relative z-0 text-lg md:text-size-22 font-bold mb-1.5"
            >
              {authorName}
            </Link>
          </h3>
          <p className="text-sm text-primary-color-light dark:text-white-color mb-15px">
            {date}
          </p>
          <p className="text-primary-color-light dark:text-body-color mb-25px">
            {desc}
          </p>
          <div>
            <Link
              href="#comment-reply"
              className="px-5 py-1 text-primary-color hover:text-white-color border border-primary-color hover:bg-primary-color inline-block"
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
