"use client";
import TestimonialsCard5 from "@/components/shared/cards/TestimonialsCard5";
import getTestimonials from "@/libs/getTestimonials";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonials5 = () => {
	const testimonials = getTestimonials()?.slice(0, 4);
	return (
		<section id="testimonials">
			<div className=" py-20 md:py-100px xl:py-30 bg-cream-light-color dark:bg-transparent">
				<div className="container">
					<div className="testimonials ">
						{/* <!-- section heading --> */}
						<div className="mb-10 md:mb-50px xl:mb-60px text-center flex flex-col items-center ">
							<div className="mb-25px  ">
								<span
									className="text-xs  uppercase text-primary-color  font-medium relative inline-block tracking-0.2em  wow fadeInUp"
									data-wow-delay=".3s"
								>
									CLIENT FEEDBACK
								</span>
							</div>
							<h2
								className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color    w-full wow fadeInUp"
								data-wow-delay=".4s"
							>
								Hear From My Clients
							</h2>
						</div>
						{/* <!-- testimonial single --> */}
						<div
							className=" wow fadeInRight overflow-hidden"
							data-wow-delay=".5s"
						>
							{testimonials?.length ? (
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
									className="testimonials-slider"
								>
									{testimonials?.map((testimonial, idx) => (
										<SwiperSlide key={idx}>
											<TestimonialsCard5 testimonial={testimonial} />
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
		</section>
	);
};

export default Testimonials5;
