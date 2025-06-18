"use client";
import TestimonialsCard3 from "@/components/shared/cards/TestimonialsCard3";
import getTestimonials from "@/libs/getTestimonials";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonials3 = () => {
	const testimonials = getTestimonials()?.slice(0, 4);
	return (
		<section id="testimonials">
			<div className="py-20 md:py-100px xl:py-30 dark:bg-black-color-2 bg-cream-light-color ">
				<div className="container">
					<div className="testimonials overflow-x-hidden">
						{/* <!-- testimonial single --> */}
						<div
							className="wow fadeInRight overflow-hidden"
							data-wow-delay=".5s"
						>
							<Swiper
								spaceBetween={30}
								slidesPerView={1}
								loop={true}
								pagination={{
									clickable: true,
								}}
								speed={1000}
								autoplay={{
									delay: 7000,
									disableOnInteraction: false,
								}}
								breakpoints={{
									600: {
										slidesPerView: 2,
									},
								}}
								modules={[Pagination, Autoplay]}
								className="testimonials-slider "
							>
								{testimonials?.length
									? testimonials?.map((testimonial, idx) => (
											<SwiperSlide key={idx}>
												<TestimonialsCard3 testimonial={testimonial} />
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

export default Testimonials3;
