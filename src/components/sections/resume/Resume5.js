"use client";

import tjTab from "@/libs/tjTab";
import { useEffect } from "react";

const Resume5 = ({ type, title }) => {
  useEffect(() => {
    tjTab();
  }, []);
  return (
    <section id="credentials">
      <div
        className={` py-60px md:py-20 lg:py-30 relative ${
          type === 2 ? "dark:bg-primary-color-light" : ""
        } after:absolute after:top-0 after:left-1/2  after:-translate-x-1/2 after:-translate-y-1/2 after:right-5 after:w-650px after:h-550px after:blur-[150px] after:rounded-50% after:bg-gradient-circle-2 after:-z-1   after:opacity-60`}
      >
        <div className="container">
          {/* <!-- section heading --> */}
          <div className="mb-10 md:mb-50px xl:mb-60px text-center flex flex-col items-center ">
            <div className="mb-25px  ">
              <span
                className={`text-xs  uppercase text-primary-color  font-medium relative inline-block tracking-0.2em  wow ${
                  type === 2 ? "fadeInRight" : "fadeInUp"
                }`}
                data-wow-delay={".3s"}
              >
                Behind the Pixels
              </span>
            </div>
            <h2
              className={`text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color   max-w-580px w-full ${
                type === 2 ? "uppercase tj-text-invert" : " wow fadeInUp"
              }`}
              data-wow-delay={type === 2 ? "0" : ".4s"}
            >
              {title ? title : "My Experience, Education & Awards"}
            </h2>
          </div>
          {/* <!-- resume tab --> */}
          <div className="">
            <div className="flex items-center mb-30px sm:mb-10">
              <ul
                id="tabs"
                className="max-w-400 mx-auto inline-flex items-center justify-center bg-primary-color rounded-full p-5px relative z-0 "
              >
                <li className="active ">
                  <a
                    className=" text-sm sm:text-size-15  font-bold px-15px sm:px-25px py-10px sm:py-11px text-white-color bg-transparent rounded-full "
                    href="#tab1"
                  >
                    Experiences
                  </a>
                </li>
                <li>
                  <a
                    className=" text-sm sm:text-size-15  font-bold px-15px sm:px-25px py-10px sm:py-11px text-white-color bg-transparent rounded-full "
                    href="#tab2"
                  >
                    Education
                  </a>
                </li>
                <li>
                  <a
                    className=" text-sm sm:text-size-15  font-bold px-15px sm:px-25px py-10px sm:py-11px text-white-color bg-transparent rounded-full "
                    href="#tab3"
                  >
                    Awards
                  </a>
                </li>
              </ul>
            </div>

            <div id="tab-contents">
              {/* <!-- experience --> */}
              <div id="tab1" className="tab-contents tab-pane fade show">
                <div className=" px-15px py-30px xl:p-60px border-2 border-body-color dark:border-bg-color-2 rounded-15px">
                  {/* <!-- content --> */}
                  <div className=" w-full ">
                    <div className=" flex flex-col md:flex-row md:justify-between  gap-5 lg:gap-35px 2xl:gap-95px pb-45px mb-10 last:pb-0 last:mb-0   border-b-2 border-body-color dark:border-bg-color-2 last:border-0">
                      <div className=" flex flex-col md:flex-row gap-30px md:gap-10 max-w-735px w-full">
                        <div className=" w-60px  flex-shrink-0">
                          <img src="/img/icons/h4-work-1.png" alt="" />
                        </div>
                        <div>
                          <h4 className="text-xl leading-1.2  text-seondary-color dark:text-white-color mb-15px uppercase font-medium">
                            Senior Product Designer
                          </h4>
                          <p className=" text-primary-color dark:text-body-color group-hover:text-white-color transition-all text-size-15 uppercase mb-22px duration-300">
                            VirtusLab
                          </p>
                          <p className=" text-lg  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300">
                            I'm winner of the world's most prestigious web
                            designthat has more-or-less normal awards in the
                            fields.
                          </p>
                        </div>
                      </div>

                      {/* <!-- date --> */}
                      <div className="md:flex-shrink-0">
                        <div className="flex items-center gap-10px text-lg sm:text-xl">
                          <i className="fa-thin fa-calendar-check text-xl text-primary-color leading-1"></i>
                          <p className="  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300 md:ml-auto tracking-0.02em ">
                            2022 - 2023
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className=" flex flex-col md:flex-row md:justify-between  gap-5 lg:gap-35px 2xl:gap-95px pb-45px mb-10 last:pb-0 last:mb-0   border-b-2 border-body-color dark:border-bg-color-2 last:border-0">
                      <div className=" flex flex-col md:flex-row gap-30px md:gap-10 max-w-735px w-full">
                        <div className=" w-60px  flex-shrink-0">
                          <img src="/img/icons/h4-work-2.png" alt="" />
                        </div>
                        <div>
                          <h4 className="text-xl leading-1.2  text-seondary-color dark:text-white-color mb-15px uppercase font-medium">
                            Senior Product Designer
                          </h4>
                          <p className=" text-primary-color dark:text-body-color group-hover:text-white-color transition-all text-size-15 uppercase mb-22px duration-300">
                            Semiflat Studio
                          </p>
                          <p className=" text-lg  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300">
                            I'm winner of the world's most prestigious web
                            designthat has more-or-less normal awards in the
                            fields.
                          </p>
                        </div>
                      </div>

                      {/* <!-- date --> */}
                      <div className="md:flex-shrink-0">
                        <div className="flex items-center gap-10px text-lg sm:text-xl">
                          <i className="fa-thin fa-calendar-check text-xl text-primary-color leading-1"></i>
                          <p className="  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300 md:ml-auto tracking-0.02em ">
                            2020 - 2023
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className=" flex flex-col md:flex-row md:justify-between  gap-5 lg:gap-35px 2xl:gap-95px pb-45px mb-10 last:pb-0 last:mb-0   border-b-2 border-body-color dark:border-bg-color-2 last:border-0">
                      <div className=" flex flex-col md:flex-row gap-30px md:gap-10 max-w-735px w-full">
                        <div className=" w-60px  flex-shrink-0">
                          <img src="/img/icons/h4-work-3.png" alt="" />
                        </div>
                        <div>
                          <h4 className="text-xl leading-1.2  text-seondary-color dark:text-white-color mb-15px uppercase font-medium">
                            Senior User Interface Designer
                          </h4>
                          <p className=" text-primary-color dark:text-body-color group-hover:text-white-color transition-all text-size-15 uppercase mb-22px duration-300">
                            Autentika
                          </p>
                          <p className=" text-lg  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300">
                            I'm winner of the world's most prestigious web
                            designthat has more-or-less normal awards in the
                            fields.
                          </p>
                        </div>
                      </div>

                      {/* <!-- date --> */}
                      <div className="md:flex-shrink-0">
                        <div className="flex items-center gap-10px text-lg sm:text-xl">
                          <i className="fa-thin fa-calendar-check text-xl text-primary-color leading-1"></i>
                          <p className="  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300 md:ml-auto tracking-0.02em ">
                            2018 - 2020
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- education --> */}
              <div id="tab2" className="tab-contents tab-pane fade">
                <div className=" px-15px py-30px xl:p-60px border-2 border-body-color dark:border-bg-color-2 rounded-15px">
                  {/* <!-- content --> */}
                  <div className=" w-full ">
                    <div className=" flex flex-col md:flex-row md:justify-between  gap-5 lg:gap-35px 2xl:gap-95px pb-45px mb-10 last:pb-0 last:mb-0   border-b-2 border-body-color dark:border-bg-color-2 last:border-0">
                      <div className=" flex flex-col md:flex-row gap-30px md:gap-10 max-w-735px w-full">
                        <div className=" w-60px  flex-shrink-0">
                          <img src="/img/icons/h4-work-4.png" alt="" />
                        </div>
                        <div>
                          <h4 className="text-xl leading-1.2  text-seondary-color dark:text-white-color mb-15px uppercase font-medium">
                            SWPS
                          </h4>
                          <p className=" text-primary-color dark:text-body-color group-hover:text-white-color transition-all text-size-15 uppercase mb-22px duration-300">
                            Bachelor's Degree in Web Design and Development
                          </p>
                          <p className=" text-lg  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300">
                            I'm winner of the world's most prestigious web
                            designthat has more-or-less normal awards in the
                            fields.
                          </p>
                        </div>
                      </div>

                      {/* <!-- date --> */}
                      <div className="md:flex-shrink-0">
                        <div className="flex items-center gap-10px text-lg sm:text-xl">
                          <i className="fa-thin fa-calendar-check text-xl text-primary-color leading-1"></i>
                          <p className="  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300 md:ml-auto tracking-0.02em ">
                            2022 - 2024
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className=" flex flex-col md:flex-row md:justify-between  gap-5 lg:gap-35px 2xl:gap-95px pb-45px mb-10 last:pb-0 last:mb-0   border-b-2 border-body-color dark:border-bg-color-2 last:border-0">
                      <div className=" flex flex-col md:flex-row gap-30px md:gap-10 max-w-735px w-full">
                        <div className=" w-60px  flex-shrink-0">
                          <img src="/img/icons/h4-work-5.png" alt="" />
                        </div>
                        <div>
                          <h4 className="text-xl leading-1.2  text-seondary-color dark:text-white-color mb-15px uppercase font-medium">
                            design university
                          </h4>
                          <p className=" text-primary-color dark:text-body-color group-hover:text-white-color transition-all text-size-15 uppercase mb-22px duration-300">
                            ux/ui designer
                          </p>
                          <p className=" text-lg  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300">
                            I'm winner of the world's most prestigious web
                            designthat has more-or-less normal awards in the
                            fields.
                          </p>
                        </div>
                      </div>

                      {/* <!-- date --> */}
                      <div className="md:flex-shrink-0">
                        <div className="flex items-center gap-10px text-lg sm:text-xl">
                          <i className="fa-thin fa-calendar-check text-xl text-primary-color leading-1"></i>
                          <p className="  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300 md:ml-auto tracking-0.02em ">
                            2020 - 2022
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className=" flex flex-col md:flex-row md:justify-between  gap-5 lg:gap-35px 2xl:gap-95px pb-45px mb-10 last:pb-0 last:mb-0   border-b-2 border-body-color dark:border-bg-color-2 last:border-0">
                      <div className=" flex flex-col md:flex-row gap-30px md:gap-10 max-w-735px w-full">
                        <div className=" w-60px  flex-shrink-0">
                          <img src="/img/icons/h4-work-6.png" alt="" />
                        </div>
                        <div>
                          <h4 className="text-xl leading-1.2  text-seondary-color dark:text-white-color mb-15px uppercase font-medium">
                            UI UX design university
                          </h4>
                          <p className=" text-primary-color dark:text-body-color group-hover:text-white-color transition-all text-size-15 uppercase mb-22px duration-300">
                            ux/ui designer
                          </p>
                          <p className=" text-lg  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300">
                            I'm winner of the world's most prestigious web
                            designthat has more-or-less normal awards in the
                            fields.
                          </p>
                        </div>
                      </div>

                      {/* <!-- date --> */}
                      <div className="md:flex-shrink-0">
                        <div className="flex items-center gap-10px text-lg sm:text-xl">
                          <i className="fa-thin fa-calendar-check text-xl text-primary-color leading-1"></i>
                          <p className="  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300 md:ml-auto tracking-0.02em ">
                            2018 - 2020
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- award --> */}
              <div id="tab3" className="tab-contents tab-pane fade">
                <div className=" px-15px py-30px xl:p-60px border-2 border-body-color dark:border-bg-color-2 rounded-15px">
                  {/* <!-- content --> */}
                  <div className=" w-full ">
                    <div className=" flex flex-col md:flex-row md:justify-between  gap-5 lg:gap-35px 2xl:gap-95px pb-45px mb-10 last:pb-0 last:mb-0   border-b-2 border-body-color dark:border-bg-color-2 last:border-0">
                      <div className=" flex flex-col md:flex-row gap-30px md:gap-10 max-w-735px w-full">
                        <div className=" w-60px  flex-shrink-0">
                          <img src="/img/icons/h4-work-7.png" alt="" />
                        </div>
                        <div>
                          <h4 className="text-xl leading-1.2  text-seondary-color dark:text-white-color mb-15px uppercase font-medium">
                            x4 Red dot Design Award
                          </h4>
                          <p className=" text-primary-color dark:text-body-color group-hover:text-white-color transition-all text-size-15 uppercase mb-22px duration-300">
                            UI/UX Design
                          </p>
                          <p className=" text-lg  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300">
                            I'm winner of the world's most prestigious web
                            designthat has more-or-less normal awards in the
                            fields.
                          </p>
                        </div>
                      </div>

                      {/* <!-- date --> */}
                      <div className="md:flex-shrink-0">
                        <div className="flex items-center gap-10px text-lg sm:text-xl">
                          <i className="fa-thin fa-calendar-check text-xl text-primary-color leading-1"></i>
                          <p className="  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300 md:ml-auto tracking-0.02em ">
                            2024
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className=" flex flex-col md:flex-row md:justify-between  gap-5 lg:gap-35px 2xl:gap-95px pb-45px mb-10 last:pb-0 last:mb-0   border-b-2 border-body-color dark:border-bg-color-2 last:border-0">
                      <div className=" flex flex-col md:flex-row gap-30px md:gap-10 max-w-735px w-full">
                        <div className=" w-60px  flex-shrink-0">
                          <img src="/img/icons/h4-work-8.png" alt="" />
                        </div>
                        <div>
                          <h4 className="text-xl leading-1.2  text-seondary-color dark:text-white-color mb-15px uppercase font-medium">
                            x2 W3 Code Award
                          </h4>
                          <p className=" text-primary-color dark:text-body-color group-hover:text-white-color transition-all text-size-15 uppercase mb-22px duration-300">
                            Development
                          </p>
                          <p className=" text-lg  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300">
                            I'm winner of the world's most prestigious web
                            designthat has more-or-less normal awards in the
                            fields.
                          </p>
                        </div>
                      </div>

                      {/* <!-- date --> */}
                      <div className="md:flex-shrink-0">
                        <div className="flex items-center gap-10px text-lg sm:text-xl">
                          <i className="fa-thin fa-calendar-check text-xl text-primary-color leading-1"></i>
                          <p className="  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300 md:ml-auto tracking-0.02em ">
                            2022
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className=" flex flex-col md:flex-row md:justify-between  gap-5 lg:gap-35px 2xl:gap-95px pb-45px mb-10 last:pb-0 last:mb-0   border-b-2 border-body-color dark:border-bg-color-2 last:border-0">
                      <div className=" flex flex-col md:flex-row gap-30px md:gap-10 max-w-735px w-full">
                        <div className=" w-60px  flex-shrink-0">
                          <img src="/img/icons/h4-work-9.png" alt="" />
                        </div>
                        <div>
                          <h4 className="text-xl leading-1.2  text-seondary-color dark:text-white-color mb-15px uppercase font-medium">
                            x1 IF Product Design Award
                          </h4>
                          <p className=" text-primary-color dark:text-body-color group-hover:text-white-color transition-all text-size-15 uppercase mb-22px duration-300">
                            ux/ui designer
                          </p>
                          <p className=" text-lg  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300">
                            I'm winner of the world's most prestigious web
                            designthat has more-or-less normal awards in the
                            fields.
                          </p>
                        </div>
                      </div>

                      {/* <!-- date --> */}
                      <div className="md:flex-shrink-0">
                        <div className="flex items-center gap-10px text-lg sm:text-xl">
                          <i className="fa-thin fa-calendar-check text-xl text-primary-color leading-1"></i>
                          <p className="  text-seondary-color dark:text-body-color-3 group-hover:text-white-color transition-all duration-300 md:ml-auto tracking-0.02em ">
                            2020
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

export default Resume5;
