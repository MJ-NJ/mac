import React from 'react';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-section">
					<h3 className="footer-heading">Get in Touch</h3>
					<p className="footer-text">
						Get in touch with us for support and inquiries about Respiro Detect!
					</p>
					<p className="footer-contact">
						<i className="fa fa-map-marker"></i> Thapar Institute of Engineering
						and Technology, Patiala
					</p>
					<p className="footer-contact">
						<i className="fa fa-envelope"></i>  tb.breathanalyser@thapar.edu
					</p>
					<p className="footer-contact">
						<i className="fa fa-phone"></i> +91 7901956472
					</p>
				</div>

				<div className="contact-form">
					<h3 className="contact-heading">Contact us</h3>
					<form action="mailto: tb.breathanalyser@thapar.edu" method="post" encType="text/plain">
						<div class="input-group">
							<input type="text" name="username" placeholder="Username" required />
						</div>
						<div class="input-group">
							<input type="email" name="email" placeholder="Email" required />
						</div>
						<div class="input-group">
							<input type="tel" name="phone" placeholder="Phone" required />
						</div>
						<div class="input-group">
							<textarea name="message" placeholder="Message" style={{color: 'black'}} required></textarea>
						</div>
						<button type="submit" class="submit-btn" value="Send">
							Send
						</button>
					</form>

				</div>
			</div>
			<div className="footer-bottom">
				<p>© Respiro Detect. All Rights Reserved.</p>
				<p>
					Designed by{' '}
					<a href="https://thapar.edu/" target="_blank" rel="noreferrer">
						TIET
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
