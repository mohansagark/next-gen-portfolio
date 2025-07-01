"use client";

import getResume from "@/libs/getResume";
import tjTab from "@/libs/tjTab";
import { useEffect } from "react";

const Resume5 = ({ type, title }) => {
  useEffect(() => {
    tjTab();
  }, []);
  const resume = getResume();
  return (
    <section id="credentials">
      <div
        className={`py-60px md:py-20 lg:py-30 relative ${
          type === 2 ? "dark:bg-primary-color-light" : ""
        } after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:right-5 after:w-650px after:h-550px after:blur-[150px] after:rounded-50% after:bg-gradient-circle-2 after:-z-1 after:opacity-60`}
      >
        <div className="container">
          <div className="mb-10 md:mb-50px xl:mb-60px text-center flex flex-col items-center">
            <div className="mb-25px">
              <span
                className="text-xs uppercase text-primary-color font-medium relative inline-block tracking-0.2em wow fadeInUp"
                data-wow-delay=".3s"
              >
                Behind the Pixels
              </span>
            </div>
            <h2
              className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 font-semibold leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color max-w-580px w-full wow fadeInUp"
              data-wow-delay={type === 2 ? "0" : ".4s"}
            >
              {title ? title : "My Experience, Education & Awards"}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex items-center mb-30px sm:mb-10">
            <ul
              id="tabs"
              className="max-w-400 mx-auto inline-flex items-center justify-center bg-primary-color rounded-full p-5px relative z-0"
            >
              {resume?.map((section, idx) => (
                <li key={idx} className={idx === 0 ? "active" : ""}>
                  <a
                    href={`#tab${idx + 1}`}
                    className="text-sm sm:text-size-15 font-bold px-15px sm:px-25px py-10px sm:py-11px text-white-color bg-transparent rounded-full"
                  >
                    {section.title.includes("Experience")
                      ? "Experiences"
                      : section.title.includes("Education")
                      ? "Education"
                      : "Awards"}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Content tabs */}
          <div id="tab-contents">
            {resume?.map((section, idx) => (
              <div
                key={idx}
                id={`tab${idx + 1}`}
                className={`tab-contents tab-pane fade ${
                  idx === 0 ? "show active" : ""
                } wow fadeIn`}
                data-wow-delay=".2s"
                data-wow-duration="0.6s"
              >
                <div className="px-15px py-30px xl:p-60px border-2 border-body-color dark:border-bg-color-2 rounded-15px">
                  <div className="w-full">
                    {section.resumeItems?.map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col md:flex-row md:justify-between gap-5 lg:gap-35px 2xl:gap-95px pb-45px mb-10 border-b-2 border-body-color dark:border-bg-color-2 last:border-0 wow fadeInUp"
                        data-wow-delay={`.${i + 2}s`}
                        data-wow-duration="0.5s"
                      >
                        <div className="flex flex-col md:flex-row gap-30px md:gap-10 max-w-735px w-full">
                          <div className="w-60px flex-shrink-0">
                            <img
                              src={`/img/icons/${
                                section.title.includes("Experience")
                                  ? "h4-work"
                                  : section.title.includes("Education")
                                  ? "h5-resume"
                                  : "h4-award"
                              }-${i + 1}.png`}
                              alt="icon"
                            />
                          </div>
                          <div>
                            <h4 className="text-xl leading-1.2 text-seondary-color dark:text-white-color mb-15px uppercase font-medium">
                              {item.title}
                            </h4>
                            <p className="text-primary-color dark:text-body-color text-size-15 uppercase mb-22px">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <div className="md:flex-shrink-0">
                          <div className="flex items-center gap-10px text-lg sm:text-xl">
                            <i className="fa-thin fa-calendar-check text-xl text-primary-color leading-1"></i>
                            <p className="text-seondary-color dark:text-body-color-3 md:ml-auto">
                              {item.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume5;
