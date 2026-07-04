import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Software Engineer · AI & Frontend</h4>
                <h5>ServiceNow · Hyderabad</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Leading UX architecture for AI-powered agentic platforms. Built
              reasoning-trace visualizations and a voice-enabled layer on Amazon
              Connect unifying multiple CCaaS providers; contributing to the
              Karuna design system.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Software Engineer</h4>
                <h5>Invesco · Hyderabad</h5>
              </div>
              <h3>2024–25</h3>
            </div>
            <p>
              Led IVYGPT, an AI platform adopted by 8,000+ users that cut report
              analysis from 30 days to 30 minutes (~99%). Built document
              summarization, reusable prompt libraries, and a micro-frontend
              architecture.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>SDE-3 · Senior SWE</h4>
                <h5>Reliance Jio · Bengaluru</h5>
              </div>
              <h3>2022–24</h3>
            </div>
            <p>
              Led 10 engineers on platforms serving 5M+ users. Improved page load
              ~90% (5s → 500ms), lifted digital service sales 55%, and drove
              200,000+ user conversions.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Software Engineer</h4>
                <h5>Zentree Labs · Srikakulam</h5>
              </div>
              <h3>2021–22</h3>
            </div>
            <p>
              Built web and mobile banking apps with React Native and real-time
              monitoring, integrating APIs for reliable data flow across
              distributed systems.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Shell · Bangalore</h5>
              </div>
              <h3>2019–20</h3>
            </div>
            <p>
              Delivered an OTP-based solution that kept ship-maintenance
              operations running through COVID lockdowns, enabling secure remote
              access and business continuity.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>App Development Analyst</h4>
                <h5>Accenture · Bengaluru</h5>
              </div>
              <h3>2017–19</h3>
            </div>
            <p>
              Delivered AT&amp;T projects across 25+ sprints and adopted
              Selenium/UFT automation, cutting regression effort 70%+. Recognized
              as Star Performer at Mobily.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
