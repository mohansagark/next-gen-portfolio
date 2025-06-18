const TestimonialsCard9 = ({ testimonial }) => {
	const { authorName, authorDesig, desc, img } = testimonial ? testimonial : {};
	return (
		<div className="px-22px py-7 border-2 border-primary-color border-opacity-30  [.swiper-slide-active_&]:border-opacity-100 hover:border-primary-color dark:hover:border-primary-color transition-all duration-500 rounded-15px relative z-0 group">
			<div className="text-primary-color-light dark:text-white-color relative z-10">
				<div className="flex gap-15px items-end flex-wrap justify-between pb-25px mb-25px border-b border-body-color dark:border-bg-color-2 ">
					<div className="flex gap-15px items-center">
						<div className="flex-shrink-0 w-77px h-77px  p-2 border-2 border-body-color dark:border-bg-color-2 rounded-full">
							<img
								className="full h-full object-cover rounded-full"
								src={img}
								alt=""
							/>
						</div>
						<div>
							<h4 className="text-lg md:text-xl text-seondary-color dark:text-white-color mb-1.5">
								{" "}
								{authorName}
							</h4>

							<p className="text-primary-color-light dark:text-body-color text-sm">
								{authorDesig}
							</p>
						</div>
					</div>
					<div className="flex-shrink-0">
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

				<p className="text-primary-color-light dark:text-body-color-3 text-base sm:text-lg lg:text-xl leading-1.5 sm:leading-1.5 lg:leading-1.5  ">
					“Taylor is a professional Designer really helps my business by
					providing value to my business. Taylor is a professional Designer he
					really helps my business by providing value to my business. Taylor is
					a professional. Helps business providing value to my business.
					professional Designer he really helps my business
				</p>
			</div>
		</div>
	);
};

export default TestimonialsCard9;
