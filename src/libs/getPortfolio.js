import { portfolioData } from "../data/adminData";

const getPortfolio = () => {
  return portfolioData || [];
};

export default getPortfolio;
