const HeadingPrimary = ({ children, className }) => {
	return (
		<h2
			className={`text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 bg-gradient-text-light dark:bg-gradient-text bg-clip-text xl:leading-1.2 text-transparent mb-15px wow fadeInUp ${
				className ? className : ""
			}`}
			data-wow-delay=".3s"
		>
			{children ? children : ""}
		</h2>
	);
};

export default HeadingPrimary;
