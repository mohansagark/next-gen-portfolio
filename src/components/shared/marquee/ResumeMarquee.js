"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import marqueeItems from "../../../../public/fakedata/resume-marquee";

const ResumeMarquee = ({ isRtl, isBlack }) => {
	return (
		<div className={`tj-roll-section`}>
			<div dir={isRtl ? "rtl" : ""}>
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
					className={`tj-marquee tj-marquee--1  pb-10 md:pb-20`}
				>
					{marqueeItems?.length
						? marqueeItems?.map(({ darkImg, title }, idx) => (
								<SwiperSlide key={idx}>
									<div className="roll-icon w-35px sm:[w-45px] md:w-[55px] lg:w-70px mx-30px lg:mx-60px">
										<img
											className={`portal-icon w-full animate-animate-spin-reverse `}
											src={darkImg}
											alt="Icon"
										/>
									</div>
									<div className="roll-title">
										<h5
											className={`title text-size-50 sm:text-size-70 md:text-size-80 lg:text-size-100 xl:text-size-120 2xl:text-size-164 font-semibold uppercase bg-gradient-primary-10-light dark:bg-gradient-primary-10 text-transparent  bg-clip-text`}
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
	);
};

export default ResumeMarquee;
