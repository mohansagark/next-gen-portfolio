import sliceText from "@/libs/sliceText";
import Link from "next/link";

const BlogCard3 = ({ blog, idx }) => {
	const { id, img, title, blogTopList, category, date } = blog ? blog : {};
	const showAbleBlogTopList = blogTopList?.slice(1, 3);

	return (
		<div
			className="tj-blog-7-wrapper   relative wow fadeInUp"
			data-wow-delay={`0.${3 + (idx === 0 ? idx : idx + idx)}s`}
		>
			<div className="tj-blog-7-thumb">
				<Link href={`/blogs/${id}`} className="">
					<img src={img} alt="" className="" />
				</Link>
			</div>

			<div className="tj-blog-7-content">
				<div className="tj-blog-7-meta">
					<span>
						<Link href="#"> {category}</Link>
					</span>
					<span className="date"> {date}</span>
				</div>
				<h4 className="tj-blog-7-title">
					<Link href={`/blogs/${id}`}>{sliceText(title, 50)}</Link>
				</h4>
				<div className="tj-blog-6-button">
					<Link
						href={`/blogs/${id}`}
						className="text-primary-color-light dark:text-white-color  transition-all duration-300  inline-flex gap-x-2 items-center  bg-[0_100%] [background-size:0_1px] bg-no-repeat bg-gradient-primary-11 hover:[background-size:100%_1px] leading-1.5 group/nested "
					>
						Read More
						<span className="relative overflow-hidden -rotate-45">
							<i className="fa-regular fa-arrow-right group-hover/nested:translate-x-150% transition-all duration-500 inline-block"></i>
							<i className="fa-regular fa-arrow-right absolute left-0 top-0 -translate-x-150% group-hover/nested:-translate-x-0 transition-all duration-500"></i>
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default BlogCard3;
