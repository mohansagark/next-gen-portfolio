import BlogCard from "@/components/shared/cards/BlogCard";
import getBlogs from "@/libs/getBlogs";

const Blogs1 = () => {
  const blogs = getBlogs()
    ?.filter(({ isBlogQuote }) => !isBlogQuote)
    ?.slice(0, 3);
  return (
    <section>
      <div className="py-60px md:py-20 lg:py-100px xl:py-30">
        <div className="container">
          {/* <!-- section heading --> */}
          <div className="text-center flex flex-col items-center mb-10 md:mb-50px">
            <h2
              className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 bg-gradient-text-light dark:bg-gradient-text bg-clip-text xl:leading-1.2 text-transparent mb-15px wow fadeInUp"
              data-wow-delay=".3s"
            >
              Recent Blogs
            </h2>
            <p
              className="text-primary-color-light dark:text-body-color max-w-700px wow fadeInUp"
              data-wow-delay=".4s"
            >
              We put your ideas and thus your wishes in the form of a unique web
              project that inspires you and you customers.
            </p>
          </div>
          {/* <!-- blogs --> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-30px 2xl:gap-35px">
            {blogs?.length
              ? blogs?.map((blog, idx) => <BlogCard key={idx} blog={blog} />)
              : ""}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs1;
