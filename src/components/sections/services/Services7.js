"use client";

import ServiceCard5 from "@/components/shared/cards/ServiceCard5";
import getALlServices from "@/libs/getALlServices";

const Services7 = () => {
	const services = getALlServices()?.slice(0, 3);

	return (
		<section id="services">
			<div className="bg-cream-light-color dark:bg-black-color py-60px md:py-20 lg:py-30 overflow-x-hidden">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px text-center flex flex-col items-center ">
						<div className="tj_title_anim mb-25px  ">
							<span className=" text-xs px-3 py-5px rounded-full border  border-border-color-2 text-primary-color  font-semibold tracking-0.2em relative inline-block uppercase">
								my services
							</span>
						</div>
						<h2 className="tj_title_anim tj_title_anim text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 capitalize font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  ">
							Here's How I can Help!
						</h2>
					</div>
					{/* <!-- services --> */}
					<div>
						<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-30px">
							{services?.length
								? services?.map((service, idx) => (
										<ServiceCard5 key={idx} idx={idx} service={service} />
								  ))
								: ""}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services7;
