"use client";
import { useFooterContext } from "@/context_api/FooterContext";
import useHomeLink from "@/hooks/useHomeLink";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { footerType } = useFooterContext();
  const homeLink = useHomeLink();
  return (
    <footer>
      <div
        className={`footer-inner bg-seondary-color ${
          footerType === 2 ? "dark:bg-seondary-color" : "dark:bg-dark-color"
        }`}
      >
        <div className="container">
          <div className="flex flex-col items-center pt-50px pb-5 md:pt-60px">
            {/* logo */}
            <div className="footer-logo w-75px h-75px mb-6">
              <Link href={homeLink("/")} className="logo inline-flex">
                <Image
                  className="hidden dark:inline-block"
                  src="/img/logo/logo.png"
                  alt="Dev Mohan"
                  width={400}
                  height={400}
                />
                <Image
                  className="inline-block dark:hidden"
                  src="/img/logo/logo-dark.png"
                  alt="Dev Mohan"
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
                    href={homeLink("#capabilities")}
                    className="text-size-15 font-medium text-white-color capitalize py-10px md:py-15px lg:py-25px 2xl:py-30px relative z-0 after:w-0 after:h-0.5 after:bg-gradient-primary after:absolute after:right-0 hover:after:left-0 after:bottom-[25px] after:transition-all after:duration-500 group-hover:after:w-full"
                  >
                    Expertise
                  </Link>
                </li>
                <li className="nav_item group relative">
                  <Link
                    href={homeLink("#work")}
                    className="text-size-15 font-medium text-white-color capitalize py-10px md:py-15px lg:py-25px 2xl:py-30px relative z-0 after:w-0 after:h-0.5 after:bg-gradient-primary after:absolute after:right-0 hover:after:left-0 after:bottom-[25px] after:transition-all after:duration-500 group-hover:after:w-full"
                  >
                    Work
                  </Link>
                </li>
                <li className="nav_item group relative">
                  <Link
                    href={homeLink("#experience")}
                    className="text-size-15 font-medium text-white-color capitalize py-10px md:py-15px lg:py-25px 2xl:py-30px relative z-0 after:w-0 after:h-0.5 after:bg-gradient-primary after:absolute after:right-0 hover:after:left-0 after:bottom-[25px] after:transition-all after:duration-500 group-hover:after:w-full"
                  >
                    Experience
                  </Link>
                </li>
                <li className="nav_item group relative">
                  <Link
                    href={homeLink("#contact")}
                    className="text-size-15 font-medium text-white-color capitalize py-10px md:py-15px lg:py-25px 2xl:py-30px relative z-0 after:w-0 after:h-0.5 after:bg-gradient-primary after:absolute after:right-0 hover:after:left-0 after:bottom-[25px] after:transition-all after:duration-500 group-hover:after:w-full"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <p
              className={`copyright ${
                footerType === 2 || footerType === 3
                  ? "text-primary-color"
                  : "text-gray-color"
              } text-xs sm:text-sm md:text-base mt-5 text-center px-4 max-w-full whitespace-nowrap`}
            >
              © {new Date().getFullYear()} Mohan Sagar
              <span className="mx-2 opacity-40">·</span>
              AI Engineer · Frontend Architect
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
