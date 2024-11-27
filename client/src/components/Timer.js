import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Axios for API calls
import Modal from './Modal';

const red = '#48bbdb';
const green = '#4aec8c';

function Timer({ resetTimer, setResetTimer }) {
	const wsRef = useRef(null);
	const connectionCompleted = useRef(false);
	const [mode, setMode] = useState('work');
	const [secondsLeft, setSecondsLeft] = useState(0);
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [modalOpen, setModalOpen] = useState(false); // Modal visibility
	const [testResult, setTestResult] = useState(''); // Test result
  
	const [patientName, setName] = useState('');
	const [patientAge, setAge] = useState('');
	const [patientGender, setGender] = useState('');
	const [prevResult, setPrevResult] = useState('');
  
	const secondsLeftRef = useRef(secondsLeft);
	const isRunningRef = useRef(isRunning);
	const modeRef = useRef(mode);
	const alertTriggered = useRef(false);
  
	useEffect(() => {
	  isRunningRef.current = isRunning;
	}, [isRunning]);
  
	useEffect(() => {
	  if (resetTimer) {
		const resetSeconds = 3 * 60 + 30;
		secondsLeftRef.current = resetSeconds;
		setSecondsLeft(resetSeconds);
		setTime(0);
		alertTriggered.current = false;
	  }
	}, [resetTimer]);
  
	function tick() {
	  if (secondsLeftRef.current > 0) {
		secondsLeftRef.current--;
		setSecondsLeft(secondsLeftRef.current);
		setTime((prevTime) => prevTime + 1);
	  } 
	}
  
	useEffect(() => {
		if (isRunning && patientName && patientAge && patientGender) {
		  const ws = new WebSocket('ws://192.168.1.10:8000/ws');
		  wsRef.current = ws;
		  ws.onopen = () => {
			console.log('Connected to Jetson');
	  
			// Prepare the payload
			const requestPayload = {
			  type: 'START_ANALYSIS',
			  name: patientName,
			//   age: patientAge,
			//   gender: patientGender,
			};
	  
			// Conditionally add prevResult to the payload
			if (prevResult === 'positive') {
			  requestPayload.PREV_RESULT = true;
			} else if (prevResult === 'negative') {
			  requestPayload.PREV_RESULT = false;
			}
	  
			// Send the payload
			ws.send(JSON.stringify(requestPayload));
		  };
	  
		  // Handle incoming WebSocket messages
		  let fileName, fileId, tbInferenceResult;
		  ws.onmessage = async (event) => {
			const message = JSON.parse(event.data);
			console.log('Message from Jetson:', message);
	  
			if (message.type === 'ANALYSIS_RESULT' && message.result === 'starting') {
			  console.log('Data collection is starting');
			} else if (message.FileName && message.FileId && message.TB_InferenceResult !== undefined) {
			  console.log('Received details:', message);
			  fileName = message.FileName;
			  fileId = message.FileId;
			  tbInferenceResult = message.TB_InferenceResult;

			  setTestResult(tbInferenceResult === true ? 'Positive' : 'Negative');
	  
			  // Send the collected data to the backend
			  try {
				const response = await axios.post(
				  'http://localhost:15007/api/breathanalysis',
				  {
					name: patientName,
					age: patientAge,
					gender: patientGender,
					prevResult: prevResult,
					fileName,
					fileId,
					tbInferenceResult,
				  }
				);
				console.log('Patient data saved:', response.data);
				// setIsRunning(false); // Stop the timer after sending data
			  } catch (error) {
				console.error('Error saving patient data:', error);
			  }
			}
		  };
	  
		  // Handle WebSocket close event
		  ws.onclose = () => {
			console.log('WebSocket connection closed');
			if (!alertTriggered.current && !connectionCompleted.current) {
			  alert('The connection has been closed. Please press OK');
			  alertTriggered.current = true;
			}
		  };
	  
		  // Handle WebSocket error event
		  ws.onerror = (error) => {
			console.error('WebSocket error:', error);
			if (!alertTriggered.current && !connectionCompleted.current) {
			  alert('An error occurred with the WebSocket connection. Please refresh the page.');
			  alertTriggered.current = true;
			}
		  };
	  
		  // Cleanup WebSocket when the component unmounts
		  return () => {
			if (wsRef.current) {
			  wsRef.current.close();
			}
		  };
		}
	  }, [isRunning, patientName, patientAge, patientGender, prevResult]);
	  
	useEffect(() => {
	  /*function switchMode() {
		const nextMode = modeRef.current === 'work'? 'break' : 'work';
		const nextSeconds = nextMode === 'work'? 3 * 60 + 30 : 1 * 60;
  
		setMode(nextMode);
		modeRef.current = nextMode;
  
		setSecondsLeft(nextSeconds);
		secondsLeftRef.current = nextSeconds;
		alertTriggered.current = false;
	  }*/
	  if (!isRunning) return;
  
	  secondsLeftRef.current = 3 * 60 + 30;
	  setSecondsLeft(secondsLeftRef.current);
  
	  const interval = setInterval(() => {
		if (!isRunningRef.current) return;
		if (secondsLeftRef.current === 0) {
			setIsRunning(false); 
			setModalOpen(true);
			clearInterval(interval);
			return;
		}
		tick();
	  }, 1000);
  
	  return () => clearInterval(interval);
	}, [isRunning]);
  
	const totalSeconds = 3 * 60 + 30;
	const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  
	const minutes = Math.floor(secondsLeft / 60);
	let seconds = secondsLeft % 60;
	if (seconds < 10) seconds = '0' + seconds;
  
	let dynamicText;
	if (time === 0) {
	  dynamicText = 'Start Testing!';
	} else if (time >= 1 && time <= 65) {
	  dynamicText = 'Taking baseline value';
	} else if (time > 65 && time < 80) {
	  dynamicText = 'Ready for taking the sample';
	} else if (time >= 80 && time < 95) {
	  dynamicText = 'Take the Breath sample now';
	} else if (time >= 95 && time < 97) {
	  dynamicText = 'Stop taking the sample';
	} else if (time >= 97) {
	  dynamicText = 'Please wait...';
	}
  

	const handleStartTimer = async () => {
	  if (!patientName ||!patientAge ||!patientGender||!prevResult) {
		alert('Please fill all the details');
		return;
	  }
	  if (!isRunning) {
		const resetSeconds = 3 * 60 + 30; // Set the total timer duration (e.g., 3 minutes 30 seconds)
		setSecondsLeft(resetSeconds); // Reset state for timer
		secondsLeftRef.current = resetSeconds; // Reset reference value
		setTime(0); // Reset elapsed time
		setIsRunning(true); // Start the timer
		
	  }
	};
  
	const handleAddNewPatient = () => {
	  setName('');
	  setAge('');
	  setGender('');
	  setPrevResult('');
	  setIsRunning(false); 
	  setSecondsLeft(3 * 60 + 30); // Reset timer to 3 minutes 30 seconds
	  secondsLeftRef.current = 3 * 60 + 30;
	  setTime(0);
	  setResetTimer(prevState => !prevState);
	  setModalOpen(false);
	};
  
	return (
		<div className="app-container">
			<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} result={testResult ||'Test'} />
			<div
				className="timer-container"
				style={{ position: 'relative', width: '20%', height: '250px' }} // Adjusted size
			>
				<div
					style={{
						position: 'relative',
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<CircularProgressbar
						value={percentage}
						styles={buildStyles({
							textColor: '#000000',
							pathColor: mode === 'work' ? red : green,
							trailColor: 'rgba(255,255,255,.2)',
							strokeWidth: 10,
						})}
					/>
					<div
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							textAlign: 'center',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							pointerEvents: 'none',
						}}
					>
						<div style={{ fontSize: '28px' }}>
							{minutes}:{seconds}
						</div>
						<div style={{ fontSize: '28px' }}>mins left</div>
					</div>
				</div>
				<div
					style={{
						fontSize: '28px',
						marginTop: '60px',
						textAlign: 'center',
						color: '#464d77',
						fontWeight: '600',
					}}
				>
					{dynamicText}
				</div>
			</div>

			<div className="form-container" style={{ marginTop: '20px' }}>
				<h2>Patient Information</h2>
				<label>Patient Name:</label>
				<input
					type="text"
					value={patientName}
					onChange={(e) => setName(e.target.value)}
					placeholder="Enter patient name"
				/>
				<label>Patient Age:</label>
				<input
					type="number"
					value={patientAge}
					onChange={(e) => setAge(e.target.value)}
					placeholder="Enter patient age"
				/>
				<label>Patient Gender:</label>
				<input
					type="text"
					value={patientGender}
					onChange={(e) => setGender(e.target.value)}
					placeholder="Enter patient gender"
				/>
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
					<label style={{ whiteSpace: 'nowrap' }}>Previous Result (if any):</label>
					<select
						value={prevResult}
						onChange={(e) => setPrevResult(e.target.value)}
						style={{ padding: '5px', fontSize: '14px' }}
					>
						<option value="">Select</option>
						<option value="positive">Positive</option>
						<option value="negative">Negative</option>
						<option value="notApplicable">Not Applicable</option>
					</select>
				</div>

                <div
					className="button1"
					style={{
						display: 'flex',
						justifyContent: 'center',
						gap: '8px',
						marginTop: '10px',
						fontSize: '10px',
					}}
				>
					<button onClick={handleStartTimer} style={{marginRight: '16px'}}>Start Timer</button>
					<button onClick={handleAddNewPatient} style={{marginRight: '16px'}}>Add New Patient</button>
					<button 
						onClick={() => {
							axios.get('http://192.168.1.10:8000/shutdown')
								.then(() => console.log('Shutdown request sent'))
								.catch(err => console.error('Shutdown request failed:', err));
						}}
						style={{ backgroundColor: '#ff4444' }}
					>
						Shutdown
					</button>
				</div>
			</div>
		</div>
	);
}

export default Timer;
