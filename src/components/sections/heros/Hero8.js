"use client";

import ButtonPopupVideo from "@/components/shared/buttons/ButtonPopupVideo";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const Hero8 = () => {
  return (
    <section className="hero-section relative pt-170px pb-110px md:pb-30 lg:pt-220px lg:pb-5 2xl:pt-250px 2xl:pb-50px bg-[url('/img/shapes/hero_8.svg')] bg-no-repeat  bg-[top_right]  after:absolute after:top-0 after:left-2/3 after:w-322px after:h-308px after:blur-[150px] after:rounded-50% after:bg-gradient-circle after:-z-1 after:-mt-5%  overflow-hidden">
      {/* <!-- bg --> */}

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-y-[100px] md:gap-y-20 lg:gap-y-0">
          <div className="lg:pl-30px xl:pl-15px 2xl:pl-0">
            <h4 className="text-gray-color-2 text-lg  leading-1.5  font-semibold flex items-center gap-10px mb-5 lg:mb-30px">
              <span>
                <img
                  className="origin-[70%_70%] animate-weave"
                  src="/img/icons/hero-h8-1.png"
                  alt="Icons"
                />
              </span>{" "}
              Hi There, I am{" "}
              <span className="text-primary-color dark:text-white-color  ">
                Mohan Sagar
              </span>
            </h4>

            <h1 className="text-size-38 sm:text-size-45 md:text-size-50 xl:text-size-65 2xl:text-size-80 text-primary-color  dark:text-white-color leading-1.1 lg:leading-1.1  mb-5  tracking-[-0.02em] font-semibold uppercase ">
              Let’s Building
              <span className="flex items-center gap-10px">
                Digital{" "}
                <img
                  src="/img/hero/hero8-1.png"
                  className="mr-0  w-full   max-w-120px xl:max-w-140px h-55px xl:h-75px   inline-block relative    overflow-hidden  rounded-[150px]  object-cover    "
                  alt="Images"
                />
              </span>
              Straspan.
            </h1>

            <p className="text-lg md:text-xl leading-1.5 text-gray-color-2 dark:text-gray-color-2 max-w-420px">
              Digital marketing refers to the use of digital channels,
              platforms.
            </p>
            {/* <!-- action and social --> */}
            <div className="mt-30px md:mt-10">
              <ButtonPrimary isIcon={true} href="/#contact">
                Get In Touch{" "}
              </ButtonPrimary>
            </div>
          </div>
          <div>
            <div
              className="hero-8-images w-full max-w-550px ml-auto md:mr-auto lg:mr-0 flex items-end justify-center relative -top-[60px] z-1 before:w-[94%] before:h-[95%] sm:before:h-[92%] md:before:h-[95%] before:absolute before:top-[30px] sm:before:top-7 md:before:top-[30px]  lg:before:top-[25px]  xl:before:top-[30px] before:left-1/2 before:-translate-x-1/2 before:hex-clip 
					before:bg-gradient-13
					before:animate-gratient 
						before:bg-[length:600%_100%] before:shadow-shadow-inset "
            >
              <div className="hero-shapes  before:w-full before:h-full before:absolute  before:top-4 sm:before:top-[15px] before:left-0  before:hex-clip before:shadow-shadow-inset-2 before:bg-primary-color before:-z-[2] after:w-[99.5%] after:h-[99.5%] after:absolute  after:top-[17px] after:left-1/2 after:-translate-x-1/2   after:hex-clip after:shadow-shadow-inset-2 after:bg-white-color dark:after:bg-dark-color after:-z-1"></div>
              <div className="hero8-mask-images relative w-full max-w-[94%] h-auto sm:h-[595px] md:h-[655px] lg:h-[540px] xl:h-[655px] inline-flex items-end justify-center  hero-mask-img ">
                <img
                  className="w-full"
                  src="/img/hero/hero8-2.png"
                  alt="Images"
                />
              </div>
              <div className="absolute w-[150px] h-[150px] bottom-[-30px] left-1/2 md:bottom-[15%] md:-left-20 -translate-x-1/2 md:translate-x-0 z-[3] bg-gradient-14 backdrop-blur-[55px] dark:backdrop-blur-[32px]  border border-border-color-4 rounded-50%">
                <div className="circle-wrap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <svg
                    className="animate-animate-spin fill-black-color dark:fill-white-color font-normal"
                    viewBox="0 0 140 100"
                    width="125"
                    height="125"
                  >
                    <defs>
                      <path
                        id="circle3"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 110,0 a 37,37 0 1,1 -110,0"
                      />
                    </defs>
                    <text fontSize="14">
                      <textPath xlinkHref="#circle3" className="shape-1">
                        PALY OUR PROMOTIONAL VIDEO PALY OUR PROMOTIONAL VIDEO
                      </textPath>
                    </text>
                  </svg>
                  <div className="circle-button">
                    <ButtonPopupVideo />
                  </div>
                </div>
              </div>
              <div className="absolute w-full max-w-[65px] md:max-w-[85px] lg:max-w-100px left-0 md:-left-2 lg:-left-[30%] bottom-0 lg:bottom-[45px] -z-1 animate-move-var dark:opacity-10">
                <img
                  src="/img/icons/hero-h8-2.png"
                  className="w-full"
                  alt="Shapes"
                />
              </div>
              <div className=" absolute w-full max-w-10 right-10 top-20 -z-1 animate-move-hor">
                <img
                  src="/img/icons/hero-h8-3.png"
                  className="w-full"
                  alt="Shapes"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- hero socials --> */}
      <div className="absolute bottom-20 sm:bottom-[85px] lg:bottom-auto lg:top-1/2  left-1/2 lg:left-[10px]  3xl:left-[50px]  -translate-x-1/2 lg:translate-x-0 lg:-translate-y-1/2">
        <ul className="nav flex flex-row lg:flex-col items-center    gap-5">
          <li className="nav_item group relative ">
            <a
              href="#"
              className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize flex gap-2 items-center "
            >
              <span
                className="text-dark-color group-hover:text-white-color dark:text-white-color
 border border-border-color dark:border-border-color-3 group-hover:border-transparent dark:group-hover:border-transparent w-35px h-35px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-gradient-primary-8 group-hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
              >
                <i className="fa-brands fa-behance "></i>
              </span>
            </a>
          </li>
          <li className="nav_item group relative ">
            <a
              href="#"
              className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize flex gap-2 items-center "
            >
              <span
                className="text-dark-color group-hover:text-white-color dark:text-white-color
 border border-border-color dark:border-border-color-3 group-hover:border-transparent dark:group-hover:border-transparent w-35px h-35px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-gradient-primary-8 group-hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
              >
                <i className="fa-light fa-basketball"></i>
              </span>
            </a>
          </li>
          <li className="nav_item group relative ">
            <a
              href="#"
              className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize flex gap-2 items-center "
            >
              <span
                className="text-dark-color group-hover:text-white-color dark:text-white-color
 border border-border-color dark:border-border-color-3 group-hover:border-transparent dark:group-hover:border-transparent w-35px h-35px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-gradient-primary-8 group-hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
              >
                <i className="fa-brands fa-instagram"></i>
              </span>
            </a>
          </li>
          <li className="nav_item group relative ">
            <a
              href="#"
              className="text-size-15 font-normal text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color capitalize flex gap-2 items-center "
            >
              <span
                className="text-dark-color group-hover:text-white-color dark:text-white-color
 border border-border-color dark:border-border-color-3 group-hover:border-transparent dark:group-hover:border-transparent w-35px h-35px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-gradient-primary-8 group-hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
              >
                <i className="fab fa-x-twitter"></i>
              </span>
            </a>
          </li>
        </ul>
      </div>

      {/* <!-- scroll --> */}
      <div className="hero_scroll -left-[15px] lg:-left-[35px] 3xl:-left-[-15px] hidden md:block">
        <a className="down" href="#scroll-hero">
          <span>
            <i className="fa-regular fa-arrow-right"></i>
          </span>
          Scroll Down
        </a>
      </div>
    </section>
  );
};

export default Hero8;
