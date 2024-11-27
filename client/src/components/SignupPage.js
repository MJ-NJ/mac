import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
/*import './Login.css';*/
import AuthContext from '../context/AuthContext';
import { FaRegUserCircle, FaLock } from 'react-icons/fa';
import { FaUserPen } from 'react-icons/fa6';

const SignupPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const handleSignup = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post('http://localhost:15007/signup', {
				username,
				password,
			});
			login(response.data.token);
			navigate('/');
		} catch (error) {
			console.error('Error signing up:', error);
		}
	};

	return (
		<div className="main_container">
			<div className="container_left"></div>
			<div className="container_right">
				<form onSubmit={handleSignup}>
					<h2>Welcome to Respiro Detect!</h2>
					<h3 className="heading">Create an account </h3>
					<div className="input-box">
						<input type="text" placeholder="Name" required />
						<FaUserPen className="icon" />
					</div>
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
					<button type="submit" className="sign">
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignupPage;
