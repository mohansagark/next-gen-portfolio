import PortfolioCard2 from "@/components/shared/cards/PortfolioCard2";
import PortfolioCard3 from "@/components/shared/cards/PortfolioCard3";
import PortfolioCard4 from "@/components/shared/cards/PortfolioCard4";
import getPortfolio from "@/libs/getPortfolio";
import React from "react";

const Portfolio2 = () => {
  const portfolio = getPortfolio()
    ?.filter(({ featured }) => featured)
    ?.slice(0, 3);
  return (
    <section id="portfolio">
      <div className="pt-60px md:pt-100px lg:pt-30">
        <div className="container">
          {/* <!-- section heading --> */}
          <div className="mb-10 md:mb-50px">
            <h2
              className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 inline-block bg-gradient-text-light dark:bg-gradient-text bg-clip-text leading-1.2 text-transparent wow fadeInUp"
              data-wow-delay=".3s"
            >
              Recent Projects
            </h2>
          </div>
          {/* <!-- portfolios --> */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* <!-- portfolio sigle  --> */}

            {portfolio?.length
              ? portfolio?.map((portfolioSingle, idx) =>
                  idx === 0 ? (
                    <PortfolioCard2 key={idx} portfolio={portfolioSingle} />
                  ) : idx === 1 ? (
                    <PortfolioCard3 key={idx} portfolio={portfolioSingle} />
                  ) : (
                    <PortfolioCard4 key={idx} portfolio={portfolioSingle} />
                  )
                )
              : ""}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio2;
