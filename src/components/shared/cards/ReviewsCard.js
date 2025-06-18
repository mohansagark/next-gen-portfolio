"use client";

import { useEffect } from "react";

const ReviewsCard = () => {
	useEffect(() => {
		var fillRatingsSpan = document.querySelector(".fill-ratings span");
		if (fillRatingsSpan) {
			var starRatingWidth = fillRatingsSpan.offsetWidth;
			var starRatings = document.querySelector(".star-ratings");
			if (starRatings) {
				starRatings.style.width = starRatingWidth + "px";
			}
		}
	}, []);
	return (
		<div className="tj-hero-4-bottom-reviews px-27px py-30px sm:px-30px lg:px-4 xl:px-30px rounded-15px bg-cream-light-color dark:bg-transparent  border border-border-color dark:border-primary-color relative lg:absolute left-0 top-0 lg:top-[118px] xl:left-[-30px]">
			<div className="pb-3 mb-22px border-b border-border-color dark:border-primary-color">
				<p className="text-base sm:text-xl lg:text-base xl:text-xl font-semibold text-seondary-color dark:text-white-color mb-4 leading-1.5 sm:leading-1.75 lg:leading-1.5 xl:leading-1.75">
					Happy Clients | Dribble | Behance
				</p>
			</div>

			<div className="tj-hero-4-bottom-reviews-wrap flex items-center gap-10px">
				<div className="tj-hero-4-bottom-reviews-wrap-thumb">
					<ul className="flex items-center ">
						<li className="-ml-4 first:ml-0">
							<img
								className="w-11 sm:w-55px lg:w-11 xl:w-55px h-11 sm:h-55px lg:h-11 xl:h-55px border-2 border-white-color dark:border-dark-color rounded-100%"
								src="/img/hero/hero-4-review-img1.png"
								alt=""
							/>
						</li>
						<li className="-ml-4 first:ml-0">
							<img
								className="w-11 sm:w-55px lg:w-11 xl:w-55px h-11 sm:h-55px lg:h-11 xl:h-55px border-2 border-white-color dark:border-dark-color rounded-100%"
								src="/img/hero/hero-4-review-img2.png"
								alt=""
							/>
						</li>
						<li className="-ml-4 first:ml-0">
							<img
								className="w-11 sm:w-55px lg:w-11 xl:w-55px h-11 sm:h-55px lg:h-11 xl:h-55px border-2 border-white-color dark:border-dark-color rounded-100%"
								src="/img/hero/hero-4-review-img3.png"
								alt=""
							/>
						</li>
						<li className="-ml-4 first:ml-0">
							<img
								className="w-11 sm:w-55px lg:w-11 xl:w-55px h-11 sm:h-55px lg:h-11 xl:h-55px border-2 border-white-color dark:border-dark-color rounded-100%"
								src="/img/hero/hero-4-review-img4.png"
								alt=""
							/>
						</li>
					</ul>
				</div>
				<div className="tj-hero-4-bottom-reviews-wrap-rating">
					<div className="testimonial-rating">
						<div className="star-ratings relative text-xl sm:text-2xl lg:text-xl xl:text-2xl tracking-[5px] sm:tracking-[8px] lg:tracking-[5px] xl:tracking-[8px] leading-none text-transparent stroke-[1px] drop-shadow-[1px_1px_0_var(--tj-theme-primary)]  stroke-primary-color mb-1.5 ">
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
					<p className="text-seondary-color dark:text-white-color text-sm sm:text-base lg:text-sm xl:text-base">
						200+ 5 star reviews
					</p>
				</div>
			</div>
		</div>
	);
};

export default ReviewsCard;
