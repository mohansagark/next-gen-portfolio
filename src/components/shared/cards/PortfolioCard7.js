"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PortfolioCard7 = ({ portfolio, type, idx }) => {
	const themeMode = useSearchParams()?.get("theme_mode");
	const { title, img, id, category, dataFilter } = portfolio ? portfolio : {};
	const isLight = themeMode === "light" ? true : false;
	return (
		<div
			className={`portfolio-item ${dataFilter} ${
				type == 2
					? " p-5 md:p-25px lg:p-35px bg-cream-light-color dark:bg-black-color border float-left "
					: "px-15px pt-30px xl:p-35px border-2 "
			} border-body-color dark:border-bg-color-2 rounded-15px group relative `}
		>
			<Link
				href={`./portfolio/${id}${isLight ? "?theme_mode=light" : ""}`}
				className="mb-25px rounded-15px overflow-hidden"
			>
				<img
					src={img}
					className="transition-all duration-400  group-hover:scale-110"
					alt=""
				/>
			</Link>

			<div className="flex items-center gap-25px  justify-between ">
				<div>
					<h4 className="block text-xl text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color   font-bold  mb-1.5">
						<Link
							href={`./portfolio/${id}${isLight ? "?theme_mode=light" : ""}`}
						>
							{title}
						</Link>
					</h4>

					<p className="block text-primary-color-light dark:text-body-color-3">
						Project was about precision and information.
					</p>
				</div>

				<Link
					href={`./portfolio/${id}${isLight ? "?theme_mode=light" : ""}`}
					className="flex-shrink-0 text-size-25px w-60px h-60px text-primary-color-light dark:text-white-color group-hover:text-white-color   bg-transparent group-hover:bg-gradient-primary-8 outline-1 outline outline-body-color dark:outline-bg-color-2 group-hover:border-transparent  rounded-100% leading-1 transition-all duration-300  inline-flex justify-center items-center"
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

export default PortfolioCard7;
