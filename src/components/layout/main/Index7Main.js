import About4 from "@/components/sections/about/About4";
import Blogs3 from "@/components/sections/blogs/Blogs3";
import FunfacTsection2 from "@/components/sections/funfact/FunfacTsection2";
import Hero7 from "@/components/sections/heros/Hero7";
import BrandMarque from "@/components/sections/marquee/BrandMarque";
import FeatureMarque2 from "@/components/sections/marquee/FeatureMarque2";
import Portfolio7 from "@/components/sections/portfolio/Portfolio7";
import Services7 from "@/components/sections/services/Services7";
import Skills3 from "@/components/sections/skills/Skills3";
import Testimonials7 from "@/components/sections/testimonials/Testimonials7";

const Index7Main = () => {
	return (
		<main>
			<Hero7 />
			<About4 />
			<FunfacTsection2 />
			<Services7 />
			<Portfolio7 />
			<FeatureMarque2 type={2} isRotate={true} />
			<Skills3 />
			<Testimonials7 />
			<Blogs3 />
			<BrandMarque type={3} />
		</main>
	);
};

export default Index7Main;
