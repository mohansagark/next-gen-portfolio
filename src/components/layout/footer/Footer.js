"use client";
import Socials4 from "@/components/shared/socials/Socials4";
import { useFooterContext } from "@/context_api/FooterContext";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { footerType } = useFooterContext();
  return (
    <footer>
      <div
        className={`footer-inner bg-seondary-color ${
          footerType === 2 ? "dark:bg-seondary-color" : "dark:bg-dark-color"
        }`}
      >
        <div className="container">
          <div className="flex flex-col items-center pt-50px pb-5 md:pt-60px">
            {/* <!-- socials --> */}
            {footerType === 3 ? <Socials4 type={2} /> : ""}
            {/* logo */}
            <div className="footer-logo w-75px h-75px mb-6">
              <Link href="/">
                <Image
                  src="/img/logo/logo.png"
                  alt=""
                  width={400}
                  height={400}
                />
              </Link>
            </div>
            {/* <!-- nav --> */}
            <div>
              <ul className="nav flex flex-wrap justify-center items-center gap-x-35px">
                <li className="nav_item group relative">
                  <Link
                    href="#about"
                    className="text-size-15 font-medium text-white-color capitalize py-10px md:py-15px lg:py-25px 2xl:py-30px relative z-0 after:w-0 after:h-0.5 after:bg-gradient-primary after:absolute after:right-0 hover:after:left-0 after:bottom-[25px] after:transition-all after:duration-500 group-hover:after:w-full"
                  >
                    About
                  </Link>
                </li>
                <li className="nav_item group relative">
                  <Link
                    href="#services"
                    className="text-size-15 font-medium text-white-color capitalize py-10px md:py-15px lg:py-25px 2xl:py-30px relative z-0 after:w-0 after:h-0.5 after:bg-gradient-primary after:absolute after:right-0 hover:after:left-0 after:bottom-[25px] after:transition-all after:duration-500 group-hover:after:w-full"
                  >
                    Services
                  </Link>
                </li>
                <li className="nav_item group relative">
                  <Link
                    href="#portfolio"
                    className="text-size-15 font-medium text-white-color capitalize py-10px md:py-15px lg:py-25px 2xl:py-30px relative z-0 after:w-0 after:h-0.5 after:bg-gradient-primary after:absolute after:right-0 hover:after:left-0 after:bottom-[25px] after:transition-all after:duration-500 group-hover:after:w-full"
                  >
                    Portfolios
                  </Link>
                </li>

                <li className="nav_item group relative">
                  <Link
                    href="#contact"
                    className="text-size-15 font-medium text-white-color capitalize py-10px md:py-15px lg:py-25px 2xl:py-30px relative z-0 after:w-0 after:h-0.5 after:bg-gradient-primary after:absolute after:right-0 hover:after:left-0 after:bottom-[25px] after:transition-all after:duration-500 group-hover:after:w-full"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div
              className={`copyright ${
                footerType === 2 || footerType === 3
                  ? "text-primary-color"
                  : "text-gray-color"
              } whitespace-nowrap text-sm md:text-base mt-5`}
            >
              © 2025 All rights reserved by{" "}
              <Link
                href="/"
                className={`${
                  footerType === 2 || footerType === 3
                    ? "text-primary-color "
                    : "text-white-color"
                } hover:text-primary-color`}
              >
                Dev Mohan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
