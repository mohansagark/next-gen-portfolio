import portfolioData from "../../public/fakedata/portfolio.json";

const getPortfolio = () => {
  return portfolioData || [];
};

export default getPortfolio;
