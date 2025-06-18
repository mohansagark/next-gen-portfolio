import Link from "next/link";

const ButtonPrimary2 = ({ url, children }) => {
	return (
		<Link
			href={url ? url : "#"}
			className="text-size-15 font-semibold text-white-color capitalize py-4 px-30px ml-10px bg-primary-color rounded-full leading-1 transition-all duration-300 group inline-flex gap-x-10px items-center"
		>
			{children}{" "}
			<span className="relative overflow-hidden">
				<i className="flaticon-download icon_first group-hover:translate-y-150% transition-all duration-500 inline-block"></i>
				<i className="flaticon-download icon_second absolute left-0 top-0 -translate-y-150% group-hover:-translate-y-0 transition-all duration-500"></i>
			</span>
		</Link>
	);
};

export default ButtonPrimary2;
