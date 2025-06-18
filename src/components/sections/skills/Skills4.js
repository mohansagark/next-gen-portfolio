"use client";

import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import progressBar from "@/libs/progressBar";
import { useEffect } from "react";

const Skills4 = ({ type, title }) => {
	useEffect(() => {
		progressBar();
	}, []);
	return (
		<section
			id="skills"
			className="  dark:bg-primary-color-light  py-20 md:py-100px xl:py-30 relative "
		>
			<div className="">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px flex flex-wrap gap-5 items-end justify-between">
						<div className="max-w-560px ">
							<div className="mb-25px  ">
								<span
									className="text-xs  uppercase text-primary-color  font-semibold relative inline-block tracking-0.2em wow fadeInRight"
									data-wow-delay=".3s"
								>
									My Recent Work
								</span>
							</div>
							<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  max-w-580px w-full tj-text-invert">
								MY Mastering Video Editing Skills
							</h2>
						</div>

						<div className="wow fadeInRight" data-wow-delay=".5s">
							<ButtonPrimary isIcon={true} type={2} href="#">
								Learn More
							</ButtonPrimary>
						</div>
					</div>
					{/* <!-- skills --> */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-306px sm:max-w-full w-full mx-auto">
						{/* <!-- skill 1 --> */}
						<div
							className="rounded-25px relative overflow-hidden px-7 py-10  bg-cream-light-color dark:bg-black-color  backdrop-blur-[40px]  group transition-all duration-500   wow fadeInUp"
							data-wow-delay="0.3s"
						>
							<div className="mb-15px  flex items-center gap-18px sm:gap-15px md:gap-18px lg:gap-15px xl:gap-18px  ">
								<div className="bg-white-color dark:bg-primary-color-light flex-shrink-0 w-60px h-60px sm:w-46px sm:h-46px md:w-20 md:h-20 lg:w-46px lg:h-46px xl:w-20 xl:h-20 inline-flex justify-center items-center leading-1 rounded-100%">
									<img
										className="w-full transition-all duration-500 "
										src="/img/icons/progess-9-icon1.svg"
										alt=""
									/>
								</div>
								<div>
									<h3 className="text-xl  mb-15px leading-1.2 lg:leading-1.2 2xl:leading-1.2 font-medium text-seondary-color dark:text-white-color   ">
										Adobe After <br />
										Effect
									</h3>
								</div>
							</div>

							<div>
								<p className="text-primary-color-light dark:text-body-color-3  mb-75px">
									Adobe After Effects is a powerful software application used
									motion graphics.
								</p>

								<div className="tj-progress-bar ">
									<div className="progress_bar ">
										<div className="progress-item mt-50px relative">
											<div className="item_value font-medium text-seondary-color dark:text-white-color absolute right-0 top-[-30px]  tracking-[2px]">
												0%
											</div>
											<div className="item_bar h-1 rounded-full bg-dark-color dark:bg-white-color-3 w-full relative z-0">
												<div
													className="progress h-full w-full rounded-full bg-primary-color dark:bg-white-color  absolute left-0 top-0 z-1"
													data-progress="92"
												></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- skill 2 --> */}
						<div
							className="rounded-25px relative overflow-hidden px-7 py-10  bg-cream-light-color dark:bg-black-color  backdrop-blur-[40px]  group transition-all duration-500   wow fadeInUp"
							data-wow-delay="0.5s"
						>
							<div className="mb-15px  flex items-center gap-18px sm:gap-15px md:gap-18px lg:gap-15px xl:gap-18px  ">
								<div className="bg-white-color dark:bg-primary-color-light flex-shrink-0 w-60px h-60px sm:w-46px sm:h-46px md:w-20 md:h-20 lg:w-46px lg:h-46px xl:w-20 xl:h-20 inline-flex justify-center items-center leading-1 rounded-100%">
									<img
										className="w-full transition-all duration-500 "
										src="/img/icons/progess-9-icon2.svg"
										alt=""
									/>
								</div>
								<div>
									<h3 className="text-xl  mb-15px leading-1.2 lg:leading-1.2 2xl:leading-1.2 font-medium text-seondary-color dark:text-white-color   ">
										Final Cut <br />
										Pro
									</h3>
								</div>
							</div>

							<div>
								<p className="text-primary-color-light dark:text-body-color-3  mb-75px">
									Professional video editing software developed by Apple Inc.,
									designed.
								</p>

								<div className="tj-progress-bar ">
									<div className="progress_bar ">
										<div className="progress-item mt-50px relative">
											<div className="item_value font-medium text-seondary-color dark:text-white-color absolute right-0 top-[-30px]  tracking-[2px]">
												0%
											</div>
											<div className="item_bar h-1 rounded-full bg-dark-color dark:bg-white-color-3 w-full relative z-0">
												<div
													className="progress h-full w-full rounded-full bg-primary-color dark:bg-white-color  absolute left-0 top-0 z-1"
													data-progress="80"
												></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- skill 3 --> */}
						<div
							className="rounded-25px relative overflow-hidden px-7 py-10  bg-cream-light-color dark:bg-black-color  backdrop-blur-[40px]  group transition-all duration-500   wow fadeInUp"
							data-wow-delay="0.7s"
						>
							<div className="mb-15px  flex items-center gap-18px sm:gap-15px md:gap-18px lg:gap-15px xl:gap-18px  ">
								<div className="bg-white-color dark:bg-primary-color-light flex-shrink-0 w-60px h-60px sm:w-46px sm:h-46px md:w-20 md:h-20 lg:w-46px lg:h-46px xl:w-20 xl:h-20 inline-flex justify-center items-center leading-1 rounded-100%">
									<img
										className="w-full transition-all duration-500 "
										src="/img/icons/progess-9-icon3.svg"
										alt=""
									/>
								</div>
								<div>
									<h3 className="text-xl  mb-15px leading-1.2 lg:leading-1.2 2xl:leading-1.2 font-medium text-seondary-color dark:text-white-color   ">
										iMovie <br />
										Film
									</h3>
								</div>
							</div>

							<div>
								<p className="text-primary-color-light dark:text-body-color-3  mb-75px">
									iMovie offers a range of powerful editing tools that allow
									users.
								</p>

								<div className="tj-progress-bar ">
									<div className="progress_bar ">
										<div className="progress-item mt-50px relative">
											<div className="item_value font-medium text-seondary-color dark:text-white-color absolute right-0 top-[-30px]  tracking-[2px]">
												0%
											</div>
											<div className="item_bar h-1 rounded-full bg-dark-color dark:bg-white-color-3 w-full relative z-0">
												<div
													className="progress h-full w-full rounded-full bg-primary-color dark:bg-white-color  absolute left-0 top-0 z-1"
													data-progress="85"
												></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- skill 4 --> */}
						<div
							className="rounded-25px relative overflow-hidden px-7 py-10  bg-cream-light-color dark:bg-black-color  backdrop-blur-[40px]  group transition-all duration-500   wow fadeInUp"
							data-wow-delay="0.9s"
						>
							<div className="mb-15px  flex items-center gap-18px sm:gap-15px md:gap-18px lg:gap-15px xl:gap-18px  ">
								<div className="bg-white-color dark:bg-primary-color-light flex-shrink-0 w-60px h-60px sm:w-46px sm:h-46px md:w-20 md:h-20 lg:w-46px lg:h-46px xl:w-20 xl:h-20 inline-flex justify-center items-center leading-1 rounded-100%">
									<img
										className="w-full transition-all duration-500 "
										src="/img/icons/progess-9-icon4.svg"
										alt=""
									/>
								</div>
								<div>
									<h3 className="text-xl  mb-15px leading-1.2 lg:leading-1.2 2xl:leading-1.2 font-medium text-seondary-color dark:text-white-color   ">
										Hit Films <br />
										Express
									</h3>
								</div>
							</div>

							<div>
								<p className="text-primary-color-light dark:text-body-color-3  mb-75px">
									HitFilm Express is a free video editing and visual effects
									software developed.
								</p>

								<div className="tj-progress-bar ">
									<div className="progress_bar ">
										<div className="progress-item mt-50px relative">
											<div className="item_value font-medium text-seondary-color dark:text-white-color absolute right-0 top-[-30px]  tracking-[2px]">
												0%
											</div>
											<div className="item_bar h-1 rounded-full bg-dark-color dark:bg-white-color-3 w-full relative z-0">
												<div
													className="progress h-full w-full rounded-full bg-primary-color dark:bg-white-color  absolute left-0 top-0 z-1"
													data-progress="99"
												></div>
											</div>
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

export default Skills4;
