"use client";

import { serviceBgAnimation } from "@/libs/bgAnimation";
import { useEffect } from "react";

const ActiveBg1 = ({ type }) => {
	useEffect(() => {
		serviceBgAnimation(
			`${type === "blog" ? type : "services"}-widget`,
			`${type === "blog" ? type : "service"}-item`
		);
	}, [type]);
	return (
		<div
			className={`active-bg wow fadeInUp  ${
				type === "blog" ? "rounded-10px" : "hidden sm:block"
			} ${type === "service-2" ? " rounded-15px !-z-1 " : ""}`}
			data-wow-delay=".3s"
		></div>
	);
};

export default ActiveBg1;
