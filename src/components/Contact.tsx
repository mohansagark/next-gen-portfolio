import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { getContent } from "../data/content";

const LABELS: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
};

const Contact = () => {
  const { socials } = getContent();
  const linkedin = socials.find((s) => s.platform === "linkedin");
  const linkedinHandle =
    linkedin?.url.split("/in/")[1]?.replace(/\/$/, "") || "mohansagark";
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href={linkedin?.url || "https://www.linkedin.com/in/mohansagark/"}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — {linkedinHandle}
              </a>
            </p>
            <h4>Education</h4>
            <p>
              B.Tech, Mechanical Engineering — Vellore Institute of Technology,
              2012–2016
            </p>
            <h4>Certifications</h4>
            <p>React: Software Architecture · AMD: AI Developer</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            {socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                {LABELS[s.platform] ?? s.platform} <MdArrowOutward />
              </a>
            ))}
            <a
              href="https://devmohan.in"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Website <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Portfolio of <br /> <span>Mohan Sagar</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
