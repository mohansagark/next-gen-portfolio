const TestimonialsCard7 = ({ testimonial, type }) => {
	const {
		authorName,
		authorDesig,
		desc,
		img,
		logoImg,
		logoImgLight,
		thumbImg,
	} = testimonial ? testimonial : {};
	return (
		<div
			className={`flex flex-wrap md:flex-nowrap items-center gap-x-50px gap-y-10 px-5 py-30px md:px-30px ${
				type === 2
					? "bg-cream-light-color dark:bg-black-color  border border-transparent dark:border-bg-color-2"
					: "bg-white-color dark:bg-bg-color-6"
			} backdrop-blur-[40px]  transition-all duration-500 rounded-15px relative z-0 group`}
		>
			<div className="w-full  md:max-w-300px lg:max-w-475px md:h-full xl:h-[385px] flex-shrink-0 rounded-15px  overflow-hidden">
				<img className="w-full object-cover" src={thumbImg} alt="" />
			</div>
			<div className="text-primary-color-light dark:text-white-color relative z-10 flex-grow">
				<div className="icon-box mb-5 md:mb-30px flex gap-1">
					<svg
						width="22"
						height="22"
						viewBox="0 0 22 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="transition-all duration-300"
					>
						<path
							d="M0.105431 2.18998C0.0301532 0.988687 1.02531 -0.00647222 2.2266 0.0688056L19.4961 1.15097C21.2148 1.25867 22.0029 3.34358 20.7852 4.56127L4.5979 20.7486C3.3802 21.9663 1.2953 21.1781 1.1876 19.4594L0.105431 2.18998Z"
							fill="url(#paint6_linear_263_514)"
							className="fill-primary-color"
						></path>
						<defs>
							<linearGradient
								x1="-0.0363755"
								y1="-0.0729998"
								x2="35.3333"
								y2="-0.0729991"
								gradientUnits="userSpaceOnUse"
							>
								<stop offset="1" stopColor="var(--tj-theme-primary)"></stop>
								<stop offset="1" stopColor="#140C1C" stopOpacity="0"></stop>
							</linearGradient>
						</defs>
					</svg>
					<svg
						width="22"
						height="22"
						viewBox="0 0 22 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="transition-all duration-300 ml-1"
					>
						<path
							d="M0.105431 2.18998C0.0301532 0.988687 1.02531 -0.00647222 2.2266 0.0688056L19.4961 1.15097C21.2148 1.25867 22.0029 3.34358 20.7852 4.56127L4.5979 20.7486C3.3802 21.9663 1.2953 21.1781 1.1876 19.4594L0.105431 2.18998Z"
							fill="url(#paint7_linear_263_515)"
							className="fill-primary-color"
						></path>
						<defs>
							<linearGradient
								x1="-0.0363755"
								y1="-0.0729998"
								x2="35.3333"
								y2="-0.0729991"
								gradientUnits="userSpaceOnUse"
							>
								<stop offset="1" stopColor="var(--tj-theme-primary)"></stop>
								<stop offset="1" stopColor="#140C1C" stopOpacity="0"></stop>
							</linearGradient>
						</defs>
					</svg>
				</div>

				<p className="text-primary-color-light dark:text-body-color-3 text-base  lg:text-2xl leading-1.5 sm:leading-1.5 lg:leading-1.5 mb-25px ">
					Taylor is a professional Designer really my business by providing
					value to my business. Taylor is a professional Designer he really
					helps my business by providing value to my business. Taylor is a
					professional.
				</p>
				<div>
					<div>
						<h4 className="text-lg md:text-xl text-seondary-color dark:text-white-color mb-1.5">
							{authorName}
						</h4>

						<p className="text-primary-color-light dark:text-body-color text-sm">
							{authorDesig}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TestimonialsCard7;
