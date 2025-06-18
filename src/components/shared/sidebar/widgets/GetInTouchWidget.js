import React from "react";

const GetInTouchWidget = () => {
  return (
    <div
      className="px-15px md:px-25px py-30px bg-cream-light-color dark:bg-primary-color-light rounded-lg wow fadeInUp"
      data-wow-delay=".3s"
    >
      <form>
        <h3 className="mb-25px text-primary-color dark:text-white-color uppercase relative z-0 text-size-lg md:text-xl font-bold">
          Get in Touch
        </h3>
        <div className="flex flex-col gap-10px">
          {/* <!-- name --> */}
          <div>
            <input
              type="text"
              placeholder="Name"
              className="text-white-color w-full px-5 py-14px border border-gray-color-3 bg-cream-light-color dark:bg-black-color focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
            />
          </div>
          {/* <!-- name --> */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="text-white-color w-full px-5 py-14px border border-gray-color-3 bg-cream-light-color dark:bg-black-color focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
            />
          </div>
          <div>
            <textarea
              cols="1"
              rows="10"
              placeholder="Your Message"
              className="text-white-color w-full px-5 py-14px border border-gray-color-3 bg-cream-light-color dark:bg-black-color focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
            />
          </div>
          <div className="sm:col-start-1 sm:col-span-2">
            <button
              type="submit"
              className="text-size-15 font-bold text-white-color capitalize py-17px px-35px bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full leading-1 transition-all duration-300 w-full text-center"
            >
              Send Message
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GetInTouchWidget;
