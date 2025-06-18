import Link from "next/link";

const ServiceCard2 = ({ service, idx }) => {
	const { title, id, totalProject, iconName } = service || {};
	return (
		<div
			className="rounded-15px overflow-hidden py-25px px-15px md:p-35px md:pt-25px bg-transparent hover:bg-primary-color dark:hover:bg-primary-color border border-border-color  dark:border-primary-color hover:border-primary-color dark:hover:border-white-color group transition-all duration-300  wow fadeInUp"
			data-wow-delay={`0.${3 + idx}s`}
		>
			<div className="mb-25px">
				<i
					className={`${iconName} text-size-32 text-primary-color group-hover:text-white-color leading-1`}
				></i>
			</div>

			<div>
				<h3 className="text-xl mb-10px leading-1.2 font-medium">
					<Link
						href={`/services/${id}`}
						className="text-primary-color dark:text-white-color hover:text-primary-color group-hover:text-white-color dark:group-hover:text-white-color"
					>
						{" "}
						{title}
					</Link>
				</h3>

				<p className="text-primary-color-light dark:text-white-color group-hover:text-white-color dark:group-hover:text-white-color mb-0">
					Conducting qualitative and quantitative research to understand user
					needs, behaviors, and pain points. Utilizing methods such as surveys,
					interviews, and usability testing...
				</p>
			</div>
		</div>
	);
};

export default ServiceCard2;
