"use client";
import sliceText from "@/libs/sliceText";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Tags from "../portfolio/Tags";

const PortfolioCard3 = ({ portfolio }) => {
	const themeMode = useSearchParams()?.get("theme_mode");
	const { title, featuredImg, featuredDesc, id, tags, category } = portfolio
		? portfolio
		: {};
	const isLight = themeMode === "light" ? true : false;
	return (
		<div
			className="lg:col-start-1 lg:col-span-7 rounded-15px flex flex-col gap-25px overflow-hidden px-15px py-5 md:p-5 xl:p-5 bg-cream-light-color dark:bg-primary-color-light border border-body-color dark:border-seondary-color wow fadeInUp"
			data-wow-delay=".3s"
		>
			<div className="p-25px pb-0 bg-bg-color rounded-15px overflow-hidden h-auto lg:h-280px xl:h-348px">
				<Image
					width={2000}
					height={1000}
					src={featuredImg}
					className="w-full object-cover"
					alt=""
				/>
			</div>

			<div className="lg:max-w-380px">
				<h6 className="text-primary-color font-medium mb-15px">{category}</h6>
				<h3 className="text-size-22 md:text-size-25 lg:text-3xl leading-1.2 lg:leading-1.2 font-semibold mb-5">
					<Link
						href={`./portfolio/${id}${isLight ? "?theme_mode=light" : ""}`}
						className="text-primary-color-light dark:text-white-color hover:text-primary-color dark:hover:text-primary-color"
					>
						{title}
					</Link>
				</h3>

				<p className="text-primary-color-light dark:text-white-color">
					{sliceText(featuredDesc, 68, true)}
				</p>
				{/* <!-- tags --> */}
				<div className="my-4 ">
					<Tags tags={tags} />
				</div>
			</div>
		</div>
	);
};

export default PortfolioCard3;
