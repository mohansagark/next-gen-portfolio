"use client";

import progressBar from "@/libs/progressBar";
import { useEffect } from "react";

const Skills2 = ({ type, title }) => {
	useEffect(() => {
		progressBar();
	}, []);
	return (
		<section
			id="skills"
			className={`${
				type === 2 ? "dark:bg-black-color" : ""
			} pb-20 md:pb-100px xl:pb-30 relative after:absolute after:top-1/2 after:-translate-y-1/2 after:right-5 after:w-650px after:h-550px after:blur-[150px] after:rounded-50% after:bg-gradient-circle-2 after:-z-1  after:translate-x-1/2 after:opacity-60 `}
		>
			<div className="">
				<div className="container">
					{/* <!-- section heading --> */}
					<div
						className={`mb-10 md:mb-50px xl:mb-60px ${
							type === 2 ? " text-center flex flex-col items-center" : ""
						}`}
					>
						<div className="mb-25px  ">
							<span
								className={`text-xs uppercase  ${
									type === 2
										? "text-primary-color font-medium"
										: " py-10px px-5 bg-primary-color dark:bg-seondary-color text-white-color rounded-full font-semibold "
								} relative inline-block  wow fadeInRight`}
								data-wow-delay=".3s"
							>
								SKILLS
							</span>
						</div>
						<h2
							className={`text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 inline-block  text-seondary-color dark:text-white-color leading-1.2  ${
								type === 2
									? "font-semibold -tracking-0.02em     w-full wow fadeInUp"
									: " tj-char-animation font-medium "
							}`}
							data-wow-delay={type === 2 ? ".4s" : "0"}
						>
							{title ? title : "My Favourite Stakes"}
						</h2>
					</div>
					{/* <!-- skills --> */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-306px sm:max-w-full w-full mx-auto">
						{/* <!-- skill 1 --> */}
						<div
							className={`rounded-25px relative overflow-hidden pt-30px pb-35px lg:pt-35px lg:pb-10 2xl:pt-45px 2xl:pb-50px px-15px 2xl:pl-35px 2xl:pr-30px  backdrop-blur-[40px]  group transition-all duration-500 ${
								type === 2
									? " border-2 border-cream-light-color bg-cream-light-color dark:bg-transparent  dark:border-bg-color-2  rounded-20px"
									: " bg-cream-light-color dark:bg-bg-color-6 rounded-25px "
							}  wow fadeInUp`}
							data-wow-delay="0.3s"
						>
							<div className="mb-15px  flex items-center gap-18px sm:gap-15px md:gap-18px lg:gap-15px xl:gap-18px  ">
								<div
									className={`${
										type === 2
											? "bg-white-color dark:bg-primary-color-light rounded-100%"
											: "bg-dark-color dark:bg-transparent  rounded-lg"
									} flex-shrink-0 w-60px h-60px sm:w-46px sm:h-46px md:w-20 md:h-20 lg:w-46px lg:h-46px xl:w-20 xl:h-20 inline-flex justify-center items-center leading-1`}
								>
									<img
										className="w-30px md:w-10 lg:w-30px xl:w-10"
										src="/img/icons/figma.svg"
										alt=""
									/>
								</div>
								<div>
									<h3 className="text-xl md:text-size-22 lg:text-2xl mb-15px leading-1.2 lg:leading-1.2 2xl:leading-1.2 font-medium text-seondary-color dark:text-white-color   ">
										Figma
									</h3>
								</div>
							</div>

							<div>
								<p className="text-primary-color-light dark:text-body-color  mb-0 ">
									I have had the opportunity to work on several projects.
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
							className={`rounded-25px relative overflow-hidden pt-30px pb-35px lg:pt-35px lg:pb-10 2xl:pt-45px 2xl:pb-50px px-15px 2xl:pl-35px 2xl:pr-30px  backdrop-blur-[40px]  group transition-all duration-500 ${
								type === 2
									? " border-2 border-cream-light-color bg-cream-light-color dark:bg-transparent  dark:border-bg-color-2  rounded-20px"
									: " bg-cream-light-color dark:bg-bg-color-6 rounded-25px "
							}  wow fadeInUp`}
							data-wow-delay="0.5s"
						>
							<div className="mb-15px  flex items-center gap-18px sm:gap-15px md:gap-18px lg:gap-15px xl:gap-18px  ">
								<div
									className={`${
										type === 2
											? "bg-white-color dark:bg-primary-color-light rounded-100%"
											: "bg-dark-color dark:bg-transparent  rounded-lg"
									} flex-shrink-0 w-60px h-60px sm:w-46px sm:h-46px md:w-20 md:h-20 lg:w-46px lg:h-46px xl:w-20 xl:h-20 inline-flex justify-center items-center leading-1`}
								>
									<img
										className="w-30px md:w-10 lg:w-30px xl:w-10"
										src="/img/icons/sketch.svg"
										alt=""
									/>
								</div>
								<div>
									<h3 className="text-xl md:text-size-22 lg:text-2xl mb-15px leading-1.2 lg:leading-1.2 2xl:leading-1.2 font-medium text-seondary-color dark:text-white-color   ">
										Sketch
									</h3>
								</div>
							</div>

							<div>
								<p className="text-primary-color-light dark:text-body-color  mb-0 ">
									I have had the opportunity to work on several projects.
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
							className={`rounded-25px relative overflow-hidden pt-30px pb-35px lg:pt-35px lg:pb-10 2xl:pt-45px 2xl:pb-50px px-15px 2xl:pl-35px 2xl:pr-30px  backdrop-blur-[40px]  group transition-all duration-500 ${
								type === 2
									? " border-2 border-cream-light-color bg-cream-light-color dark:bg-transparent  dark:border-bg-color-2  rounded-20px"
									: " bg-cream-light-color dark:bg-bg-color-6 rounded-25px "
							}  wow fadeInUp`}
							data-wow-delay="0.7s"
						>
							<div className="mb-15px  flex items-center gap-18px sm:gap-15px md:gap-18px lg:gap-15px xl:gap-18px  ">
								<div
									className={`${
										type === 2
											? "bg-white-color dark:bg-primary-color-light rounded-100%"
											: "bg-dark-color dark:bg-transparent  rounded-lg"
									} flex-shrink-0 w-60px h-60px sm:w-46px sm:h-46px md:w-20 md:h-20 lg:w-46px lg:h-46px xl:w-20 xl:h-20 inline-flex justify-center items-center leading-1`}
								>
									<img
										className="w-30px md:w-10 lg:w-30px xl:w-10"
										src="/img/icons/xd.svg"
										alt=""
									/>
								</div>
								<div>
									<h3 className="text-xl md:text-size-22 lg:text-2xl mb-15px leading-1.2 lg:leading-1.2 2xl:leading-1.2 font-medium text-seondary-color dark:text-white-color   ">
										XD
									</h3>
								</div>
							</div>

							<div>
								<p className="text-primary-color-light dark:text-body-color  mb-0 ">
									I have had the opportunity to work on several projects.
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
							className={`rounded-25px relative overflow-hidden pt-30px pb-35px lg:pt-35px lg:pb-10 2xl:pt-45px 2xl:pb-50px px-15px 2xl:pl-35px 2xl:pr-30px  backdrop-blur-[40px]  group transition-all duration-500 ${
								type === 2
									? " border-2 border-cream-light-color bg-cream-light-color dark:bg-transparent  dark:border-bg-color-2  rounded-20px"
									: " bg-cream-light-color dark:bg-bg-color-6 rounded-25px "
							}  wow fadeInUp`}
							data-wow-delay="0.9s"
						>
							<div className="mb-15px  flex items-center gap-18px sm:gap-15px md:gap-18px lg:gap-15px xl:gap-18px  ">
								<div
									className={`${
										type === 2
											? "bg-white-color dark:bg-primary-color-light rounded-100%"
											: "bg-dark-color dark:bg-transparent  rounded-lg"
									} flex-shrink-0 w-60px h-60px sm:w-46px sm:h-46px md:w-20 md:h-20 lg:w-46px lg:h-46px xl:w-20 xl:h-20 inline-flex justify-center items-center leading-1`}
								>
									<img
										className="w-30px md:w-10 lg:w-30px xl:w-10"
										src="/img/icons/wp.svg"
										alt=""
									/>
								</div>
								<div>
									<h3 className="text-xl md:text-size-22 lg:text-2xl mb-15px leading-1.2 lg:leading-1.2 2xl:leading-1.2 font-medium text-seondary-color dark:text-white-color   ">
										WordPess
									</h3>
								</div>
							</div>

							<div>
								<p className="text-primary-color-light dark:text-body-color  mb-0 ">
									I have had the opportunity to work on several projects.
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

export default Skills2;
