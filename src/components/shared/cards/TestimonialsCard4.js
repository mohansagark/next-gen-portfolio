const TestimonialsCard4 = ({ testimonial }) => {
	const { authorName, authorDesig, desc, img } = testimonial ? testimonial : {};
	return (
		<div className="px-15px xl:px-30px py-35px xl:py-45px bg-cream-light-color dark:bg-primary-color-light rounded-15px relative z-0 group">
			<div className="relative z-10">
				<div className="mb-5 ">
					<div className="testimonial-rating">
						<div className="star-ratings relative text-base  tracking-[5px] sm:tracking-[8px] lg:tracking-[5px] xl:tracking-[8px] leading-none text-transparent stroke-[1px] drop-shadow-[1px_1px_0_var(--tj-theme-primary)]  stroke-primary-color mb-1.5 ">
							<div
								className="fill-ratings absolute top-0 left-0 z-1 overflow-hidden text-primary-color "
								style={{ width: "80%" }}
							>
								<span className="inline-block">★★★★★</span>
							</div>
							<div className="empty-ratings block z-0 text-black-color">
								<span className="inline-block">★★★★★</span>
							</div>
						</div>
					</div>
				</div>
				<p className="text-primary-color-light dark:text-body-color mb-35px">
					Taylor is a professional Designer he really helps my business by
					providing value to my business. Taylor is a professional Designer he
					really helps my business by providing value to my business.
				</p>
				<div className="flex gap-15px items-center">
					<div className="flex-shrink-0">
						<img className="w-55px h-55px rounded-full" src={img} alt="" />
					</div>
					<div>
						<h4 className="text-lg text-seondary-color dark:text-white-color mb-1.5">
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

export default TestimonialsCard4;
