import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FunFact10 from "@/components/shared/fun-fact/FunFact10";

const About6 = () => {
	return (
		<section id="about" className="dark:bg-primary-color-light">
			<div className=" mx-15px py-60px md:py-20 lg:py-30 bg-cream-light-color dark:bg-black-color rounded-[24px]  overflow-x-hidden">
				<div className="container">
					{/* <!-- section heading --> */}

					<div className="flex flex-wrap  justify-between gap-x-30px gap-y-50px">
						<div
							className="w-full max-w-[515px] lg:max-w-[390px] xl:max-w-[515px]  mx-auto lg:mx-0 h-full  relative z-0  wow zoomIn"
							data-wow-delay=".3s"
						>
							<img
								className="w-full h-full object-cover rounded-15px "
								src="/img/about/about-9-thumb.jpg"
								alt="Images"
							/>
						</div>

						<div className="w-full max-w-[630px] lg:max-w-[510px] xl:max-w-[560px] 2xl:max-w-[630px]">
							<div className="mb-25px  ">
								<span
									className="text-xs  uppercase text-primary-color  font-semibold relative inline-block tracking-0.2em wow fadeInRight"
									data-wow-delay=".3s"
								>
									Behind the Pixels
								</span>
							</div>
							<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color mb-35px lg:mb-5 xl:mb-30px   max-w-580px w-full tj-text-invert">
								Passionate On Digital Marketer Focused on Driving Results.
							</h2>
							<div className="  w-full ">
								<div>
									<p
										className="text-gray-color-2 dark:text-white-color-4 leading-1.5   mb-30px max-w-[510px]   wow fadeInUp"
										data-wow-delay=".3s"
									>
										This encompasses a variety of strategies, including search
										engine optimization (SEO), content marketing, social media
										marketing, email marketing,.
									</p>
									{/* <!-- fanfact --> */}
									<div className="relative  ">
										<FunFact10 />
									</div>
									<div
										className="mt-35px xl:mt-35px wow fadeInUp"
										data-wow-delay=".3s"
									>
										<ButtonPrimary type={2} isIcon={true} href="/#contact">
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

export default About6;
