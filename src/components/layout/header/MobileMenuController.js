"use client";

const MobileMenuController = ({
  setIsActiveMobileMenu,
  isActiveMobileMenu,
}) => {
  return (
    <button
      type="button"
      className={`outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 ${
        isActiveMobileMenu ? "active" : ""
      }`}
      aria-label={isActiveMobileMenu ? "Close menu" : "Open menu"}
      aria-expanded={isActiveMobileMenu}
      onClick={() => setIsActiveMobileMenu(!isActiveMobileMenu)}
    >
      <span />
      <span />
    </button>
  );
};

export default MobileMenuController;
