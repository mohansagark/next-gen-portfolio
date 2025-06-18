import Link from "next/link";
import React from "react";

const ServiceCard = ({ service, idx }) => {
  const { title, id, totalProject, iconName } = service || {};

  return (
    <div
      className="rounded-10px overflow-hidden pb-30px bg-cream-light-color dark:bg-transparent border border-body-color dark:border-seondary-color hover:border-primary-color dark:hover:border-primary-color transition-all duration-300 wow fadeInUp"
      data-wow-delay={`0.${3 + idx}s`}
    >
      <div className="bg-primary-color-2 dark:bg-seondary-color px-30px py-5 mb-30px">
        <span className="w-16 h-16 bg-gradient-primary-4 inline-flex justify-center items-center rounded-10px">
          <i
            className={`${iconName} text-size-32 text-white-color leading-1`}
          ></i>
        </span>
      </div>

      <div className="p-15px md:p-30px pb-0 md:pb-0">
        <h3 className="text-xl md:text-size-22 lg:text-2xl mb-10px leading-1.2 lg:leading-1.2 font-medium">
          <Link
            href={`/services/${id}`}
            className="text-primary-color-light dark:text-white-color hover:text-primary-color dark:hover:text-primary-color"
          >
            {title}
          </Link>
        </h3>

        <p className="text-primary-color-light dark:text-white-color mb-35px">
          Conducting qualitative and quantitative research to understand user
          needs, behaviors, and pain points. Utilizing methods such as surveys,
          interviews, and usability testing...
        </p>
        <p className="text-primary-color-light dark:text-white-color uppercase underline">
          {totalProject}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
