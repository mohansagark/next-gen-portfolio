"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Tags from "../portfolio/Tags";

const PortfolioCard5 = ({ portfolio }) => {
	const themeMode = useSearchParams()?.get("theme_mode");
	const { title, imgLarge, featuredDesc, id, tags, category } = portfolio
		? portfolio
		: {};
	const isLight = themeMode === "light" ? true : false;
	return (
		<div className="max-w-1132px mx-auto lg:sticky lg:top-[108px] pb-30px lg:pb-50px lg:last:pb-30px">
			<div className="rounded-15px flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center gap-35px overflow-hidden px-15px py-30px xl:py-50px xl:pl-35px xl:pr-45px mb-0 md:mb-25px bg-white-color dark:bg-primary-color-light border border-body-color dark:border-seondary-color">
				<div className="lg:max-w-380px">
					<h6 className="text-primary-color font-medium mb-15px">{category}</h6>
					<h3 className="text-size-22 md:text-size-25 lg:text-3xl leading-1.2 lg:leading-1.2 font-semibold mb-5">
						<Link
							href={`./portfolio/${id}${isLight ? "?theme_mode=light" : ""}`}
							className="text-primary-color-light dark:text-white-color hover:text-primary-color dark:hover:text-primary-color"
						>
							{" "}
							{title}
						</Link>
					</h3>

					<p className="text-primary-color-light dark:text-white-color">
						Project was about precision and information. That’s all. Our design
						tem helps clients achieve their marketing Trager and branding that
						appeals to a website
					</p>
					{/* <!-- list --> */}
					<ul className="grid gap-15px mt-10">
						<li className="pl-35px relative before:content-['\f00c'] before:font-fontawesome before:absolute before:left-0 before:top-0 before:text-primary-color-light dark:before:text-white-color before:font-normal">
							<span className="text-primary-color-light dark:text-white-color">
								We provide the most reasonable.
							</span>
						</li>
						<li className="pl-35px relative before:content-['\f00c'] before:font-fontawesome before:absolute before:left-0 before:top-0 before:text-primary-color-light dark:before:text-white-color before:font-normal">
							<span className="text-primary-color-light dark:text-white-color">
								Finish Work Before Deadline.
							</span>
						</li>

						<li className="pl-35px relative before:content-['\f00c'] before:font-fontawesome before:absolute before:left-0 before:top-0 before:text-primary-color-light dark:before:text-white-color before:font-normal">
							<span className="text-primary-color-light dark:text-white-color">
								The certified materials in a timely.
							</span>
						</li>
						<li className="pl-35px relative before:content-['\f00c'] before:font-fontawesome before:absolute before:left-0 before:top-0 before:text-primary-color-light dark:before:text-white-color before:font-normal">
							<span className="text-primary-color-light dark:text-white-color">
								We provide 24/7 on time services
							</span>
						</li>
					</ul>
					{/* <!-- tags --> */}
					<div className="mt-30px mb-100px md:my-30px lg:my-50px ">
						<Tags tags={tags} />
					</div>

					<div>
						<Link
							href={`./portfolio/${id}${isLight ? "?theme_mode=light" : ""}`}
							className="text-primary-color dark:text-white-color leading-1 transition-all duration-300 group inline-flex gap-x-15px items-center"
						>
							View Live Project
							<span className="relative overflow-hidden -rotate-45">
								<i className="fa-regular fa-arrow-right group-hover:translate-x-150% transition-all duration-500 inline-block"></i>
								<i className="fa-regular fa-arrow-right absolute left-0 top-0 -translate-x-150% group-hover:-translate-x-0 transition-all duration-500"></i>
							</span>
						</Link>
					</div>
				</div>
				<div className="p-15px bg-bg-color rounded-10px overflow-hidden w-auto">
					<Image width={2000} height={1000} src={imgLarge} alt="" />
				</div>
			</div>
		</div>
	);
};

export default PortfolioCard5;
