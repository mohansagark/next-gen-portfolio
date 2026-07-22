import { PropsWithChildren } from "react";
import ToptalBadge from "./ToptalBadge";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              MOHAN
              <br />
              <span>SAGAR</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>AI &amp; Frontend</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Software</div>
              <div className="landing-h2-2">Engineer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Engineer</div>
              <div className="landing-h2-info-1">Software</div>
            </h2>
          </div>
          <div className="landing-badge">
            <ToptalBadge />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
