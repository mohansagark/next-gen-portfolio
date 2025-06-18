import Image from "next/image";

const TestimonialsCard3 = ({ testimonial }) => {
	const { authorName, authorDesig, desc, img } = testimonial ? testimonial : {};
	return (
		<div className="p-25px bg-white-color dark:bg-primary-color-light rounded-15px relative z-0 group">
			<div className="relative z-10">
				<div className="icon-box mb-25px flex gap-1">
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
				<p className="text-primary-color-light dark:text-body-color mb-35px">
					Taylor is a professional Designer he really helps my business by
					providing value to my business. Taylor is a professional Designer he
					really helps my business by providing value to my business.
				</p>
				<div className="flex gap-15px items-center">
					<div className="flex-shrink-0">
						<Image
							className="w-55px h-55px rounded-full"
							width={1000}
							height={1000}
							src={img}
							alt=""
						/>
					</div>
					<div>
						<h4 className="text-lg text-seondary-color dark:text-white-color mb-1.5">
							{" "}
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

export default TestimonialsCard3;
