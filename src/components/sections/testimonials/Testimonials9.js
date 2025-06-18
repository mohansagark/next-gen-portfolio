"use client";

import TestimonialsCard9 from "@/components/shared/cards/TestimonialsCard9";
import getTestimonials from "@/libs/getTestimonials";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonials9 = () => {
	const testimonials = getTestimonials()?.slice(0, 4);
	return (
		<section id="testimonials">
			<div className=" dark:bg-primary-color-light  pb-60px md:pb-20 lg:pb-30 relative  overflow-hidden">
				<div className="container">
					<div className="flex flex-col lg:flex-row gap-35px">
						<div className="w-full max-w-420px lg:max-w-365px xl:max-w-420px">
							<div>
								<div className="mb-25px  ">
									<span className="text-xs  uppercase text-primary-color  font-semibold relative inline-block tracking-0.2em wow fadeInRight">
										Clients feedback
									</span>
								</div>
								<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  max-w-580px w-full tj-text-invert">
									Let’s Hear From Dear Clients.
								</h2>
								<div
									className="mt-30px md:mt-10 wow fadeInUp"
									data-wow-delay=".3s"
								>
									<a
										href="./index.html#contact"
										className="text-size-15 font-bold text-white-color capitalize py-17px px-35px bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full inline-flex gap-10px items-center leading-1 transition-all duration-300 group"
									>
										Contact Me{" "}
										<i className="fa-regular fa-arrow-right transition-all duration-300 -rotate-45 group-hover:rotate-0"></i>
									</a>
								</div>
							</div>
						</div>

						<div className="w-full max-w-785px ml-auto">
							{/* <!-- testimonial single --> */}
							<div>
								<Swiper
									slidesPerView="auto"
									direction="vertical"
									spaceBetween={30}
									centeredSlides={true}
									loop={true}
									speed={1500}
									autoplay={{
										delay: 3000,
									}}
									modules={[Autoplay]}
									className="tj-testimonial-slider testimonial-slider-9 swiper swiper-container h-[800px] lg:h-[720px] xl:h-[620px] overflow-hidden  mask-fade-vertical flex items-center"
								>
									{testimonials?.length
										? testimonials?.map((testimonial, idx) => (
												<SwiperSlide className="h-auto" key={idx}>
													<TestimonialsCard9 testimonial={testimonial} />
												</SwiperSlide>
										  ))
										: ""}
								</Swiper>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials9;
