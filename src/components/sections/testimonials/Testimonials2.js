"use client";
import TestimonialsCard5 from "@/components/shared/cards/TestimonialsCard5";
import getTestimonials from "@/libs/getTestimonials";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonials2 = () => {
	const testimonials = getTestimonials()?.slice(0, 4);
	return (
		<section id="testimonials">
			<div className="pt-60px md:pt-100px lg:pt-30">
				<div className="container">
					<div className="testimonials overflow-x-hidden">
						{/* <!-- section heading --> */}
						<div>
							<div
								className="mb-10 md:mb-50px wow fadeInUp"
								data-wow-delay=".3s"
							>
								<h2
									className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 inline-block bg-gradient-text-light dark:bg-gradient-text bg-clip-text leading-1.2 text-transparent wow fadeInLeft"
									data-wow-delay=".3s"
								>
									Clients Testimonials
								</h2>
							</div>
						</div>
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
								className="testimonials-slider testimonials-slider--2"
							>
								{testimonials?.length
									? testimonials?.map((testimonial, idx) => (
											<SwiperSlide key={idx}>
												<TestimonialsCard5 testimonial={testimonial} />
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

export default Testimonials2;
