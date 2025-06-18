"use client";
import ReviewsCard from "@/components/shared/cards/ReviewsCard";
import FunFact3 from "@/components/shared/fun-fact/FunFact3";

const Hero4 = () => {
  return (
    <section className="hero-section heroAnimation relative pt-30 2xl:pt-150px  after:absolute after:top-[-174px] after:right-[-324px] after:w-650px after:h-550px after:blur-[150px] after:rounded-50% after:bg-gradient-circle-2 after:-z-1  after:-translate-x-1/2 after:opacity-60 overflow-hidden">
      <div className="container">
        <div className="relative">
          {/* <!--  heading --> */}
          <div className="text-center">
            <div className="  mb-5 md:mb-25px 2xl:mb-38px">
              <span className="tj-hero-4-subtitle text-xs  uppercase py-9px pl-8 pr-22px bg-cream-light-color dark:bg-seondary-color text-primary-color dark:text-white-color rounded-full font-semibold relative  after:w-7px after:h-7px after:absolute after:left-[15px] after:top-1/2 after:-translate-y-1/2 after:bg-green1 after:rounded-full inline-block">
                AVAILABLE FOR FREELANCE
              </span>
            </div>
            <h1 className="tj-hero-4-title text-size-70  lg:text-size-90 xl:text-size-75 2xl:text-size-110 bg-gradient-text-light dark:bg-gradient-text bg-clip-text leading-0.84  font-semibold text-transparent  inline-block">
              I AM <br />
              MOHAN SAGAR
            </h1>
          </div>

          {/* <!-- content wrapper --> */}
          <div className="relative gap-30px lg:gap-0  flex flex-wrap justify-center">
            {/* <!-- image box --> */}

            <div className="tj-hero-4-bottom-thumb relative  -mt-10px md:-mt-5 max-w-230px sm:max-w-310px md:max-w-315px lg:max-w-350px xl:max-w-390px  2xl:max-w-410px">
              <div className="image-animated" data-tilt>
                <div className="img">
                  <img
                    src="/img/hero/hero-4-thumb.jpg"
                    alt="banner image"
                    className="rounded-full  max-w-full w-fll transition-all duration-300 block"
                  />
                </div>
              </div>

              {/* <!-- cartecgories --> */}
              <div className=" tj-hero-4-bottom-thumb-shape-1 absolute bottom-[34%] left-[-26%] sm:bottom-[26%] sm:left-[-38%] lg:bottom-[16%] xl:bottom-[22%] 2xl:bottom-[23%]">
                <span className="tj-hero-4-bottom-tag text-size-10 sm:text-sm md:text-base px-13px sm:px-19px md:px-22px py-10px sm:py-11px md:py-14px text-primary-color bg-cream-light-color dark:bg-transparent border border-border-color rounded-50px dark:text-white-color font-semibold">
                  Product Designer
                </span>
              </div>
              <div className="tj-hero-4-bottom-thumb-shape-2 absolute top-[42%] right-[-26%] sm:right-[-38%] lg:top-[15%] xl:top-[42%] xl:right-[-25%] 2xl:right-[-38%]">
                <span className="tj-hero-4-bottom-tag text-size-10 sm:text-sm md:text-base px-13px sm:px-19px md:px-22px py-10px sm:py-11px md:py-14px text-primary-color bg-cream-light-color dark:bg-transparent border border-border-color rounded-50px dark:text-white-color font-semibold">
                  UX/UI Designer
                </span>
              </div>
            </div>
            {/* <!-- ratings --> */}
            <ReviewsCard />

            {/* <!-- fanfact --> */}
            <FunFact3 />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero4;
