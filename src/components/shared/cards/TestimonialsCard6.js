const TestimonialsCard6 = ({ testimonial }) => {
	const { authorName, authorDesig, desc, img, logoImg, logoImgLight } =
		testimonial ? testimonial : {};
	return (
		<div className="px-15px py-30px lg:p-30px lg:pt-10  bg-cream-light-color dark:bg-black-color transition-all duration-500 rounded-15px relative z-0 group">
			<div className="text-primary-color-light dark:text-white-color relative z-10">
				<div className="icon-box mb-5 md:mb-10 flex gap-1">
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

				<p className="text-primary-color-light dark:text-body-color-3 text-base sm:text-lg lg:text-xl leading-1.8 sm:leading-1.8 lg:leading-1.8 mb-30px ">
					Taylor is a professional Designer really my business by providing
					value to my business. Taylor is a professional Designer he really
					helps my business by providing value to my business. Taylor is a
					professional.
				</p>
				<div className="flex flex-col gap-15px pt-25px border-t-2 border-body-color dark:border-bg-color-2">
					<div className="flex gap-15px items-center">
						<div className="flex-shrink-0 w-77px h-77px  p-2 border-2 border-body-color dark:border-bg-color-2 rounded-full">
							<img
								className="full h-full object-cover rounded-full"
								src={img}
								alt=""
							/>
						</div>
						<div>
							<h4 className="text-xl md:text-size-22 lg:text-2xl leading-1.2 lg:leading-1.2 text-seondary-color dark:text-white-color mb-1.5">
								{authorName}
							</h4>

							<p className="text-primary-color-light dark:text-body-color ">
								{authorDesig}
							</p>
						</div>
					</div>
					<div className="flex-shrink-0 self-end">
						<div className="testimonial-rating pl-90px sm:pl-0">
							<div className="star-ratings relative text-base  tracking-[5px] sm:tracking-[8px] lg:tracking-[5px] xl:tracking-[8px] leading-none text-transparent stroke-[1px] drop-shadow-[1px_1px_0_var(--tj-theme-primary)]  stroke-primary-color mb-1.5 ">
								<div
									className="fill-ratings absolute top-0 left-0 z-1 overflow-hidden text-primary-color "
									style={{ width: "86%" }}
								>
									<span className="inline-block">★★★★★</span>
								</div>
								<div className="empty-ratings block z-0 text-black-color">
									<span className="inline-block">★★★★★</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TestimonialsCard6;
