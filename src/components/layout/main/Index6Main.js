import About3 from "@/components/sections/about/About3";
import Blogs2 from "@/components/sections/blogs/Blogs2";
import Cta4 from "@/components/sections/cta/Cta4";
import Hero6 from "@/components/sections/heros/Hero6";
import BrandMarque from "@/components/sections/marquee/BrandMarque";
import Portfolio6 from "@/components/sections/portfolio/Portfolio6";
import Resume6 from "@/components/sections/resume/Resume6";
import Services6 from "@/components/sections/services/Services6";
import Testimonials6 from "@/components/sections/testimonials/Testimonials6";

const Index6Main = () => {
	return (
		<main>
			<Hero6 />
			<BrandMarque type={2} />
			<About3 />
			<Services6 />
			<Portfolio6 />
			<Resume6 />
			<Testimonials6 />
			<Blogs2 />
			<Cta4 />
		</main>
	);
};

export default Index6Main;
