import Image from "next/image";
import React from "react";

const TestimonialsCard2 = ({ testimonial }) => {
  const { authorName, authorDesig, desc, img } = testimonial ? testimonial : {};
  return (
    <div className="px-5 py-30px lg:pt-45px lg:pb-10 lg:pl-35px lg:pr-30px bg-cream-light-color dark:bg-primary-color-light border border-body-color dark:border-seondary-color rounded-15px relative z-0 group">
      <div className="relative z-10">
        <p className="max-w-480px text-primary-color-light dark:text-body-color text-xl mb-30px md:mb-50px">
          {desc}
        </p>

        <div className="flex gap-15px items-center">
          <div className="flex-shrink-0">
            <Image
              width={1000}
              height={1000}
              className="w-55px h-55px rounded-full"
              src={img}
              alt=""
            />
          </div>
          <div>
            <h6 className="text-sm text-primary-color-light dark:text-white-color font-medium mb-1.5">
              {authorName}
            </h6>
            <p className="text-sm text-gray-color">{authorDesig}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCard2;
