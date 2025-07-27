"use client";
import React, { useEffect } from "react";

const FormSelect = ({ name, value, onChange, required, className }) => {
  useEffect(() => {
    import("../../../libs/nice-select2").then(({ default: NiceSelect }) => {
      new NiceSelect(document.getElementById("conService"));
    });
  }, []);
  return (
    <select
      name={name || "select"}
      id="conService"
      className={`tj-nice-select w-full px-5 py-14px border border-gray-color-3 bg-cream-light-color dark:bg-black-color focus:border-primary-color rounded-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-gray-color leading-1 ${
        className || ""
      }`}
      style={{ width: "100%" }}
      value={value}
      onChange={onChange}
      required={required}
    >
      <option value="">Select an option</option>
      <option value="General Inquiry">General Inquiry</option>
      <option value="Project Proposal">Project Proposal</option>
      <option value="Feedback">Feedback</option>
      <option value="Other">Other</option>
    </select>
  );
};

export default FormSelect;
