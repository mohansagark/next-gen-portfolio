"use client";
import MarqueeSingle from "@/components/shared/marquee/MarqueeSingle";
const FeatureMarque2 = ({ type, isRotate }) => {
	return (
		<div
			className={`${
				type === 2 || type === 3
					? " py-10px md:pt-30px md:pb-5 xl:pt-50px xl:pb-30px"
					: "dark:bg-black-color pb-90px md:pb-100px xl:pb-30 overflow-x-hidden"
			} ${type === 3 ? "dark:bg-primary-color-light " : ""}`}
		>
			<MarqueeSingle type={type} isRotate={isRotate} />
			<MarqueeSingle
				type={type}
				isRotate={isRotate}
				isRtl={true}
				isBlack={true}
			/>
		</div>
	);
};

export default FeatureMarque2;
