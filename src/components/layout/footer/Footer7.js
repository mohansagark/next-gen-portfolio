"use client";
import { useFooterContext } from "@/context_api/FooterContext";
import Link from "next/link";

const Footer7 = () => {
  const { footerType } = useFooterContext();
  return (
    <footer className="bg-cream-light-color dark:bg-black-color">
      <div className="footer-inner">
        <div className="pt-20 pb-60px md:pt-100px md:pb-20 lg:pb-90px xl:pt-30 xl:pb-100px">
          <div className="container">
            <div
              className="flex flex-wrap  gap-x-10
           lg:gap-x-10px gap-y-50px justify-between "
            >
              <div
                className="max-w-full w-full   md:max-w-[calc(50%-20px)] lg:max-w-[390px]  xl:max-w-[260px]  2xl:max-w-[360px]   wow fadeInUp"
                data-wow-delay=".3s"
              >
                <div className="max-w-180px w-full mb-6">
                  <Link href="index.html">
                    <img
                      className="hidden dark:inline-block"
                      src="/img/logo/logo-9.png"
                      alt=""
                    />
                    <img
                      className="inline-block dark:hidden w-60px h-60px"
                      src="/img/logo/logo-dark.png"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="text-gray-color-2 dark:text-white-color mb-4">
                  <p>
                    I break down complex user the experience problems the create
                    integrity focused to solutions that’s connect.
                  </p>
                </div>

                <ul className="nav flex items-center    gap-2">
                  <li className="nav_item group relative ">
                    <Link
                      href="#"
                      className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize flex gap-2 items-center "
                    >
                      <span
                        className="text-dark-color group-hover:text-white-color dark:text-white-color
                    text-size-13 border border-border-color dark:border-border-color-3 group-hover:border-transparent dark:group-hover:border-transparent w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-gradient-primary-8 group-hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </span>
                    </Link>
                  </li>
                  <li className="nav_item group relative ">
                    <Link
                      href="#"
                      className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize flex gap-2 items-center "
                    >
                      <span
                        className="text-dark-color group-hover:text-white-color dark:text-white-color
                    text-size-13 border border-border-color dark:border-border-color-3 group-hover:border-transparent dark:group-hover:border-transparent w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-gradient-primary-8 group-hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
                      >
                        <i className="fab fa-instagram"></i>
                      </span>
                    </Link>
                  </li>
                  <li className="nav_item group relative ">
                    <Link
                      href="#"
                      className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize flex gap-2 items-center "
                    >
                      <span
                        className="text-dark-color group-hover:text-white-color dark:text-white-color
                    text-size-13 border border-border-color dark:border-border-color-3 group-hover:border-transparent dark:group-hover:border-transparent w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-gradient-primary-8 group-hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
                      >
                        <i className="fab fa-x-twitter"></i>
                      </span>
                    </Link>
                  </li>
                  <li className="nav_item group relative ">
                    <Link
                      href="#"
                      className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize flex gap-2 items-center "
                    >
                      <span
                        className="text-dark-color group-hover:text-white-color dark:text-white-color
                    text-size-13 border border-border-color dark:border-border-color-3 group-hover:border-transparent dark:group-hover:border-transparent w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-gradient-primary-8 group-hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className="max-w-full w-full   md:max-w-[calc(50%-20px)] lg:w-auto lg:max-w-[inherit] wow fadeInUp"
                data-wow-delay=".5s"
              >
                <h6 className="text-xl leading-1.2 uppercase font-semibold text-primary-color-light dark:text-white-color mb-25px md:mb-35px">
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

              <div
                className="w-full max-w-full md:max-w-[calc(50%-20px)] lg:w-auto lg:max-w-[inherit] wow fadeInUp"
                data-wow-delay=".7s"
              >
                <h6 className="text-xl leading-1.2 uppercase font-semibold text-primary-color-light dark:text-white-color mb-25px md:mb-35px">
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

              <div
                className="w-full max-w-full md:max-w-[calc(50%-20px)] lg:w-auto lg:max-w-[inherit] wow fadeInUp wow fadeInUp"
                data-wow-delay=".9s"
              >
                <h6 className="text-xl leading-1.2 uppercase font-semibold text-primary-color-light dark:text-white-color mb-5">
                  Subscribe to My <br />
                  Newsletter!
                </h6>

                <form className="flex items-center gap-2">
                  {/* <!-- inputs --> */}

                  {/* <!-- first name --> */}
                  <div className="flex-grow">
                    <input
                      type="search"
                      placeholder="Enter First Name"
                      className="text-black-color w-full pl-5 pr-5 py-4 border border-border-color focus:border-border-color dark:focus:border-transparent rounded-[60px] outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color dark:placeholder:text-black-color bg-white-color leading-1"
                    />
                  </div>

                  <div className="flex-shrink-0 ">
                    <button
                      type="submit"
                      className="text-size-25px w-60px h-60px text-white-color group-hover:text-white-color  bg-gradient-primary-8 outline-1 outline outline-body-color dark:outline-bg-color-2 group-hover:border-transparent  rounded-100% leading-1 transition-all duration-300  inline-flex justify-center items-center group"
                    >
                      <span className="relative overflow-hidden -rotate-45">
                        <i className="fa-regular fa-arrow-right text-lg group-hover:translate-x-150% transition-all duration-500 inline-block"></i>
                        <i className="fa-regular fa-arrow-right text-lg absolute left-0 top-0 -translate-x-150% group-hover:-translate-x-0 transition-all duration-500"></i>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- footer copyright --> */}

        <div className="footer-copyright">
          <div className="container">
            <div className="flex flex-wrap gap-4 md:gap-30px justify-center xl:justify-between items-center py-5 md:py-30px border-t border-white-color-3  ">
              <div>
                <span className="text-xs leading-2 sm:leading-2 uppercase font-semibold text-seondary-color dark:text-white-color block relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[7px] before:h-[7px]  before:bg-green1 before:rounded-100% ">
                  AVAILABLE FOR FREELANCE
                </span>
              </div>
              <div>
                <ul className="nav flex gap-5   md:gap-x-35px gap-y-3">
                  <li className="nav_item group relative">
                    <Link
                      href="#portfolio"
                      className="text-sm  text-seondary-color hover:text-primary-color dark:text-gray-color-4 dark:hover:text-white-color uppercase "
                    >
                      Work.
                    </Link>
                  </li>

                  <li className="nav_item group relative">
                    <Link
                      href="#services"
                      className="text-sm  text-seondary-color hover:text-primary-color dark:text-gray-color-4 dark:hover:text-white-color uppercase "
                    >
                      Services.
                    </Link>
                  </li>

                  <li className="nav_item group relative">
                    <Link
                      href="#credentials"
                      className="text-sm  text-seondary-color hover:text-primary-color dark:text-gray-color-4 dark:hover:text-white-color uppercase "
                    >
                      About.
                    </Link>
                  </li>

                  <li className="nav_item group relative">
                    <Link
                      href="#contact"
                      className="text-sm  text-seondary-color hover:text-primary-color dark:text-gray-color-4 dark:hover:text-white-color uppercase   "
                    >
                      Contact.
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="copyright text-primary-color-light dark:text-gray-color-4  whitespace-nowrap text-sm  uppercase ">
                ©All rights reserved by
                <Link
                  href="index.html"
                  className="text-primary-color-light dark:text-white-color hover:text-primary-color dark:hover:text-primary-color"
                >
                  ThemeJunction
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer7;
