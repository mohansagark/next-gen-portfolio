import ActiveBg1 from "@/components/shared/active-bg/ActiveBg1";
import ServiceItem2 from "@/components/shared/services/ServiceItem2";
import getALlServices from "@/libs/getALlServices";

const Services9 = () => {
	const services = getALlServices();
	return (
		<section id="services">
			<div className=" py-60px md:py-20 lg:py-30 relative ">
				<div className="container">
					<div className="flex flex-wrap justify-between gap-10px lg:gap-10 xl:gap-35px">
						<div className="w-full max-w-[425px] md:max-w-full lg:max-w-[360px] xl:max-w-[420px]">
							<div className=" md:flex gap-30px lg:block mb-10 md:mb-50px lg:mb-0">
								<div className="md:w-1/2 lg:w-auto">
									<div className="mb-25px  ">
										<span
											className="text-xs  uppercase text-primary-color  font-semibold relative inline-block tracking-0.2em wow fadeInUp"
											data-wow-delay=".3s"
										>
											My Services
										</span>
									</div>
									<h2
										className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  max-w-580px w-full wow fadeInUp "
										data-wow-delay=".4s"
									>
										Here's how I can Be Best help!
									</h2>
									<p
										className="text-gray-color-2 dark:text-gray-color-2 mt-15px wow fadeInUp "
										data-wow-delay=".5s"
									>
										I break down complexd user experiences problems create
										integrity focused to solutions that connect billions of
										business people.
									</p>
									<div
										className="mt-30px md:mt-35px wow fadeInUp"
										data-wow-delay=".6s"
									>
										<a
											href="#"
											className="text-size-15 font-bold text-white-color capitalize py-17px px-35px bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full inline-flex gap-10px items-center leading-1 transition-all duration-300 group wow fadeInRight"
											data-wow-delay=".5s"
										>
											More Services{" "}
											<i className="fa-regular fa-arrow-right transition-all duration-400 -rotate-45 group-hover:rotate-0"></i>
										</a>
									</div>
								</div>

								<div className="w-full max-w-[405px] md:w-1/2 lg:w-full lg:mx-auto  mt-60px rounded-10px   relative z-0 after:absolute after:top-[-15px] after:right-[-15px] after:w-full after:h-full after:border after:rounded-10px after:border-body-color dark:after:border-bg-color-2 after:-z-1 ">
									<img
										className="rounded-10px"
										src="/img/services/services-10-images.png"
										alt=""
									/>
								</div>
							</div>
						</div>
						{/* <!-- services --> */}
						<div className="services-widget services-widget--2 relative w-full max-w-[815px] lg:max-w-[530px] xl:max-w-[655px] 2xl:max-w-[770px] ml-auto  ">
							{services?.length
								? services?.map((service, idx) => (
										<ServiceItem2 key={idx} service={service} idx={idx} />
								  ))
								: ""}
							<ActiveBg1 type={"service-2"} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services9;
