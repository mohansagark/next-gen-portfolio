"use client";

import accordion from "@/libs/accordion";
import { useEffect } from "react";

const Faq2 = () => {
	useEffect(() => {
		accordion();
	}, []);
	return (
		<section id="faq" className="faq-2">
			<div className=" pb-20 md:pb-100px xl:pb-30  ">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px text-center">
						<div className="mb-25px  ">
							<span
								className="text-xs  uppercase py-10px px-5 bg-primary-color dark:bg-seondary-color text-white-color rounded-full font-semibold relative inline-block  wow fadeInRight"
								data-wow-delay=".3s"
							>
								Faq
							</span>
						</div>
						<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 inline-block text-seondary-color dark:text-white-color leading-1.2 tj-char-animation font-medium ">
							Your Questions and Answers
						</h2>
					</div>
					<div
						className="faq max-w-1120px mx-auto wow fadeInUp"
						data-wow-delay="0.3s"
					>
						<div className="w-full flex flex-col gap-25px" id="accordion">
							{/* <!-- item 1 --> */}
							<div
								className=" accordion-single transition-all duration-300 border bg-cream-light-color dark:bg-transparent border-body-color dark:border-seondary-color  rounded-15px wow fadeInUp "
								data-wow-delay=".3s"
							>
								<button className="accordion-btn text-primary-color-light  dark:text-white-color flex justify-between items-center w-full text-left text-lg md:text-xl  py-4 px-15px pr-10    md:py-21px md:px-30px   open ">
									<span className="text-lg font-medium">
										How do I get Quotation for my project?{" "}
									</span>
								</button>
								<div className="accordion-content open ">
									<div className="pt-5px pb-30px px-5  md:pl-30px text-gray-color dark:text-white-color">
										<p className="max-w-945px">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit,
											sed do eiusmod tempor incididunt ut labore et dolore magna
											aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
											elit, sed do eiusmod tempor incididunt.
										</p>
									</div>
								</div>
							</div>
							{/* <!-- item 2 --> */}
							<div
								className=" accordion-single transition-all duration-300 border bg-cream-light-color dark:bg-transparent border-body-color dark:border-seondary-color  rounded-15px wow fadeInUp "
								data-wow-delay=".4s"
							>
								<button className="accordion-btn text-primary-color-light  dark:text-white-color flex justify-between items-center w-full text-left text-lg md:text-xl  py-4 px-15px pr-10    md:py-21px md:px-30px    ">
									<span className="text-lg font-medium">
										How many landing page can I work with your project?
									</span>
								</button>
								<div className="accordion-content ">
									<div className="pt-5px pb-30px px-5  md:pl-30px text-gray-color dark:text-white-color">
										<p className="max-w-945px">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit,
											sed do eiusmod tempor incididunt ut labore et dolore magna
											aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
											elit, sed do eiusmod tempor incididunt.
										</p>
									</div>
								</div>
							</div>
							{/* <!-- item 3 --> */}
							<div
								className=" accordion-single transition-all duration-300 border bg-cream-light-color dark:bg-transparent border-body-color dark:border-seondary-color  rounded-15px wow fadeInUp "
								data-wow-delay=".5s"
							>
								<button className="accordion-btn text-primary-color-light  dark:text-white-color flex justify-between items-center w-full text-left text-lg md:text-xl  py-4 px-15px pr-10    md:py-21px md:px-30px    ">
									<span className="text-lg font-medium">
										Can I use your project for my clients?
									</span>
								</button>
								<div className="accordion-content ">
									<div className="pt-5px pb-30px px-5  md:pl-30px text-gray-color dark:text-white-color">
										<p className="max-w-945px">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit,
											sed do eiusmod tempor incididunt ut labore et dolore magna
											aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
											elit, sed do eiusmod tempor incididunt.
										</p>
									</div>
								</div>
							</div>
							{/* <!-- item 4 --> */}
							<div
								className=" accordion-single transition-all duration-300 border bg-cream-light-color dark:bg-transparent border-body-color dark:border-seondary-color  rounded-15px wow fadeInUp "
								data-wow-delay=".6s"
							>
								<button className="accordion-btn text-primary-color-light  dark:text-white-color flex justify-between items-center w-full text-left text-lg md:text-xl  py-4 px-15px pr-10    md:py-21px md:px-30px    ">
									<span className="text-lg font-medium">
										Will growth products slow down my products?
									</span>
								</button>
								<div className="accordion-content ">
									<div className="pt-5px pb-30px px-5  md:pl-30px text-gray-color dark:text-white-color">
										<p className="max-w-945px">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit,
											sed do eiusmod tempor incididunt ut labore et dolore magna
											aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
											elit, sed do eiusmod tempor incididunt.
										</p>
									</div>
								</div>
							</div>
							{/* <!-- item 5 --> */}
							<div
								className=" accordion-single transition-all duration-300 border bg-cream-light-color dark:bg-transparent border-body-color dark:border-seondary-color  rounded-15px wow fadeInUp "
								data-wow-delay=".7s"
							>
								<button className="accordion-btn text-primary-color-light  dark:text-white-color flex justify-between items-center w-full text-left text-lg md:text-xl  py-4 px-15px pr-10    md:py-21px md:px-30px    ">
									<span className="text-lg font-medium">
										Can I use your project for my clients?
									</span>
								</button>
								<div className="accordion-content ">
									<div className="pt-5px pb-30px px-5  md:pl-30px text-gray-color dark:text-white-color">
										<p className="max-w-945px">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit,
											sed do eiusmod tempor incididunt ut labore et dolore magna
											aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
											elit, sed do eiusmod tempor incididunt.
										</p>
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

export default Faq2;
