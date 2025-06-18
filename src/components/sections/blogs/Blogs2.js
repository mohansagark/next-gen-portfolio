import BlogCard2 from "@/components/shared/cards/BlogCard2";
import getBlogs from "@/libs/getBlogs";

const Blogs2 = () => {
	const blogs = getBlogs()
		?.filter(({ isBlogQuote }) => !isBlogQuote)
		?.slice(0, 3);
	return (
		<section>
			<div id="blogs" className="pb-60px md:pb-20 lg:pb-100px xl:pb-30">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px text-center flex flex-col items-center ">
						<div className="mb-25px  ">
							<span className="text-xs px-3 py-5px rounded-full border  border-border-color-2 text-primary-color  font-semibold tracking-0.02em relative inline-block uppercase">
								Blog & Articles
							</span>
						</div>
						<h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 uppercase font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color    max-w-580px w-full tj-text-invert">
							Read My Recent Blog
						</h2>
					</div>
					{/* <!-- blogs --> */}

					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
						{blogs?.length
							? blogs?.map((blog, idx) => (
									<BlogCard2 key={idx} blog={blog} idx={idx} />
							  ))
							: ""}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Blogs2;
