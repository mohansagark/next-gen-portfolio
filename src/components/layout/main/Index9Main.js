import About6 from "@/components/sections/about/About6";
import Blogs5 from "@/components/sections/blogs/Blogs5";
import Brands2 from "@/components/sections/brands/Brands2";
import Hero9 from "@/components/sections/heros/Hero9";
import FeatureMarque2 from "@/components/sections/marquee/FeatureMarque2";
import Portfolio9 from "@/components/sections/portfolio/Portfolio9";
import Resume5 from "@/components/sections/resume/Resume5";
import Services6 from "@/components/sections/services/Services6";
import Skills4 from "@/components/sections/skills/Skills4";
import Testimonials9 from "@/components/sections/testimonials/Testimonials9";

const Index9Main = () => {
	return (
		<main className="overflow-hidden">
			<Hero9 />
			<Brands2 />
			<Skills4 />
			<About6 />
			<Services6 type={2} />
			<Portfolio9 />
			<FeatureMarque2 type={3} isRotate={true} />
			<Resume5 type={2} title={" MY Background and Achievements"} />
			<Testimonials9 />

			<Blogs5 />
		</main>
	);
};

export default Index9Main;
