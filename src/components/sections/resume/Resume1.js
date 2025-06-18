import getResume from "@/libs/getResume";

const Resume1 = () => {
  const resume = getResume();
  return (
    <section id="credentials">
      <div className="bg-cream-light-color dark:bg-black-color py-60px md:py-20 lg:py-30 ">
        <div className="container">
          <div className="experience grid grid-cols-1 md:grid-cols-2 gap-30px gap-y-50px overflow-hidden">
            {/* <!-- experience single area --> */}
            {resume?.length
              ? resume?.map(({ title, iconName, resumeItems }, idx) => (
                  <div key={idx}>
                    <div
                      className="mb-10 md:mb-50px wow fadeInUp"
                      data-wow-delay={`.${3 + idx}s`}
                    >
                      <h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 bg-gradient-text-light dark:bg-gradient-text bg-clip-text xl:leading-1.2 text-transparent mb-15px">
                        <i className={`${iconName} mr-2`}></i> {title}
                      </h2>
                    </div>
                    {/* <!-- items --> */}
                    <div className="experience-wrapper flex flex-col gap-30px">
                      {resume?.length
                        ? resumeItems?.map(({ title, date, desc }, idx2) => (
                            <div
                              key={3 + idx2}
                              className={`px-15px md:px-30px py-5 bg-white-color dark:bg-primary-color-light rounded-20px relative z-0 group max-w-536px transition-all duration-500 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500 after:z-1 after:bg-gradient-primary after:rounded-20px wow ${
                                idx === 1 ? "fadeInRight" : "fadeInLeft"
                              }  `}
                              data-wow-delay={`.${
                                idx === 0 ? 4 + idx2 : 5 + idx2
                              }s`}
                            >
                              <div className="text-primary-color-light group-hover:text-white-color dark:text-white-color relative z-10 transition-all duration-300">
                                <p className="text-primary-color group-hover:text-white transition-all duration-300 text-size-15 lg:text-xl font-extrabold mb-2">
                                  {date}
                                </p>
                                <h4 className="text-lg md:text-xl lg:text-size-23 2xl:text-size-25 mb-2 uppercase">
                                  {title}
                                </h4>
                                <p className="text-primary-color-light dark:text-body-color group-hover:text-white-color transition-all duration-300">
                                  {desc}
                                </p>
                              </div>
                            </div>
                          ))
                        : ""}
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume1;
