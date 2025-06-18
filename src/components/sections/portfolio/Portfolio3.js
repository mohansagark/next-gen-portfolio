import PortfolioCard5 from "@/components/shared/cards/PortfolioCard5";
import getPortfolio from "@/libs/getPortfolio";

const Portfolio3 = () => {
	const portfolio = getPortfolio()?.slice(0, 4);
	return (
		<section id="portfolio">
			<div className="pt-90px md:pt-100px xl:pt-30 pb-50px md:pb-70px xl:pb-90px dark:bg-black-color-2 bg-cream-light-color ">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px text-center">
						<h2
							className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 inline-block bg-gradient-text-light dark:bg-gradient-text bg-clip-text leading-1.2 text-transparent wow fadeInUp"
							data-wow-delay=".3s"
						>
							My Recent Works
						</h2>
						<p
							className="uppercase text-seondary-color dark:text-white-color mt-15px wow fadeInUp"
							data-wow-delay="0.5s"
						>
							RECENT PROJECTS
						</p>
					</div>
					{/* <!-- portfolios --> */}
					<div className="relative">
						{/* <!-- portfolio sigle  --> */}

						{portfolio?.length
							? portfolio?.map((portfolioSingle, idx) => (
									<PortfolioCard5 key={idx} portfolio={portfolioSingle} />
							  ))
							: ""}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Portfolio3;
