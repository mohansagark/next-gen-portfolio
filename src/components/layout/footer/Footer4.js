"use client";
import { useFooterContext } from "@/context_api/FooterContext";
import Link from "next/link";

const Footer4 = () => {
  const { footerType } = useFooterContext();
  return (
    <footer>
      <div className="footer-inner  dark:bg-black-color">
        <div className="container">
          <div className="flex flex-wrap gap-4 md:gap-30px justify-center xl:justify-between items-center py-30px md:py-50px  px-15px ">
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
              ©All rights reserved by{" "}
              <Link
                href="/"
                className="text-primary-color-light dark:text-white-color hover:text-primary-color dark:hover:text-primary-color"
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

export default Footer4;
