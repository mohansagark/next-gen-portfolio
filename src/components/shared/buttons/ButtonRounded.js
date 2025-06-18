"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

const ButtonRounded = () => {
	const buttonRef = useRef(null);

	useEffect(() => {
		const button = buttonRef.current;
		const dot = button.querySelector(".tj-btn-circle-dot");

		const updatePosition = e => {
			const rect = button.getBoundingClientRect();
			const x = e.pageX - rect.left - window.scrollX;
			const y = e.pageY - rect.top - window.scrollY;

			if (dot) {
				dot.style.top = `${y}px`;
				dot.style.left = `${x}px`;
			}
		};

		button.addEventListener("mouseenter", updatePosition);
		button.addEventListener("mouseout", updatePosition);

		return () => {
			button.removeEventListener("mouseenter", updatePosition);
			button.removeEventListener("mouseout", updatePosition);
		};
	}, []);
	return (
		<Link
			href="#"
			className="tj-btn-rounded w-60px h-60px lg:w-20 lg:h-20 xl:w-100px xl:h-100px text-seondary-color dark:text-white-color hover:text-white-color dark:hover:text-white-color bg-transparent border border-body-color dark:border-border-color-5 hover:border-transparent rounded-100% leading-1 transition-all duration-300 inline-flex justify-center items-center relative z-0 overflow-hidden group"
			ref={buttonRef}
		>
			<i className="flaticon-up-right-arrow rotate-0 group-hover:rotate-45 transition-all duration-500 inline-block"></i>

			<div className="tj-btn-circle-dot absolute -bottom-[11px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-[.6s] rounded-100% bg-primary-color -z-1 group-hover:w-[420px] group-hover:h-[420px]"></div>
		</Link>
	);
};

export default ButtonRounded;
