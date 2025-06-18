"use client";

import magicCursor from "@/libs/magicCursor";
import { useEffect } from "react";

const MagicCusror1 = () => {
	useEffect(() => {
		magicCursor();
	}, []);
	return (
		<div id="magic-cursor" className=" ">
			<div id="ball"></div>
		</div>
	);
};

export default MagicCusror1;
