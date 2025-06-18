import Link from "next/link";

const Contact3 = () => {
  return (
    <section id="contact">
      <div className=" dark:bg-black-color py-60px md:py-20 lg:py-100px xl:py-30">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-30px">
            {/* <!-- experience single area --> */}
            <div className="lg:col-start-1 lg:col-span-5 xl:col-span-4">
              <div className="mb-10  ">
                <div className="mb-25px  ">
                  <span
                    className="text-xs  uppercase text-primary-color  font-medium relative inline-block tracking-0.2em  wow fadeInUp"
                    data-wow-delay=".3s"
                  >
                    Behind the Pixels
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 font-semibold  leading-1.2 -tracking-0.02em inline-block text-seondary-color dark:text-white-color  mb-4 wow fadeInUp"
                  data-wow-delay=".4s"
                >
                  Let’s Get In Touch
                </h2>
                <p className=" text-base text-body-color-3 leading-1.5 mb-0">
                  I design and code beautifully simple things and i love what i
                  do. Just simple like that!
                </p>
              </div>
              <div className="contact-info-list px-15px py-30px lg:p-30px lg:pb-35px border-2 border-body-color dark:border-bg-color-2  transition-all duration-500 rounded-15px relative z-0 ">
                <ul className="flex flex-col ">
                  <li
                    className="flex  items-center gap-15px pb-30px mb-17px border-b-2 border-body-color dark:border-bg-color-2 last:pb-0 last:mb-0 last:border-b-0 position-relative wow fadeInLeft"
                    data-wow-delay=".4s"
                  >
                    <div className="flex-shrink-0 icon-box text-xl sm:text-size-22 w-50px h-50px sm:w-60px sm:h-60px text-white-color flex justify-center items-center flex-col bg-gradient-primary-2 rounded-full leading-1">
                      <i className="flaticon-phone-call leading-1 mt-1"></i>
                    </div>
                    <div className="text-box">
                      <p className="text-lg mb-10px font-semibold text-primary-color-light dark:text-white-color ">
                        Phone
                      </p>
                      <Link
                        href="tel:0123456789"
                        className="text-primary-color-light dark:text-body-color-3 text-lg  font-normal hover:text-primary-color dark:hover:text-primary-color"
                      >
                        +91 9790427138
                      </Link>
                    </div>
                  </li>
                  <li
                    className="flex  items-center gap-15px pb-30px mb-17px border-b-2 border-body-color dark:border-bg-color-2 last:pb-0 last:mb-0 last:border-b-0 position-relative wow fadeInLeft"
                    data-wow-delay=".5s"
                  >
                    <div className="flex-shrink-0 icon-box text-xl sm:text-size-22 w-50px h-50px sm:w-60px sm:h-60px text-white-color flex justify-center items-center flex-col bg-gradient-primary-2 rounded-full leading-1">
                      <i className="flaticon-mail-inbox-app leading-1 mt-1"></i>
                    </div>
                    <div className="text-box">
                      <p className="text-lg mb-10px font-semibold text-primary-color-light dark:text-white-color ">
                        Email
                      </p>
                      <Link
                        href="mailto:contact@devmohan.in"
                        className="text-primary-color-light dark:text-body-color-3 text-lg  font-normal hover:text-primary-color dark:hover:text-primary-color"
                      >
                        contact@devmohan.in
                      </Link>
                    </div>
                  </li>
                  <li
                    className="flex  items-center gap-15px pb-30px mb-17px border-b-2 border-body-color dark:border-bg-color-2 last:pb-0 last:mb-0 last:border-b-0 position-relative wow fadeInLeft"
                    data-wow-delay=".6s"
                  >
                    <div className="flex-shrink-0 icon-box text-xl sm:text-size-22 w-50px h-50px sm:w-60px sm:h-60px text-white-color flex justify-center items-center flex-col bg-gradient-primary-2 rounded-full leading-1">
                      <i className="flaticon-location leading-1 mt-1"></i>
                    </div>
                    <div className="text-box">
                      <p className="text-lg mb-10px font-semibold text-primary-color-light dark:text-white-color ">
                        Address
                      </p>
                      <Link
                        href="#"
                        className="text-primary-color-light dark:text-body-color-3 text-lg  font-normal hover:text-primary-color dark:hover:text-primary-color"
                      >
                        Hyderabad, Telangana, India
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" lg:col-start-6  lg:col-span-7">
              <div className="wow fadeInRight" data-wow-delay=".3s">
                <form
                  id="contact-form"
                  className="contact px-15px py-30px md:px-5 lg:px-30px lg:py-10 xl:px-10 border-2 border-body-color dark:border-bg-color-2 rounded-15px"
                >
                  {/* <!-- inputs --> */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-30px gap-x-4">
                    {/* <!-- first name --> */}
                    <div className="sm:mb-5">
                      <p className=" mb-15px font-semibold text-primary-color-light dark:text-white-color uppercase ">
                        First Name*
                      </p>
                      <input
                        name="conName"
                        id="conName"
                        type="text"
                        placeholder="First name"
                        className="text-gray-color dark:text-white-color w-full px-5 py-4 border-2 border-body-color dark:border-bg-color-2 focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-body-color dark:placeholder:text-gray-color bg-transparent leading-1"
                      />
                    </div>
                    {/* <!-- Last name --> */}
                    <div className="sm:mb-5">
                      <p className=" mb-15px font-semibold text-primary-color-light dark:text-white-color uppercase ">
                        Last Name*
                      </p>
                      <input
                        name="conLName"
                        id="conLName"
                        type="text"
                        placeholder="Last name"
                        className="text-gray-color dark:text-white-color w-full px-5 py-4 border-2 border-body-color dark:border-bg-color-2 focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-body-color dark:placeholder:text-gray-color bg-transparent leading-1"
                      />
                    </div>
                    {/* <!-- Email address --> */}
                    <div className="sm:mb-5">
                      <p className=" mb-15px font-semibold text-primary-color-light dark:text-white-color uppercase ">
                        Email*
                      </p>
                      <input
                        name="conEmail"
                        id="conEmail"
                        type="email"
                        placeholder="Email address"
                        className="text-gray-color dark:text-white-color w-full px-5 py-4 border-2 border-body-color dark:border-bg-color-2 focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-body-color dark:placeholder:text-gray-color bg-transparent leading-1"
                      />
                    </div>
                    {/* <!-- Phone number --> */}
                    <div className="sm:mb-5">
                      <p className=" mb-15px font-semibold text-primary-color-light dark:text-white-color uppercase ">
                        Phone Name*
                      </p>
                      <input
                        name="conPhone"
                        id="conPhone"
                        type="text"
                        placeholder="Phone number"
                        className="text-gray-color dark:text-white-color w-full px-5 py-4 border-2 border-body-color dark:border-bg-color-2 focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-body-color dark:placeholder:text-gray-color bg-transparent leading-1"
                      />
                    </div>

                    <div className="sm:col-start-1 sm:col-span-2">
                      <p className=" mb-15px font-semibold text-primary-color-light dark:text-white-color uppercase ">
                        Message*
                      </p>
                      <textarea
                        name="conMessage"
                        id="conMessage"
                        cols="1"
                        rows="10"
                        placeholder="Message"
                        className="text-gray-color dark:text-white-color w-full px-5 py-4 border-2 border-body-color dark:border-bg-color-2 focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-body-color dark:placeholder:text-gray-color bg-transparent leading-1"
                      />
                    </div>
                    <div className="sm:col-start-1 sm:col-span-2">
                      <button
                        type="submit"
                        className="text-size-15 font-bold text-white-color capitalize py-5 px-35px bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full inline-flex gap-10px items-center leading-1 transition-all duration-300 group"
                      >
                        Send Message
                        <i className="fa-regular fa-arrow-right transition-all duration-400 -rotate-45 group-hover:rotate-0"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact3;
