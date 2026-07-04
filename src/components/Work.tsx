import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "AI Stock Analysis Bot",
    category: "Automated Stock Market Intelligence",
    tools: "Python, OpenAI GPT, GitHub Actions, Financial APIs",
    image: "/images/stock-bot.png",
    link: "https://github.com/mohansagark/stock-bot",
  },
  {
    title: "Daily Dev Digest",
    category: "AI-Curated Developer Newsletter",
    tools: "Python, Web Scraping, OpenAI, GitHub Actions",
    image: "/images/dev-digest.png",
    link: "https://github.com/mohansagark/daily-dev-digest",
  },
  {
    title: "Portfolio Backend API",
    category: "Authenticated Content Management System",
    tools: "Node.js, Express, JWT, Database",
    image: "/images/backend-service.png",
    link: "https://github.com/mohansagark/next-gen-portfolio-api",
  },
  {
    title: "Modern Portfolio Website",
    category: "Next.js Portfolio with Theme System",
    tools: "Next.js, React, TailwindCSS, Theme System",
    image: "/images/next-gen-portfolio.png",
    link: "https://github.com/mohansagark/next-gen-portfolio",
  },
  {
    title: "Smart Expense Tracker",
    category: "AI-Powered Mobile Expense App",
    tools: "Android Studio, Python, OpenAI, Mobile Development",
    image: "/images/expense-tracker.png",
    link: "https://github.com/mohansagark/ai-expense-tracker",
  },
  {
    title: "React Mini-Games",
    category: "Interactive Browser Games Collection",
    tools: "React, JavaScript, Game Development, Interactive UI",
    image: "/images/react-mini-games.png",
    link: "https://github.com/mohansagark/bitblaze",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.link}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
