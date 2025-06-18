"use client";

import ServiceCard4 from "@/components/shared/cards/ServiceCard4";
import accordion2 from "@/libs/accordion2";
import getALlServices from "@/libs/getALlServices";
import Link from "next/link";
import { useEffect } from "react";
const Services6 = ({ type }) => {
	const services = getALlServices()?.slice(0, 3);
	useEffect(() => {
		accordion2();
	}, []);
	return (
		<section id="services">
			<div
				className={`${
					type === 2
						? "dark:bg-primary-color-light"
						: "bg-cream-light-color dark:bg-black-color"
				} py-60px md:py-20 lg:py-30 overflow-x-hidden`}
			>
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px text-center flex flex-col items-center ">
						<div className="mb-25px  ">
							<span
								className={`text-xs relative inline-block text-primary-color font-semibold tracking-0.02em uppercase ${
									type === 2
										? "wow fadeInRight"
										: "px-3 py-5px rounded-full border  border-border-color-2  "
								}  `}
								data-wow-delay={type === 2 ? "0" : ".3s"}
							>
								my services
							</span>
						</div>
						<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color    max-w-580px w-full tj-text-invert">
							Here's how I can help!
						</h2>
					</div>
					{/* <!-- services --> */}
					<div>
						<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-30px">
							{services?.length
								? services?.map((service, idx) => (
										<ServiceCard4
											key={idx}
											idx={idx}
											service={service}
											type={type}
										/>
								  ))
								: ""}
						</div>

						<div className="mt-5 lg:mt-30px wow fadeInUp" data-wow-delay=".3s">
							<Link
								href="#services"
								className=" font-bold text-white-color capitalize w-full py-22px md:py-[28px] px-3 bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-15px flex gap-10px justify-center items-center leading-1 transition-all duration-300 group"
							>
								Let’s Contact with Me{" "}
								<i className="fa-regular fa-arrow-right transition-all duration-400 -rotate-45 group-hover:rotate-0"></i>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services6;
