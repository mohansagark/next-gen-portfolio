"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import brandImages from "../../../../public/fakedata/brand-marquee.json";
const BrandMarque = ({ type }) => {
	return (
		<div
			className={`${
				type == 2 ? "" : type === 3 ? "" : "pb-90px md:pb-100px xl:pb-30 "
			} overflow-hidden`}
		>
			<div className={`tj-roll-section`}>
				<div
					className={` relative z-0 after:absolute after:left-0 after:top-0 after:w-full after:h-full after:z-1  after:mask-fade-horizontal ${
						type === 2
							? "bg-cream-light-color dark:bg-black-color after:bg-cream-light-color dark:after:bg-black-color "
							: "bg-primary-color after:bg-primary-color"
					}`}
				>
					<Swiper
						slidesPerView="auto"
						spaceBetween={80}
						centeredSlides={true}
						speed={1500}
						loop={true}
						freeMode={true}
						allowTouchMove={false}
						autoplay={{
							delay: 0,
						}}
						breakpoints={{
							320: {
								spaceBetween: 40,
							},
							768: {
								spaceBetween: 40,
							},
							992: {
								spaceBetween: 40,
							},
							1024: {
								spaceBetween: 80,
							},
						}}
						modules={[Autoplay]}
						className={`tj-marquee tj-marquee--2 ${
							type === 2
								? "py-5 md:py-25px xl:py-30px 2xl:py-60px"
								: "py-3 lg:py-5 xl:py-30px "
						}`}
					>
						{brandImages?.length
							? brandImages?.map(({ darkImg, lightImg }, idx) => (
									<SwiperSlide key={idx} className="max-w-125px sm:max-w-140px">
										<div className="max-w-100px md:max-w-full">
											<img
												className={`w-full  ${
													type == 2 ? "hidden dark:inline-block" : ""
												}`}
												src={darkImg ? darkImg : "/img/roll/roll-img8.png"}
												alt="Brand"
											/>
											{type == 2 ? (
												<img
													className=" w-full inline-block  dark:hidden  "
													src={
														lightImg ? lightImg : "/img/brand/brand-dark-1.png"
													}
													alt="Brand"
												/>
											) : (
												""
											)}
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

export default BrandMarque;
