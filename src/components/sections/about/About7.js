import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const About7 = () => {
	return (
		<section id="about">
			<div className="bg-cream-light-color dark:bg-black-color mx-15px lg:mx-50px rounded-[24px]">
				<div className=" py-60px md:py-20 lg:py-30 bg-[url('/img/shapes/cta-10-shapes.png')] bg-no-repeat bg-cover bg-[center_center] ">
					<div className="container">
						<div className="max-w-[1082px] mx-auto text-center">
							<div className="mb-25px text-center ">
								<span
									className="text-xs  uppercase text-primary-color  font-semibold relative inline-block tracking-0.2em wow fadeInUp"
									data-wow-delay=".3s"
								>
									My Services
								</span>
							</div>

							<div>
								<h1
									className=" text-size-35 sm:text-size-40 md:text-size-54 lg:text-size-68 text-seondary-color dark:text-white-color  leading-[1.3] -tracking-0.03em  font-semibold  mb-38px uppercase wow fadeInUp "
									data-wow-delay=".4s"
								>
									<span className="inline-flex items-center  gap-1.5 sm:gap-10px ">
										Expert{" "}
										<img
											className="w-full max-w-[25px] sm:max-w-[35px] md:max-w-50px lg:max-w-[70px] rounded-100%"
											src="/img/cta/cta-10-img-1.png"
											alt=""
										/>
									</span>{" "}
									Consulting Propel{" "}
									<span className="inline-flex items-center  gap-1.5 sm:gap-10px ">
										Business{" "}
										<img
											className="w-full max-w-[25px] sm:max-w-[35px] md:max-w-50px lg:max-w-[70px] rounded-100%"
											src="/img/cta/cta-10-img-2.png"
											alt=""
										/>{" "}
										<img
											className="w-full max-w-[25px] sm:max-w-[35px] md:max-w-50px lg:max-w-[70px] rounded-10px"
											src="/img/cta/cta-10-img-3.png"
											alt=""
										/>
									</span>{" "}
									Toward <br />
									Best Success
								</h1>
							</div>

							<div className="wow fadeInUp " data-wow-delay=".5s">
								<ButtonPrimary isIcon={true} url="/#contact">
									Know More{" "}
								</ButtonPrimary>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About7;
