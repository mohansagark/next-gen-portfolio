"use client";
import Link from "next/link";

const Paginations = ({ paginationDetails }) => {
	const {
		currentItems,
		currentpage,
		setCurrentpage,
		paginationItems,
		currentPaginationItems,
		totalPages,
		handleCurrentPage,
		firstItem,
		lastItem,
	} = paginationDetails;
	return (
		<ul
			className="paginations flex flex-wrap gap-10px md:gap-5 items-center wow fadeInUp"
			data-wow-delay=".3s"
		>
			<li>
				<Link
					href={`#blogs`}
					onClick={e =>
						handleCurrentPage(e, currentpage < 1 ? 0 : currentpage - 1)
					}
					style={{
						visibility: currentpage > 0 ? "visible" : "hidden",
					}}
					className="w-10 h-10 font-medium rounded-full  bg-seondary-color dark:bg-transparent hover:text-white-color hover:bg-primary-color dark:hover:bg-primary-color  dark:text-white-color inline-flex justify-center items-center"
				>
					<i className="fal fa-arrow-left"></i>
				</Link>
			</li>
			{currentPaginationItems?.map((item, idx) => (
				<li key={idx} className={` ${item === currentpage ? "active" : ""}`}>
					<Link
						onClick={e => handleCurrentPage(e, item)}
						href={`#blogs`}
						className="w-10 h-10 font-medium rounded-full  bg-seondary-color dark:bg-transparent hover:text-white-color hover:bg-primary-color dark:hover:bg-primary-color  dark:text-white-color inline-flex justify-center items-center"
					>
						{item + 1}
					</Link>
				</li>
			))}

			<li>
				<Link
					href={`#blogs`}
					onClick={e =>
						handleCurrentPage(
							e,
							currentpage > totalPages - 2 ? totalPages - 1 : currentpage + 1
						)
					}
					style={{
						visibility:
							currentpage < paginationItems?.length - 1 ? "visible" : "hidden",
					}}
					className="w-10 h-10 font-medium rounded-full  bg-seondary-color dark:bg-transparent hover:text-white-color hover:bg-primary-color dark:hover:bg-primary-color  dark:text-white-color inline-flex justify-center items-center"
				>
					<i className="fal fa-arrow-right"></i>
				</Link>
			</li>
		</ul>
	);
};

export default Paginations;
