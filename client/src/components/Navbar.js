import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
	const { auth, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleAuthClick = () => {
		if (auth) {
			logout();
			navigate('/');
		}
	};

	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<span className="logo-text">RESPIRO DETECT</span>
			</div>
			<ul className="navbar-links">
				<li>
					<Link to="/" className="nav-link">
						<b>Home</b>
					</Link>
				</li>
				<li>
					<Link to="/HowitWorks" className="nav-link">
						<b>Guide</b>
					</Link>
				</li>
				<li>
					<Link to="/breathanalysis" className="nav-link">
						<b>Test</b>
					</Link>
				</li>
				<li>
					<Link to="/Results" className="nav-link">
						<b>Results</b>
					</Link>
				</li>
				<li>
					<Link to="/#contact-us" className="nav-link">
						<b>Contact</b>
					</Link>
				</li>
				<li>
					{auth ? (
						<Link to="/" className="nav-link" onClick={handleAuthClick}>
							<img
								src="/assets/login-icon.jpg"
								alt="Logout"
								className="nav-icon"
							/>{' '}
							<b>Log Out</b>
						</Link>
					) : (
						<Link to="/login" className="nav-link">
							<img
								src="/assets/login-icon.jpg"
								alt="Login"
								className="nav-icon"
							/>{' '}
							<b>Login</b>
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
