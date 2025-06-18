const About2 = () => {
  return (
    <section id="about">
      <div className=" pb-20 md:pb-100px xl:pb-30">
        <div className="container">
          {/* <!-- section heading --> */}
          <div
            className="mb-25px  text-center wow fadeInUp"
            data-wow-delay=".3s"
          >
            <span className="text-xs  uppercase py-10px px-5 bg-primary-color dark:bg-seondary-color rounded-full text text-white-colort-semibolinline-block relative  ">
              About
            </span>
          </div>
          <div>
            <p
              className="text-size-22 lg:text-size-32 text-primary-color-light  dark:text-white-color text-center max-w-1120px mx-auto mb-4 wow fadeInUp"
              data-wow-delay=".4s"
            >
              I’m an innovative designer and digital artist in Brisbane{" "}
              <img
                className="w-6 md:w-[33px] inline-block"
                src="/img/about/country.png"
                alt=""
              />{" "}
              I'm on the cutting edge of
              <span className="bg-gradient-primary-5 bg-clip-text text-transparent ">
                no-code tools
              </span>{" "}
              that allow me to bring my creative visions.
            </p>

            <div
              className="flex justify-center wow fadeInUp"
              data-wow-delay=".5s"
            >
              <a
                href="#"
                className="btn-inline relative inline-flex items-center text-primary-color-light dark:text-white-color gap-[8px] pr-[24px] no-underline z-[1] transition-transform duration-300 ease-in-out  overflow-hidden 
            before:content-['\f178'] before:absolute before:top-1/2 before:left-0 before:-translate-x-[105%] hover:before:-translate-x-0  before:-translate-y-1/2 before:font-fontawesome before:text-[16px] before:leading-none before:text-primary-color-light dark:before:text-white-color before:transition-transform before:duration-300 before:ease-in-out 
            after:content-['\f178'] after:absolute after:top-1/2 after:right-0 after:translate-x-0 hover:after:translate-x-full after:left-auto after:-translate-y-1/2 after:font-fontawesome after:text-[16px] after:leading-none after::text-primary-color-light dark:after:text-white-color after:transition-transform after:duration-300 after:ease-in-out group"
              >
                <span className="duration-300 ease-in-out  group-hover:translate-x-6">
                  View my recent works
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About2;
