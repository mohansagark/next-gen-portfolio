"use client";
import PortfolioCard7 from "@/components/shared/cards/PortfolioCard7";
import getPortfolio from "@/libs/getPortfolio";
import portfolioGrid from "@/libs/portfolioGrid";
import Link from "next/link";
import { useEffect } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Portfolio5 = () => {
	const portfolio = getPortfolio()?.slice(0, 4);
	useEffect(() => {
		portfolioGrid();
	}, []);
	return (
		<section id="portfolio">
			<div className="bg-cream-light-color dark:bg-black-color pt-60px pb-30px md:pt-20 md:pb-60px lg:pt-100px lg:pb-20 ">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px flex flex-wrap gap-5 lg:items-center lg:justify-between">
						<div className="max-w-560px ">
							<div className="mb-25px  ">
								<span
									className="text-xs  uppercase text-primary-color  font-medium relative inline-block tracking-0.2em  wow fadeInUp"
									data-wow-delay=".3s"
								>
									Behind the Pixels
								</span>
							</div>
							<h2
								className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color wow fadeInUp"
								data-wow-delay=".4s"
							>
								Recent work for International clients
							</h2>
						</div>

						<div>
							<Link
								href="#"
								className="text-size-15 font-bold text-white-color capitalize py-17px px-35px bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full inline-flex gap-10px items-center leading-1 transition-all duration-300 group wow fadeInRight"
								data-wow-delay=".5s"
							>
								Explore More{" "}
								<i className="fa-regular fa-arrow-right transition-all duration-400 -rotate-45 group-hover:rotate-0"></i>
							</Link>
						</div>
					</div>
				</div>

				<div className="container w-auto md:!pr-0 !max-w-[inherit] ml-auto md:ml-[calc((100%-720px)/2)] lg:ml-[calc((100%-960px)/2)] xl:ml-[calc((100%-1140px)/2)] 2xl:ml-[calc((100%-1320px)/2)]  ">
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
								pagination={{
									clickable: true,
								}}
								speed={3000}
								autoplay={{
									delay: 8500,
								}}
								breakpoints={{
									768: {
										slidesPerView: 1.5,
									},
									992: {
										slidesPerView: 2.5,
									},
									1200: {
										slidesPerView: 2.5,
									},
									1400: {
										slidesPerView: 2.5,
									},
								}}
								modules={[Pagination, Autoplay]}
								className="portfolio-slider-5"
							>
								{portfolio?.map((portfioSingle, idx) => (
									<SwiperSlide key={idx}>
										<PortfolioCard7 portfolio={portfioSingle} />
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

export default Portfolio5;
