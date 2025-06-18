import ServiceCard2 from "@/components/shared/cards/ServiceCard2";
import getALlServices from "@/libs/getALlServices";

const Services3 = () => {
	const services = getALlServices()?.slice(0, 4);
	return (
		<section id="services">
			<div className=" pb-20 md:pb-100px xl:pb-30">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px text-center">
						<h2
							className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 inline-block bg-gradient-text-light dark:bg-gradient-text bg-clip-text leading-1.2 text-transparent wow fadeInUp"
							data-wow-delay=".3s"
						>
							Services
						</h2>
						<p
							className="uppercase text-seondary-color dark:text-white-color mt-15px wow fadeInUp"
							data-wow-delay="0.5s"
						>
							Offered Services
						</p>
					</div>
					{/* <!-- services --> */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-30px">
						{/* <!-- service single --> */}
						{services?.length
							? services?.map((service, idx) => (
									<ServiceCard2 key={idx} idx={idx} service={service} />
							  ))
							: ""}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services3;
