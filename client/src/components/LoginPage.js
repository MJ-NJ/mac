import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
/*import './Login.css';*/
import { FaRegUserCircle, FaLock } from 'react-icons/fa';

const LoginPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post('http://localhost:15007/login', {
				username,
				password,
			});
			login(response.data.token);
			navigate('/');
		} catch (error) {
			console.error('Error logging in:', error);
		}
	};
	const handleSignupbutton = () => {
		navigate('/signup');
	};

	return (
		<div className="main_container">
			<div className="container_left"></div>
			<div className="container_right">
				<form onSubmit={handleLogin}>
					<h2>Welcome to Respiro Detect!</h2>
					<h4>Log in to your account</h4>
					<div className="input-box">
						<input
							type="text"
							placeholder="Username"
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<FaRegUserCircle className="icon" />
					</div>
					<div className="input-box">
						<input
							type="password"
							placeholder="Password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<FaLock className="icon" />
					</div>
					{
						<div className="forget">
							<a href="#">Forgot Password</a>
						</div>
					}
					<div className="signin">
						<button type="submit" className="login">
							Login
						</button>
						<button
							type="contained"
							className="signup"
							onClick={handleSignupbutton}
						>
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
