"use client";

import themeController from "@/libs/themeController";
import { useEffect } from "react";

const ThmeModeSwither = () => {
  useEffect(() => {
    themeController();
  }, []);
  return (
    <div className="fixed top-[200px] lg:top-[300px] transition-all duration-300 right-[-50px] hover:right-0 z-4xl">
      <button className="theme-controller w-90px h-10 bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-l-full text-whiteColor px-10px flex items-center transition-all duration-300 font-sora">
        {/* dark  */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-10px w-5 block dark:hidden"
          viewBox="0 0 512 512"
        >
          <path
            d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          ></path>
        </svg>
        <span className="text-base block dark:hidden">Dark</span>
        {/* light  */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="hidden mr-10px w-5 dark:block"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"
          ></path>
          <circle
            cx="256"
            cy="256"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
          ></circle>
        </svg>
        <span className="text-base hidden dark:block">Light</span>
      </button>
    </div>
  );
};

export default ThmeModeSwither;
