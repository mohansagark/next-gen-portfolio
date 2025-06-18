"use client";
import ServiceCard6 from "@/components/shared/cards/ServiceCard6";
import getALlServices from "@/libs/getALlServices";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Services8 = () => {
	const services = getALlServices()?.slice(0, 4);
	return (
		<section id="services">
			<div className=" py-60px md:py-20 lg:py-30 ">
				<div className="container">
					<div className="mb-10 md:mb-50px xl:mb-60px  flex flex-wrap justify-between items-end ">
						<div>
							<div className="mb-25px">
								<span
									className="text-xs  uppercase text-primary-color  font-semibold relative inline-block tracking-0.2em wow fadeInRight"
									data-wow-delay=".3s"
								>
									My services
								</span>
							</div>
							<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  max-w-580px w-full tj-text-invert">
								Here's How I can Help!
							</h2>
						</div>
						<div>
							<div className="testimonial-navigation hidden lg:flex  flex-wrap gap-15px items-center ">
								<div className="service-prev  w-55px h-55px inline-flex justify-center items-center  border border-border-color  relative  dark:border-bg-color-2  rounded-100%   z-1 group before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-primary  before:rounded-100% before:opacity-0 before:invisible before:transition-all before:duration-[0.6s] before:-z-1 hover:before:opacity-100 hover:before:visible ">
									<i className="fa-regular fa-arrow-left text-primary-color-light  group-hover:text-white-color dark:text-white-color"></i>
								</div>
								<div className="service-next w-55px h-55px inline-flex justify-center items-center    relative   border  border-border-color dark:border-bg-color-2  group text-primary-color-light hover:text-white-color dark:text-white-color rounded-100% z-1 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-primary  before:rounded-100% before:opacity-0 before:invisible before:transition-all before:duration-[0.6s] before:-z-1 hover:before:opacity-100 hover:before:visible">
									<i className="fa-regular fa-arrow-right text-primary-color-light  group-hover:text-white-color dark:text-white-color"></i>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- services --> */}
					<div className=" relative z-0 after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:w-650px after:h-550px  after:max-w-2/3 after:max-h-2/3 after:blur-[150px] after:rounded-50% after:bg-gradient-circle-2 after:-z-1   after:opacity-60">
						{services?.length ? (
							<Swiper
								slidesPerView={1}
								spaceBetween={30}
								loop={true}
								centeredSlides={true}
								pagination={{
									clickable: true,
								}}
								speed={2000}
								autoplay={{
									delay: 2000,
								}}
								navigation={{
									prevEl: ".service-prev",
									nextEl: ".service-next",
								}}
								breakpoints={{
									430: {
										slidesPerView: 1.2,
									},
									768: {
										slidesPerView: 2,
									},
									992: {
										slidesPerView: 2,
									},
									1200: {
										slidesPerView: 3,
									},
									1400: {
										slidesPerView: 3,
									},
								}}
								modules={[Pagination, Autoplay, Navigation]}
								className="testimonials-slider service-slider "
							>
								{services?.map((service, idx) => (
									<SwiperSlide key={idx}>
										<ServiceCard6 key={idx} idx={idx} service={service} />
									</SwiperSlide>
								))}
							</Swiper>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services8;
