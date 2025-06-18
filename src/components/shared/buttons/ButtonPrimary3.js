import Link from "next/link";

const ButtonPrimary3 = ({ url, children }) => {
	return (
		<Link
			href={url ? url : "#"}
			className="text-size-15 font-semibold text-white-color capitalize py-4 px-30px bg-primary-color rounded-full leading-1 transition-all duration-300 group inline-flex gap-x-15px items-center"
		>
			{children}
			<span className="relative overflow-hidden -rotate-45">
				<i className="fa-regular fa-arrow-right group-hover:translate-x-150% transition-all duration-500 inline-block"></i>
				<i className="fa-regular fa-arrow-right absolute left-0 top-0 -translate-x-150% group-hover:-translate-x-0 transition-all duration-500"></i>
			</span>
		</Link>
	);
};

export default ButtonPrimary3;
