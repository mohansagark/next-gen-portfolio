"use client";
import ButtonHeader from "@/components/shared/buttons/ButtonHeader";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Socials4 from "@/components/shared/socials/Socials4";
import Socials5 from "@/components/shared/socials/Socials5";
import Socials6 from "@/components/shared/socials/Socials6";
import { useHeaderContext } from "@/context_api/HeaderContext";
import stickyHeader from "@/libs/stickyHeader";
import Link from "next/link";
import { useEffect } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = ({ isSticky }) => {
  const { headerType, isIndexPage } = useHeaderContext();

  useEffect(() => {
    stickyHeader();
  }, []);

  const onDarkBanner = !isSticky && !isIndexPage;

  return (
    <header
      className={`header-area hidden lg:block ${
        headerType === 6 || headerType === 9 || headerType === 10
          ? "header-6"
          : headerType === 5
            ? "header-5  "
            : ""
      } ${isSticky ? "header-2 header-sticky" : "header-absolute"} ${
        onDarkBanner ? "header-on-dark" : ""
      }`}
    >
      <div
        className={`${
          headerType === 10
            ? "border-b border-border-coloer dark:border-bg-color-2 "
            : isSticky
              ? headerType === 9 ||
                headerType === 8 ||
                headerType === 7 ||
                headerType === 6 ||
                headerType === 5 ||
                headerType === 4
                ? "pt-5 pb-5  "
                : "py-10px"
              : "pt-15px xl:pt-5 pb-5 md:pb-30px xl:pb-5"
        } relative`}
      >
        <div
          className={`${
            headerType === 5 ||
            headerType === 6 ||
            headerType === 9 ||
            headerType === 10
              ? "px-15px  2xl:px-65px"
              : "container min-[1920px]:!max-w-[1680px]"
          }`}
        >
          <div
            className={`flex flex-wrap justify-between ${
              headerType === 10 ? "items-stretch" : "items-center"
            } `}
          >
            <div
              className={
                headerType === 10
                  ? "max-w-140px sm:max-w-210px flex items-center h-75px sm:h-85px md:h-[103px]  border-r border-border-coloer dark:border-bg-color-2 w-full leading-1 pr-15px sm:pr-0"
                  : headerType === 4 || headerType === 6 || headerType === 9
                    ? `max-w-205px lg:max-w-130px xl:max-w-205px w-full`
                    : ""
              }
            >
              <ul
                className={`flex items-center ${
                  headerType === 5 ? "gap-x-25px" : "gap-x-15px xl:gap-x-35px"
                }`}
              >
                <li>
                  <Logo isSticky={isSticky} />
                </li>
                {headerType === 3 ||
                headerType === 4 ||
                headerType === 5 ||
                headerType === 6 ||
                headerType === 9 ||
                headerType === 10 ? (
                  ""
                ) : (
                  <li className="hidden md:block">
                    <Link
                      href="mailto:contact@devmohan.in"
                      className={`text-size-15 font-medium transition-colors ${
                        onDarkBanner
                          ? "text-white hover:text-[#5eead4]"
                          : "text-primary-color-light dark:text-white-color hover:text-teal-700 dark:hover:text-teal-200"
                      }`}
                    >
                      contact@devmohan.in
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <Navbar isSticky={isSticky} />
            {headerType === 3 ||
            headerType === 4 ||
            headerType === 5 ||
            headerType === 6 ||
            headerType === 9 ||
            headerType === 10 ? (
              <div
                className={`${
                  headerType === 9 || headerType === 10 ? "flex" : "hidden"
                } ${
                  headerType === 9 || headerType === 10 || headerType === 5
                    ? "lg:flex items-center gap-25px"
                    : "lg:block "
                } ${
                  headerType === 10
                    ? "lg:pl-30px lg:border-l border-border-coloer dark:border-bg-color-2"
                    : ""
                }`}
              >
                {headerType === 9 || headerType === 10 ? (
                  <>
                    {headerType === 10 ? "" : <Socials6 />}
                    <div className="hidden sm:block">
                      <ButtonPrimary type={2} isIcon={true} url={"/#contact"}>
                        Lets Talk
                      </ButtonPrimary>
                    </div>
                  </>
                ) : headerType === 6 ? (
                  <ButtonPrimary
                    isIcon={headerType === 6 ? true : false}
                    url={isIndexPage ? "#contact" : "/#contact"}
                  >
                    {headerType === 6 ? "Let's talk" : "Contact"}
                  </ButtonPrimary>
                ) : headerType === 5 ? (
                  <>
                    <Socials5 />
                    <ButtonHeader />
                  </>
                ) : (
                  <Socials4 />
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
