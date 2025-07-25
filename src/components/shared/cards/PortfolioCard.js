"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PortfolioCard = ({ portfolio }) => {
  const themeMode = useSearchParams()?.get("theme_mode");
  const { title, img, shortDesc, id, slug, dataFilter, category } = portfolio
    ? portfolio
    : {};
  const isLight = themeMode === "light" ? true : false;
  return (
    <div
      className={`portfolio-item ${dataFilter} bg-primary-color-light rounded-10px group relative float-left inline-flex overflow-hidden`}
    >
      <Image
        src={img}
        alt={title || "Portfolio project"}
        width={2000}
        height={2000}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Category Tag */}
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-gradient-primary text-white-color text-xs px-2 py-1 rounded-full font-medium shadow-lg">
          {category}
        </span>
      </div>

      <div className="absolute left-0 bottom-[15px] group-hover:bottom-5 translate-y-5 group-hover:translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible w-full px-15px lg:px-5 transition-all duration-300">
        <Link
          href={`./portfolio/${slug || id}${
            isLight ? "?theme_mode=light" : ""
          }`}
          className="text-white-color p-15px pr-30px lg:p-5 lg:pr-50px bg-gradient-primary rounded-15px w-full block"
        >
          <span className="block text-xl md:text-size-25 lg:text-3xl font-bold mb-2 lg:mb-15px">
            {title}
          </span>

          <span className="block text-body-color">{shortDesc}</span>
          <i className="flaticon-up-right-arrow text-size-15 md:text-xl text-primary-color group-hover:text-white-color absolute top-1/2 right-8 lg:right-[55px] -translate-y-1/2 rotate-[-360deg] group-hover:rotate-0 transition-all duration-300"></i>
        </Link>
      </div>
    </div>
  );
};

export default PortfolioCard;
