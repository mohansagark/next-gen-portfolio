import Link from "next/link";

const ButtonPrimary = ({ children, type, url, className, isIcon }) => {
	return (
		<Link
			href={url ? url : "#"}
			className={`text-size-15 font-bold text-white-color capitalize py-17px px-35px ${
				type === 2 ? "" : "ml-10px"
			} bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full leading-1 ${className} ${
				isIcon ? "inline-flex gap-10px items-center " : ""
			} transition-all duration-300 group`}
		>
			{children ? children : ""}{" "}
			{isIcon ? (
				<i className="fa-regular fa-arrow-right transition-all duration-400 -rotate-45 group-hover:rotate-0"></i>
			) : (
				""
			)}
		</Link>
	);
};

export default ButtonPrimary;
