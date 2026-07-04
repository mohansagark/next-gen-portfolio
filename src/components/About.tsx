import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I'm a Senior Software Engineer with 9+ years building AI-powered
          products and high-performance frontend systems at scale—specializing in
          LLM integrations, agentic workflows, and real-time interfaces. At
          Invesco I led IVYGPT, an internal AI platform used by 8,000+ users that
          cut report analysis from 30 days to 30 minutes. At Reliance Jio I led 10
          engineers on platforms serving 5M+ users, improving performance ~90%.
          Now at ServiceNow I build agentic AI platforms with React, Next.js,
          Python and Node.
        </p>
      </div>
    </div>
  );
};

export default About;
