"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import brandImages from "../../../../public/fakedata/brand-marquee.json";
const BrandMarque3 = ({ type }) => {
	return (
		<div className={`tj-roll-section`}>
			<div className={`relative z-0 mask-fade-horizontal-2`}>
				<Swiper
					slidesPerView="auto"
					spaceBetween={20}
					centeredSlides={true}
					speed={4000}
					loop={true}
					freeMode={true}
					allowTouchMove={false}
					autoplay={{
						delay: 0,
					}}
					modules={[Autoplay]}
					className={`tj-marquee tj-marquee--3`}
				>
					{brandImages?.length
						? brandImages?.map(({ darkImg, lightImg }, idx) => (
								<SwiperSlide
									key={idx}
									className="cursor-pointer max-w-full !w-[200px] h-[84px] rounded-10px bg-cream-light-color dark:bg-black-color flex items-center justify-center relative z-0 overflow-hidden after:absolute after:left-0 after:right-0 after:w-full after:h-full after:-z-1 after:opacity-0 after:transition-all after:duration-300 after:bg-200 after:bg-gradient-secondary hover:after:opacity-100 group"
								>
									<div className="max-w-100px md:max-w-full">
										<img
											className={`invert dark:invert-0 w-full transition-all duration-300 group-hover:brightness-100  group-hover:invert-0`}
											src={darkImg ? darkImg : "/img/roll/roll-img8.png"}
											alt="Brand"
										/>
									</div>
								</SwiperSlide>
						  ))
						: ""}
				</Swiper>
			</div>
		</div>
	);
};

export default BrandMarque3;
