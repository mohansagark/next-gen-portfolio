"use client";

import ResumeMarquee from "@/components/shared/marquee/ResumeMarquee";
import accordion from "@/libs/accordion";
import { useEffect } from "react";

const Resume6 = () => {
  useEffect(() => {
    accordion();
  }, []);
  return (
    <section id="credentials">
      <div className=" py-60px md:py-20 lg:py-30 relative after:absolute after:top-0 after:left-full  after:-translate-x-1/2 after:-translate-y-1/2 after:right-5 after:w-650px after:h-550px after:blur-[150px] after:rounded-50% after:bg-gradient-circle-2 after:-z-1   after:opacity-60 overflow-hidden">
        {/* resume marquee */}
        <ResumeMarquee />
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-35px">
            <div className="w-full max-w-420px lg:max-w-365px xl:max-w-420px">
              <div>
                <div className="mb-25px  ">
                  <span className="text-xs px-3 py-5px rounded-full border border-seondary-color-3  uppercase text-primary-color  font-semibold tracking-0.02em relative inline-block">
                    MY EXPERIENCES
                  </span>
                </div>
                <h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  max-w-580px w-full tj-text-invert">
                  Let’s Explore My Experience.
                </h2>
                <div
                  className="mt-30px md:mt-10 wow fadeInUp"
                  data-wow-delay=".3s"
                >
                  <a
                    href="#"
                    className="text-size-15 font-medium text-white-color capitalize py-17px px-35px  bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full leading-1  text-nowrap tracking-1px group inline-flex gap-x-10px items-center"
                  >
                    Download CV
                    <span className="relative overflow-hidden  ">
                      <i className="flaticon-download ml-0.5 text-size-15 group-hover:translate-y-150% transition-all duration-500 inline-block"></i>
                      <i className="flaticon-download ml-0.5 text-size-15 absolute left-0 top-0 -translate-y-150% group-hover:translate-y-0 transition-all duration-500"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full max-w-785px ml-auto">
              <div className="faq faq-2 faq-3  " data-wow-delay="0.3s">
                <div className="w-full flex flex-col gap-25px" id="accordion">
                  {/* <!-- item 1 --> */}
                  <div
                    className=" accordion-single transition-all duration-300  bg-cream-light-color dark:bg-black-color  rounded-15px  py-4 px-15px md:px-30px md:py-23px wow fadeInUp "
                    data-wow-delay=".3s"
                  >
                    <button
                      className="accordion-btn text-primary-color-light  dark:text-white-color flex  items-center w-full text-left text-lg md:text-xl  py-4  
											 gap-5 before:content-['\2b'] before:!right-0   open "
                    >
                      <span className=" w-60px  flex-shrink-0">
                        <img src="/img/icons/h5-resume-1.png" alt="" />
                      </span>
                      <div>
                        <span className="text-xl leading-1.2  text-seondary-color dark:text-white-color mb-15px uppercase font-semibold">
                          Senior Product Designer <br />
                          VirtusLab
                        </span>
                      </div>
                    </button>
                    <div className="accordion-content open ">
                      <div className="py-4   text-gray-color dark:text-white-color">
                        <p className=" text-seondary-color dark:text-body-color-3 mb-8  transition-all duration-300">
                          I'm winner of the world's most prestigious web
                          designthat has more-or-less normal awards in the
                          fields. I break down complex user the experience
                          problems the create integrity focused to solutions
                          that’s connect billions of people. To break the down.
                        </p>
                        <div className="flex items-center gap-10px">
                          <i className="fa-thin fa-calendar-check  text-primary-color font-normal leading-1"></i>
                          <p className="  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300 tracking-0.02em ">
                            2022 - 2023
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- item 2 --> */}
                  <div
                    className=" accordion-single transition-all duration-300  bg-cream-light-color dark:bg-black-color  rounded-15px  py-4 px-15px md:px-30px md:py-23px wow fadeInUp "
                    data-wow-delay=".4s"
                  >
                    <button
                      className="accordion-btn text-primary-color-light  dark:text-white-color flex  items-center w-full text-left text-lg md:text-xl  py-4  
											 gap-5 before:content-['\2b'] before:!right-0"
                    >
                      <span className=" w-60px  flex-shrink-0">
                        <img src="/img/icons/h5-resume-2.png" alt="" />
                      </span>
                      <div>
                        <span className="text-xl leading-1.2  text-seondary-color dark:text-white-color mb-15px uppercase font-semibold">
                          Senior Product Designer <br />
                          VirtusLab
                        </span>
                      </div>
                    </button>
                    <div className="accordion-content">
                      <div className="py-4   text-gray-color dark:text-white-color">
                        <p className=" text-seondary-color dark:text-body-color-3 mb-8  transition-all duration-300">
                          I'm winner of the world's most prestigious web
                          designthat has more-or-less normal awards in the
                          fields. I break down complex user the experience
                          problems the create integrity focused to solutions
                          that’s connect billions of people. To break the down.
                        </p>
                        <div className="flex items-center gap-10px">
                          <i className="fa-thin fa-calendar-check  text-primary-color font-normal leading-1"></i>
                          <p className="  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300 tracking-0.02em ">
                            2022 - 2023
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- item 4 --> */}
                  <div
                    className=" accordion-single transition-all duration-300  bg-cream-light-color dark:bg-black-color  rounded-15px  py-4 px-15px md:px-30px md:py-23px wow fadeInUp "
                    data-wow-delay=".5s"
                  >
                    <button
                      className="accordion-btn text-primary-color-light  dark:text-white-color flex  items-center w-full text-left text-lg md:text-xl  py-4  
											 gap-5 before:content-['\2b'] before:!right-0"
                    >
                      <span className=" w-60px  flex-shrink-0">
                        <img src="/img/icons/h5-resume-3.png" alt="" />
                      </span>
                      <div>
                        <span className="text-xl leading-1.2  text-seondary-color dark:text-white-color mb-15px uppercase font-semibold">
                          Senior Product Designer <br />
                          VirtusLab
                        </span>
                      </div>
                    </button>
                    <div className="accordion-content">
                      <div className="py-4   text-gray-color dark:text-white-color">
                        <p className=" text-seondary-color dark:text-body-color-3 mb-8  transition-all duration-300">
                          I'm winner of the world's most prestigious web
                          designthat has more-or-less normal awards in the
                          fields. I break down complex user the experience
                          problems the create integrity focused to solutions
                          that’s connect billions of people. To break the down.
                        </p>
                        <div className="flex items-center gap-10px">
                          <i className="fa-thin fa-calendar-check  text-primary-color font-normal leading-1"></i>
                          <p className="  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300 tracking-0.02em ">
                            2022 - 2023
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- item 4 --> */}
                  <div
                    className=" accordion-single transition-all duration-300  bg-cream-light-color dark:bg-black-color  rounded-15px  py-4 px-15px md:px-30px md:py-23px wow fadeInUp "
                    data-wow-delay=".6s"
                  >
                    <button
                      className="accordion-btn text-primary-color-light  dark:text-white-color flex  items-center w-full text-left text-lg md:text-xl  py-4  
											 gap-5 before:content-['\2b'] before:!right-0  "
                    >
                      <span className=" w-60px  flex-shrink-0">
                        <img src="/img/icons/h5-resume-4.png" alt="" />
                      </span>
                      <div>
                        <span className="text-xl leading-1.2  text-seondary-color dark:text-white-color mb-15px uppercase font-semibold">
                          Senior Product Designer <br />
                          VirtusLab
                        </span>
                      </div>
                    </button>
                    <div className="accordion-content  ">
                      <div className="py-4   text-gray-color dark:text-white-color">
                        <p className=" text-seondary-color dark:text-body-color-3 mb-8  transition-all duration-300">
                          I'm winner of the world's most prestigious web
                          designthat has more-or-less normal awards in the
                          fields. I break down complex user the experience
                          problems the create integrity focused to solutions
                          that’s connect billions of people. To break the down.
                        </p>
                        <div className="flex items-center gap-10px">
                          <i className="fa-thin fa-calendar-check  text-primary-color font-normal leading-1"></i>
                          <p className="  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300 tracking-0.02em ">
                            2022 - 2023
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume6;
