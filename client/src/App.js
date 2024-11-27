import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Hero from './components/HeroSection';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Timer from './components/Timer';
import HowItWorks from './components/HowitWorks';
import Results from './components/Results';
import { useState} from 'react';

const App = () => {
  /*const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [isPaused, setIsPaused] = useState(true); */
  const [resetTimer, setResetTimer] = useState(false);

	return (
		<div className="appcontainer">
			<AuthProvider>
				<Router>
					<Navbar />
					<Routes>
						<Route path="/" element={<Hero />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path='/HowItWorks' element={<HowItWorks/>}/>
						<Route path='/Results' element={<Results/>}/>
						<Route path="/HowItWorks" element={<HowItWorks />} />
						<Route
							path="/breathanalysis"
							element={
								<ProtectedRoute>
									<Timer resetTimer={resetTimer} setResetTimer={setResetTimer} />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</Router>
			</AuthProvider>
		</div>
	);
};

export default App;
