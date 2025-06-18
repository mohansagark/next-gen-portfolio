"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PortfolioCard6 = ({ portfolio }) => {
	const themeMode = useSearchParams()?.get("theme_mode");
	const { title, img, id, category } = portfolio ? portfolio : {};
	const isLight = themeMode === "light" ? true : false;
	return (
		<div
			className="tj-project-4-item  w-full md:w-[calc(50%-25px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-63px)] mb-60px xl:mb-20 [&:nth-child(2)]:mt-0 md:[&:nth-child(2)]:-mt-30  overflow-hidden wow zoomIn"
			data-tilt
		>
			<div
				className=" w-full p-18px  bg-cream-light-color dark:bg-bg-color-5 rounded-25px overflow-hidden not-hide-cursor mb-35px"
				data-cursor="View <br> More"
			>
				<Link
					href={`./portfolio/${id}${isLight ? "?theme_mode=light" : ""}`}
					className="w-full cursor-hide rounded-15px overflow-hidden -mb-1.5"
				>
					<img src={img} alt="" className="w-full object-cover h-full  " />
				</Link>
			</div>

			<div>
				<h6 className="text-primary-color font-medium mb-15px">{category}</h6>
				<h3 className="text-size-22 md:text-size-25 lg:text-3xl leading-1.2 lg:leading-1.2 font-semibold">
					<Link
						href={`./portfolio/${id}${isLight ? "?theme_mode=light" : ""}`}
						className="text-primary-color-light dark:text-white-color hover:text-primary-color dark:hover:text-primary-color"
					>
						{" "}
						{title}
					</Link>
				</h3>
			</div>
		</div>
	);
};

export default PortfolioCard6;
