"use client";

const Hero6 = () => {
  return (
    <section className="hero-section flex flex-col justify-center  relative z-0 pb-50px sm:pb-20 lg:pb-25px 2xl:pb-50px pt-160px md:pt-200px lg:pt-210px 2xl:pt-265px   overflow-hidden  after:absolute after:top-0 md:after:top-[-174px] after:right-[-24rem] md:after:right-[-22rem]  2xl:after:right-20 after:w-650px after:h-550px after:blur-[150px] after:rounded-50% after:bg-gradient-circle-2 after:-z-20 after:-translate-x-1/2 after:opacity-60 before:absolute before:bottom-0 md:before:bottom-[-174px] before:right-[-24rem] md:before:right-[-22rem]   before:w-650px before:h-550px before:blur-[150px] before:rounded-50% before:bg-gradient-circle-2 before:-z-20 before:-translate-x-1/2 before:opacity-60">
      <div className="absolute hidden dark:block top-0 left-0 w-full h-full bg-[url('/img/shapes/h6-hero-shapes.png')] bg-no-repeat bg-center bg-cover opacity-80 mix-blend-luminosity -z-10 "></div>

      <div className="container-fluid mx-15px ">
        <div className="flex flex-wrap  justify-between mx-auto gap-35px md:gap-25px lg:gap-75px  xl:gap-85px z-1 w-full max-w-full lg:max-w-950px  xl:max-w-1145px 2xl:max-w-1335px 3xl:max-w-1445px pb-0 md:pb-20 lg:pb-30 xl:pb-20 3xl:pb-0  mb-0 md:pr-0  relative">
          <div className="relative z-1 w-full max-w-433px lg:max-w-560px xl:max-w-750px 2xl:max-w-930px 3xl:max-w-1045px">
            <h6 className="text-gray-color-2 leading-1.5 font-medium  mb-15px ">
              Hi ✌ There,
            </h6>
            <h4 className="text-gray-color-2 text-xl md:text-size-25 lg:text-size-28  leading-1.5  font-semibold flex items-center gap-10px mb-5 lg:mb-30px">
              This is{" "}
              <span className="text-primary-color dark:text-white-color  ">
                Mohan Sagar
              </span>
            </h4>
            <h1 className="text-size-45 sm:text-size-50 lg:text-size-70 xl:text-size-85 2xl:text-size-120 3xl:text-size-145 bg-gradient-text-light dark:bg-gradient-text bg-clip-text text-transparent font-semibold uppercase  leading-1 lg:leading-1 tracking-[-0.03em]">
              Building <br />
              Your unique <br />
              <span className="mr-0  w-full max-w-100px h-45px sm:max-w-120px sm:h-50px md:max-w-130px lg:max-w-165px lg:h-70px  2xl:max-w-230px 2xl:h-115px inline-block relative  object-cover rounded-[150px] border-2 border-primary-color dark:border-white-color overflow-hidden transition-all duration-500 ease-in-out group">
                <img
                  src="/img/hero/h6-hero-1.png"
                  className="transform w-full scale-100 rounded-[150px] h-full object-cover transition-all duration-500 ease-in-out relative group-hover:scale-110 "
                  alt="Images"
                />
              </span>{" "}
              content
            </h1>
          </div>
          <div className="md:flex-shrink-0">
            <div className=" items-center  w-full max-w-full sm:max-w-280px lg:max-w-310px  mr-auto md:ml-auto md:mr-0  mt-0 md:-mt-30px 2xl:-mt-20  p-30px sm:px-15px lg:px-30px rounded-10px bg-cream-light-color dark:bg-black-color">
              <div className="  w-full max-w-345px sm:max-w-200px lg:max-w-250px  h-100px mb-30px  mx-auto relative  object-cover rounded-[150px] border-2 border-primary-color dark:border-white-color overflow-hidden transition-all duration-500 ease-in-out group">
                <img
                  src="/img/hero/h6-hero-2.png"
                  className="transform w-full scale-100 rounded-[150px] h-full object-cover transition-all duration-500 ease-in-out relative group-hover:scale-110 "
                  alt="Images"
                />
              </div>
              <p className="text-seondary-color dark:text-gray-color-2 leading-1.5 font-medium  mb-20 ">
                I'm an award winning product designer specialized in financial
                products.
              </p>
              <div>
                <a
                  href="#contact"
                  className="text-seondary-color dark:text-white-color text-size-15 font-bold leading-1.5 transition-all duration-300 group flex gap-x-15px items-center justify-between  pb-5px relative after:absolute after:block after:h-px after:min-h-[1px] after:right-0 after:bottom-0 after:left-0 after:bg-seondary-color dark:after:bg-white-color after:will-change-transform hover:after:animate-hover-underline"
                >
                  Hire me!
                  <span className="relative overflow-hidden -rotate-45">
                    <i className="fa-regular fa-arrow-right group-hover:translate-x-150% transition-all duration-500 inline-block"></i>
                    <i className="fa-regular fa-arrow-right absolute left-0 top-0 -translate-x-150% group-hover:-translate-x-0 transition-all duration-500"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="group_overly">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      {/* <!-- scroll --> */}
      <div className="hero_scroll hidden md:block">
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

export default Hero6;
