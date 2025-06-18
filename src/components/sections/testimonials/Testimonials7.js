"use client";
import TestimonialsCard7 from "@/components/shared/cards/TestimonialsCard7";
import getTestimonials from "@/libs/getTestimonials";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonials7 = ({ type }) => {
	const testimonials = getTestimonials()?.slice(0, 4);
	return (
		<section id="testimonials">
			<div
				className={`pb-20 md:pb-100px xl:pb-30 ${
					type == 2
						? ""
						: "pt-20 md:pt-100px xl:pt-30 bg-cream-light-color dark:bg-black-color"
				}  overflow-hidden`}
			>
				<div className="container">
					<div className="testimonials ">
						{/* <!-- section heading --> */}
						<div className="mb-10 md:mb-50px xl:mb-60px text-center flex flex-col items-center  max-w-560px mx-auto">
							<div className="mb-25px  ">
								<span
									className={` text-xs ${
										type === 2
											? ""
											: "px-3 py-5px rounded-full border  border-border-color-2 "
									} text-primary-color  font-semibold tracking-0.2em relative inline-block uppercase ${
										type === 2 ? "wow fadeInUp" : "tj_title_anim "
									}`}
									data-wow-delay={type === 2 ? ".3s" : "0s"}
								>
									Feedbacks
								</span>
							</div>
							<h2
								className={` text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45  font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color ${
									type === 2
										? "uppercase max-w-580px w-full  wow fadeInUp "
										: "capitalize tj_title_anim"
								}`}
								data-wow-delay={type === 2 ? ".4s" : "0s"}
							>
								Let’s Hear From My Dear Prime Client
							</h2>
						</div>
						{/* <!-- testimonial single --> */}
						<div
							className=" xl:mx-auto wow fadeInRight relative"
							data-wow-delay=".5s"
						>
							{testimonials?.length ? (
								<>
									{" "}
									<div>
										<div className="testimonial-navigation hidden 2xl:block ">
											<div className="testimonial-prev  w-55px h-55px inline-flex justify-center items-center mr-30px border-2 border-border-color absolute top-1/2 right-full -translate-y-1/2  dark:border-bg-color-2  rounded-100%   z-1 group before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-primary  before:rounded-100% before:opacity-0 before:invisible before:transition-all before:duration-[0.6s] before:-z-1 hover:before:opacity-100 hover:before:visible ">
												<i className="fa-regular fa-arrow-left text-primary-color-light  group-hover:text-white-color dark:text-white-color"></i>
											</div>
											<div className="testimonial-next  w-55px h-55px inline-flex justify-center items-center  ml-30px absolute top-1/2 left-full -translate-y-1/2  border-2  border-border-color dark:border-bg-color-2  group text-primary-color-light hover:text-white-color dark:text-white-color rounded-100% z-1 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-primary  before:rounded-100% before:opacity-0 before:invisible before:transition-all before:duration-[0.6s] before:-z-1 hover:before:opacity-100 hover:before:visible">
												<i className="fa-regular fa-arrow-right text-primary-color-light  group-hover:text-white-color dark:text-white-color"></i>
											</div>
										</div>
									</div>
									<Swiper
										slidesPerView={1}
										spaceBetween={30}
										loop={true}
										centeredSlides={true}
										pagination={{
											clickable: true,
										}}
										speed={3000}
										autoplay={{
											delay: 2000,
										}}
										navigation={{
											prevEl: ".testimonial-prev",
											nextEl: ".testimonial-next",
										}}
										modules={[Pagination, Autoplay, Navigation]}
										className="testimonials-slider tj-testimonial-7-active"
									>
										{testimonials?.map((testimonial, idx) => (
											<SwiperSlide key={idx}>
												<TestimonialsCard7
													testimonial={testimonial}
													type={type}
												/>
											</SwiperSlide>
										))}
									</Swiper>
								</>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials7;
