import Link from "next/link";

const ServiceCard6 = ({ service, idx }) => {
	const { title, id, iconName } = service || {};
	return (
		<div className="rounded-15px relative  p-30px  bg-white-color dark:bg-dark-color backdrop-blur-[40px] border border-border-color dark:border-transparent text-center z-0 group transition-all duration-500 ">
			<div className="mb-35px ">
				<span className="w-16 h-16 bg-gradient-secondary bg-200 rounded-100% inline-flex justify-center items-center leading-1">
					<i
						className={`${iconName}  text-size-34 text-white-color  leading-1 inline-flex transition-all duration-500 group-hover:scale-x-[-1]`}
					></i>
				</span>
			</div>
			<h3 className="tj-service-5-accordion-list-title text-xl sm:text-size-22 md:text-3xl font-bold mb-15px  leading-1.2 md:leading-1.2 tracking-0.02em  transition-all duration-300 ease-in relative  ">
				<Link
					href={`/services/${id}`}
					className="text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color"
				>
					{title}
				</Link>
			</h3>
			<p className=" text-base xl:text-size-15 2xl:text-base text-primary-color-light dark:text-white-color leading-1.5 2xl:leading-1.5 mb-25px lg:mb-35px">
				Conducting qualitative and quantitative research to understand user
				needs, behaviors, and pain points. Utilizing methods such as surveys,
				interviews, and usability testing to actionable insights.
			</p>
			<div className="flex justify-center ">
				<Link
					href={`/services/${id}`}
					className="text-2xl  text-white-color  leading-1 transition-all duration-300  inline-flex justify-center items-center hover:text-primary-color"
				>
					<span className="relative overflow-hidden -rotate-45">
						<i className="fa-regular fa-arrow-right  group-hover:translate-x-150% transition-all duration-500 inline-block"></i>
						<i className="fa-regular fa-arrow-right absolute left-0 top-0 -translate-x-150% group-hover:-translate-x-0 transition-all duration-500"></i>
					</span>
				</Link>
			</div>
		</div>
	);
};

export default ServiceCard6;
