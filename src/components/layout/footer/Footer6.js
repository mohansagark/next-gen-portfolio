"use client";
import { useFooterContext } from "@/context_api/FooterContext";
import Link from "next/link";

const Footer6 = () => {
  const { footerType } = useFooterContext();
  return (
    <footer className="dark:bg-primary-color-light">
      <div className="footer-inner  bg-[url('/img/shapes/h4-cta.jpg')] bg-cover bg-no-repeat bg-center rounded-t-[40px] md:rounded-t-[60px] lg:rounded-t-[100px]">
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
                  <Link href="/">
                    <img src="/img/logo/logo-9-black.png" alt="" />
                  </Link>
                </div>
                <div className=" text-white-color mb-4">
                  <p>
                    I break down complex user the experience problems the create
                    integrity focused to solutions that’s connect.
                  </p>
                </div>

                <ul className="nav flex items-center    gap-2">
                  <li className="nav_item group relative ">
                    <Link
                      href="#"
                      className="text-size-15 font-normal text-white-color  capitalize flex gap-2 items-center "
                    >
                      <span
                        className="text-white-color 
                      text-size-13 border border-border-color-3 group-hover:border-black-color w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-black-color group-hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </span>
                    </Link>
                  </li>
                  <li className="nav_item group relative ">
                    <Link
                      href="#"
                      className="text-size-15 font-normal text-white-color  capitalize flex gap-2 items-center "
                    >
                      <span
                        className="text-white-color 
                      text-size-13 border border-border-color-3 group-hover:border-black-color w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-black-color group-hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
                      >
                        <i className="fab fa-instagram"></i>
                      </span>
                    </Link>
                  </li>
                  <li className="nav_item group relative ">
                    <Link
                      href="#"
                      className="text-size-15 font-normal text-white-color  capitalize flex gap-2 items-center "
                    >
                      <span
                        className="text-white-color 
                      text-size-13 border border-border-color-3 group-hover:border-black-color w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-black-color group-hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
                      >
                        <i className="fab fa-x-twitter"></i>
                      </span>
                    </Link>
                  </li>
                  <li className="nav_item group relative ">
                    <Link
                      href="#"
                      className="text-size-15 font-normal text-white-color  capitalize flex gap-2 items-center "
                    >
                      <span
                        className="text-white-color 
                      text-size-13 border border-border-color-3 group-hover:border-black-color w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-black-color group-hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
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
                <h6 className="text-xl leading-1.2 uppercase font-semibold text-white-color mb-25px md:mb-35px">
                  Legal Details
                </h6>
                <ul className="nav flex flex-col  gap-3">
                  <li className="nav_item group relative">
                    <Link
                      href="#"
                      className="text-size-15 font-normal text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                    >
                      Policy Privacy
                    </Link>
                  </li>

                  <li className="nav_item group relative">
                    <Link
                      href="#"
                      className="text-size-15 font-normal text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                    >
                      Term & Conditions
                    </Link>
                  </li>

                  <li className="nav_item group relative">
                    <Link
                      href="#"
                      className="text-size-15 font-normal text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                    >
                      Refund and Cancellation
                    </Link>
                  </li>

                  <li className="nav_item group relative">
                    <Link
                      href="#"
                      className="text-size-15 font-normal text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
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
                <h6 className="text-xl leading-1.2 uppercase font-semibold text-white-color mb-25px md:mb-35px">
                  Contact
                </h6>
                <ul className="nav flex flex-col  gap-3">
                  <li className="nav_item group relative">
                    <Link
                      href="mailto:contact@devmohan.in"
                      className="text-size-15 font-normal text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                    >
                      contact@devmohan.in
                    </Link>
                  </li>

                  <li className="nav_item group relative">
                    <Link
                      href="tel:+011236548096"
                      className="text-size-15 font-normal text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
                    >
                      +91 9790427138
                    </Link>
                  </li>

                  <li className="nav_item group relative">
                    <Link
                      href="tel:+011236548096"
                      className="text-size-15 font-normal text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize  "
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
                <h6 className="text-xl leading-1.2 uppercase font-semibold text-white-color mb-5">
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
                      className="text-black-color w-full pl-5 pr-5 py-4 border-2 border-black-color focus:border-primary-color dark:focus:border-black-color rounded-[60px] outline-none focus:outline-none transition-all duration-300 placeholder:text-black-colorr dark:placeholder:text-black-color bg-white-color leading-1"
                    />
                  </div>

                  <div className="flex-shrink-0 ">
                    <button
                      type="submit"
                      className="text-size-25px w-60px h-60px text-white-color group-hover:text-white-color  bg-black-color   rounded-100% leading-1 transition-all duration-300  inline-flex justify-center items-center group"
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
            <div className="flex flex-wrap gap-4 md:gap-30px justify-center xl:justify-between items-center py-5 md:py-30px border-t border-white-color-3 ">
              <div>
                <span className="text-xs leading-2 sm:leading-2 uppercase font-semibold text-white-color block relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[7px] before:h-[7px]  before:bg-green1 before:rounded-100% ">
                  AVAILABLE FOR FREELANCE
                </span>
              </div>
              <div>
                <ul className="nav flex gap-5   md:gap-x-35px gap-y-3">
                  <li className="nav_item group relative">
                    <Link
                      href="#portfolio"
                      className="text-sm  text-white-color hover:text-primary-color uppercase "
                    >
                      Work.
                    </Link>
                  </li>

                  <li className="nav_item group relative">
                    <Link
                      href="#services"
                      className="text-sm  text-white-color hover:text-primary-color uppercase "
                    >
                      Services.
                    </Link>
                  </li>

                  <li className="nav_item group relative">
                    <Link
                      href="#about"
                      className="text-sm  text-white-color hover:text-primary-color uppercase "
                    >
                      About.
                    </Link>
                  </li>

                  <li className="nav_item group relative">
                    <Link
                      href="#contact"
                      className="text-sm  text-white-color hover:text-primary-color uppercase   "
                    >
                      Contact.
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="copyright text-white-color  whitespace-nowrap text-sm  uppercase ">
                ©All rights reserved by
                <Link
                  href="/"
                  className="text-white-color hover:text-primary-color dark:hover:text-primary-color"
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

export default Footer6;
