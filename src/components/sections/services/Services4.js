import ServiceCard3 from "@/components/shared/cards/ServiceCard3";
import getALlServices from "@/libs/getALlServices";

const Services4 = () => {
	const services = getALlServices()?.slice(0, 4);
	return (
		<section
			id="services"
			className=" relative after:absolute after:top-10 after:left-5 after:w-650px after:h-550px after:blur-[150px] after:rounded-50% after:bg-gradient-circle-2 after:-z-1  after:-translate-x-1/2 after:opacity-60 "
		>
			<div>
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px ">
						<div className="mb-25px  ">
							<span
								className="text-xs  uppercase py-10px px-5 bg-primary-color dark:bg-seondary-color text-white-color rounded-full font-semibold relative inline-block  wow fadeInRight"
								data-wow-delay=".3s"
							>
								SERVICES
							</span>
						</div>
						<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 inline-block text-seondary-color dark:text-white-color leading-1.2 tj-char-animation font-medium ">
							What we are offering
						</h2>
					</div>
					{/* <!-- services --> */}
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
						{/* <!-- service 1 --> */}
						{/* <!-- service single --> */}
						{services?.length
							? services?.map((service, idx) => (
									<ServiceCard3 key={idx} idx={idx} service={service} />
							  ))
							: ""}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services4;
