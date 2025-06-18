import Link from "next/link";

const ServiceCard5 = ({ service, idx }) => {
	const { title, id, iconName } = service || {};
	return (
		<div
			className="rounded-15px relative  p-30px  bg-white-color dark:bg-bg-color-6 backdrop-blur-[40px] z-0 group transition-all duration-500 before:absolute before:left-0 before:top-0 before:rounded-15px before:w-0 before:h-0 before:transition-all before:duration-500 hover:before:w-full hover:before:h-full before:border-t before:border-l before:border-primary-color before:opacity-0 before:invisible hover:before:opacity-100 hover:before:visible  before:-z-1  after:absolute after:right-0 after:bottom-0 after:rounded-15px after:w-0 after:h-0 after:transition-all after:duration-500 hover:after:w-full hover:after:h-full after:border-b after:border-r after:border-primary-color after:opacity-0 after:invisible hover:after:opacity-100 hover:after:visible after:-z-1 wow fadeInUp"
			data-wow-delay={`0.${3 + (idx === 0 ? idx : idx + idx)}s`}
		>
			<div className="mb-35px ">
				<span className="w-16 h-16 bg-gradient-secondary bg-200 rounded-100% inline-flex justify-center items-center leading-1">
					<i
						className={`${iconName} text-size-34 text-white-color  leading-1 inline-flex transition-all duration-500 group-hover:scale-x-[-1]`}
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
			<p className="tj-service-5-accordion-list-paragraph text-base xl:text-size-15 2xl:text-base text-primary-color-light dark:text-body-color-3 leading-1.5 2xl:leading-1.5 mb-3 ">
				Conducting qualitative and quantitative research to understand user
				needs, behaviors, and pain points. Utilizing methods such as surveys,
				interviews, and usability testing to actionable insights.
			</p>
			<div className="flex justify-end ">
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

export default ServiceCard5;
