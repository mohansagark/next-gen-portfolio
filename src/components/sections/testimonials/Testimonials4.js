"use client";

import TestimonialsCard4 from "@/components/shared/cards/TestimonialsCard4";
import getTestimonials from "@/libs/getTestimonials";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonials4 = () => {
	const testimonials = getTestimonials()?.slice(0, 4);
	return (
		<section
			id="testimonials"
			className="relative pb-20 md:pb-100px xl:pb-30  after:absolute after:top-10 after:-translate-y-5 after:left-5 after:w-650px after:h-550px after:blur-[150px] after:rounded-50% after:bg-gradient-circle-2 after:-z-1  after:-translate-x-1/2 after:opacity-60 "
		>
			<div className="container">
				{/* <!-- section heading --> */}
				<div className="mb-10 md:mb-50px xl:mb-60px ">
					<div className="mb-25px  ">
						<span
							className="text-xs  uppercase py-10px px-5 bg-primary-color dark:bg-seondary-color text-white-color rounded-full font-semibold relative inline-block  wow fadeInRight"
							data-wow-delay=".3s"
						>
							TESTIMONIAL
						</span>
					</div>
					<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 inline-block text-seondary-color dark:text-white-color leading-1.2 tj-char-animation font-medium ">
						What Clients Are Saying
					</h2>
				</div>
				<div className="testimonials overflow-hidden">
					{/* <!-- testimonial single --> */}
					<div className="overflow-hidden wow fadeInUp " data-wow-delay=".3s">
						<Swiper
							spaceBetween={30}
							slidesPerView={1}
							loop={true}
							pagination={{
								clickable: true,
							}}
							speed={1000}
							autoplay={{
								delay: 6000,
							}}
							breakpoints={{
								768: {
									slidesPerView: 2,
								},
								992: {
									slidesPerView: 3,
								},
							}}
							modules={[Pagination, Autoplay]}
							className="tj-testimonial-slider"
						>
							{testimonials?.length
								? testimonials?.map((testimonial, idx) => (
										<SwiperSlide key={idx}>
											<TestimonialsCard4 testimonial={testimonial} />
										</SwiperSlide>
								  ))
								: ""}
						</Swiper>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials4;
