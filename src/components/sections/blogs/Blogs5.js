"use client";
import BlogCard5 from "@/components/shared/cards/BlogCard5";
import bgRevealAnim from "@/libs/bgRevealAnim";
import getBlogs from "@/libs/getBlogs";
import { useEffect } from "react";

const Blogs5 = ({ type }) => {
	const blogs = getBlogs()
		?.filter(({ isBlogQuote }) => !isBlogQuote)
		?.slice(0, 3);
	useEffect(() => {
		bgRevealAnim();
	}, []);
	return (
		<section>
			<div
				id="blogs"
				className={`dark:bg-primary-color-light pb-60px md:pb-20 lg:pb-100px xl:pb-30 ${
					type == 2 ? "pt-60px md:pt-20 lg:pt-100px xl:pt-30" : ""
				}`}
			>
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px text-center flex flex-col items-center ">
						<div className="mb-25px  ">
							<span
								className={`text-xs  uppercase text-primary-color  font-semibold relative inline-block tracking-0.2em wow ${
									type === 2 ? "fadeInUp" : "fadeInRight"
								}`}
								data-wow-delay={type === 2 ? ".3s" : "0s"}
							>
								Behind the Pixels
							</span>
						</div>
						<h2
							className={`text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color    max-w-580px w-full ${
								type === 2 ? "wow fadeInUp" : "tj-text-invert"
							}`}
							data-wow-delay={type === 2 ? ".4s" : "0s"}
						>
							Read My Recent Blog
						</h2>
					</div>
					{/* <!-- blogs --> */}

					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
						{blogs?.length
							? blogs?.map((blog, idx) => (
									<BlogCard5 key={idx} blog={blog} idx={idx} />
							  ))
							: ""}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Blogs5;
