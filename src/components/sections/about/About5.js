import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const About5 = () => {
	return (
		<section id="about">
			<div className=" py-60px md:py-20 lg:py-30 bg-cream-light-color dark:bg-black-color overflow-x-hidden">
				<div className="container">
					{/* <!-- section heading --> */}

					<div className="flex flex-wrap items-end justify-between gap-x-30px gap-y-50px">
						<div
							className="w-full max-w-[515px] lg:max-w-[390px] xl:max-w-[515px]  mx-auto lg:mx-0   relative z-0 before:w-full before:h-[300px] sm:before:h-[405px]   before:absolute  before:bottom-0 before:left-0  before:rounded-[120px_14px_14px_14px]
						before:bg-gradient-13
						before:animate-gratient 
							before:bg-[length:600%_100%] before:shadow-shadow-inset 
							before:-z-1  after:w-full after:h-[300px] sm:after:h-[405px] after:absolute  after:left-[-10px] after:bottom-[10px] after:border-2 after:border-primary-color  after:rounded-[120px_14px_14px_14px] after:shadow-shadow-inset-2 after:bg-transparent after:-z-[2]  wow zoomIn"
							data-wow-delay=".3s"
						>
							<img
								className="w-full"
								src="/img/about/ab-8-images.png"
								alt="Images"
							/>
							<div className="absolute w-full max-w-50px right-[30px] top-[120px]  z-1 animate-move-var">
								<img
									src="/img/shapes/ab-8-shapes.png"
									className="w-full"
									alt="Shapes"
								/>
							</div>
						</div>

						<div className="w-full max-w-[630px] lg:max-w-[510px] xl:max-w-[560px] 2xl:max-w-[630px]   ">
							<div className="mb-25px  ">
								<span
									className="text-xs  uppercase text-primary-color  font-semibold relative inline-block tracking-0.2em wow fadeInRight"
									data-wow-delay=".3s"
								>
									Behind the Pixels
								</span>
							</div>
							<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color mb-35px lg:mb-5 xl:mb-30px   max-w-580px w-full tj-text-invert">
								Passionate Digital Marketer Focused on Driving Results.
							</h2>
							<div className="  w-full max-w-[510px]">
								<div>
									<p
										className="text-gray-color-2 dark:text-gray-color-2 leading-1.5   mb-30px   wow fadeInUp"
										data-wow-delay=".3s"
									>
										This encompasses a variety of strategies, including search
										engine optimization (SEO), content marketing, social media
										marketing, email marketing,.
									</p>
									<div
										className="grid grid-cols-2  max-w-420px wow fadeInUp"
										data-wow-delay=".3s"
									>
										<span className="text-base leading-1.75 sm:leading-1.75 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5px before:h-5px dark:before:bg-white-color ">
											Wider Reach
										</span>
										<span className="text-base leading-1.75 sm:leading-1.75 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5px before:h-5px dark:before:bg-white-color ">
											Engagement
										</span>
										<span className="text-base leading-1.75 sm:leading-1.75 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5px before:h-5px dark:before:bg-white-color ">
											Cost-Effectiveness
										</span>
										<span className="text-base leading-1.75 sm:leading-1.75 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5px before:h-5px dark:before:bg-white-color ">
											Measurable Results
										</span>
										<span className="text-base leading-1.75 sm:leading-1.75 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5px before:h-5px dark:before:bg-white-color ">
											Engagement
										</span>
										<span className="text-base leading-1.75 sm:leading-1.75 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5px before:h-5px dark:before:bg-white-color ">
											Social Media
										</span>
									</div>
									<div
										className="mt-35px xl:mt-35px wow fadeInUp"
										data-wow-delay=".3s"
									>
										<ButtonPrimary isIcon={true} href="./index.html#contact">
											Learn More{" "}
										</ButtonPrimary>
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

export default About5;
