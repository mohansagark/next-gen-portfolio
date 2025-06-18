"use client";
import PortfolioCard10 from "@/components/shared/cards/PortfolioCard10";
import getPortfolio from "@/libs/getPortfolio";

const Portfolio8 = () => {
	const portfolio = getPortfolio()?.slice(0, 4);

	return (
		<section
			id="portfolio"
			className=" relative z-0 after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:w-650px after:h-550px  after:max-w-2/3 after:max-h-2/3 after:blur-[150px] after:rounded-50% after:bg-gradient-circle-2 after:-z-1   after:opacity-60  "
		>
			<div className="pb-60px md:pb-100px lg:pb-30">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px text-center ">
						<div>
							<div className="mb-25px  ">
								<span
									className="text-xs  uppercase text-primary-color  font-semibold relative inline-block tracking-0.2em wow fadeInRight"
									data-wow-delay=".3s"
								>
									Behind the Pixels
								</span>
							</div>
							<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  max-w-580px w-full tj-text-invert">
								Recent work for br MY clients
							</h2>
						</div>
					</div>
					{/* <!-- portfolios --> */}
					<div className="flex flex-col gap-50px md:gap-0  ">
						{portfolio?.length
							? portfolio?.map((portfolioSingle, idx) => (
									<PortfolioCard10
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

export default Portfolio8;
