"use client";

import accordion2 from "@/libs/accordion2";
import Link from "next/link";
import { useEffect } from "react";

const Services5 = () => {
	useEffect(() => {
		accordion2();
	}, []);
	return (
		<section id="services">
			<div className=" py-60px md:py-20 lg:py-30 overflow-x-hidden">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px text-center flex flex-col items-center ">
						<div className="mb-25px  ">
							<span
								className="text-xs  uppercase text-primary-color  font-medium relative inline-block tracking-0.2em  wow fadeInUp"
								data-wow-delay=".3s"
							>
								Behind the Pixels
							</span>
						</div>
						<h2
							className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color   max-w-580px w-full wow fadeInUp"
							data-wow-delay=".4s"
						>
							Measuring Success By Numbers
						</h2>
					</div>
					{/* <!-- services --> */}
					<div>
						<ul className="tj-service-5-accordion-list accordion-list">
							<li className="px-15px lg:px-25px xl:p-30px py-25px lg:py-30px  border border-body-color dark:border-bg-color-2 cursor-pointer mb-30px last:mb-0 rounded-15px group/main">
								<h3 className="tj-service-5-accordion-list-title text-xl sm:text-size-22 md:text-3xl font-bold leading-1.2 md:leading-1.2 tracking-0.02em text-seondary-color dark:text-white-color transition-all duration-300 ease-in relative before:content-['\f123'] before:font-flaticon before:absolute  before:text-xl  before:right-0  before:top-0 before:opacity-1 before:visible before:rotate-0 before:transition-all before:duration-300 before:ease-in before:font-normal  group-hover/main:before:text-primary-color group-hover/main:before:rotate-90  ">
									<span className="text-primary-color mr-1">01.</span> UI/UX
									Design
								</h3>
								<div className="tj-service-5-accordion-wrap flex  lg:justify-between items-center flex-wrap gap-y-50px">
									<div className="tj-service-5-accordion-list-content w-full max-w-504px lg:max-w-400px xl:max-w-430px ml-8 md:ml-50px mt-30px md:mt-35px lg:mt-50px transition-all duration-300 ease-in">
										<p className="tj-service-5-accordion-list-paragraph text-base xl:text-size-15 2xl:text-base text-primary-color-light dark:text-body-color-3 leading-1.5 2xl:leading-1.5 mb-4">
											Conducting qualitative and quantitative research to
											understand user needs, behaviors, and pain points.
											Utilizing methods such as surveys, interviews, and
											usability testing to actionable insights.
										</p>
										<div className="tj-service-5-accordion-list-item mb-22px ">
											<span className="tex-sm sm:text-base leading-2 sm:leading-2 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1  before:bg-seondary-color dark:before:bg-white-color ">
												UI/UX Design
											</span>
											<span className="tex-sm sm:text-base leading-2 sm:leading-2 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1  before:bg-seondary-color dark:before:bg-white-color ">
												Research
											</span>
											<span className="tex-sm sm:text-base leading-2 sm:leading-2 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1  before:bg-seondary-color dark:before:bg-white-color ">
												Mobile & Web App
											</span>
										</div>
										<div className="tj-service-5-accordion-list-button">
											<Link
												href="/services/1"
												className="text-size-15 font-bold text-white-color capitalize py-17px px-35px bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full inline-flex gap-10px items-center leading-1 transition-all duration-300 group"
											>
												Learn More{" "}
												<i className="fa-regular fa-arrow-right transition-all duration-400 -rotate-45 group-hover:rotate-0"></i>
											</Link>
										</div>
									</div>
									<div className="tj-service-5-accordion-list-image w-full lg:w-auto">
										<div className="tj-service-5-accordion-thumb w-full  max-w-full lg:max-w-400px xl:max-w-540px 2xl:max-w-615px">
											<img
												src="/img/faq/faq-5-thumb1.jpg"
												alt="faq-image"
												className="service-image w-full h-full object-cover rounded-15px"
											/>
										</div>
									</div>
								</div>
							</li>
							<li className="px-15px lg:px-25px xl:p-30px py-25px lg:py-30px  border border-body-color dark:border-bg-color-2 cursor-pointer mb-30px last:mb-0 rounded-15px group/main">
								<h3 className="tj-service-5-accordion-list-title text-xl sm:text-size-22 md:text-3xl font-bold leading-1.2 md:leading-1.2 tracking-0.02em text-seondary-color dark:text-white-color transition-all duration-300 ease-in relative before:content-['\f123'] before:font-flaticon before:absolute  before:text-xl  before:right-0  before:top-0 before:opacity-1 before:visible before:rotate-0 before:transition-all before:duration-300 before:ease-in before:font-normal  group-hover/main:before:text-primary-color group-hover/main:before:rotate-90  ">
									<span className="text-primary-color mr-1">02.</span> Branding
									Design
								</h3>
								<div className="tj-service-5-accordion-wrap flex  lg:justify-between items-center flex-wrap gap-y-50px">
									<div className="tj-service-5-accordion-list-content w-full max-w-504px lg:max-w-400px xl:max-w-430px ml-8 md:ml-50px mt-30px md:mt-35px lg:mt-50px transition-all duration-300 ease-in">
										<p className="tj-service-5-accordion-list-paragraph text-base xl:text-size-15 2xl:text-base text-primary-color-light dark:text-body-color-3 leading-1.5 2xl:leading-1.5 mb-4">
											Conducting qualitative and quantitative research to
											understand user needs, behaviors, and pain points.
											Utilizing methods such as surveys, interviews, and
											usability testing to actionable insights.
										</p>
										<div className="tj-service-5-accordion-list-item mb-22px ">
											<span className="tex-sm sm:text-base leading-2 sm:leading-2 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1  before:bg-seondary-color dark:before:bg-white-color ">
												UI/UX Design
											</span>
											<span className="tex-sm sm:text-base leading-2 sm:leading-2 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1  before:bg-seondary-color dark:before:bg-white-color ">
												Research
											</span>
											<span className="tex-sm sm:text-base leading-2 sm:leading-2 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1  before:bg-seondary-color dark:before:bg-white-color ">
												Mobile & Web App
											</span>
										</div>
										<div className="tj-service-5-accordion-list-button">
											<Link
												href="/services/2"
												className="text-size-15 font-bold text-white-color capitalize py-17px px-35px bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full inline-flex gap-10px items-center leading-1 transition-all duration-300 group"
											>
												Learn More{" "}
												<i className="fa-regular fa-arrow-right transition-all duration-400 -rotate-45 group-hover:rotate-0"></i>
											</Link>
										</div>
									</div>
									<div className="tj-service-5-accordion-list-image w-full lg:w-auto">
										<div className="tj-service-5-accordion-thumb w-full  max-w-full lg:max-w-400px xl:max-w-540px 2xl:max-w-615px">
											<img
												src="/img/faq/faq-5-thumb2.jpg"
												alt="faq-image"
												className="service-image w-full h-full object-cover rounded-15px"
											/>
										</div>
									</div>
								</div>
							</li>
							<li className="px-15px lg:px-25px xl:p-30px py-25px lg:py-30px  border border-body-color dark:border-bg-color-2 cursor-pointer mb-30px last:mb-0 rounded-15px group/main">
								<h3 className="tj-service-5-accordion-list-title text-xl sm:text-size-22 md:text-3xl font-bold leading-1.2 md:leading-1.2 tracking-0.02em text-seondary-color dark:text-white-color transition-all duration-300 ease-in relative before:content-['\f123'] before:font-flaticon before:absolute  before:text-xl  before:right-0  before:top-0 before:opacity-1 before:visible before:rotate-0 before:transition-all before:duration-300 before:ease-in before:font-normal  group-hover/main:before:text-primary-color group-hover/main:before:rotate-90  ">
									<span className="text-primary-color mr-1">03.</span> UI
									Research
								</h3>
								<div className="tj-service-5-accordion-wrap flex  lg:justify-between items-center flex-wrap gap-y-50px">
									<div className="tj-service-5-accordion-list-content w-full max-w-504px lg:max-w-400px xl:max-w-430px ml-8 md:ml-50px mt-30px md:mt-35px lg:mt-50px transition-all duration-300 ease-in">
										<p className="tj-service-5-accordion-list-paragraph text-base xl:text-size-15 2xl:text-base text-primary-color-light dark:text-body-color-3 leading-1.5 2xl:leading-1.5 mb-4">
											Conducting qualitative and quantitative research to
											understand user needs, behaviors, and pain points.
											Utilizing methods such as surveys, interviews, and
											usability testing to actionable insights.
										</p>
										<div className="tj-service-5-accordion-list-item mb-22px ">
											<span className="tex-sm sm:text-base leading-2 sm:leading-2 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1  before:bg-seondary-color dark:before:bg-white-color ">
												UI/UX Design
											</span>
											<span className="tex-sm sm:text-base leading-2 sm:leading-2 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1  before:bg-seondary-color dark:before:bg-white-color ">
												Research
											</span>
											<span className="tex-sm sm:text-base leading-2 sm:leading-2 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1  before:bg-seondary-color dark:before:bg-white-color ">
												Mobile & Web App
											</span>
										</div>
										<div className="tj-service-5-accordion-list-button">
											<Link
												href="/services/3"
												className="text-size-15 font-bold text-white-color capitalize py-17px px-35px bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full inline-flex gap-10px items-center leading-1 transition-all duration-300 group"
											>
												Learn More{" "}
												<i className="fa-regular fa-arrow-right transition-all duration-400 -rotate-45 group-hover:rotate-0"></i>
											</Link>
										</div>
									</div>
									<div className="tj-service-5-accordion-list-image w-full lg:w-auto">
										<div className="tj-service-5-accordion-thumb w-full  max-w-full lg:max-w-400px xl:max-w-540px 2xl:max-w-615px">
											<img
												src="/img/faq/faq-5-thumb3.jpg"
												alt="faq-image"
												className="service-image w-full h-full object-cover rounded-15px"
											/>
										</div>
									</div>
								</div>
							</li>
							<li className="px-15px lg:px-25px xl:p-30px py-25px lg:py-30px  border border-body-color dark:border-bg-color-2 cursor-pointer mb-30px last:mb-0 rounded-15px group/main">
								<h3 className="tj-service-5-accordion-list-title text-xl sm:text-size-22 md:text-3xl font-bold leading-1.2 md:leading-1.2 tracking-0.02em text-seondary-color dark:text-white-color transition-all duration-300 ease-in relative before:content-['\f123'] before:font-flaticon before:absolute  before:text-xl  before:right-0  before:top-0 before:opacity-1 before:visible before:rotate-0 before:transition-all before:duration-300 before:ease-in before:font-normal  group-hover/main:before:text-primary-color group-hover/main:before:rotate-90  ">
									<span className="text-primary-color mr-1">04.</span> UX
									Modifacation
								</h3>
								<div className="tj-service-5-accordion-wrap flex  lg:justify-between items-center flex-wrap gap-y-50px">
									<div className="tj-service-5-accordion-list-content w-full max-w-504px lg:max-w-400px xl:max-w-430px ml-8 md:ml-50px mt-30px md:mt-35px lg:mt-50px transition-all duration-300 ease-in">
										<p className="tj-service-5-accordion-list-paragraph text-base xl:text-size-15 2xl:text-base text-primary-color-light dark:text-body-color-3 leading-1.5 2xl:leading-1.5 mb-4">
											Conducting qualitative and quantitative research to
											understand user needs, behaviors, and pain points.
											Utilizing methods such as surveys, interviews, and
											usability testing to actionable insights.
										</p>
										<div className="tj-service-5-accordion-list-item mb-22px ">
											<span className="tex-sm sm:text-base leading-2 sm:leading-2 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1  before:bg-seondary-color dark:before:bg-white-color ">
												UI/UX Design
											</span>
											<span className="tex-sm sm:text-base leading-2 sm:leading-2 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1  before:bg-seondary-color dark:before:bg-white-color ">
												Research
											</span>
											<span className="tex-sm sm:text-base leading-2 sm:leading-2 font-semibold text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1  before:bg-seondary-color dark:before:bg-white-color ">
												Mobile & Web App
											</span>
										</div>
										<div className="tj-service-5-accordion-list-button">
											<Link
												href="/services/4"
												className="text-size-15 font-bold text-white-color capitalize py-17px px-35px bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full inline-flex gap-10px items-center leading-1 transition-all duration-300 group"
											>
												Learn More{" "}
												<i className="fa-regular fa-arrow-right transition-all duration-400 -rotate-45 group-hover:rotate-0"></i>
											</Link>
										</div>
									</div>
									<div className="tj-service-5-accordion-list-image w-full lg:w-auto">
										<div className="tj-service-5-accordion-thumb w-full  max-w-full lg:max-w-400px xl:max-w-540px 2xl:max-w-615px">
											<img
												src="/img/faq/faq-5-thumb4.jpg"
												alt="faq-image"
												className="service-image w-full h-full object-cover rounded-15px"
											/>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services5;
