"use client";
import useHomeLink from "@/hooks/useHomeLink";
import Link from "next/link";

const HeroBreadcarumb = ({
  title,
  text,
  actualItem,
  path,
  /** Use a non-heading element on blog detail pages so the article keeps the sole H1. */
  titleAs = "h1",
}) => {
  const homeLink = useHomeLink();
  const TitleTag = titleAs === "h1" ? "h1" : "p";
  return (
    <section>
      {/*
        Original template rhythm: tall top padding clears absolute header;
        on mobile the banner starts at the viewport top (no spacer) so logo +
        hamburger sit over the image.
      */}
      <div className="hero-breadcurmb relative z-1 overflow-hidden bg-[url('/img/breadcrumb/breadcrumb-bg.jpg')] bg-cover bg-center bg-no-repeat pt-150px md:pt-40 lg:pt-200px pb-50px md:pb-60px lg:pb-100px">
        <div
          className="pointer-events-none absolute inset-0 -z-[1] bg-[#0b0d10]/55"
          aria-hidden
        />

        <div className="container relative">
          <div className="flex flex-col items-center">
            <TitleTag className="text-size-35 md:text-size-40 lg:text-size-50 font-bold text-white-color mb-15px capitalize text-center">
              {title}
            </TitleTag>
            <ul className="nav flex flex-wrap justify-center items-center gap-x-3">
              <li className="nav_item group relative">
                <Link
                  href={homeLink("/")}
                  className="font-medium text-white-color capitalize relative z-0 after:w-0 after:h-1px after:bg-white-color after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-500 group-hover:after:w-full"
                >
                  Home
                </Link>
              </li>
              {actualItem ? (
                <>
                  <li className="nav_item group relative">
                    <p className="font-medium text-white-color capitalize relative flex items-center gap-10px">
                      <i className="fa-regular fa-greater-than text-xs"></i>
                    </p>
                  </li>
                  <li className="nav_item group relative">
                    <Link
                      href={path}
                      className="font-medium text-white-color capitalize relative z-0 after:w-0 after:h-1px after:bg-white-color after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-500 group-hover:after:w-full"
                    >
                      {actualItem}
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
              <li className="nav_item group relative">
                <p className="font-medium text-white-color capitalize relative flex items-center gap-10px">
                  <i className="fa-regular fa-greater-than text-xs"></i>
                </p>
              </li>
              <li className="nav_item group relative">
                <p className="font-medium text-white-color capitalize relative flex items-center gap-10px text-center max-w-4xl">
                  {text}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBreadcarumb;
