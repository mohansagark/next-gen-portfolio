import About1 from "@/components/sections/about/About1";
import Brands1 from "@/components/sections/brands/Brands1";
import Contact2 from "@/components/sections/contact/Contact2";
import Hero2 from "@/components/sections/heros/Hero2";
import Portfolio2 from "@/components/sections/portfolio/Portfolio2";
import Resume2 from "@/components/sections/resume/Resume2";
import Services2 from "@/components/sections/services/Services2";
import Skills1 from "@/components/sections/skills/Skills1";
import Testimonials2 from "@/components/sections/testimonials/Testimonials2";
import FunFact2 from "@/components/shared/fun-fact/FunFact2";

const Index2Main = () => {
  return (
    <main>
      <Hero2 />
      <FunFact2 />
      <About1 />
      <Services2 />
      <Portfolio2 />
      <Resume2 />
      <Skills1 type={2} />
      <Testimonials2 />
      <Brands1 />
      <Contact2 />
    </main>
  );
};

export default Index2Main;
