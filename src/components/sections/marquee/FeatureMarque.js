"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import features from "../../../../public/fakedata/feature-marquee";
const FeatureMarque = ({ type }) => {
	return (
		<section className="pt-20 lg:pt-85px  pb-90px md:pb-100px xl:pb-30 overflow-x-hidden">
			<div className={`tj-roll-section ${type === 2 ? `` : `rotate-[-3deg]`}`}>
				<div className="">
					<Swiper
						slidesPerView="auto"
						spaceBetween={0}
						centeredSlides={true}
						speed={4000}
						loop={true}
						freeMode={true}
						allowTouchMove={false}
						autoplay={{
							delay: 0,
						}}
						modules={[Autoplay]}
						className="tj-marquee  py-30px md:py-10 dark:bg-black-color-2 bg-cream-light-color"
					>
						{features?.length
							? features?.map(({ title, darkImg, lightImg }, idx) => (
									<SwiperSlide key={idx}>
										<div className="roll-icon w-5 mx-30px lg:mx-60px">
											<img
												className="portal-icon w-full animate-animate-spin-reverse hidden dark:inline-block"
												src={darkImg}
												alt="Icon"
											/>
											<img
												className="portal-icon w-full animate-animate-spin-reverse inline-block dark:hidden"
												src={lightImg}
												alt="Icon"
											/>
										</div>
										<div className="roll-title">
											<h5 className="text-primary-color dark:text-white-color title md:text-xl font-extrabold uppercase">
												{title}
											</h5>
										</div>
									</SwiperSlide>
							  ))
							: ""}
					</Swiper>
				</div>
			</div>
		</section>
	);
};

export default FeatureMarque;
