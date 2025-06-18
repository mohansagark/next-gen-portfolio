import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const About4 = () => {
	return (
		<section id="about">
			<div className=" pt-60px md:pt-20 lg:pt-30 pb-20 lg:pb-90x overflow-x-hidden">
				<div className="container">
					{/* <!-- section heading --> */}

					<div className="flex flex-wrap  justify-between gap-30px ">
						<div className="tj_title_anim">
							<span className="text-xs px-3 py-5px rounded-full border border-border-color-2  uppercase text-primary-color  font-semibold tracking-0.2em relative inline-block  ">
								About Me
							</span>
						</div>
						<div>
							<div className="w-full max-w-full md:max-w-420px lg:max-w-660px xl:max-w-810px ml-auto  ">
								<h2 className="tj-text-invert  text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 capitalize font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color mb-30px  ">
									Passionate SEO specialist dedicated to transforming brands
									online presence and driving sustainable growth.
								</h2>
								<div>
									<ButtonPrimary isIcon={true} href="/#contact">
										Learn More{" "}
									</ButtonPrimary>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About4;
