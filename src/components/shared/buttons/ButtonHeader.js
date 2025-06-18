import Link from "next/link";

const ButtonHeader = () => {
	return (
		<div>
			<Link
				href="#contact"
				className="text-size-15 font-bold text-white-color capitalize py-17px px-30px bg-primary-color rounded-full leading-1 transition-all duration-300 group inline-flex gap-x-10px items-center"
			>
				Hire me!
				<span className="relative overflow-hidden -rotate-45">
					<i className="fas fa-arrow-right group-hover:translate-x-150% transition-all duration-500 inline-block"></i>
					<i className="fas fa-arrow-right absolute left-0 top-0 -translate-x-150% group-hover:-translate-x-0 transition-all duration-500"></i>
				</span>
			</Link>
		</div>
	);
};

export default ButtonHeader;
