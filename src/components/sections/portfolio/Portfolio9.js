"use client";
import PortfolioCard11 from "@/components/shared/cards/PortfolioCard11";
import getPortfolio from "@/libs/getPortfolio";
import portfolioGrid from "@/libs/portfolioGrid";
import { useEffect } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Portfolio9 = () => {
	const portfolio = getPortfolio()?.slice(0, 4);
	useEffect(() => {
		portfolioGrid();
	}, []);
	return (
		<section id="portfolio">
			<div className="dark:bg-primary-color-light pb-60px md:pb-20 lg:pb-30 ">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px  flex flex-wrap justify-between items-end ">
						<div>
							<div className="mb-25px  ">
								<span
									className="text-xs  uppercase text-primary-color  font-semibold relative inline-block tracking-0.2em wow fadeInRight"
									data-wow-delay=".3s"
								>
									My Recent Work
								</span>
							</div>
							<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  max-w-580px w-full tj-text-invert">
								Recent work for <br />
								MY clients!
							</h2>
						</div>
						<div>
							<div className="testimonial-navigation hidden lg:flex  flex-wrap gap-15px items-center ">
								<div className="portfolio-slider-6-prev  w-55px h-55px inline-flex justify-center items-center  border border-border-color  relative  dark:border-bg-color-2  rounded-100%   z-1 group before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-primary  before:rounded-100% before:opacity-0 before:invisible before:transition-all before:duration-[0.6s] before:-z-1 hover:before:opacity-100 hover:before:visible ">
									<i className="fa-regular fa-arrow-left text-primary-color-light  group-hover:text-white-color dark:text-white-color"></i>
								</div>
								<div className="portfolio-slider-6-next w-55px h-55px inline-flex justify-center items-center    relative   border  border-border-color dark:border-bg-color-2  group text-primary-color-light hover:text-white-color dark:text-white-color rounded-100% z-1 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-primary  before:rounded-100% before:opacity-0 before:invisible before:transition-all before:duration-[0.6s] before:-z-1 hover:before:opacity-100 hover:before:visible">
									<i className="fa-regular fa-arrow-right text-primary-color-light  group-hover:text-white-color dark:text-white-color"></i>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className=" mx-25px  ">
					<div
						className="portfio-slider-wrapper wow fadeInUp"
						data-wow-delay=".3s"
					>
						{portfolio.length > 0 ? (
							<Swiper
								spaceBetween={30}
								slidesPerView={1}
								loop={true}
								freeMode={true}
								centeredSlides={true}
								speed={3000}
								autoplay={{
									delay: 2000,
								}}
								pagination={{
									clickable: true,
								}}
								navigation={{
									prevEl: ".portfolio-slider-6-prev",
									nextEl: ".portfolio-slider-6-next",
								}}
								breakpoints={{
									768: {
										slidesPerView: 1.5,
									},

									992: {
										slidesPerView: 2,
									},
									1200: {
										slidesPerView: 3,
									},
								}}
								modules={[Pagination, Autoplay, Navigation]}
								className="portfolio-slider-5"
							>
								{portfolio?.map((portfioSingle, idx) => (
									<SwiperSlide key={idx}>
										<PortfolioCard11 portfolio={portfioSingle} />
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

export default Portfolio9;
