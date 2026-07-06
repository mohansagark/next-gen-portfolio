"use client";

import HeadingPrimary from "@/components/shared/headings/HeadingPrimary";
import getSkills from "@/libs/getSkills";
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Skills1 = ({ type, subTitle, isNotDesc }) => {
  const skills = getSkills();

  return (
    <section id="skills">
      <div
        className={
          type === 3
            ? "py-20 md:py-100px xl:py-30"
            : type === 2
            ? "pt-60px md:pt-100px lg:pt-30"
            : "pt-60px pb-60px md:pt-20 md:pb-60px lg:pt-100px lg:pb-20"
        }
      >
        <div className="container">
          {/* <!-- section heading --> */}
          <div
            className={`text-center flex flex-col items-center mb-10 md:mb-50px ${
              type === 3 ? "xl:mb-60px" : ""
            }`}
          >
            <HeadingPrimary className={"mb-0"}>My Skills</HeadingPrimary>
            {/* {isNotDesc ? (
              ""
            ) : (
              <p
                className="text-primary-color-light dark:text-body-color max-w-700px wow fadeInUp"
                data-wow-delay=".4s"
              >
                With 7+ years of experience in full-stack development, I
                specialize in building scalable web applications and have worked
                with leading companies like Invesco, Reliance Jio, and Shell to
                deliver high-impact solutions.
              </p>
            )} */}
            {subTitle ? (
              <p
                className=" text-seondary-color dark:text-white-color uppercase mt-15px wow fadeInUp"
                data-wow-delay="0.5s"
              >
                {subTitle}
              </p>
            ) : (
              ""
            )}
          </div>
          {/* <!-- skills --> */}
          <div className="relative">
            <div className="skills-container flex flex-col">
              {/* Navigation arrows - defined first for Swiper initialization */}
              <div className="skills-navigation flex flex-wrap gap-15px items-center justify-center order-2 mt-10">
                <button className="skills-prev py-7px px-35px border-2 border-border-color dark:border-bg-color-2 rounded-50px relative z-1 group before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-primary before:rounded-50px before:opacity-0 before:invisible before:transition-all before:duration-[0.6s] before:-z-1 hover:before:opacity-100 hover:before:visible cursor-pointer">
                  <i className="fa-regular fa-arrow-left text-primary-color-light group-hover:text-white-color dark:text-white-color"></i>
                </button>
                <button className="skills-next py-7px px-35px border-2 border-border-color dark:border-bg-color-2 group text-primary-color-light hover:text-white-color dark:text-white-color rounded-50px relative z-1 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-primary before:rounded-50px before:opacity-0 before:invisible before:transition-all before:duration-[0.6s] before:-z-1 hover:before:opacity-100 hover:before:visible cursor-pointer">
                  <i className="fa-regular fa-arrow-right text-primary-color-light group-hover:text-white-color dark:text-white-color"></i>
                </button>
              </div>

              <div className="skills overflow-hidden order-1">
                {skills?.length ? (
                  <Swiper
                    spaceBetween={30}
                    slidesPerView={2}
                    loop={true}
                    centeredSlides={false}
                    navigation={{
                      prevEl: ".skills-prev",
                      nextEl: ".skills-next",
                    }}
                    speed={800}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                    }}
                    slidesPerGroup={2}
                    breakpoints={{
                      640: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                      },
                      768: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                      },
                      1024: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                      },
                      1280: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                      },
                      1536: {
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                      },
                    }}
                    modules={[Autoplay, Navigation]}
                    className="skills-slider"
                  >
                    {skills.map(({ name, img, perchant }, idx) => (
                      <SwiperSlide key={idx}>
                        <div
                          className="group wow fadeInUp"
                          data-wow-delay={`.${3 + idx}s`}
                        >
                          {/* <!-- contents --> */}
                          <div className="flex flex-col items-center py-6 px-4 rounded-3xl bg-cream-light-color dark:bg-primary-color-light border border-transparent group-hover:border-primary-color group-hover:bg-seondary-color transition-all duration-500 mb-4">
                            <div className="mb-4 w-16 h-16 flex justify-center items-center">
                              <Image
                                className="grayscale-[90%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110 w-16 h-16 object-contain"
                                src={img || `/img/icons/skills-${(idx % 12) + 1}.svg`}
                                alt={name}
                                width={64}
                                height={64}
                              />
                            </div>
                            <div className="text-lg text-gray-color-2 group-hover:text-primary-color transition-all duration-300 font-bold">
                              {perchant}
                            </div>
                          </div>
                          <p className="text-primary-color text-center text-sm font-medium">
                            {name}
                          </p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills1;
