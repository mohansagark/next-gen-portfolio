"use client";

import progressBar from "@/libs/progressBar";
import { useEffect } from "react";

const Skills3 = ({ type, title }) => {
	useEffect(() => {
		progressBar();
	}, []);
	return (
		<section id="skills" className="   py-20 md:py-100px xl:py-30 relative ">
			<div className="">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px text-center flex flex-col items-center ">
						<div className="tj_title_anim mb-25px  ">
							<span className=" text-xs px-3 py-5px rounded-full border  border-border-color-2 text-primary-color  font-semibold tracking-0.2em relative inline-block uppercase">
								my skills
							</span>
						</div>
						<h2 className="tj_title_anim text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 capitalize font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  ">
							Mastering SEO Skills
						</h2>
					</div>
					{/* <!-- services --> */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-306px sm:max-w-full w-full mx-auto">
						{/* <!-- skill 1 --> */}
						<div
							className="rounded-10px relative overflow-hidden pt-30px pb-35px lg:pt-35px lg:pb-10 2xl:pt-45px 2xl:pb-50px px-15px 2xl:pl-35px 2xl:pr-30px  bg-cream-light-color dark:bg-black-color  backdrop-blur-[40px]  group transition-all duration-500   wow fadeInUp"
							data-wow-delay="0.3s"
						>
							<div className="mb-15px  flex items-center gap-18px sm:gap-15px md:gap-18px lg:gap-15px xl:gap-18px  ">
								<div className="bg-white-color dark:bg-primary-color-light flex-shrink-0 w-60px h-60px sm:w-46px sm:h-46px md:w-20 md:h-20 lg:w-46px lg:h-46px xl:w-20 xl:h-20 inline-flex justify-center items-center leading-1 rounded-100%">
									<img
										className="w-12 transition-all duration-500 group-hover:scale-x-[-1]"
										src="/img/icons/progress-7-icon1.svg"
										alt=""
									/>
								</div>
								<div>
									<h3 className="text-xl  mb-15px leading-1.2 lg:leading-1.2 2xl:leading-1.2 font-medium text-seondary-color dark:text-white-color   ">
										Strategy Development
									</h3>
								</div>
							</div>

							<div>
								<p className="text-primary-color-light dark:text-body-color-3  mb-0 ">
									Expertise in creating tailored SEO strategies that drive
									organic traffic and improve search rankings.
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
							className="rounded-10px relative overflow-hidden pt-30px pb-35px lg:pt-35px lg:pb-10 2xl:pt-45px 2xl:pb-50px px-15px 2xl:pl-35px 2xl:pr-30px  bg-cream-light-color dark:bg-black-color  backdrop-blur-[40px]  group transition-all duration-500   wow fadeInUp"
							data-wow-delay="0.5s"
						>
							<div className="mb-15px  flex items-center gap-18px sm:gap-15px md:gap-18px lg:gap-15px xl:gap-18px  ">
								<div className="bg-white-color dark:bg-primary-color-light flex-shrink-0 w-60px h-60px sm:w-46px sm:h-46px md:w-20 md:h-20 lg:w-46px lg:h-46px xl:w-20 xl:h-20 inline-flex justify-center items-center leading-1 rounded-100%">
									<img
										className="w-12 transition-all duration-500 group-hover:scale-x-[-1]"
										src="/img/icons/progress-7-icon2.svg"
										alt=""
									/>
								</div>
								<div>
									<h3 className="text-xl  mb-15px leading-1.2 lg:leading-1.2 2xl:leading-1.2 font-medium text-seondary-color dark:text-white-color   ">
										CMS Platforms
									</h3>
								</div>
							</div>

							<div>
								<p className="text-primary-color-light dark:text-body-color-3  mb-0 ">
									Expertise in creating tailored SEO strategies that drive
									organic traffic and improve search rankings.
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
							className="rounded-10px relative overflow-hidden pt-30px pb-35px lg:pt-35px lg:pb-10 2xl:pt-45px 2xl:pb-50px px-15px 2xl:pl-35px 2xl:pr-30px  bg-cream-light-color dark:bg-black-color  backdrop-blur-[40px]  group transition-all duration-500   wow fadeInUp"
							data-wow-delay="0.7s"
						>
							<div className="mb-15px  flex items-center gap-18px sm:gap-15px md:gap-18px lg:gap-15px xl:gap-18px  ">
								<div className="bg-white-color dark:bg-primary-color-light flex-shrink-0 w-60px h-60px sm:w-46px sm:h-46px md:w-20 md:h-20 lg:w-46px lg:h-46px xl:w-20 xl:h-20 inline-flex justify-center items-center leading-1 rounded-100%">
									<img
										className="w-12 transition-all duration-500 group-hover:scale-x-[-1]"
										src="/img/icons/progress-7-icon3.svg"
										alt=""
									/>
								</div>
								<div>
									<h3 className="text-xl  mb-15px leading-1.2 lg:leading-1.2 2xl:leading-1.2 font-medium text-seondary-color dark:text-white-color   ">
										PPC Campaigns
									</h3>
								</div>
							</div>

							<div>
								<p className="text-primary-color-light dark:text-body-color-3  mb-0 ">
									Expertise in creating tailored SEO strategies that drive
									organic traffic and improve search rankings.
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
							className="rounded-10px relative overflow-hidden pt-30px pb-35px lg:pt-35px lg:pb-10 2xl:pt-45px 2xl:pb-50px px-15px 2xl:pl-35px 2xl:pr-30px  bg-cream-light-color dark:bg-black-color  backdrop-blur-[40px]  group transition-all duration-500   wow fadeInUp"
							data-wow-delay="0.9s"
						>
							<div className="mb-15px  flex items-center gap-18px sm:gap-15px md:gap-18px lg:gap-15px xl:gap-18px  ">
								<div className="bg-white-color dark:bg-primary-color-light flex-shrink-0 w-60px h-60px sm:w-46px sm:h-46px md:w-20 md:h-20 lg:w-46px lg:h-46px xl:w-20 xl:h-20 inline-flex justify-center items-center leading-1 rounded-100%">
									<img
										className="w-12 transition-all duration-500 group-hover:scale-x-[-1]"
										src="/img/icons/progress-7-icon4.svg"
										alt=""
									/>
								</div>
								<div>
									<h3 className="text-xl  mb-15px leading-1.2 lg:leading-1.2 2xl:leading-1.2 font-medium text-seondary-color dark:text-white-color   ">
										Project Management
									</h3>
								</div>
							</div>

							<div>
								<p className="text-primary-color-light dark:text-body-color-3  mb-0 ">
									Expertise in creating tailored SEO strategies that drive
									organic traffic and improve search rankings.
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

export default Skills3;
