"use client";

import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import GallerySingle from "@/components/shared/portfolio/GallerySingle";
import getAPortfolio from "@/libs/getAPortfolio";
import getPortfolio from "@/libs/getPortfolio";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const sliderItems = [
	"/img/portfolio-gallery/p-gallery-1.jpg",
	"/img/portfolio-gallery/p-gallery-2.jpg",
	"/img/portfolio-gallery/p-gallery-3.jpg",
	"/img/portfolio-gallery/p-gallery-4.jpg",
];
const PortfolioDetailsPrimary = () => {
	const portfolios = getPortfolio();
	const params = useParams();
	const id = params?.id;
	const currentId = parseInt(id);
	const prevId = currentId > 1 ? currentId - 1 : 1;
	const totalPorfolio = portfolios?.length;
	const nextId = currentId < totalPorfolio ? currentId + 1 : totalPorfolio;
	const portfolio = getAPortfolio(currentId);
	const pervPortfolio = getAPortfolio(prevId);
	const nextPortfolio = getAPortfolio(nextId);
	const { title, title2, desc, desc1, desc2, img, descItems, statusItem } =
		portfolio || {};
	const isPrevProject = currentId > 1;
	const isNextProject = currentId < totalPorfolio;

	return (
		<section>
			<div className="py-60px md:py-20 lg:py-100px xl:py-30 dark:bg-black-color">
				<div className="container">
					{/* <!-- portfolio --> */}
					<div className="group relative wow fadeInUp" data-wow-delay=".3s">
						<div className="relative overflow-hidden">
							<div className="overflow-hidden p-5 md:p-10 xl:p-60px pb-0 md:pb-0 xl:pb-0 bg-cream-light-color dark:bg-seondary-color">
								<Image
									src={img}
									alt=""
									className="w-full"
									width={2000}
									height={2000}
								/>
							</div>

							<div className="pt-30px md:pt-10 lg:pt-60px">
								<div className="transition-all duration-500">
									<div className="relative z-10">
										{/* <!-- heading --> */}
										<div className="grid grid-cols-1 md:grid-cols-2 gap-5 gap-x-50px items-start px-15px md:px-25px lg:px-10 mb-10 md:mb-50px">
											<div>
												<h3 className="mb-10px">
													<span className="text-primary-color-light dark:text-white-color capitalize relative z-0 text-size-35 md:text-size-40 lg:text-size-45 font-bold">
														{title}
													</span>
												</h3>

												<p className="text-primary-color-light dark:text-white-color mb-5 md:mb-7">
													{desc}
												</p>
												<div>
													<ButtonPrimary
														className={"group/nested"}
														url={"/#contact"}
													>
														live preview
														<i className="fal fa-arrow-right ml-10px -rotate-45 group-hover/nested:rotate-0 transition-all duration-300"></i>
													</ButtonPrimary>
												</div>
											</div>
											<ul className="grid grid-cols-2 gap-x-15px lg:gap-x-5 gap-y-5 md:gap-y-30px">
												{statusItem?.length
													? statusItem?.map(({ title, desc }, idx) => (
															<li key={idx}>
																<p className="text-primary-color-light dark:text-white-color mb-1.5">
																	{title}
																</p>
																<p className="text-primary-color-light dark:text-white-color font-medium mb-1.5">
																	{desc}
																</p>
															</li>
													  ))
													: ""}
											</ul>
										</div>

										{/* <!-- slider --> */}

										<div className="mb-15px md:mb-5 px-15px md:px-0 ">
											{sliderItems?.length ? (
												<Swiper
													spaceBetween={20}
													slidesPerView={1}
													loop={true}
													centeredSlides={true}
													pagination={{
														clickable: true,
													}}
													speed={1000}
													autoplay={{
														delay: 7000,
														disableOnInteraction: false,
													}}
													breakpoints={{
														768: {
															slidesPerView: 2,
														},
														992: {
															slidesPerView: 2,
															spaceBetween: 30,
														},
													}}
													modules={[Pagination, Autoplay]}
													className="portfolio-slider"
												>
													{sliderItems?.map((sliderItem, idx) => (
														<SwiperSlide key={idx}>
															<GallerySingle url={sliderItem} />
														</SwiperSlide>
													))}
												</Swiper>
											) : (
												""
											)}
										</div>
										{/* <!-- description wrapper --> */}
										<div className="px-15px md:px-25px lg:px-10">
											{/* <!-- descrion --> */}
											<div className="mb-10 md:mb-50px">
												<div>
													<h3 className="mb-15px md:mb-5">
														<span className="text-primary-color-light dark:text-white-color capitalize relative z-0 text-size-35 md:text-size-40 lg:text-size-45 font-bold">
															{title2}
														</span>
													</h3>

													<p className="text-primary-color-light dark:text-white-color mb-15px md:mb-5">
														{desc1}
													</p>
													<p className="text-primary-color-light dark:text-white-color mb-15px md:mb-5">
														{desc2}
													</p>
												</div>
											</div>
											{/* <!-- others --> */}
											<div className="mb-10 md:mb-50px">
												<div>
													{descItems?.length
														? descItems?.map(({ title, desc }, idx) => (
																<div
																	key={idx}
																	className={`flex gap-15px xl:gap-x-50px flex-wrap ${
																		descItems?.length - 1 === idx
																			? ""
																			: " mb-10 md:mb-50px"
																	}`}
																>
																	<h4 className="max-w-265px w-full">
																		<span className="text-primary-color-light dark:text-white-color uppercase relative z-0 text-xl font-bold">
																			{title}
																		</span>
																	</h4>
																	<p className="text-primary-color-light dark:text-white-color mb-15px md:mb-5 max-w-3xl w-full">
																		{desc}
																	</p>
																</div>
														  ))
														: ""}
												</div>
											</div>
										</div>

										{/* <!-- navigations --> */}
										<div className="px-15px py-30px md:px-25px lg:px-50px lg:py-35px bg-primary-color flex justify-between flex-wrap gap-30px items-center">
											{/* <!-- prev portfolio --> */}
											<Link
												href={isPrevProject ? `/portfolio/${prevId}` : "#"}
												className="flex gap-5 items-end group/nested"
											>
												{isPrevProject ? (
													<>
														<span className="text-xl md:text-3xl text-white rotate-45 group-hover/nested:rotate-0 transition-all duration-500">
															<i className="fal fa-arrow-left mb-2"></i>
														</span>
														<h6>
															<span className="text-white-color block">
																Previous Project
															</span>

															<span className="text-white-color capitalize relative z-0 text-size-25 md:text-size-35 lg:text-size-45 font-bold">
																{pervPortfolio?.title}
															</span>
														</h6>
													</>
												) : (
													""
												)}
											</Link>
											{/* <!-- prev portfolio --> */}
											<Link
												href={isNextProject ? `/portfolio/${nextId}` : "#"}
												className="flex gap-5 items-end group/nested ml-auto"
											>
												{isNextProject ? (
													<>
														<h6>
															<span className="text-white-color block">
																Next Project
															</span>

															<span className="text-white-color capitalize relative z-0 text-size-25 md:text-size-35 lg:text-size-45 font-bold">
																{nextPortfolio?.title}
															</span>
														</h6>
														<span className="text-xl md:text-3xl text-white -rotate-45 group-hover/nested:rotate-0 transition-all duration-500">
															<i className="fal fa-arrow-right mb-2"></i>
														</span>
													</>
												) : (
													""
												)}
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PortfolioDetailsPrimary;
