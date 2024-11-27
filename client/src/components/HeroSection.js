import React from 'react';
import AboutUs from './AboutUs';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Hero = () => {
	const scrollToAboutUs = () => {
		const aboutSection = document.getElementById('about-us');
		if (aboutSection) {
			aboutSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<>
			<section className="hero-section">
				<div className="hero-content">
					<h3 className="hero-subtitle">WELCOME TO SMART BREATH ANALYSIS</h3>
					<h1 className="hero-title">Tuberculosis Testing Simplified</h1>
					<div className="hero-buttons">
						<button className="btn about-us" onClick={scrollToAboutUs}>
							About Us
						</button>
						<Link to="/breathanalysis"><button className="btn test">Test</button></Link>
					</div>
				</div>
				<div className="hero-image">
					<img
						src="/assets/doctor.jpg"
						alt="Doctor"
						style={{ paddingBottom: '20px', height: '755px' }}
					/>
				</div>
			</section>

			{/* AboutUs section with an ID for smooth scrolling */}
			<section id="about-us">
				<AboutUs />
			</section>
			<section id="contact-us">
				<Footer />
			</section>
		</>
	);
};

export default Hero;
