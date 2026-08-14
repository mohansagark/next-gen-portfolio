"use client";

import HomeHero from "@/components/sections/home/HomeHero";
import HomeCredibility from "@/components/sections/home/HomeCredibility";
import HomeCapabilities from "@/components/sections/home/HomeCapabilities";
import HomeWork from "@/components/sections/home/HomeWork";
import HomeExperience from "@/components/sections/home/HomeExperience";
import HomeTestimonials from "@/components/sections/home/HomeTestimonials";
import HomeWriting from "@/components/sections/home/HomeWriting";
import HomeAbout from "@/components/sections/home/HomeAbout";
import HomeContact from "@/components/sections/home/HomeContact";

const IndexMain = () => {
  return (
    <main id="main">
      <HomeHero />
      <HomeCredibility />
      <HomeCapabilities />
      <HomeWork />
      <HomeExperience />
      <HomeTestimonials />
      <HomeWriting />
      <HomeAbout />
      <HomeContact />
    </main>
  );
};

export default IndexMain;
