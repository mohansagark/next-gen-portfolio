"use client";
import { useFooterContext } from "@/context_api/FooterContext";
import Link from "next/link";

const Footer2 = () => {
  const { footerType } = useFooterContext();
  return (
    <footer>
      <div className="footer-inner">
        {/* <!-- footer top --> */}
        <div className="py-35px bg-primary-color">
          <div className="container">
            {/* <!-- --> */}
            <ul className="flex items-center flex-col lg:flex-row justify-between gap-10px">
              <li className="sm:text-lg md:text-xl font-medium text-white-color tracking-[0.02em] group">
                <Link href="mailto:mail@mail.com" className=" relative">
                  <span className=" transition-all duration-700  ease-in-out  opacity-100 visible group-hover:invisible group-hover:opacity-0  group-hover:-translate-y-full inline-block">
                    contact@devmohan.in
                  </span>
                  <span className="absolute transition-all duration-700  ease-in-out  invisible opacity-0 group-hover:opacity-100 group-hover:visible left-0 right-0 translate-y-full group-hover:translate-y-0  inline-block">
                    contact@devmohan.in
                  </span>
                </Link>
              </li>
              <li className="sm:text-lg md:text-xl font-medium text-white-color tracking-[0.02em] group hidden lg:block">
                /
              </li>

              <li className="sm:text-lg md:text-xl font-medium text-white-color tracking-[0.02em] group">
                <p>Hyderabad, Telangana, India</p>
              </li>
              <li className="sm:text-lg md:text-xl font-medium text-white-color tracking-[0.02em] group hidden lg:block">
                /
              </li>
              <li className="text-base sm:text-lg xl:text-xl font-medium text-white-color tracking-[0.02em] group">
                <Link href="tel:+919790427138" className=" relative">
                  <span className=" transition-all duration-700  ease-in-out  opacity-100 visible group-hover:invisible group-hover:opacity-0  group-hover:-translate-y-full inline-block">
                    +919790427138
                  </span>
                  <span className="absolute transition-all duration-700  ease-in-out  invisible opacity-0 group-hover:opacity-100 group-hover:visible left-0 right-0 translate-y-full group-hover:translate-y-0  inline-block">
                    +919790427138
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-35px md:py-0 ">
          <div className="container">
            {/* <!-- --> */}
            <ul className="flex justify-center xl:-mx-10px 2xl:mx-0 items-center flex-wrap gap-10px md:gap-0  ">
              <li className=" group md:border-r md:border-border-color dark:md:border-white-color-3 last:border-0">
                <Link
                  href="https://www.facebook.com"
                  className=" flex justify-center items-center w-160px sm:w-170px h-auto  md:h-160px lg:w-230px lg:h-210px xl:w-278px xl:h-238px p-10px relative text-base sm:text-lg xl:text-xl font-medium text-seondary-color dark:text-white-color tracking-normal xl:tracking-[0.02em] leading-1"
                >
                  <span className=" transition-all duration-700 ease-in-out opacity-100 visible group-hover:invisible group-hover:opacity-0  group-hover:-translate-y-full inline-block">
                    My Facebook
                  </span>
                  <span className="text-seondary-color  border border-seondary-color  dark:text-white-color dark:border-white-color w-35px h-35px rounded-full flex items-center justify-center overflow-hidden z-0 absolute transition-all duration-700  ease-in-out invisible opacity-0 group-hover:opacity-100 group-hover:visible left-1/2  -translate-x-1/2 translate-y-full group-hover:translate-y-0 text-base leading-1 font-normal ">
                    <i className="fab fa-facebook-f"></i>
                  </span>
                </Link>
              </li>
              <li className=" group md:border-r md:border-border-color dark:md:border-white-color-3 last:border-0">
                <Link
                  href="https://www.instagram.com"
                  className=" flex justify-center items-center w-160px sm:w-170px h-auto  md:h-160px lg:w-230px lg:h-210px xl:w-278px xl:h-238px p-10px relative text-base sm:text-lg xl:text-xl font-medium text-seondary-color dark:text-white-color tracking-normal xl:tracking-[0.02em] leading-1"
                >
                  <span className=" transition-all duration-700 ease-in-out opacity-100 visible group-hover:invisible group-hover:opacity-0  group-hover:-translate-y-full inline-block">
                    My Instagram
                  </span>
                  <span className="text-seondary-color  border border-seondary-color  dark:text-white-color dark:border-white-color w-35px h-35px rounded-full flex items-center justify-center overflow-hidden z-0 absolute transition-all duration-700  ease-in-out invisible opacity-0 group-hover:opacity-100 group-hover:visible left-1/2  -translate-x-1/2 translate-y-full group-hover:translate-y-0 text-base leading-1 font-normal ">
                    <i className="fab fa-instagram"></i>
                  </span>
                </Link>
              </li>
              <li className=" group md:border-r md:border-border-color dark:md:border-white-color-3 last:border-0">
                <Link
                  href="https://x.com"
                  className=" flex justify-center items-center w-160px sm:w-170px h-auto  md:h-160px lg:w-230px lg:h-210px xl:w-278px xl:h-238px p-10px relative text-base sm:text-lg xl:text-xl font-medium text-seondary-color dark:text-white-color tracking-normal xl:tracking-[0.02em] leading-1"
                >
                  <span className=" transition-all duration-700 ease-in-out opacity-100 visible group-hover:invisible group-hover:opacity-0  group-hover:-translate-y-full inline-block">
                    My Twitter
                  </span>
                  <span className="text-seondary-color  border border-seondary-color  dark:text-white-color dark:border-white-color w-35px h-35px rounded-full flex items-center justify-center overflow-hidden z-0 absolute transition-all duration-700  ease-in-out invisible opacity-0 group-hover:opacity-100 group-hover:visible left-1/2  -translate-x-1/2 translate-y-full group-hover:translate-y-0 text-base leading-1 font-normal ">
                    <i className="fab fa-twitter"></i>
                  </span>
                </Link>
              </li>
              <li className=" group md:border-r md:border-border-color dark:md:border-white-color-3 last:border-0">
                <Link
                  href="https://www.linkedin.com"
                  className=" flex justify-center items-center w-160px sm:w-170px h-auto  md:h-160px lg:w-230px lg:h-210px xl:w-278px xl:h-238px p-10px relative text-base sm:text-lg xl:text-xl font-medium text-seondary-color dark:text-white-color tracking-normal xl:tracking-[0.02em] leading-1"
                >
                  <span className=" transition-all duration-700 ease-in-out opacity-100 visible group-hover:invisible group-hover:opacity-0  group-hover:-translate-y-full inline-block">
                    My Linkedin
                  </span>
                  <span className="text-seondary-color  border border-seondary-color  dark:text-white-color dark:border-white-color w-35px h-35px rounded-full flex items-center justify-center overflow-hidden z-0 absolute transition-all duration-700  ease-in-out invisible opacity-0 group-hover:opacity-100 group-hover:visible left-1/2  -translate-x-1/2 translate-y-full group-hover:translate-y-0 text-base leading-1 font-normal ">
                    <i className="fab fa-linkedin-in"></i>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center py-25px md:py-35px border-t border-border-color dark:border-white-color-3 px-15px">
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
    </footer>
  );
};

export default Footer2;
