import "./styles/About.css";
import { getContent } from "../data/content";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">{getContent().bio}</p>
      </div>
    </div>
  );
};

export default About;
