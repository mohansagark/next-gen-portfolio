"use client";
import PortfolioCard9 from "@/components/shared/cards/PortfolioCard9";
import getPortfolio from "@/libs/getPortfolio";
import portfolioGrid from "@/libs/portfolioGrid";
import { useEffect } from "react";

const Portfolio7 = () => {
	const portfolio = getPortfolio()?.slice(0, 4);
	useEffect(() => {
		portfolioGrid();
	}, []);
	return (
		<section
			id="portfolio"
			className="relative overflow-hidden after:absolute after:top-1/2 after:-translate-y-1/2 after:right-5 after:w-650px after:h-550px after:blur-[150px] after:rounded-50% after:bg-gradient-circle-2 after:-z-1  after:translate-x-1/2 after:opacity-60 "
		>
			<div className="pt-60px md:pt-100px lg:pt-30">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px max-w-420px ">
						<div className="tj_title_anim mb-25px  ">
							<span className=" text-xs px-3 py-5px rounded-full border  border-border-color-2 text-primary-color  font-semibold tracking-0.2em relative inline-block uppercase">
								Recent works
							</span>
						</div>
						<h2 className="tj_title_anim text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 capitalize font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  ">
							Recent Work for International Clients
						</h2>
					</div>
					{/* <!-- portfolios --> */}
					<div className="flex flex-wrap tj-project-4-wrappper ">
						{portfolio?.length
							? portfolio?.map((portfolioSingle, idx) => (
									<PortfolioCard9
										key={idx}
										portfolio={portfolioSingle}
										idx={idx}
									/>
							  ))
							: ""}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Portfolio7;
