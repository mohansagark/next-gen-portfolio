"use client";
const MobileMenuController = ({
	setIsActiveMobileMenu,
	isActiveMobileMenu,
}) => {
	return (
		<div className="menu-bar">
			<button
				className={isActiveMobileMenu ? `active` : ""}
				onClick={() => setIsActiveMobileMenu(!isActiveMobileMenu)}
			>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	);
};

export default MobileMenuController;
