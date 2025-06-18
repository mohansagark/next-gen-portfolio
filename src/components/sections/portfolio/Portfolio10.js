"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import PortfolioCard7 from "@/components/shared/cards/PortfolioCard7";
import ButtonGroup from "@/components/shared/portfolio/ButtonGroup";
import filter from "@/libs/filter";
import getPortfolio from "@/libs/getPortfolio";
import { useEffect } from "react";

const Portfolio10 = () => {
	const portfolio = getPortfolio();
	useEffect(() => {
		filter();
	}, []);
	return (
		<section id="portfolio" className="portfolio-filter relative z-0  ">
			<div className="py-60px md:py-100px lg:py-30">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px flex flex-wrap gap-25px lg:gap-5 items-end justify-center lg:justify-between ">
						<div className="max-w-560px text-center lg:text-start">
							<div className="mb-25px   ">
								<span
									className="text-xs  uppercase text-primary-color  font-semibold relative inline-block tracking-0.2em wow fadeInUp"
									data-wow-delay=".3s"
								>
									Behind the Pixels
								</span>
							</div>
							<h2
								className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  max-w-580px w-full wow fadeInUp "
								data-wow-delay=".4s"
							>
								Recent work for MY clients
							</h2>
						</div>
						{/* <!-- controllers --> */}
						<div className="wow fadeInUp " data-wow-delay=".5s">
							<ButtonGroup type={2} />
						</div>
					</div>
					{/* <!-- portfolios --> */}
					<div
						className="portfolio-box portfolio-box--2 mt-10 md:mt-50px wow fadeInUp"
						data-wow-delay=".6s"
					>
						<div className="portfolio-sizer"></div>
						<div className="gutter-sizer"></div>
						{portfolio?.length
							? portfolio?.map((portfolioSingle, idx) => (
									<PortfolioCard7
										key={idx}
										portfolio={portfolioSingle}
										type={2}
										idx={idx}
									/>
							  ))
							: ""}
					</div>
					<div
						className="flex justify-center mt-10px lg:mt-30px wow fadeInUp "
						data-wow-delay=".3s"
					>
						<ButtonPrimary isIcon={true} url="/#contact">
							Know More{" "}
						</ButtonPrimary>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Portfolio10;
