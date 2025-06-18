"use client";
import PortfolioCard6 from "@/components/shared/cards/PortfolioCard6";
import getPortfolio from "@/libs/getPortfolio";
import portfolioGrid from "@/libs/portfolioGrid";
import { useEffect } from "react";

const Portfolio4 = () => {
	const portfolio = getPortfolio()?.slice(0, 4);
	useEffect(() => {
		portfolioGrid();
	}, []);
	return (
		<section
			id="portfolio"
			className="relative after:absolute after:top-1/2 after:-translate-y-1/2 after:right-5 after:w-650px after:h-550px after:blur-[150px] after:rounded-50% after:bg-gradient-circle-2 after:-z-1  after:translate-x-1/2 after:opacity-60 "
		>
			<div className="pt-60px md:pt-100px lg:pt-30">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px ">
						<div className="mb-25px  ">
							<span
								className="text-xs  uppercase py-10px px-5 bg-primary-color dark:bg-seondary-color text-white-color rounded-full font-semibold relative inline-block  wow fadeInRight"
								data-wow-delay=".3s"
							>
								Project
							</span>
						</div>
						<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 inline-block text-seondary-color dark:text-white-color leading-1.2 tj-char-animation font-medium ">
							Case Studies
						</h2>
					</div>
					{/* <!-- portfolios --> */}
					<div className="flex flex-wrap tj-project-4-wrappper pt-0 md:pt-30">
						{portfolio?.length
							? portfolio?.map((portfolioSingle, idx) => (
									<PortfolioCard6 key={idx} portfolio={portfolioSingle} />
							  ))
							: ""}
					</div>

					{/* <!-- view more --> */}
					<div className="flex justify-center">
						<a
							href="#"
							className="text-size-15 font-bold text-white-color capitalize py-17px px-35px bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full leading-1 transition-all duration-300"
						>
							View All Portfolios
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Portfolio4;
