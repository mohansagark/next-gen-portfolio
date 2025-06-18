"use client";

import Link from "next/link";
import { useEffect } from "react";

const BlogPopupVideo = ({ url }) => {
	useEffect(() => {
		import("glightbox").then(({ default: GLightbox }) => {
			const lightbox = GLightbox({
				selector: ".glightbox",
			});
		});
	}, []);
	return (
		<Link
			href={url}
			className="glightbox gpopup_video w-70px h-70px bg-primary-color relative duration-500 bg-opacity-70 hover:bg-opacity-100 rounded-full inline-flex items-center justify-center text-3xl leading-none text-white-color animate-animate-pulse"
		>
			<i className="fa-thin fa-circle-play"></i>
		</Link>
	);
};

export default BlogPopupVideo;
