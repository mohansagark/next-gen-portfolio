import About2 from "@/components/sections/about/About2";
import Cta2 from "@/components/sections/cta/Cta2";
import Faq2 from "@/components/sections/faq/Faq2";
import Hero4 from "@/components/sections/heros/Hero4";
import FeatureMarque from "@/components/sections/marquee/FeatureMarque";
import Portfolio4 from "@/components/sections/portfolio/Portfolio4";
import Resume4 from "@/components/sections/resume/Resume4";
import Services4 from "@/components/sections/services/Services4";
import Skills2 from "@/components/sections/skills/Skills2";
import Success1 from "@/components/sections/success/Success1";
import Testimonials4 from "@/components/sections/testimonials/Testimonials4";

const Index4Main = () => {
	return (
		<main className="overflow-x-hidden">
			<Hero4 />
			<FeatureMarque type={2} />
			<About2 />
			<Services4 />
			<Portfolio4 />
			<Resume4 />
			<Skills2 />
			<Success1 />
			<Testimonials4 />
			<Faq2 />
			<Cta2 />
		</main>
	);
};

export default Index4Main;
