import React, { useRef, useState } from "react";
import FormSelect from "@/components/shared/Inputs/FormSelect";
import { sendContactEmail } from "@/libs/sendContactEmail";
import getProfile from "@/libs/getProfile";

const Contact1 = () => {
  const profile = getProfile();
  // CMS may return a profile object without a usable location — the fallback in
  // getProfile only kicks in when the whole profile key is missing.
  const location = profile.location?.trim();
  const form = useRef();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_email: "",
    phone: "",
    select: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess(null);
    const mergedFormData = {
      ...formData,
      name: `${formData.first_name} ${formData.last_name}`.trim(),
    };
    sendContactEmail(mergedFormData)
      .then((response) => {
        if (response.ok) {
          setSuccess(true);
          setFormData({
            first_name: "",
            last_name: "",
            user_email: "",
            phone: "",
            select: "",
            message: "",
          });
        } else {
          setSuccess(false);
        }
        setSending(false);
      })
      .catch(() => {
        setSuccess(false);
        setSending(false);
      });
  };

  return (
    <section id="contact">
      <div className="bg-cream-light-color dark:bg-black-color py-60px md:py-20 lg:py-100px xl:py-30">
        <div className="container">
          <div className="flex flex-col-reverse md:grid md:grid-cols-12 md:items-center gap-x-6 gap-y-10 overflow-hidden">
            {/* <!-- section heading --> */}
            <div className="md:col-start-1 md:col-span-7 lg:col-span-6">
              <div className=" wow fadeInLeft" data-wow-delay=".3s">
                <form
                  ref={form}
                  onSubmit={sendEmail}
                  className="contact px-15px py-30px md:px-5 lg:px-30px lg:py-10 xl:px-10 bg-white-color dark:bg-primary-color-light rounded-15px"
                >
                  <div className="mb-25px text-center">
                    <h2 className="text-3xl md:text-size-35 lg:text-size-40 xl:text-size-45 bg-gradient-text-light dark:bg-gradient-text bg-clip-text xl:leading-1.2 text-transparent mb-15px">
                      Let’s work together!
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
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-15px wow fadeInUp"
                    data-wow-delay=".5s"
                  >
                    {/* <!-- first name --> */}
                    <div>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="First name"
                        className="text-white-color w-full px-5 py-14px border border-gray-color-3 bg-cream-light-color dark:bg-black-color focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
                        required
                      />
                    </div>
                    {/* <!-- Last name --> */}
                    <div>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="text-white-color w-full px-5 py-14px border border-gray-color-3 bg-cream-light-color dark:bg-black-color focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
                        required
                      />
                    </div>
                    {/* <!-- Email address --> */}
                    <div>
                      <input
                        type="email"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleChange}
                        placeholder="Email address"
                        className="text-white-color w-full px-5 py-14px border border-gray-color-3 bg-cream-light-color dark:bg-black-color focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
                        required
                      />
                    </div>
                    {/* <!-- Phone number --> */}
                    <div>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        className="text-white-color w-full px-5 py-14px border border-gray-color-3 bg-cream-light-color dark:bg-black-color focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
                        required
                      />
                    </div>
                    {/* FormSelect removed as requested */}
                    <div className="sm:col-start-1 sm:col-span-2">
                      <FormSelect
                        name="select"
                        value={formData.select}
                        onChange={handleChange}
                        options={[
                          "General Inquiry",
                          "Project Request",
                          "Feedback",
                          "Other",
                        ]}
                        className="text-white-color w-full px-5 py-14px border border-gray-color-3 bg-cream-light-color dark:bg-black-color focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1 mb-15px"
                        required
                      />
                    </div>
                    <div className="sm:col-start-1 sm:col-span-2">
                      <textarea
                        name="message"
                        cols="1"
                        rows="10"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Message"
                        className="text-white-color w-full px-5 py-14px border border-gray-color-3 bg-cream-light-color dark:bg-black-color focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1"
                        required
                      />
                    </div>
                    <div className="sm:col-start-1 sm:col-span-2">
                      <button
                        type="submit"
                        className="text-size-15 font-bold text-white-color capitalize py-17px px-35px bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full leading-1 transition-all duration-300"
                        disabled={sending}
                      >
                        {sending ? "Sending..." : "Send Message"}
                      </button>
                      {success === true && (
                        <p className="text-green-500 mt-2">
                          Message sent successfully!
                        </p>
                      )}
                      {success === false && (
                        <p className="text-red-500 mt-2">
                          Failed to send message. Please try again.
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* <!-- experience single area --> */}
            <div className="md:col-start-8 md:col-span-5">
              <div className="contact-info-list">
                <ul className="flex flex-col gap-y-10">
                  <li
                    className="flex  items-center gap-25px position-relative wow fadeInRight"
                    data-wow-delay=".4s"
                  >
                    <div className="icon-box text-xl flex-shrink-0 w-50px h-50px text-white-color flex justify-center items-center flex-col bg-gradient-primary-2 rounded-full leading-1">
                      <i className="flaticon-phone-call leading-1 mt-1"></i>
                    </div>
                    <div className="text-box">
                      <p className="text-primary-color-light dark:text-white-color mb-1">
                        Phone
                      </p>
                      <a
                        href={`tel:${profile.phone.replace(/\s/g, "")}`}
                        className="text-primary-color-light dark:text-white-color text-lg lg:text-xl font-medium hover:text-primary-color"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </li>
                  <li
                    className="flex  items-center gap-25px position-relative wow fadeInRight"
                    data-wow-delay=".5s"
                  >
                    <div className="icon-box text-xl flex-shrink-0 w-50px h-50px text-white-color flex justify-center items-center flex-col bg-gradient-primary-2 rounded-full leading-1">
                      <i className="flaticon-mail-inbox-app leading-1 mt-1"></i>
                    </div>
                    <div className="text-box">
                      <p className="text-primary-color-light dark:text-white-color mb-1">
                        Email
                      </p>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-primary-color-light dark:text-white-color text-lg lg:text-xl font-medium hover:text-primary-color"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </li>
                  {location ? (
                    <li
                      className="flex flex-col gap-4 position-relative wow fadeInRight"
                      data-wow-delay=".6s"
                    >
                      <div className="flex items-center gap-25px">
                        <div className="icon-box text-xl flex-shrink-0 w-50px h-50px text-white-color flex justify-center items-center flex-col bg-gradient-primary-2 rounded-full leading-1">
                          <i className="flaticon-location leading-1 mt-1"></i>
                        </div>
                        <div className="text-box">
                          <p className="text-primary-color-light dark:text-white-color mb-1">
                            Address
                          </p>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              location
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-color-light dark:text-white-color text-lg lg:text-xl font-medium hover:text-primary-color"
                          >
                            {location}
                          </a>
                        </div>
                      </div>
                      <div className="w-full rounded-15px overflow-hidden border-2 border-body-color dark:border-bg-color-2 bg-white-color dark:bg-primary-color-light">
                        <iframe
                          title={`Map of ${location}`}
                          src={`https://www.google.com/maps?q=${encodeURIComponent(
                            location
                          )}&z=12&output=embed`}
                          className="block w-full h-[220px] md:h-[260px] border-0"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          allowFullScreen
                        />
                      </div>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact1;
