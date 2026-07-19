"use client";

import RecommendationsCard from "@/components/shared/cards/TestimonialsCard";
import getRecommendations from "@/libs/getTestimonials";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonials1 = () => {
  const recommendations = getRecommendations();
  return (
    <section id="testimonials">
      <div className="bg-cream-light-color dark:bg-black-color py-60px md:py-20 lg:py-30">
        <div className="container">
          <div className="testimonials grid lg:grid-cols-12 gap-6 overflow-x-hidden">
            {/* <!-- section heading --> */}
            <div className="lg:col-start-1 lg:col-span-5">
              <div
                className="mb-10 md:mb-50px wow fadeInUp text-center lg:text-start"
                data-wow-delay=".3s"
              >
                <h2
                  className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 bg-gradient-text-light dark:bg-gradient-text bg-clip-text  leading-1.2 xl:leading-1.2 text-transparent mb-15px wow fadeInLeft"
                  data-wow-delay=".3s"
                >
                  What People Say About Me
                </h2>
                <p
                  className="text-primary-color-light dark:text-body-color wow fadeInLeft"
                  data-wow-delay=".4s"
                >
                  Endorsements and recognition from professionals I've worked
                  with
                </p>
              </div>
            </div>

            {/* <!-- recommendations carousel --> */}
            <div
              className="lg:col-start-6 xl:col-start-7 lg:col-span-7 xl:col-span-6 wow fadeInRight overflow-hidden"
              data-wow-delay=".5s"
            >
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                speed={1000}
                autoplay={{ delay: 7000, disableOnInteraction: false }}
                breakpoints={{ 600: { slidesPerView: 2 } }}
                modules={[Pagination, Autoplay]}
                className="testimonials-slider"
              >
                {recommendations?.length
                  ? recommendations.map((rec, idx) => (
                      <SwiperSlide key={idx}>
                        <RecommendationsCard testimonial={rec} />
                      </SwiperSlide>
                    ))
                  : null}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials1;
