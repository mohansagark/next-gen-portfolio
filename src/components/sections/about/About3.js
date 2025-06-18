import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FunFact6 from "@/components/shared/fun-fact/FunFact6";

const About3 = () => {
	return (
		<section id="about">
			<div className=" py-60px md:py-20 lg:py-30 overflow-x-hidden">
				<div className="container">
					{/* <!-- section heading --> */}

					<div className="flex flex-wrap items-center justify-between gap-x-30px gap-y-50px">
						<div
							className="max-w-300px sm:max-w-430px md:max-w-550px lg:max-w-310px xl:max-w-475px 2xl:max-w-550px mx-auto lg:mx-0  wow fadeInLeft"
							data-wow-delay=".3s"
						>
							<div className="  rounded-15px relative  z-0 after:absolute after:-left-0.5 after:-top-0.5 after:-right-0.5 after:-bottom-0.5  after:rounded-15px after:bg-gradient-text after:-z-1 mb-0.5">
								<img
									src="/img/about/h6-about.jpg"
									alt=""
									className="rounded-15px"
								/>
							</div>
						</div>
						<div>
							<div className="w-full max-w-620px ml-auto  ">
								<div className="mb-25px  ">
									<span className="text-xs px-3 py-5px rounded-full border border-border-color-2  uppercase text-primary-color  font-semibold tracking-0.02em relative inline-block  ">
										About Me
									</span>
								</div>
								<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color mb-35px lg:mb-5 xl:mb-35px   max-w-580px w-full tj-text-invert">
									Turning Creative Idea Into Content That Drives Results
								</h2>
								<div className="flex justify-between sm:items-end flex-col sm:flex-row-reverse gap-y-25px  w-full max-w-580px">
									<FunFact6 />
									<div>
										<p
											className="text-seondary-color dark:text-gray-color-2 leading-1.5   mb-5 max-w-315px  wow fadeInUp"
											data-wow-delay=".3s"
										>
											I break down complex user experience problems the create
											integrity focused to solutions that’s connect billions of
											people. I break the down.
										</p>
										<div
											className="tj-service-5-accordion-list-item mb-22px wow fadeInUp"
											data-wow-delay=".3s"
										>
											<span className="text-base leading-2 sm:leading-2 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5px before:h-5px dark:before:bg-white-color ">
												Brand Stories
											</span>
											<span className="text-base leading-2 sm:leading-2 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5px before:h-5px dark:before:bg-white-color ">
												Longform Content
											</span>
											<span className="text-base leading-2 sm:leading-2 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5px before:h-5px dark:before:bg-white-color ">
												Social Media
											</span>
										</div>
										<div
											className="mt-35px xl:mt-50px wow fadeInUp"
											data-wow-delay=".3s"
										>
											{" "}
											<ButtonPrimary url="/#contact" isIcon={true}>
												Learn More
											</ButtonPrimary>
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

export default About3;
