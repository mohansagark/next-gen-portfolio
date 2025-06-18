"use client";
import { createContext, useContext, useEffect, useState } from "react";

const PortfolioRenderContext = createContext(null);
const PortfolioRenderContextProvider = ({ children }) => {
  const [isPortfolio, setIsPortfoio] = useState(false);
  useEffect(() => {
    let portfolio = document.querySelector("#portfolio");
    const checkIsPortfolio = setInterval(() => {
      portfolio = document.querySelector("#portfolio");
    }, 100);
    if (portfolio) {
      clearInterval(checkIsPortfolio);
      setIsPortfoio(true);
    }
  }, []);

  return (
    <PortfolioRenderContext.Provider value={{ isPortfolio }}>
      {children ? children : ""}
    </PortfolioRenderContext.Provider>
  );
};
export const usePortfolioRenderContext = () => {
  const value = useContext(PortfolioRenderContext);
  return value ? value?.isPortfolio : null;
};
export default PortfolioRenderContextProvider;
