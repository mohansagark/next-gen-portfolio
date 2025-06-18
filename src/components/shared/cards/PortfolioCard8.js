"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PortfolioCard8 = ({ portfolio }) => {
	const themeMode = useSearchParams()?.get("theme_mode");
	const { title, img2, id, category } = portfolio ? portfolio : {};
	const isLight = themeMode === "light" ? true : false;
	return (
		<div className=" sticky top-[100px] overflow-hidden    rounded-20px mb-30px  md:mb-50px last:mb-0   ">
			<div className=" w-full  overflow-hidden  max-h-[640px] object-cover object-[center_top] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[165px] md:before:h-[250px] lg:before:h-[350px] xl:before:h-[470px] before:bg-gradient-primary-9 before:z-1">
				<img src={img2} className="w-full" alt="" />
			</div>
			<div className="absolute top-[15px] right-[15px] sm:top-[30px] sm:right-[30px] z-[2] ">
				<Link
					href={`./portfolio/${id}${isLight ? "?theme_mode=light" : ""}`}
					className=" text-size-25px w-50px h-50px sm:w-65px sm:h-65px md:w-20 md:h-20 lg:w-100px lg:h-100px text-white-color group-hover:text-white-color   bg-transparent hover:bg-primary-color  border border-body-color dark:border-white-color hover:border-primary-color dark:hover:border-primary-color  rounded-100% leading-1 transition-all duration-300  inline-flex justify-center items-center group"
				>
					<span className="relative overflow-hidden -rotate-45">
						<i className="fa-regular fa-arrow-right  text-xl group-hover:translate-x-150% transition-all duration-500 inline-block"></i>
						<i className="fa-regular fa-arrow-right absolute left-0 top-0 -translate-x-150% text-xl group-hover:-translate-x-0 transition-all duration-500"></i>
					</span>
				</Link>
			</div>
			<div className="absolute bottom-0 left-0 w-full  p-15px md:p-30px flex flex-wrap lg:flex-nowrap items-end gap-15px md:gap-5  justify-between z-[2] ">
				<div>
					<h6 className="text-primary-color mb-10px md:mb-5">{category}</h6>
					<h4 className="text-size-25 sm:text-3xl md:text-size-35 lg:text-size-40 xl:text-size-44 font-semibold  leading-1.2 sm:leading-1.2 -tracking-0.02em inline-block   max-w-580px w-full">
						<Link
							href={`./portfolio/${id}${isLight ? "?theme_mode=light" : ""}`}
							className="text-white-color hover:text-primary-color dark:hover:text-primary-color transition-all duration-[.8s] inline  relative z-0  bg-[0_100%] [background-size:0_2px] bg-no-repeat bg-gradient-primary-3 hover:[background-size:100%_2px]"
						>
							{title}
						</Link>
					</h4>
				</div>
				<ul className="flex items-center gap-10px md:gap-15px">
					<li className="text-gray-color-2  text-sm md:text-base leading-1 md:leading-1 pr-10px md:pr-15px last:pr-0 last:md-pr-0 border-r-2 border-gray-color-2 last:border-r-0">
						Client:
						<span className="font-semibold text-white-color "> Techlobby</span>
					</li>
					<li className="text-gray-color-2  text-sm md:text-base leading-1 md:leading-1 pr-10px md:pr-15px last:pr-0 last:md-pr-0 border-r-2 border-gray-color-2 last:border-r-0">
						Time:
						<span className="font-semibold text-white-color "> 2024</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default PortfolioCard8;
