import Link from "next/link";

const ServiceCard4 = ({ service, idx, type }) => {
	const { title, id, iconName } = service || {};
	return (
		<div
			className={`rounded-15px relative overflow-hidden p-30px  ${
				type === 2
					? "bg-cream-light-color dark:bg-black-color"
					: "bg-white-color dark:bg-bg-color-6"
			} backdrop-blur-[40px]  group transition-all duration-500 wow fadeInUp`}
			data-wow-delay={`0.${3 + (idx === 0 ? idx : idx + idx)}s`}
		>
			<div className="mb-35px ">
				<span className="w-16 h-16 bg-primary-color rounded-100% inline-flex justify-center items-center leading-1">
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
			<p className="tj-service-5-accordion-list-paragraph text-base xl:text-size-15 2xl:text-base text-primary-color-light dark:text-body-color-3 leading-1.5 2xl:leading-1.5 mb-4 lg:mb-5">
				Conducting qualitative and quantitative research to understand user
				needs, behaviors, and pain points. Utilizing methods such as surveys,
				interviews, and usability testing to actionable insights.
			</p>
			<div className="tj-service-5-accordion-list-item  ">
				<span className="text-base leading-2 sm:leading-2 font-medium text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1  before:bg-seondary-color dark:before:bg-white-color ">
					UI/UX Design
				</span>
				<span className="text-base leading-2 sm:leading-2 font-medium text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1  before:bg-seondary-color dark:before:bg-white-color ">
					Research
				</span>
				<span className="text-base leading-2 sm:leading-2 font-medium text-seondary-color dark:text-white-color block relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1  before:bg-seondary-color dark:before:bg-white-color ">
					Mobile & Web App
				</span>
			</div>
		</div>
	);
};

export default ServiceCard4;
