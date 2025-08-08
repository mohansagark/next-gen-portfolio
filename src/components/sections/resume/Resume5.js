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
    <section id="credentials" className="overflow-hidden">
      <div
        className={`relative py-16 md:py-20 lg:py-30 ${
          type === 2 ? "dark:bg-primary-color-light" : ""
        }`}
      >
        {/* background gradient (contained absolutely and doesn't overflow) */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[650px] h-[550px] blur-[150px] rounded-full bg-gradient-circle-2 opacity-60 -z-10 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-10 md:mb-12 xl:mb-16 text-center flex flex-col items-center">
            <div className="mb-6">
              <span
                className="text-xs uppercase text-primary-color font-medium relative inline-block tracking-wider wow fadeInUp"
                data-wow-delay=".3s"
              >
                Behind the Pixels
              </span>
            </div>
            <h2
              className="text-2xl md:text-[35px] lg:text-[40px] xl:text-[45px] font-semibold leading-tight tracking-tight text-seondary-color dark:text-white-color max-w-[580px] w-full wow fadeInUp"
              data-wow-delay={type === 2 ? "0" : ".4s"}
            >
              {title ? title : "My Experience, Education & Awards"}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <div className="overflow-x-auto max-w-full scrollbar-hide">
              <ul
                id="tabs"
                className="inline-flex items-center bg-primary-color rounded-full p-1 space-x-2 min-w-fit"
              >
                {resume?.map((section, idx) => (
                  <li key={idx} className={idx === 0 ? "active" : ""}>
                    <a
                      href={`#tab${idx + 1}`}
                      className="whitespace-nowrap text-sm sm:text-base font-bold px-4 sm:px-6 py-2 sm:py-2.5 text-white bg-transparent rounded-full"
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
          </div>

          {/* Content Tabs */}
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
                <div className="p-4 md:p-10 border-2 border-body-color dark:border-bg-color-2 rounded-[15px]">
                  <div className="w-full">
                    {section.resumeItems?.map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-8 pb-8 mb-4 border-b-2 border-body-color dark:border-bg-color-2 last:border-0 wow fadeInUp"
                        data-wow-delay={`.${i + 2}s`}
                        data-wow-duration="0.5s"
                      >
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                          <div className="w-12 h-12 flex-shrink-0">
                            <img
                              src={
                                item.logo ||
                                `/img/icons/${
                                  section.title.includes("Experience")
                                    ? "h4-work"
                                    : section.title.includes("Education")
                                    ? "h5-resume"
                                    : "h4-award"
                                }-${i + 1}.png`
                              }
                              alt="icon"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg sm:text-xl text-seondary-color dark:text-white-color mb-2 uppercase font-medium">
                              {item.title}
                            </h4>
                            <p className="text-primary-color dark:text-body-color text-sm sm:text-base uppercase mb-3">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-base sm:text-lg mt-2 md:mt-0">
                          <i className="fa-thin fa-calendar-check text-primary-color"></i>
                          <p className="text-seondary-color dark:text-body-color-3">
                            {item.date}
                          </p>
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
