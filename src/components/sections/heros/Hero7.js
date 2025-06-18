"use client";

import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const Hero7 = () => {
  return (
    <section className="hero-section heroAnimation  flex flex-col justify-center  relative z-0 pt-130px lg:pt-185px    overflow-hidden  after:absolute after:top-0 md:after:top-[-200px]  after:left-1/2 after:-translate-x-1/2  after:w-650px after:h-550px after:blur-[150px] after:rounded-50% after:bg-gradient-circle-2 after:-z-20  after:opacity-60 ">
      <div className="absolute hidden dark:block top-0 left-0 w-full h-full bg-[url('/img/hero/hero-7-bg.svg')] bg-no-repeat  bg-top bg-contain opacity-80 mix-blend-luminosity -z-10 "></div>

      <div className="container ">
        <div className="mb-20 lg:mb-100px">
          <div className="max-w-900px mx-auto text-center">
            <div className="tj-hero-7-thumb max-w-full w-128px h-128px rounded-100% relative  z-0 after:absolute after:-left-1 after:-top-1 after:-right-1 after:-bottom-1 after:rounded-100% after:bg-gradient-text after:-z-1 mb-8 mx-auto">
              <img
                src="/img/hero/hero-7-thumb.png"
                className="w-full rounded-100%"
                alt=""
              />
            </div>
            <div className="tj-hero-7-content">
              <h1 className=" text-size-35 sm:text-size-40 md:text-size-54 lg:text-size-68 text-seondary-color dark:text-white-color  leading-1.15 -tracking-0.03em  font-semibold  mb-38px uppercase">
                Hi,{" "}
                <span className="inline-block origin-[70%_70%] animate-weave">
                  👋
                </span>{" "}
                <span className="bg-gradient-text-light dark:bg-gradient-text bg-clip-text  text-transparent">
                  I am Mohan Sagar!
                </span>
                Your Partner Elevating
                <br />
                SEO Success
              </h1>
            </div>

            <div className="tj-hero-7-button">
              <ButtonPrimary isIcon={true} href="/#contact">
                Hire Me Now{" "}
              </ButtonPrimary>
            </div>
          </div>
        </div>

        <div className="grid gap-30px lg:grid-cols-12">
          <div className="lg:col-start-5 lg:col-span-8 ">
            <div className="tj-feature-7-thumb rounded-15px overflow-hidden  ">
              <img src="/img/feature/feature-7-thumb.jpg" alt="" />
            </div>
          </div>
          <div className="tj-feature-7-wrapper lg:col-start-1 lg:col-span-4 lg:row-start-1 flex flex-col justify-between gap-30px p-30px rounded-15px bg-black-color h-full ">
            <div>
              <h6 className="text-size-15 text-white-color font-medium mb-15px">
                Total Revenue
              </h6>
              <h4 className="text-3xl sm:text-size-45 text-white-color font-bold leading-1.2">
                $80,603K{" "}
                <i className="fa-regular fa-arrow-right transition-all duration-400 -rotate-45 text-size-28 text-green2 font-bold "></i>
              </h4>
            </div>
            <div className=" ">
              <img
                src="/img/feature/feature-7-thum1.png"
                className="  "
                alt="Images"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero7;
