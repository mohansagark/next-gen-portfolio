import Link from "next/link";

const ButtonDownload = ({ text, path }) => {
	return (
		<div>
			<Link
				href={path ? path : "#"}
				className="text-size-15 font-medium text-white-color capitalize py-17px px-35px  bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full leading-1  text-nowrap tracking-1px group inline-flex gap-x-10px items-center"
			>
				{text ? text : "Download CV"}
				<span className="relative overflow-hidden  ">
					<i className="flaticon-download ml-0.5 text-size-15 group-hover:translate-y-150% transition-all duration-500 inline-block"></i>
					<i className="flaticon-download ml-0.5 text-size-15 absolute left-0 top-0 -translate-y-150% group-hover:translate-y-0 transition-all duration-500"></i>
				</span>
			</Link>
		</div>
	);
};

export default ButtonDownload;
