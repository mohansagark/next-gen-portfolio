import Contact3 from "@/components/sections/contact/Contact3";
import Cta3 from "@/components/sections/cta/Cta3";
import FunfacTsection1 from "@/components/sections/funfact/FunfacTsection1";
import Hero5 from "@/components/sections/heros/Hero5";
import BrandMarque from "@/components/sections/marquee/BrandMarque";
import FeatureMarque2 from "@/components/sections/marquee/FeatureMarque2";
import Portfolio5 from "@/components/sections/portfolio/Portfolio5";
import Resume5 from "@/components/sections/resume/Resume5";
import Services5 from "@/components/sections/services/Services5";
import Skills2 from "@/components/sections/skills/Skills2";
import Testimonials5 from "@/components/sections/testimonials/Testimonials5";

const Index5Main = () => {
	return (
		<main className="overflow-x-hidden">
			<Hero5 />
			<BrandMarque />
			<FunfacTsection1 />
			<Services5 />
			<Portfolio5 />
			<Resume5 />
			<FeatureMarque2 />
			<Skills2 type={2} title="The Tools and Techniques" />
			<Testimonials5 />
			<Contact3 />
			<Cta3 />
		</main>
	);
};

export default Index5Main;
