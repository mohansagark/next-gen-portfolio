import Link from "next/link";

const ServiceCard3 = ({ service, idx }) => {
	const { title, id, iconName } = service || {};
	return (
		<div
			className="rounded-25px relative overflow-hidden p-30px  bg-cream-light-color dark:bg-bg-color-6 backdrop-blur-[40px]  group transition-all duration-500 before:absolute before:left-0 before:top-0 before:rounded-25px before:w-0 before:h-0 before:transition-all before:duration-500 hover:before:w-full hover:before:h-full before:border-t before:border-l before:border-primary-color before:opacity-0 before:invisible hover:before:opacity-100 hover:before:visible    after:absolute after:right-0 after:bottom-0 after:rounded-25px after:w-0 after:h-0 after:transition-all after:duration-500 hover:after:w-full hover:after:h-full after:border-b after:border-r after:border-primary-color after:opacity-0 after:invisible hover:after:opacity-100 hover:after:visible   wow fadeInUp"
			data-wow-delay={`0.${3 + (idx === 0 ? idx : idx + idx)}s`}
		>
			<div className="mb-35px md:mb-75px">
				<span className="w-16 h-16 bg-primary-color rounded-20px inline-flex justify-center items-center leading-1">
					<i
						className={`${iconName} text-size-34 text-white-color  leading-1 inline-flex transition-all duration-500 group-hover:scale-x-[-1]`}
					></i>
				</span>
			</div>

			<div>
				<h3 className="text-xl md:text-size-22 lg:text-2xl xl:text-size-22 2xl:text-2xl mb-15px leading-1.2 lg:leading-1.2 2xl:leading-1.2 font-semibold text-seondary-color dark:text-white-color   ">
					{title}
				</h3>

				<p className="text-primary-color-light dark:text-body-color  mb-0 text-size-15">
					Conducting qualitative and quantitative research to understand user...
				</p>
			</div>
			<Link
				className="absolute top-0 left-0 w-full h-full z-1"
				href={`/services/${id}`}
			></Link>
		</div>
	);
};

export default ServiceCard3;
