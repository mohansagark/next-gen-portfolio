import Link from "next/link";

const Button2 = ({ children, url, className }) => {
	return (
		<Link
			href={url ? url : "#"}
			className="text-size-15 font-medium text-primary-color dark:text-white-color  dark:hover:text-white capitalize py-17px px-35px bg-200 bg-transparent hover:bg-primary-color hover:text-white-color rounded-full leading-1 border border-primary-color dark:border-white-color dark:hover:border-primary-color text-nowrap tracking-1px"
		>
			{" "}
			{children ? children : ""}
		</Link>
	);
};

export default Button2;
