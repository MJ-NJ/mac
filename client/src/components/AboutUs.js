
import React from 'react';

const AboutUs = () => {
  return (
    <section className="about-us-section">
      <div className="about-us-container">
        <div className="about-us-left">
          <img 
            src="/assets/healthcare-bg.jpg"
            alt="Doctors performing surgery"
            className="about-us-image"
          />
        </div>
        <div className="about-us-right">
          <h4 className="about-us-subtitle">ABOUT US</h4>
          <h1 className="about-us-title">Advanced Breath Analysis for Early TB Detection</h1>
          <p className="about-us-description">
            "Respiro Detect" merges traditional TB diagnostics with advanced
			technology, using a Machine Learning (ML) model developed through
			clustering methods to enhance our Breath Analysis Method. This innovative
			approach detects TB markers in breath samples, offering a non-invasive,
			quick, and accurate diagnosis. By integrating ML with healthcare, we're
			revolutionizing TB detection, enabling early and precise diagnosis. This
			synergy not only streamlines the diagnostic process but also marks a
			significant stride in the global fight against Tuberculosis.
            </p>
          <div className="aboutusicons">
            <div className="icon-card">
              <div className="about-icon">
                <img src="/assets/medical-team.png" alt="Aiding Doctors" />
              </div>
              <h3>Aiding practitioners</h3>
            </div>
            <div className="icon-card">
              <div className="about-icon">
                <img src="/assets/diagnosis.png" alt="Aiding Doctors" />
              </div>
              <h3>Enhancing diagnosis</h3>
            </div>
            <div className="icon-card">
              <div className="about-icon">
                <img src="/assets/microscope.png" alt="Aiding Doctors" />
              </div>
              <h3>Accurate Testing</h3>
            </div>
            <div className="icon-card">
              <div className="about-icon">
                <img src="/assets/protection.png" alt="Aiding Doctors" />
              </div>
              <h3>Empowering healthcare</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
