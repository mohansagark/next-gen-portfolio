"use client";
import { useFooterContext } from "@/context_api/FooterContext";
import Link from "next/link";

const Footer3 = () => {
  const { footerType } = useFooterContext();
  return (
    <footer>
      <div className="footer-inner  dark:bg-black-color">
        <div className="container">
          <div className="flex flex-wrap gap-10 md:gap-10px justify-between px-15px py-35px lg:px-30px lg:py-50px  xl:px-50px xl:py-60px border-2 border-body-color dark:border-bg-color-2 rounded-15px">
            <div>
              <h6 className="text-sm leading-1.2 uppercase text-body-color-3 font-normal text-seondary-color dark:text-gray-color-4 mb-25px md:mb-35px">
                Sitemap
              </h6>
              <ul className="nav flex flex-col  gap-3">
                <li className="nav_item group relative">
                  <Link
                    href="#portfolio"
                    className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                  >
                    Work
                  </Link>
                </li>

                <li className="nav_item group relative">
                  <Link
                    href="#services"
                    className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                  >
                    Services
                  </Link>
                </li>

                <li className="nav_item group relative">
                  <Link
                    href="#credentials"
                    className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                  >
                    Resume
                  </Link>
                </li>

                <li className="nav_item group relative">
                  <Link
                    href="#skills"
                    className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                  >
                    Skills
                  </Link>
                </li>

                <li className="nav_item group relative">
                  <Link
                    href="#contact"
                    className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className=" items-end hidden lg:flex">
              <div className="h-[75%]  w-0.5  bg-bg-color-2 "></div>
            </div>

            <div>
              <h6 className="text-sm leading-1.2 uppercase text-body-color-3 font-normal text-seondary-color dark:text-gray-color-4 mb-25px md:mb-35px">
                Contact
              </h6>
              <ul className="nav flex flex-col  gap-3">
                <li className="nav_item group relative">
                  <Link
                    href="mailto:contact@devmohan.in"
                    className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                  >
                    contact@devmohan.in
                  </Link>
                </li>

                <li className="nav_item group relative">
                  <Link
                    href="tel:+011236548096"
                    className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                  >
                    +91 9790427138
                  </Link>
                </li>

                <li className="nav_item group relative">
                  <Link
                    href="tel:+011236548096"
                    className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                  >
                    +91 9790427138
                  </Link>
                </li>
              </ul>
            </div>

            <div className=" items-end hidden lg:flex">
              <div className="h-[75%]  w-0.5  bg-bg-color-2 "></div>
            </div>

            <div>
              <h6 className="text-sm leading-1.2 uppercase text-body-color-3 font-normal text-seondary-color dark:text-gray-color-4 mb-25px md:mb-35px">
                Socials
              </h6>
              <ul className="nav flex flex-col  gap-10px">
                <li className="nav_item group relative ">
                  <Link
                    href="#"
                    className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize flex gap-2 items-center "
                  >
                    <span
                      className="text-primary-color group-hover:text-body-color dark:text-white-color
                  text-size-13 border border-primary-color dark:border-border-color-3 dark:group-hover:border-primary-color w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-primary-color group-hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
                    >
                      <i className="fa-brands fa-behance"></i>
                    </span>{" "}
                    Behance
                  </Link>
                </li>
                <li className="nav_item group relative ">
                  <Link
                    href="#"
                    className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize flex gap-2 items-center "
                  >
                    <span
                      className="text-primary-color group-hover:text-body-color dark:text-white-color
                  text-size-13 border border-primary-color dark:border-border-color-3 dark:group-hover:border-primary-color w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-primary-color group-hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
                    >
                      <i className="fa-light fa-basketball"></i>
                    </span>{" "}
                    Dribble
                  </Link>
                </li>
                <li className="nav_item group relative ">
                  <Link
                    href="#"
                    className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize flex gap-2 items-center "
                  >
                    <span
                      className="text-primary-color group-hover:text-body-color dark:text-white-color
                  text-size-13 border border-primary-color dark:border-border-color-3 dark:group-hover:border-primary-color w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-primary-color group-hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </span>{" "}
                    Instgram
                  </Link>
                </li>
                <li className="nav_item group relative ">
                  <Link
                    href="#"
                    className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize flex gap-2 items-center "
                  >
                    <span
                      className="text-primary-color group-hover:text-body-color dark:text-white-color
                  text-size-13 border border-primary-color dark:border-border-color-3 dark:group-hover:border-primary-color w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-primary-color group-hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </span>{" "}
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>

            <div className=" items-end hidden lg:flex">
              <div className="h-[75%]  w-0.5  bg-bg-color-2 "></div>
            </div>

            <div>
              <h6 className="text-sm leading-1.2 uppercase text-body-color-3 font-normal text-seondary-color dark:text-gray-color-4 mb-25px md:mb-35px">
                Legal Details
              </h6>
              <ul className="nav flex flex-col  gap-3">
                <li className="nav_item group relative">
                  <Link
                    href="#"
                    className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                  >
                    Policy Privacy
                  </Link>
                </li>

                <li className="nav_item group relative">
                  <Link
                    href="#"
                    className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                  >
                    Term & Conditions
                  </Link>
                </li>

                <li className="nav_item group relative">
                  <Link
                    href="#"
                    className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                  >
                    Refund and Cancellation
                  </Link>
                </li>

                <li className="nav_item group relative">
                  <Link
                    href="#"
                    className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                  >
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center py-25px md:py-35px  px-15px">
            <div className="copyright text-gray-color dark:text-body-color whitespace-nowrap text-sm md:text-base ">
              © 2025 All rights reserved by
              <Link
                href="/"
                className="text-primary-color-light dark:text-white-color hover:text-primary-color  dark:hover:text-primary-color "
              >
                ThemeJunction
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer3;
