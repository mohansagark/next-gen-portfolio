"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PortfolioCard10 = ({ portfolio, idx }) => {
	const themeMode = useSearchParams()?.get("theme_mode");
	const { title, img, id, category } = portfolio ? portfolio : {};
	const isLight = themeMode === "light" ? true : false;
	return (
		<div className="flex flex-col md:flex-row md:[&:nth-child(2n)]:flex-row-reverse  items-center gap-30px lg:gap-60px xl:gap-75px 2xl:gap-40 overflow-hidden  group">
			<div
				className=" branding  p-15px md:p-30px bg-cream-light-color dark:bg-black-color w-full max-w-[645px]  rounded-15px transition-all duration-300 relative wow zoomIn"
				data-wow-delay=".3s"
				data-tilt
			>
				<Link
					href={`./portfolio/${id}${isLight ? "?theme_mode=light" : ""}`}
					className=" rounded-15px overflow-hidden"
				>
					<img src={img} className="transition-all duration-400" alt="" />
				</Link>
			</div>

			<div className="w-full max-w-[500px] wow fadeInUp" data-wow-delay=".3s">
				<div>
					<h6 className="text-size-70 md:text-size-75 lg:text-size-100 xl:text-124 font-bold transition-all duration-300 [-webkit-text-fill-color:transparent] [-webkit-text-stroke:1px_var(--primary-color)] dark:[-webkit-text-stroke:1px_var(--bg-color-2)] group-hover:[-webkit-text-stroke:1px_var(--primary-color)] dark:group-hover:[-webkit-text-stroke:1px_var(--primary-color)] opacity-30 dark:opacity-100 group-hover:opacity-100 mb-10px lg:mb-15px xl:mb-25px leading-1">
						0{idx + 1}.
					</h6>
					<h4 className="block text-3xl md:text-size-32 lg:text-size-40 xl:text-size-44  text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color   font-bold leading-1.2 tracking-0.02em uppercase  mb-4 lg:mb-6">
						<Link
							href={`./portfolio/${id}${isLight ? "?theme_mode=light" : ""}`}
						>
							{title}
						</Link>
					</h4>

					<p className="block text-primary-color-light dark:text-white-color mb-5">
						I break down complex user the experience problems the create
						integrity focused to solutions that’s connect.
					</p>
				</div>

				<Link
					href={`./portfolio/${id}${isLight ? "?theme_mode=light" : ""}`}
					className="flex-shrink-0 text-size-25px w-50px h-50px lg:w-70px lg:h-70px text-primary-color-light dark:text-white-color group-hover:text-white-color   bg-transparent group-hover:bg-gradient-primary-8 outline-1 outline outline-border-color dark:outline-bg-color-2 group-hover:outline-transparent  dark:group-hover:outline-transparent rounded-100% leading-1 transition-all duration-300  inline-flex justify-center items-center"
				>
					<span className="relative overflow-hidden -rotate-45">
						<i className="fa-regular fa-arrow-right  text-lg group-hover:translate-x-150% transition-all duration-500 inline-block"></i>
						<i className="fa-regular fa-arrow-right absolute left-0 top-0 -translate-x-150% text-lg group-hover:-translate-x-0 transition-all duration-500"></i>
					</span>
				</Link>
			</div>
		</div>
	);
};

export default PortfolioCard10;
