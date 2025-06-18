import sliceText from "@/libs/sliceText";
import Link from "next/link";

const BlogCard5 = ({ blog, idx }) => {
	const { id, img, title, blogTopList, category, date } = blog ? blog : {};
	const showAbleBlogTopList = blogTopList?.slice(1, 3);

	return (
		<div
			className="group relative flex flex-col items-center wow fadeInUp"
			data-wow-delay={`0.${3 + (idx === 0 ? idx : idx + idx)}s`}
		>
			<div className="p-15px bg-cream-light-color dark:bg-black-color border border-cream-light-color dark:border-border-color-2  backdrop-blur-[40px] rounded-10px relative overflow-hidden w-full">
				<div className="relative ">
					<Link
						href={`/blogs/${id}`}
						className="w-full mb-4 rounded-10px overflow-hidden"
					>
						<img
							src={img}
							alt=""
							className="w-full group-hover:scale-110 transition-all duration-500"
						/>
					</Link>
					<Link
						href="#"
						className="text-size-15  px-10px py-5px leading-1  text-white-color hover:text-white-color  bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full absolute left-4 top-4"
					>
						{idx % 2 ? "Editing" : "Video"}
					</Link>
				</div>
				<div className=" p-15px   transition-all duration-500">
					<div className=" w-full ">
						<div className="relative z-10">
							<ul className="flex gap-4 items-center mb-4">
								<li>
									<Link
										href="#"
										className=" leading-1 text-primary-color-light dark:text-body-color-2 hover:text-primary-color dark:hover:text-primary-color capitalize"
									>
										{category}
									</Link>
								</li>
								<li className="font-medium">
									<span className="text-primary-color-light  dark:text-body-color-2 pl-5  relative transition-all duration-500 before:w-1 before:h-1 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-primary-color-light  dark:before:bg-body-color-2 before:rounded-100% ">
										{date}
									</span>
								</li>
							</ul>
							<h4>
								<Link
									href={`/blogs/${id}`}
									className="text-primary-color-light dark:text-white-color dark:group-hover:text-white-color w-full  text-size-22 lg:text-2xl font-semibold  leading-1.4 lg:leading-1.4 uppercase bg-[0_100%] [background-size:0_1px] bg-no-repeat bg-gradient-primary-11 hover:[background-size:100%_1px] tracking-0.02em inline duration-500"
								>
									{sliceText(title, 36)}
								</Link>
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogCard5;
