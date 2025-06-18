"use client";
import ButtonHeader from "@/components/shared/buttons/ButtonHeader";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Socials4 from "@/components/shared/socials/Socials4";
import Socials5 from "@/components/shared/socials/Socials5";
import Socials6 from "@/components/shared/socials/Socials6";
import { useHeaderContext } from "@/context_api/HeaderContext";
import stickyHeader from "@/libs/stickyHeader";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import MobileMenuController from "./MobileMenuController";
import Navbar from "./Navbar";

const Header = ({ isSticky }) => {
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);
  const { isInnerPage, headerType, isIndexPage } = useHeaderContext();
  useEffect(() => {
    stickyHeader();
  }, []);

  return (
    <header
      className={`header-area ${
        headerType === 6 || headerType === 9 || headerType === 10
          ? "header-6"
          : headerType === 5
          ? "header-5  "
          : ""
      } ${isSticky ? "header-2 header-sticky" : "header-absolute"} `}
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
              : "container"
          }`}
        >
          <div
            className={`flex flex-wrap justify-between ${
              headerType === 10 ? "items-stretch" : "items-center"
            } `}
          >
            {/* <!-- logo and contact email --> */}
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
                      href="mailto:contact@devmohan.com"
                      className={`text-size-15 font-medium ${
                        isInnerPage && !isSticky
                          ? "text-white-color"
                          : "text-seondary-color dark:text-white-color"
                      } `}
                    >
                      contact@devmohan.com
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            {/* <!-- main menu --> */}
            <Navbar
              isActiveMobileMenu={isActiveMobileMenu}
              setIsActiveMobileMenu={setIsActiveMobileMenu}
              isSticky={isSticky}
            />
            {/* <!-- social button --> */}
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
                    <div className="menu-bar block lg:hidden ">
                      <MobileMenuController
                        setIsActiveMobileMenu={setIsActiveMobileMenu}
                        isActiveMobileMenu={isActiveMobileMenu}
                      />
                    </div>
                  </>
                ) : headerType === 6 ? (
                  <ButtonPrimary
                    isIcon={headerType === 6 ? true : false}
                    url={isIndexPage ? "#contact" : "/#contact"}
                  >
                    {headerType === 6 ? "Lets Talk" : "Hire Me!"}
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
        {/* <!-- mobile menu --> */}
        <MobileMenu isActiveMobileMenu={isActiveMobileMenu} />
      </div>
    </header>
  );
};

export default Header;
