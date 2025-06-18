"use client";

import BrandMarque3 from "../marquee/BrandMarque3";

const Brands2 = ({ type }) => {
	return (
		<div
			className={`${
				type == 2 ? " pt-60px md:pt-20 lg:pt-30 " : ""
			} overflow-x-hidden dark:bg-primary-color-light wow fadeInUp`}
			data-wow-delay=".3s"
		>
			<div className="text-center mb-50px md:mb-60px after:w-full after:h-1px after:bg-body-color dark:after:bg-dark-color-2 after:absolute after:top-1/2 after:left-0 after:-translate-y-1/2 relative z-0 after:-z-1 ">
				<p className="text-size-13 sm:text-base font-semibold uppercase inline-block px-6 bg-white-color dark:bg-primary-color-light text-seondary-color dark:text-white-color">
					<span className="text-primary-color">100+</span> Trusted Clients Over
					the world
				</p>
			</div>
			<BrandMarque3 />
		</div>
	);
};

export default Brands2;
