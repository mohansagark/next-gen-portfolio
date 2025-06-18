"use client";

import Link from "next/link";
import { useEffect } from "react";

const ButtonPopupVideo2 = ({ url }) => {
	useEffect(() => {
		import("glightbox").then(({ default: GLightbox }) => {
			const lightbox = GLightbox({
				selector: ".glightbox",
			});
		});
	}, []);
	return (
		<Link
			href="https://www.youtube.com/embed/GGf1JjSAKP4"
			className="glightbox popup_video  flex-shrink-0 w-[215px] h-[215px] sm:w-70px sm:h-70px md:w-20 md:h-20 xl:w-30 xl:h-120px 2xl:w-[215px] 2xl:h-[215px] relative z-0 text-size-22 md:text-2xl inline-flex justify-center items-center group before:w-full before:h-full before:absolute before:left-0 before:top-0 before:bg-[url('/img/hero/hero-9-play-bg-3.svg')] dark:before:bg-[url('/img/hero/hero-9-play-bg.svg')] before:bg-no-repeat before:bg-contain before:bg-[center_center] before:animate-animate-spin before:-z-1 after after:w-3/4 after:h-3/4 after:rounded-100% after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[url('/img/hero/hero-9-play-bg-2.svg')] after:bg-no-repeat after:bg-contain after:bg-[center_center] after:-z-1"
		>
			<i className="fa-sharp fa-solid fa-play text-white-color group-hover:scale-110 transition-all duration-300"></i>
		</Link>
	);
};

export default ButtonPopupVideo2;
