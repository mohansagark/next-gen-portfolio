"use client";
import React, { useEffect } from "react";

const FormSelect = () => {
  useEffect(() => {
    import("../../../libs/nice-select2").then(({ default: NiceSelect }) => {
      new NiceSelect(document.getElementById("conService"));
      //   NiceSelect.bind(document.getElementById("conService"));
    });
  }, []);
  return (
    <select name="conService" id="conService" className="tj-nice-select">
      <option defaultValue={"Choose Service"} disabled>
        Choose Service
      </option>
      <option defaultValue="braning">Branding Design</option>
      <option defaultValue="web">Web Design</option>
      <option defaultValue="uxui">UI/UX Design</option>
      <option defaultValue="app">App Design</option>
    </select>
  );
};

export default FormSelect;
