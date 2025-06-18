"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const ServiceItem = ({ service }) => {
  const { title, shortDesc, id } = service ? service : {};
  const themeMode = useSearchParams()?.get("theme_mode");
  const isLight = themeMode === "light" ? true : false;
  return (
    <div
      className={`service-item  px-15px lg:px-30px border-b border-body-color dark:border-seondary-color relative z-10 group wow fadeInUp ${
        id === 1 ? "current" : ""
      }`}
      data-wow-delay={`.${5 + id - 1}s`}
    >
      <Link
        href={`/services/${id}${isLight ? "?theme_mode=light" : ""}`}
        className="text-primary-color dark:text-white-color flex items-center gap-15px md:gap-5 flex-wrap md:flex-nowrap py-5 lg:py-30px group-hover:text-white"
      >
        <span className="text-xl w-full md:w-[calc(40%-10px)] flex flex-wrap lg:flex-nowrap items-center gap-10px md:gap-5">
          <b className="service-sl-num text-primary-color group-hover:text-white transition-all duration-300">
            0{id}
          </b>
          <b className="text-xl md:text-size-25 lg:text-3xl">
            {title ? title : ""}
          </b>
        </span>

        <span className="text-primary-color-light dark:text-body-color w-full md:w-[calc(45%-10px)] group-hover:text-white">
          {shortDesc ? shortDesc : ""}
        </span>
        <i className="flaticon-up-right-arrow text-size-15 md:text-xl text-primary-color group-hover:text-white-color absolute top-[20%] md:top-1/2 right-5 lg:right-[55px] transition-all duration-300"></i>
      </Link>
    </div>
  );
};

export default ServiceItem;
