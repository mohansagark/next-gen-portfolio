"use client";
import { buttonBgAnimation } from "@/libs/bgAnimation";
import { useEffect } from "react";

const filterButtons = [
	{
		name: "All",
		dataFilter: "*",
	},
	{
		name: "UX/UI",
		dataFilter: ".uxui",
	},
	{
		name: "Branding",
		dataFilter: ".branding",
	},
	{
		name: "Apps",
		dataFilter: ".mobile-app",
	},
];
const ButtonGroup = ({ type }) => {
	useEffect(() => {
		buttonBgAnimation();
	}, []);

	return (
		<div className="flex items-center">
			<div
				className={`button-group  ${
					type == 2
						? "button-group--2 dark:bg-primary-color "
						: "dark:bg-black "
				} bg-cream-light-color  filter-button-group rounded-full max-w-400 mx-auto inline-flex items-center justify-center l px-2 py-1 md:py-1.5 relative z-0 wow fadeInUp`}
				data-wow-delay=".5s"
			>
				<div className="active-bg !-z-1"></div>
				{filterButtons.map(({ name, dataFilter }, idx) => (
					<button
						key={idx}
						data-filter={dataFilter}
						className={`text-size-15 px-3 md:px-25px py-10px md:py-3 ${
							type === 2 ? "text-primary-color-light" : "text-primary-color"
						} dark:text-white-color leading-1 ${idx === 0 ? "active" : ""}`}
					>
						{name}
					</button>
				))}
			</div>
		</div>
	);
};

export default ButtonGroup;
