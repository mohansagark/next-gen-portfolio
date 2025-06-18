"use client";

import Link from "next/link";
import { useEffect } from "react";

const ButtonPopupVideo = ({ url }) => {
	useEffect(() => {
		import("glightbox").then(({ default: GLightbox }) => {
			const lightbox = GLightbox({
				selector: ".glightbox",
			});
		});
	}, []);
	return (
		<Link
			className="glightbox popup_video  w-60px h-60px bg-primary-color rounded-100% text-white-color absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex justify-center items-center"
			href={url ? url : "https://www.youtube.com/embed/GGf1JjSAKP4"}
		>
			<i className="fa-sharp fa-solid fa-play"></i>
		</Link>
	);
};

export default ButtonPopupVideo;
