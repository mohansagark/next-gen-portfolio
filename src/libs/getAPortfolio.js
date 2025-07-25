import getPortfolio from "./getPortfolio";

const getAPortfolio = (slugOrId) => {
  const portfolios = getPortfolio();

  // First try to find by slug
  let portfolio = portfolios?.find(({ slug }) => slug === slugOrId);

  // If not found and slugOrId is a number, try to find by ID (backward compatibility)
  if (!portfolio && !isNaN(slugOrId)) {
    portfolio = portfolios?.find(({ id }) => parseInt(slugOrId) === id);
  }

  return portfolio || {};
};

export default getAPortfolio;
