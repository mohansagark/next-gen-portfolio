import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import BlogCard3 from "@/components/shared/cards/BlogCard3";
import getBlogs from "@/libs/getBlogs";

const Blogs3 = () => {
	const blogs = getBlogs()
		?.filter(({ isBlogQuote }) => !isBlogQuote)
		?.slice(0, 3);
	return (
		<section>
			<div id="blogs" className="py-60px md:py-20 lg:py-100px xl:py-30">
				<div className="container">
					{/* <!-- section heading --> */}
					<div className="mb-10 md:mb-50px xl:mb-60px flex flex-wrap gap-5 items-end justify-between">
						<div className="max-w-560px ">
							<div className="tj_title_anim mb-25px  ">
								<span className=" text-xs px-3 py-5px rounded-full border  border-border-color-2 text-primary-color  font-semibold tracking-0.2em relative inline-block uppercase">
									Blog & Articles
								</span>
							</div>
							<h2 className="tj_title_anim text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 capitalize font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  ">
								Read My Recent Blog
							</h2>
						</div>

						<div className="wow fadeInUp" data-wow-delay=".7s">
							<ButtonPrimary isIcon={true} href="#">
								Explore More{" "}
							</ButtonPrimary>
						</div>
					</div>

					<div className="tj-blog-7-main-wrapper">
						{blogs?.length
							? blogs?.map((blog, idx) => (
									<BlogCard3 key={idx} blog={blog} idx={idx} />
							  ))
							: ""}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Blogs3;
