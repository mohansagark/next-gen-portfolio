"use client";
import textAnimation from "@/libs/textAnimation";
import Link from "next/link";
import { useEffect } from "react";

const Cta4 = () => {
  useEffect(() => {
    textAnimation();
  }, []);
  return (
    <section id="contact" className="  dark:bg-black-color">
      <div className="container">
        <div className=" bg-[url('/img/shapes/h4-cta.jpg')] bg-cover bg-no-repeat bg-center py-50px px-15px md:py-75px md:px-25px lg:pt-30 lg:pb-100px rounded-25px ">
          <div className="text-center">
            <div
              className="mb-25px  md:mb-30px lg:mb-46px wow fadeInUp"
              data-wow-delay=".3s"
            >
              <span
                className="text-sm px-3 py-5px rounded-full border border-bg-color-2  uppercase text-white-color  font-semibold tracking-0.02em  relative inline-block  wow fadeInUp"
                data-wow-delay=".3s"
              >
                Looking for a new talent?
              </span>
            </div>
            <div className="wow fadeInUp" data-wow-delay=".4s">
              <h2 className="text-size-25 sm:text-size-35 md:text-size-40 lg:text-size-50 xl:text-size-70 -tracking-0.02em  text-white-color leading-1.2  2xl:leading-1.2 font-semibold  mb-35px sm:mb-10 md:mb-50px lg:mb-65px xl:mb-85px   inline-block ">
                <Link
                  id="anim"
                  href="mailto:contact@devmohan.in"
                  className=" inline"
                >
                  contact@devmohan.in
                </Link>
              </h2>
            </div>
            <div className="inline-block wow fadeInUp" data-wow-delay=".5s">
              <ul className="nav flex flex-wrap md:flex-nowrwap justify-center   gap-x-15px gap-y-5 py-4 border-y border-bg-color-2">
                <li className="nav_item group pl-0 md:pl-17px first:pl-0 relative before:w-0.5 before:h-5 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-bg-color-2 before:hidden md:before:block first:before:hidden  ">
                  <Link
                    href="#"
                    className=" font-normal text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize flex gap-2 items-center "
                  >
                    <span
                      className=" text-white-color group-hover:text-primary-color-light
		text-size-13 border border-border-color-3  group-hover:border-transparent w-7 h-7 rounded-full flex items-center justify-center overflow-hidden relative z-0 transition-all duration-300 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-white-color group-hover:after:scale-100 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
                    >
                      <i className="fa-brands fa-behance"></i>
                    </span>{" "}
                    Behance
                  </Link>
                </li>
                <li className="nav_item group pl-0 md:pl-17px first:pl-0 relative before:w-0.5 before:h-5 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-bg-color-2 before:hidden md:before:block first:before:hidden ">
                  <Link
                    href="#"
                    className=" font-normal text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize flex gap-2 items-center "
                  >
                    <span
                      className=" text-white-color group-hover:text-primary-color-light
		text-size-13 border border-border-color-3  group-hover:border-transparent w-7 h-7 rounded-full flex items-center justify-center overflow-hidden relative z-0 transition-all duration-300 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-white-color group-hover:after:scale-100 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
                    >
                      <i className="fa-light fa-basketball"></i>
                    </span>{" "}
                    Dribble
                  </Link>
                </li>
                <li className="nav_item group pl-0 md:pl-17px first:pl-0 relative before:w-0.5 before:h-5 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-bg-color-2 before:hidden md:before:block first:before:hidden ">
                  <Link
                    href="#"
                    className=" font-normal text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize flex gap-2 items-center "
                  >
                    <span
                      className=" text-white-color group-hover:text-primary-color-light
		text-size-13 border border-border-color-3  group-hover:border-transparent w-7 h-7 rounded-full flex items-center justify-center overflow-hidden relative z-0 transition-all duration-300 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-white-color group-hover:after:scale-100 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </span>{" "}
                    Instgram
                  </Link>
                </li>
                <li className="nav_item group pl-0 md:pl-17px first:pl-0 relative before:w-0.5 before:h-5 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-bg-color-2 before:hidden md:before:block first:before:hidden ">
                  <Link
                    href="#"
                    className=" font-normal text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize flex gap-2 items-center "
                  >
                    <span
                      className=" text-white-color group-hover:text-primary-color-light
		text-size-13 border border-border-color-3  group-hover:border-transparent w-7 h-7 rounded-full flex items-center justify-center overflow-hidden relative z-0 transition-all duration-300 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-white-color group-hover:after:scale-100 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
                    >
                      <i className="fa-brands fa-x-twitter"></i>
                    </span>{" "}
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta4;
