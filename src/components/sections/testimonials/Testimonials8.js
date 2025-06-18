"use client";

import TestimonialsCard8 from "@/components/shared/cards/TestimonialsCard8";
import getTestimonials from "@/libs/getTestimonials";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonials8 = () => {
	const testimonials = getTestimonials()?.slice(0, 4);
	return (
		<section id="testimonials">
			<div className=" py-20 md:py-100px xl:py-30   dark:bg-transparent">
				<div className="container">
					<div className="testimonials ">
						{/* <!-- section heading --> */}
						<div className="mb-10 md:mb-50px xl:mb-60px text-center ">
							<div>
								<div className="mb-25px  ">
									<span
										className="text-xs  uppercase text-primary-color  font-semibold relative inline-block tracking-0.2em wow fadeInRight"
										data-wow-delay=".3s"
									>
										Client feedback
									</span>
								</div>
								<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  max-w-580px w-full tj-text-invert">
									Hear From My Clients
								</h2>
							</div>
						</div>
						{/* <!-- testimonial single --> */}
						<div
							className=" wow fadeInRight overflow-hidden"
							data-wow-delay=".5s"
						>
							<Swiper
								spaceBetween={30}
								slidesPerView={1}
								loop={true}
								pagination={{
									clickable: true,
								}}
								speed={3000}
								autoplay={{
									delay: 6000,
								}}
								breakpoints={{
									576: {
										slidesPerView: 1.5,
									},
									768: {
										slidesPerView: 2,
									},
									1024: {
										slidesPerView: 3,
									},
								}}
								modules={[Pagination, Autoplay]}
								className="tj-testimonial-slider testimonial-slider-8"
							>
								{testimonials?.length
									? testimonials?.map((testimonial, idx) => (
											<SwiperSlide key={idx}>
												<TestimonialsCard8 testimonial={testimonial} />
											</SwiperSlide>
									  ))
									: ""}
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials8;
