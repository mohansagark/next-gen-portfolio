"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const ServiceItem2 = ({ service, idx }) => {
	const { title, shortDesc, id, imgSm } = service ? service : {};
	const themeMode = useSearchParams()?.get("theme_mode");
	const isLight = themeMode === "light" ? true : false;
	return (
		<div
			className={`service-item  py-5 md:py-30px px-15px xl:px-30px  border border-body-color dark:border-bg-color-2 mb-30px [.service-item:last-child]:mb-0   rounded-15px  transition-all duration-300 relative overflow-hidden group wow fadeInUp ${
				id === 1 ? "current" : ""
			}`}
			data-wow-delay={`0.${3 + (idx === 0 ? idx : idx + idx)}s`}
		>
			<div
				className="flex flex-wrap 
							md:flex-nowrap items-center   gap-x-10px gap-y-15px lg:gap-x-5"
			>
				<div
					className=" flex flex-wrap 
								md:flex-nowrap   gap-x-10px gap-y-15px lg:gap-x-5"
				>
					<div className=" w-10  flex-shrink-0">
						<img
							className="w-full group-hover:brightness-0 group-hover:invert  [.service-item.current_&]:brightness-0  [.service-item.current_&]:invert  transition-all duration-300 "
							src={imgSm}
							alt=""
						/>
					</div>

					<div>
						<h4 className="text-xl leading-1.2  text-primary-color [.service-item.current_&]:text-white-color dark:text-white-color mb-15px md:mb-6 lg:mb-15px xl:mb-6 uppercase font-medium transition-all duration-300 ">
							{title ? title : ""}
						</h4>

						<p className="   text-gray-color-2 dark:text-gray-color-2 group-hover:text-white-color [.service-item.current_&]:text-white-color font-normal transition-all duration-300">
							provides clarity about the organization's mission, vision, and
							objectives, ensuring that all team.
						</p>
					</div>
				</div>

				<div className=" flex-shrink-0">
					<div className="text-size-15 md:text-xl w-50px h-50px md:w-70px md:h-70px text-primary-color-light dark:text-white-color [.service-item.current_&]:text-white-color group-hover:text-white-color   bg-transparent group-hover:bg-primary-color outline-1 outline outline-border-color dark:outline-bg-color-2 group-hover:outline-transparent  dark:group-hover:outline-transparent rounded-100% leading-1 md:leading-1  transition-all duration-300  inline-flex justify-center items-center">
						<i className="flaticon-up-right-arrow rotate-0 group-hover:rotate-45 transition-all duration-500 inline-block"></i>
					</div>
				</div>
			</div>

			<Link
				href={`/services/${id}`}
				className="absolute top-0 left-0 w-full h-full bg-transparent"
			></Link>
		</div>
	);
};

export default ServiceItem2;
