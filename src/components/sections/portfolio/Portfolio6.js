"use client";
import PortfolioCard8 from "@/components/shared/cards/PortfolioCard8";
import getPortfolio from "@/libs/getPortfolio";
import portfolioGrid from "@/libs/portfolioGrid";
import { useEffect } from "react";

const Portfolio6 = () => {
	const portfolio = getPortfolio()?.slice(0, 4);
	useEffect(() => {
		portfolioGrid();
	}, []);
	return (
		<section id="portfolio">
			<div className="  py-60px md:py-20 lg:py-30  px-15px">
				<div>
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px ">
						<h1
							className="text-size-45 sm:text-size-75 md:text-size-100 lg:text-size-120 xl:text-size-150 2xl:text-size-175 0 3xl:text-size-210 bg-gradient-text-light dark:bg-gradient-text bg-clip-text text-transparent font-semibold uppercase  leading-1 lg:leading-1 tracking-[-0.03em] text-center wow fadeInUp"
							data-wow-delay=".3s"
						>
							Highlights
						</h1>

						<div></div>
					</div>
				</div>

				<div className=" mx-auto max-w-1210px w-full  ">
					{portfolio?.length
						? portfolio?.map((portfolioSingle, idx) => (
								<PortfolioCard8 key={idx} portfolio={portfolioSingle} />
						  ))
						: ""}
				</div>
			</div>
		</section>
	);
};

export default Portfolio6;
