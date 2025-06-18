import Cta1 from "@/components/sections/cta/Cta1";
import Faq1 from "@/components/sections/faq/Faq1";
import Hero3 from "@/components/sections/heros/Hero3";
import FeatureMarque from "@/components/sections/marquee/FeatureMarque";
import Portfolio3 from "@/components/sections/portfolio/Portfolio3";
import Resume3 from "@/components/sections/resume/Resume3";
import Services3 from "@/components/sections/services/Services3";
import Skills1 from "@/components/sections/skills/Skills1";
import Testimonials3 from "@/components/sections/testimonials/Testimonials3";
import FunFact from "@/components/shared/fun-fact/FunFact";

const Index3Main = () => {
	return (
		<main>
			<Hero3 />
			<FeatureMarque />
			<Services3 />
			<Portfolio3 />
			<FunFact type={2} />
			<Resume3 />
			<Skills1 type={3} subTitle={"Offerd Services"} isNotDesc={true} />
			<Testimonials3 />
			<Faq1 />
			<Cta1 />
		</main>
	);
};

export default Index3Main;
