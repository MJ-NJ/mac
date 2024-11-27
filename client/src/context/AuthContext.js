import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setAuth({ token });
		}
	}, []);

	const login = (token) => {
		localStorage.setItem('token', token);
		setAuth({ token });
	};

	const logout = () => {
		localStorage.removeItem('token');
		setAuth(null);
	};

	return (
		<AuthContext.Provider value={{ auth, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
