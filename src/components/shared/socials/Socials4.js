const Socials4 = ({ type }) => {
	return (
		<ul
			className={`flex items-center gap-x-5 ${
				type === 2 ? "justify-center mb-10 md:mb-50px" : " "
			}`}
		>
			<li>
				<a
					href="https://www.facebook.com"
					className={`text-primary-color hover:text-body-color border ${
						type == 2
							? "border-primary-color dark:border-seondary-color"
							: "border-primary-color"
					} w-35px h-35px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-primary-color hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full`}
				>
					<i className="fab fa-facebook-f"></i>
				</a>
			</li>
			<li>
				<a
					href="https://www.linkedin.com"
					className={`text-primary-color hover:text-body-color border ${
						type == 2
							? "border-primary-color dark:border-seondary-color"
							: "border-primary-color"
					} w-35px h-35px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-primary-color hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full`}
				>
					<i className="fa-brands fa-linkedin-in"></i>
				</a>
			</li>
			<li>
				<a
					href="https://www.github.com"
					className={`text-primary-color hover:text-body-color border ${
						type == 2
							? "border-primary-color dark:border-seondary-color"
							: "border-primary-color"
					} w-35px h-35px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-primary-color hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full`}
				>
					<i className="fa-brands fa-github"></i>
				</a>
			</li>
			<li>
				<a
					href="https://www.basketball.com"
					className={`text-primary-color hover:text-body-color border ${
						type == 2
							? "border-primary-color dark:border-seondary-color"
							: "border-primary-color"
					} w-35px h-35px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-primary-color hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full`}
				>
					<i className="fa-light fa-basketball"></i>
				</a>
			</li>
		</ul>
	);
};

export default Socials4;
