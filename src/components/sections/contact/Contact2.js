import Socials3 from "@/components/shared/socials/Socials3";
import Link from "next/link";

const Contact2 = () => {
  return (
    <section id="contact">
      <div className="pt-60px md:pt-100px lg:pt-30 pb-20 md:pb-100px">
        <div className="container">
          <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-50px xl:gap-45px 2xl:gap-5 px-5 py-30px xl:p-50px bg-cream-light-color dark:bg-primary-color-light border border-body-color dark:border-seondary-color rounded-15px overflow-hidden">
            {/* <!-- section heading --> */}
            <div>
              <div className="wow fadeInLeft" data-wow-delay=".3s">
                <form className="contact xl:max-w-600px">
                  <div className="mb-25px">
                    <h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 inline-block bg-gradient-text-light dark:bg-gradient-text bg-clip-text leading-1.2 text-transparent mb-15px">
                      Let’s work <br />
                      together!
                    </h2>
                    <p
                      className="text-primary-color-light dark:text-body-color wow fadeInLeft"
                      data-wow-delay=".4s"
                    >
                      I design and code beautifully simple things and i love
                      what i do. Just simple like that!
                    </p>
                  </div>
                  {/* <!-- inputs --> */}
                  <div className="grid grid-cols-1 gap-30px">
                    {/* <!-- first name --> */}
                    <div>
                      <input
                        type="text"
                        placeholder="First name"
                        className="text-white-color w-full py-15px border-b border-gray-color bg-transparent focus:border-primary-color rounded-none outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
                      />
                    </div>
                    {/* <!-- Last name --> */}
                    <div>
                      <input
                        type="text"
                        placeholder="Last name"
                        className="text-white-color w-full py-15px border-b border-gray-color bg-transparent focus:border-primary-color rounded-none outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
                      />
                    </div>
                    {/* <!-- Email address --> */}
                    <div>
                      <input
                        type="email"
                        placeholder="Email address"
                        className="text-white-color w-full py-15px border-b border-gray-color bg-transparent focus:border-primary-color rounded-none outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
                      />
                    </div>
                    {/* <!-- Phone number --> */}
                    <div>
                      <input
                        type="text"
                        placeholder="Phone number"
                        className="text-white-color w-full py-15px border-b border-gray-color bg-transparent focus:border-primary-color rounded-none outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
                      />
                    </div>

                    <div>
                      <textarea
                        cols="1"
                        rows="10"
                        placeholder="Message"
                        className="text-white-color w-full py-15px border-b border-gray-color bg-transparent focus:border-primary-color rounded-none outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="text-size-15 font-semibold text-white-color capitalize py-4 px-30px bg-primary-color rounded-full leading-1 transition-all dur15pxn-300 group inline-flex gap-x-10px items-center"
                      >
                        Send Message
                        <span className="relative overflow-hidden -rotate-45">
                          <i className="fa-regular fa-arrow-right group-hover:translate-x-150% transition-all duration-500 inline-block"></i>
                          <i className="fa-regular fa-arrow-right absolute left-0 top-0 -translate-x-150% group-hover:-translate-x-0 transition-all duration-500"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* <!-- experience single area --> */}
            <div className="max-w-400">
              <p
                className="text-primary-color-light dark:text-body-color wow fadeInRight mb-45px"
                data-wow-delay=".3s"
              >
                I'm currently avaliable to take on new projects, so feel free to
                send me a message about anything that you want to run past me.
                You can contact anytime at 24/7.
              </p>
              <div className="contact-info-list mb-45px">
                <ul className="flex flex-col gap-y-10">
                  <li
                    className="flex flex-wrap items-center gap-25px position-relative wow fadeInRight"
                    data-wow-delay=".4s"
                  >
                    <div className="text-box">
                      <Link
                        href="tel:0123456789"
                        className="text-primary-color-light dark:text-white-color text-lg lg:text-xl font-normal leading-1.4 hover:text-primary-color underline"
                      >
                        +91 9790427138
                      </Link>
                    </div>
                  </li>
                  <li
                    className="flex flex-wrap items-center gap-25px position-relative wow fadeInRight"
                    data-wow-delay=".5s"
                  >
                    <div className="text-box">
                      <Link
                        href="mailto:contact@devmohan.in"
                        className="text-primary-color-light dark:text-white-color text-lg lg:text-xl font-normal leading-1.4 hover:text-primary-color underline"
                      >
                        contact@devmohan.in
                      </Link>
                    </div>
                  </li>
                  <li
                    className="flex flex-wrap items-center gap-25px position-relative wow fadeInRight"
                    data-wow-delay=".6s"
                  >
                    <div className="text-box">
                      <Link
                        href="#"
                        className="text-primary-color-light dark:text-white-color text-lg lg:text-xl font-normal leading-1.4 hover:text-primary-color underline"
                      >
                        Hyderabad, Telangana <br />
                        India
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>

              <Socials3 />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact2;
