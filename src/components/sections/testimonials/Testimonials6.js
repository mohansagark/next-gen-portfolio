"use client";
import TestimonialsCard6 from "@/components/shared/cards/TestimonialsCard6";
import getTestimonials from "@/libs/getTestimonials";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonials6 = () => {
	const testimonials = getTestimonials();
	return (
		<section id="testimonials">
			<div className=" pb-60px md:pb-20 lg:pb-30 px-15px md:px-0  dark:bg-transparent">
				<div className="container-fluid">
					<div className="testimonials ">
						{/* <!-- section heading --> */}
						<div className="container">
							<div className="mb-10 md:mb-50px xl:mb-60px  flex flex-wrap justify-between items-center ">
								<div>
									<div className="mb-25px  ">
										<span className="text-xs px-3 py-5px rounded-full border  border-border-color-2 text-primary-color  font-semibold tracking-0.02em relative inline-block uppercase">
											CLIENT FEEDBACK
										</span>
									</div>
									<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  max-w-580px w-full tj-text-invert">
										Hear From My Dear prime Clients
									</h2>
								</div>
								<div>
									<div className="testimonial-navigation hidden lg:flex  flex-wrap gap-15px items-center ">
										<div className="testimonial-prev py-7px px-35px border-2 border-border-color dark:border-bg-color-2  rounded-50px  relative z-1 group before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-primary  before:rounded-50px before:opacity-0 before:invisible before:transition-all before:duration-[0.6s] before:-z-1 hover:before:opacity-100 hover:before:visible">
											<i className="fa-regular fa-arrow-left text-primary-color-light  group-hover:text-white-color dark:text-white-color"></i>
										</div>
										<div className="testimonial-next py-7px px-35px border-2 border-border-color dark:border-bg-color-2  group text-primary-color-light hover:text-white-color dark:text-white-color rounded-50px relative z-1 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-primary  before:rounded-50px before:opacity-0 before:invisible before:transition-all before:duration-[0.6s] before:-z-1 hover:before:opacity-100 hover:before:visible">
											<i className="fa-regular fa-arrow-right text-primary-color-light  group-hover:text-white-color dark:text-white-color"></i>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* <!-- testimonial single --> */}
						<div className=" overflow-hidden wow fadeInUp" data-wow-delay=".3s">
							{testimonials?.length ? (
								<Swiper
									spaceBetween={30}
									slidesPerView={1}
									loop={true}
									centeredSlides={true}
									pagination={{
										clickable: true,
									}}
									navigation={{
										prevEl: ".testimonial-prev",
										nextEl: ".testimonial-next",
									}}
									speed={2000}
									autoplay={{
										delay: 2000,
										disableOnInteraction: false,
									}}
									breakpoints={{
										768: {
											slidesPerView: 1.5,
										},
										992: {
											slidesPerView: 1.5,
										},
										1200: {
											slidesPerView: 2.5,
										},
										1440: {
											slidesPerView: 3.5,
										},
									}}
									modules={[Pagination, Autoplay, Navigation]}
									className="testimonials-slider testimonial-slider-6"
								>
									{testimonials?.map((testimonial, idx) => (
										<SwiperSlide key={idx}>
											<TestimonialsCard6 testimonial={testimonial} />
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

export default Testimonials6;
