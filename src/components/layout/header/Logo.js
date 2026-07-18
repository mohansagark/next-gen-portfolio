"use client";
import { useHeaderContext } from "@/context_api/HeaderContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = ({ isSticky }) => {
	const { isInnerPage, headerType } = useHeaderContext();
	const [homeHref, setHomeHref] = useState("/");
	useEffect(() => {
		// On the blog subdomain, "/" maps to the blog list — send the logo to the
		// main site instead.
		if (
			typeof window !== "undefined" &&
			window.location.hostname === "blog.devmohan.in"
		) {
			setHomeHref("https://devmohan.in");
		}
	}, []);
	return (
		<Link href={homeHref} className="logo">
			<Image
				className={`${
					headerType === 9 || headerType === 10
						? "w-full max-w-[190px]"
						: "w-15 h-15 "
				} ${
					isInnerPage && !isSticky
						? "inline-block   "
						: " hidden dark:inline-block"
				} `}
				src={
					headerType === 9 || headerType === 10
						? "/img/logo/logo-9.png"
						: "/img/logo/logo.png"
				}
				alt=""
				width={1000}
				height={1000}
			/>
			<Image
				className={`w-15 h-15  ${
					isInnerPage && !isSticky ? "hidden" : "inlin-block dark:hidden"
				}`}
				src="/img/logo/logo-dark.png"
				alt=""
				width={1000}
				height={1000}
			/>
		</Link>
	);
};

export default Logo;
