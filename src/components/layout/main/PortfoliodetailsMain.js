"use client";
import HeroBreadcarumb from "@/components/sections/heros/HeroBreadcarumb";
import PortfolioDetailsPrimary from "@/components/sections/portfolio-details/PortfolioDetailsPrimary";
import getAPortfolio from "@/libs/getAPortfolio";

import { useParams } from "next/navigation";
const PortfoliodetailsMain = () => {
  const params = useParams();
  const portfolio = getAPortfolio(params?.id);
  const { title } = portfolio || {};
  return (
    <main>
      <HeroBreadcarumb
        title={title ? title : "portfolio Details"}
        text={title ? title : "portfolio Details"}
        actualItem={"Portfolios"}
        path="/#portfolio"
      />
      <PortfolioDetailsPrimary />
    </main>
  );
};

export default PortfoliodetailsMain;
