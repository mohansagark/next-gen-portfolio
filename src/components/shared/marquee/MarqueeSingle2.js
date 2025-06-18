"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import features from "../../../../public/fakedata/feature-marquee";

const MarqueeSingle2 = ({ isRtl, isBlack, type, isRotate }) => {
	return (
		<div className="  relative z-0 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rotate-[-1.09deg] after:bg-bg-color-8 after:-z-1 ">
			<div className={`tj-roll-section relative z-[2]`}>
				<div
					dir={isRtl ? "rtl" : ""}
					className={`${
						isRotate && isRtl
							? " rotate-[-4deg]"
							: isRotate
							? "rotate-[2deg]"
							: ""
					}`}
				>
					<Swiper
						slidesPerView="auto"
						spaceBetween={0}
						centeredSlides={true}
						speed={4000}
						loop={true}
						freeMode={true}
						allowTouchMove={false}
						// disableOnInteraction={true}
						autoplay={{
							delay: 0,
						}}
						modules={[Autoplay]}
						className={`tj-marquee tj-marquee--1  py-25px md:py-[33px] bg-gradient-secondary-2`}
					>
						{features?.length
							? features?.map(({ darkImg, lightImg, title }, idx) => (
									<SwiperSlide key={idx}>
										<div className="roll-icon w-5 mx-30px lg:mx-60px">
											<img
												className={`portal-icon w-full ${
													isRtl
														? "animate-animate-spin"
														: "animate-animate-spin-reverse"
												} `}
												src={darkImg}
												alt="Icon"
											/>
										</div>
										<div className="roll-title">
											<h5
												className={` title md:text-xl font-extrabold uppercase text-white-color`}
											>
												{title}
											</h5>
										</div>
									</SwiperSlide>
							  ))
							: ""}
					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default MarqueeSingle2;
