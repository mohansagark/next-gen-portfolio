import About7 from "@/components/sections/about/About7";
import Blogs5 from "@/components/sections/blogs/Blogs5";
import Brands2 from "@/components/sections/brands/Brands2";
import Contact4 from "@/components/sections/contact/Contact4";
import Hero10 from "@/components/sections/heros/Hero10";
import Portfolio10 from "@/components/sections/portfolio/Portfolio10";
import Services9 from "@/components/sections/services/Services9";
import Testimonials7 from "@/components/sections/testimonials/Testimonials7";
import MarqueeSingle2 from "@/components/shared/marquee/MarqueeSingle2";

const Index10Main = () => {
	return (
		<main className="overflow-hidden">
			<Hero10 />
			<MarqueeSingle2 />
			<Services9 />
			<About7 />
			<Brands2 type={2} />
			<Portfolio10 />
			<Testimonials7 type={2} />
			<Contact4 />
			<Blogs5 type={2} />
		</main>
	);
};

export default Index10Main;
