"use client";

import dynamic from "next/dynamic";
import HomeHero from "@/components/sections/home/HomeHero";
import HomeCredibility from "@/components/sections/home/HomeCredibility";

/** Code-split below-fold sections but still SSR their HTML into the document. */
const lazy = (loader) => dynamic(loader, { ssr: true });

const HomeCapabilities = lazy(
  () => import("@/components/sections/home/HomeCapabilities"),
);
const HomeWork = lazy(() => import("@/components/sections/home/HomeWork"));
const HomeExperience = lazy(
  () => import("@/components/sections/home/HomeExperience"),
);
const HomeTestimonials = lazy(
  () => import("@/components/sections/home/HomeTestimonials"),
);
const HomeWriting = lazy(() => import("@/components/sections/home/HomeWriting"));
const HomeAbout = lazy(() => import("@/components/sections/home/HomeAbout"));
const HomeContact = lazy(() => import("@/components/sections/home/HomeContact"));

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
