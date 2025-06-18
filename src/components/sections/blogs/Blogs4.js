"use client";
import ActiveBg1 from "@/components/shared/active-bg/ActiveBg1";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import BlogCard4 from "@/components/shared/cards/BlogCard4";
import bgRevealAnim from "@/libs/bgRevealAnim";
import getBlogs from "@/libs/getBlogs";
import { useEffect } from "react";

const Blogs4 = () => {
	const blogs = getBlogs()
		?.filter(({ isBlogQuote }) => !isBlogQuote)
		?.slice(0, 3);
	useEffect(() => {
		bgRevealAnim();
	}, []);
	return (
		<section id="blog">
			<div className=" pb-60px md:pb-20 lg:pb-30 ">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px flex flex-wrap gap-5 items-end justify-between">
						<div className="max-w-560px ">
							<div className="mb-25px  ">
								<span
									className="text-xs  uppercase text-primary-color  font-semibold relative inline-block tracking-0.2em wow fadeInRight"
									data-wow-delay=".3s"
								>
									Blog & Articles
								</span>
							</div>
							<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  max-w-580px w-full tj-text-invert">
								Read My Recent Blog
							</h2>
						</div>

						<div>
							<ButtonPrimary isIcon={true} href="/blogs">
								More Blog{" "}
							</ButtonPrimary>
						</div>
					</div>
					{/* <!-- Blogs --> */}
					<div className="blog-widget relative z-0  flex flex-col gap-y-30px">
						{blogs?.length
							? blogs?.map((blog, idx) => (
									<BlogCard4 key={idx} blog={blog} idx={idx} />
							  ))
							: ""}

						{/* <!-- bg animation --> */}
						<ActiveBg1 type={"blog"} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Blogs4;
