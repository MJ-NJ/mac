const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const FormData = require('form-data');
const { exec } = require('child_process');
dotenv.config();

const app = express();
const port = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGODB_URI;

// MongoDB connection
mongoose.connect(
	MONGO_URI
);

// user Schema
const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

//Patient schema
const patientSchema = new mongoose.Schema({
	name: { type: String, required: true },
	age: { type: Number, required: true },
	gender: { type: String, required: true },
	prevResult: { type: String},
	fileName: {type: String},
	fileId: {type: String},
	tbInferenceResult: { type: Boolean },
	finalResult: {type: String},
});

const Patient = mongoose.model('Patient', patientSchema);
// search patient endpt
app.get('/getInfo',(req,res) =>{
	Patient.find()
	.then(patients => {
		res.header("Access-Control-Allow-Origin", "*"); // or specify the allowed origin
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.json(patients);
	  })	
	  .catch(err => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.json(err);
	  });
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Serve static files from the React app
 app.use(express.static(path.join(__dirname, 'client/build'))); // <-- this is the old one
// app.use(express.static(path.join(__dirname, '../client/build')));
// User Registration Endpoint
app.post('/signup', async (req, res) => {
	const { username, password } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ username, password: hashedPassword });
		await user.save();
		const token = jwt.sign({ username: user.username }, JWT_SECRET, {
			expiresIn: '1h',
		});
		res.json({ token });
	} catch (error) {
		console.error('Error during signup:', error);
		res.status(500).send('Internal Server Error');
	}
});

// User Login Endpoint
app.post('/login', async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).send('Invalid username or password');
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).send('Invalid username or password');
		}
		const token = jwt.sign({ username: user.username }, JWT_SECRET, {
			expiresIn: '1h',
		});
		res.json({ token });
	} catch (error) {
		console.error('Error during login:', error);
		res.status(500).send('Internal Server Error');
	}
});

// Authentication middleware
// const authMiddleware = (req, res, next) => {
// 	const token = req.header('Authorization').replace('Bearer ', '');
// 	try {
// 		const decoded = jwt.verify(token, JWT_SECRET);
// 		req.user = decoded;
// 		next();
// 	} catch (err) {
// 		res.status(401).send('Unauthorized');
// 	}
// };
const authMiddleware = (req, res, next) => {
	// Check if Authorization header exists
	const authHeader = req.header('Authorization');
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res
			.status(401)
			.send('Authorization header missing or incorrect format');
	}

	// Extract the token
	const token = authHeader.replace('Bearer ', '');

	try {
		// Verify the token
		const decoded = jwt.verify(token, JWT_SECRET);

		// Attach the decoded user data to the request object
		req.user = decoded;

		next();
	} catch (err) {
		res.status(401).send('Unauthorized');
	}
};

app.post('/api/breathanalysis', async (req, res) => {
    const { name, age, gender, prevResult, fileName, fileId, tbInferenceResult } = req.body;
    
    try {
        // Validate required fields
        if (!name || !age || !gender) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create patient data object
        const patientData = {
            name,
            age,
            gender,
            fileName,
            fileId,
            tbInferenceResult,
            finalResult: tbInferenceResult ? 'Positive' : 'Negative'
        };

        // Only add prevResult if it's not "notApplicable"
        if (prevResult && prevResult !== 'notApplicable') {
            patientData.prevResult = prevResult;
        }

        // Save patient data
        const patient = new Patient(patientData);
        console.log('Saving patient data:', patient);
        await patient.save();

        res.json({ 
            success: true,
            message: 'Patient data saved successfully',
            patient: patient
        });
    } catch (error) {
        console.error('Error in breath analysis:', error);
        res.status(500).json({ 
            success: false,
            error: error.message || 'Internal Server Error'
        });
    }
});

app.get('*', (req, res) => {
	 res.sendFile(path.join(__dirname + '/client/build/index.html')); // <-- old one
	// res.sendFile(path.join(__dirname + '../client/build/index.html'));

});

app.listen(port, () => { // <-- THIS IS THE OLD ONE
	console.log(`Server running on port ${port}`);
});

// module.exports = app;
