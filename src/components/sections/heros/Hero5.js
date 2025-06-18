"use client";

import ButtonDownload from "@/components/shared/buttons/ButtonDownload";
import Link from "next/link";

const Hero5 = () => {
  return (
    <section className="hero-section flex flex-col justify-center lg:min-h-925px relative z-0 pt-175px md:pt-205px lg:pt-0   overflow-hidden ">
      <div className="container">
        <div className="grid  lg:items-center gap-y-10px md:gap-y-0">
          <div className="relative z-1">
            <h4 className="text-seondary-color dark:text-body-color text-lg leading-1 font-semibold flex items-center gap-10px mb-15px md:mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="36"
                viewBox="0 0 32 36"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.6128 17.4126L25.2598 18.2204C25.0222 22.4627 23.2798 25.9136 20.1514 28.6356L18.5044 27.8277C18.85 23.9606 20.4786 20.4708 23.6128 17.4126Z"
                  fill="#7343D2"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.2656 20.4411C18.0848 18.8827 17.8292 16.7302 18.9265 14.7261C18.9265 14.7261 19.1533 12.8635 19.3228 11.4728C19.4297 10.5944 20.1137 9.89743 20.99 9.77395C21.233 9.73975 21.4799 9.80599 21.6733 9.95755C21.8662 10.1091 21.9893 10.3327 22.0142 10.5767C22.0801 11.4929 22.2438 12.8577 22.6053 13.6364C23.0924 14.6851 23.749 15.8198 23.7688 17.8495C23.7854 18.7387 24.0546 19.6048 24.5446 20.3472C24.9485 20.9876 25.3676 21.6219 25.3676 21.6219L22.7522 24.0253L19.2656 20.4411Z"
                  fill="#FDBE00"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.7454 18.3693C17.7454 18.3693 13.0391 11.0656 11.4619 8.61764C11.1646 8.15612 11.2265 7.5506 11.611 7.15892L11.6113 7.15856C11.8799 6.88496 12.2543 6.74168 12.6366 6.7658C13.0193 6.78992 13.3724 6.97928 13.6043 7.28456C15.6271 9.94784 20.27 16.0614 20.27 16.0614L17.7454 18.3693Z"
                  fill="#FDBE00"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.5996 19.6428C15.5996 19.6428 9.40471 13.5501 7.32859 11.5082C6.93727 11.1234 6.86455 10.5189 7.15363 10.0524L7.15399 10.052C7.35595 9.7262 7.68967 9.50408 8.06803 9.4436C8.44675 9.38348 8.83267 9.49076 9.12607 9.73772C11.6842 11.8916 17.5562 16.8366 17.5562 16.8366L15.5996 19.6428Z"
                  fill="#FDBE00"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.8521 22.4134C15.8521 22.4134 8.42921 17.8975 5.94125 16.3837C5.47217 16.0986 5.26337 15.5266 5.43833 15.0064L5.43869 15.0056C5.56073 14.6424 5.83469 14.3501 6.18965 14.205C6.54425 14.0595 6.94457 14.0758 7.28657 14.2493C10.2692 15.762 17.1157 19.2342 17.1157 19.2342L15.8521 22.4134Z"
                  fill="#FDBE00"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.8118 27.2386C20.8118 27.2386 16.1044 25.016 14.2699 23.743C13.7234 23.3636 13.1074 23.0957 12.4576 22.9546C11.3132 22.6987 9.5258 22.3048 8.921 22.2123C8.39288 22.1317 7.99076 21.6957 7.95332 21.1625L7.95296 21.1622C7.92812 20.809 8.05808 20.4623 8.309 20.2121C8.55992 19.9623 8.90696 19.8338 9.26012 19.8601C10.7908 19.9745 15.4863 20.3248 15.4863 20.3248L15.0151 18.4856L18.8466 15.1523L24.9007 22.01L20.8118 27.2386Z"
                  fill="#FDBE00"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24.4258 17.8066L30.0263 20.5534C29.7891 24.796 28.0467 28.247 24.9183 30.969L19.3174 28.2222C22.0883 25.3274 23.8735 21.9002 24.4258 17.8066Z"
                  fill="#9363F3"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M25.818 19.6731C25.3986 19.5439 24.9532 19.7793 24.824 20.1987C24.6948 20.6185 24.9302 21.0638 25.3496 21.193C25.769 21.3223 26.2147 21.0865 26.3439 20.6671C26.4728 20.2477 26.2374 19.8024 25.818 19.6731Z"
                  fill="white"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.1875 5.41778C19.2092 5.29538 21.564 6.32102 22.2015 8.78162C22.2386 8.92598 22.3862 9.01274 22.5306 8.9753C22.6746 8.93786 22.7613 8.79062 22.7243 8.64626C22.0143 5.90594 19.4065 4.74242 17.1547 4.87886C17.006 4.88786 16.8926 5.01602 16.9016 5.1647C16.9106 5.31338 17.0388 5.42678 17.1875 5.41778Z"
                  fill="#9363F3"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.5786 6.8559C18.7093 6.7875 20.0295 7.35666 20.3859 8.73258C20.4233 8.87694 20.5705 8.9637 20.7149 8.92626C20.8593 8.88918 20.946 8.74158 20.9086 8.59722C20.4798 6.94158 18.9066 6.23454 17.5462 6.31698C17.3975 6.32598 17.2837 6.45414 17.2927 6.60282C17.3017 6.7515 17.4299 6.8649 17.5786 6.8559Z"
                  fill="#9363F3"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.11444 23.2907C6.34304 24.6825 7.70564 27.8864 12.1675 28.1374C12.3162 28.146 12.444 28.0319 12.4522 27.8832C12.4605 27.7342 12.3464 27.6067 12.1977 27.5985C8.12432 27.3691 6.85604 24.4737 6.64724 23.2032C6.62312 23.0563 6.48416 22.9563 6.33728 22.9807C6.19004 23.0049 6.09032 23.1438 6.11444 23.2907Z"
                  fill="#9363F3"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.91466 23.7268C8.03814 24.3795 8.76534 26.0672 11.1773 26.3577C11.3253 26.3754 11.4599 26.2699 11.4776 26.1219C11.4956 25.974 11.3897 25.8393 11.2418 25.8217C9.19626 25.5751 8.55006 24.1804 8.4453 23.6264C8.41758 23.4802 8.27646 23.3838 8.12994 23.4115C7.98342 23.4388 7.88694 23.5803 7.91466 23.7268Z"
                  fill="#9363F3"
                ></path>
              </svg>
              Hi There, I am Mohan Sagar
            </h4>
            <h1 className="text-size-35 sm:text-size-40 md:text-size-50 xl:text-size-55 2xl:text-7xl text-seondary-color  dark:text-white-color leading-1.2 lg:leading-1.2  mb-5 md:mb-26px tracking-[-0.02em]">
              Designs for the <br className="hidden lg:block" /> Digital World
            </h1>

            <p className="text-sm sm:text-base md:text-lg leading-1.5 sm:leading-1.5 md:leading-1.5 text-primary-color-light dark:text-body-color max-w-530px lg:max-w-400px 2xl:max-w-540px mb-10">
              I break down complex user experience problems to create integrity
              focused solutions that connect billions of people
            </p>
            {/* <!-- action and social --> */}

            <div>
              <ButtonDownload />
            </div>
          </div>
          <div className=" ">
            <div
              className="w-full  lg:max-w-[800px] 2xl:max-w-[950px] 3xl:max-w-[1275px]   static lg:absolute bottom-0 right-0  2xl:right-[148px] lg:bottom-[45px] xl:bottom-20 2xl:bottom-[45px] 3xl:bottom-0 3xl:right-0
                after:content-[''] after:hidden lg:after:block after:absolute after:w-[400px] after:h-full after:top-0 after:left-0 after:z-0 after:bg-gradient-primary-6 dark:after:bg-gradient-primary-6-dark lg:overflow-hidden 2xl:overflow-visible -z-1"
            >
              <img
                src="/img/hero/hero-5-thumb.png"
                className="w-full  lg:w-[145%] lg:max-w-[145%] xl:w-[150%] xl:max-w-[150%] 2xl:w-[127%] 2xl:max-w-[127%] 3xl:w-full 3xl:max-w-full lg:-ml-[12rem]  xl:-ml-[16rem]  2xl:ml-0 hidden dark:inline-block "
                alt=""
              />
              <img
                src="/img/hero/h5-hero-img.png"
                className="w-full  lg:w-[145%] lg:max-w-[145%] xl:w-[150%] xl:max-w-[150%] 2xl:w-[127%] 2xl:max-w-[127%] 3xl:w-full 3xl:max-w-full lg:-ml-[12rem]  xl:-ml-[16rem] 2xl:ml-0  dark:hidden "
                alt=""
              />

              <div className="tj-hero-5-thumb-shape-2 hidden lg:block"></div>
              <div className="tj-hero-5-thumb-shape-3 hidden lg:block">
                <span>Become a</span>
                <span>Pro Designer</span>
              </div>
              <div className="tj-hero-5-thumb-shape-4 hidden lg:block">
                <div className="tj-hero-5-thumb-shape-4-text-animed">
                  <h2 className="first">UI</h2>
                  <h2 className="second">UI</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- scroll --> */}
      <div className="hero_scroll">
        <Link className="down" href="#scroll-hero">
          <span>
            <i className="fa-regular fa-arrow-right"></i>
          </span>
          Scroll Down
        </Link>
      </div>
    </section>
  );
};

export default Hero5;
