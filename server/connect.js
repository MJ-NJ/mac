// // NO NEED OF THIS ANYMORE --> ALL DONE BY FRONTEND

// const WebSocket = require('ws');

// // Pass the req data here
// const [patientName, patientAge, patientGender] = process.argv.slice(2);

// // Connect to the Jetson WebSocket server
// const ws = new WebSocket('ws://192.168.1.10:8000/ws');

// ws.on('open', function open() {
// 	console.log('Connected to Jetson');

// 	// Example: Send a future start time (10 seconds from now)
// 	const futureEpochTime = Math.floor(Date.now() / 1000) + 10; // 10 seconds from now

// 	// Send the start time for synchronization
// 	ws.send(
// 		JSON.stringify({
// 			type: 'START_ANALYSIS',
// 			name : 'test',
// 		})
// 	);
// });

// ws.on('message', function message(data) {
// 	const message = JSON.parse(data);
// 	console.log('Received message from Jetson:', message);

// 	// Check for acknowledgment from Jetson
// 	if (message.type === 'TIME_SYNC_ACK' && message.status === 'completed') {
// 		console.log('Start time synchronized successfully');
// 	}

// 	// Handle data collection result
// 	if (message.type === 'ANALYSIS_RESULT') {
// 		console.log('Data collection result:', message.result);
// 	}
// 	ws.close();
// });

// ws.on('close', function close() {
// 	console.log('WebSocket connection closed');
// });

// ws.on('error', function error(err) {
// 	console.log('WebSocket error:', err);
// });


const WebSocket = require('ws');

// Connect to the Jetson WebSocket server
const ws = new WebSocket('ws://192.168.1.10:8000/ws');

ws.on('open', function open()  {
    console.log('Connected to Jetson');

    // Example: Send a future start time (10 seconds from now)
    // const futureEpochTime = Math.floor(Date.now() / 1000) + 10;  // 10 seconds from now

    // Send the start time for synchronization
    ws.send(JSON.stringify({
        type: 'START_ANALYSIS',
        name: 'test',
    }));
    console.log("req sent")
});


ws.on('message', function message(data) {
    const message = JSON.parse(data);
    console.log('Received message from Jetson:', message);

    // Handle data collection result
    if (message.type === 'ANALYSIS_RESULT') {
        console.log('Data collection result:', message.result);
    }
    // ws.close()
});

// ws.on('close', function close() {
//     console.log('WebSocket connection closed');
// });

ws.on('error', function error(err) {
    console.log('WebSocket error:', err);
});