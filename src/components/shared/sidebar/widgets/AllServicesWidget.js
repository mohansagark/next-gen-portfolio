"use client";

import getALlServices from "@/libs/getALlServices";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const AllServicesWidget = () => {
  //   const [currentIndex, setCurrentIndex] = useState(0);
  const params = useParams();
  const currentIdString = params?.id;
  const currentId = parseInt(currentIdString || "0");
  const services = getALlServices();

  return (
    <div
      className="px-15px md:px-25px py-30px bg-cream-light-color dark:bg-primary-color-light rounded-lg wow fadeInUp"
      data-wow-delay=".3s"
    >
      <h3 className="mb-25px text-primary-color dark:text-white-color uppercase relative z-0 text-size-lg md:text-xl font-bold">
        All Services
      </h3>
      {/* <!-- list --> */}

      <ul className="sidebar-categories">
        {services?.length
          ? services?.map(({ title, id, iconName }, idx) => (
              <li
                className={`mb-2  ${id === currentId ? "active" : ""}`}
                key={idx}
              >
                <Link
                  href={`/services/${id}`}
                  className="px-5 pt-15px pb-3 rounded-lg hover:bg-seondary-color text-primary-color-light dark:text-white-color hover:text-white-color transition-all duration-500 flex items-center justify-between gap-x-5 w-full group"
                >
                  <span className="inline-flex gap-1 items-start whitespace-nowrap">
                    <i
                      className={`${iconName} mr-10px text-size-25 leading-1`}
                    ></i>{" "}
                    {title}
                  </span>
                  <span className="text-primary-color-light dark:text-white-color group-hover:text-white-color leading-1 transition-none duration-500">
                    <i className="fas fa-angle-right"></i>
                  </span>
                </Link>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default AllServicesWidget;
