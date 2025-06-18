"use client";
import Link from "next/link";

const PortfolioCard9 = ({ portfolio, idx }) => {
	const { title, img, id, category } = portfolio ? portfolio : {};

	return (
		<div
			className={`tj-project-4-item w-full md:w-[calc(50%-25px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-63px)] mb-10 md:mb-60px xl:mb-20 [&:nth-child(2)]:mt-0 md:[&:nth-child(2)]:-mt-60       overflow-hidden wow ${
				idx === 0
					? "fadeInLeft"
					: idx === 1
					? "fadeInRight"
					: idx === 2
					? "fadeInRight"
					: "fadeInLeft"
			}`}
			data-wow-delay=".3s"
		>
			<div className="portfolio-item branding  p-5 md:p-25px lg:p-35px bg-cream-light-color dark:bg-black-color hover:bg-primary-color-2 dark:hover:bg-seondary-color rounded-30px transition-all duration-300 group relative">
				<Link
					href={`./portfolio/${id}`}
					className="mb-25px rounded-15px overflow-hidden"
				>
					<img src={img} className="transition-all duration-400" alt="" />
				</Link>

				<div className="flex items-center gap-25px  justify-between ">
					<div>
						<h4 className="block text-xl text-seondary-color dark:text-white-color hover:text-primary-color dark:hover:text-primary-color   font-bold  mb-1.5">
							<Link href={`./portfolio/${id}`}>{title}</Link>
						</h4>

						<p className="block text-primary-color-light dark:text-body-color-3">
							Project was about precision and information.
						</p>
					</div>

					<Link
						href={`./portfolio/${id}`}
						className="flex-shrink-0 text-size-25px w-60px h-60px text-primary-color-light dark:text-white-color group-hover:text-white-color   bg-transparent group-hover:bg-gradient-primary-8 outline-1 outline outline-primary-color-2 dark:outline-bg-color-2 group-hover:border-transparent  rounded-100% leading-1 transition-all duration-300  inline-flex justify-center items-center"
					>
						<span className="relative overflow-hidden -rotate-45">
							<i className="fa-regular fa-arrow-right  text-lg group-hover:translate-x-150% transition-all duration-500 inline-block"></i>
							<i className="fa-regular fa-arrow-right absolute left-0 top-0 -translate-x-150% text-lg group-hover:-translate-x-0 transition-all duration-500"></i>
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PortfolioCard9;
