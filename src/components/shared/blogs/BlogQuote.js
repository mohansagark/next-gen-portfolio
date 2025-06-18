const BlogQuote = ({ blog }) => {
  const { desc, desc1, author_name } = blog ? blog : {};

  return (
    <div
      className="group relative flex flex-col items-center wow fadeInUp"
      data-wow-delay=".3s"
    >
      <div className="rounded-lg relative overflow-hidden bg-primary-color-light">
        <blockquote
          className={`py-25px px-15px md:p-30px relative block before:content-['\\f10e'] before:block before:text-size-40 before:leading-none before:font-fontawesome before:font-light before:relative before:mb-3`}
        >
          <div className="transition-all duration-500">
            <div className="relative z-0">
              <div className="relative z-10">
                <p className="text-white-color ">{desc}</p>
                <p className="text-white-color mb-15px">{desc1}</p>
                <p className="text-white-color mb-2">
                  <cite className="text-xl relative inline-block before:inline-block before:w-[35px] before:h-0.5 before:bg-primary-color before:rounded-[2px] before:relative before:-top-[6px] before:mr-15px">
                    {author_name}
                  </cite>
                </p>
              </div>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  );
};

export default BlogQuote;
