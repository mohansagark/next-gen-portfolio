import { getContent } from "./contentStore";
import portfolioData from "../../public/fakedata/portfolio.json";

const getPortfolio = () => {
  return getContent("portfolio") || portfolioData || [];
};

export default getPortfolio;
