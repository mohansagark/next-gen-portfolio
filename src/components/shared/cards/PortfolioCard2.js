"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Tags from "../portfolio/Tags";

const PortfolioCard2 = ({ portfolio }) => {
	const themeMode = useSearchParams()?.get("theme_mode");
	const { title, featuredImg, featuredDesc, id, tags, employee } = portfolio
		? portfolio
		: {};
	const isLight = themeMode === "light" ? true : false;
	return (
		<div
			className="lg:col-start-1 lg:col-span-12 rounded-15px flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center gap-35px overflow-hidden px-15px py-5 md:p-5 xl:p-5 xl:pl-35px bg-cream-light-color dark:bg-primary-color-light border border-body-color dark:border-seondary-color wow fadeInUp"
			data-wow-delay=".4s"
		>
			<div className="lg:max-w-380px">
				<h6 className="text-primary-color font-medium mb-15px">Social App</h6>
				<h3 className="text-size-22 md:text-size-25 lg:text-3xl leading-1.2 lg:leading-1.2 font-semibold mb-5">
					<Link
						href={`./portfolio/${id}${isLight ? "?theme_mode=light" : ""}`}
						className="text-primary-color-light dark:text-white-color hover:text-primary-color dark:hover:text-primary-color"
					>
						{title}
					</Link>
				</h3>

				<p className="text-primary-color-light dark:text-white-color">
					{featuredDesc}
				</p>
				{/* <!-- tags --> */}
				<div className="my-30px lg:my-50px ">
					<Tags tags={tags} />
				</div>
				<p className="text-primary-color-light dark:text-white-color mb-15px">
					“The service was excellent. Template example is the next killer app.”
				</p>
				{/* <!-- employee --> */}
				<div className="flex gap-25px items-center">
					<div className="flex-shrink-0">
						<Image
							width={2000}
							height={1000}
							className="w-55px h-55px rounded-full"
							src={employee?.img ? employee.img : "/img/project/project-1.png"}
							alt=""
						/>
					</div>
					<div>
						<h6 className="text-sm text-primary-color-light dark:text-white-color font-medium mb-1.5">
							{employee?.name ? employee.name : "Jeremy Doughlas"}
						</h6>
						<p className="text-sm text-gray-color">
							{employee?.desig ? employee.desig : "UI & UX designer"}
						</p>
					</div>
				</div>
			</div>
			<div className="px-25px py-30px bg-bg-color rounded-15px overflow-hidden w-auto">
				<Image width={607} height={472} src={featuredImg} alt="" />
			</div>
		</div>
	);
};

export default PortfolioCard2;
