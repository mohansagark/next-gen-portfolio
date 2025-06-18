import Link from "next/link";

const Socials6 = () => {
	return (
		<ul className=" hidden md:flex lg:hidden xl:flex  gap-x-10px">
			<li>
				<Link
					href="https://www.facebook.com"
					className="text-primary-color dark:text-white-color hover:text-body-color  text-size-13 border border-primary-color dark:border-border-color-3 dark:hover:border-primary-color w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-primary-color hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
				>
					<i className="fab fa-facebook-f"></i>
				</Link>
			</li>
			<li>
				<Link
					href="https://www.linkedin.com"
					className="text-primary-color dark:text-white-color hover:text-body-color  text-size-13 border border-primary-color dark:border-border-color-3 dark:hover:border-primary-color w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-primary-color hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
				>
					<i className="fa-brands fa-linkedin-in"></i>
				</Link>
			</li>
			<li>
				<Link
					href="https://www.github.com"
					className="text-primary-color dark:text-white-color hover:text-body-color  text-size-13 border border-primary-color dark:border-border-color-3 dark:hover:border-primary-color w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-primary-color hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
				>
					<i className="fa-brands fa-github"></i>
				</Link>
			</li>
			<li>
				<Link
					href="https://www.basketball.com"
					className="text-primary-color dark:text-white-color hover:text-body-color  text-size-13 border border-primary-color dark:border-border-color-3 dark:hover:border-primary-color w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-primary-color hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
				>
					<i className="fa-light fa-basketball"></i>
				</Link>
			</li>
		</ul>
	);
};

export default Socials6;
