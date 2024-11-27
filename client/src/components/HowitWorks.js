import React from 'react';

const steps = [
	{
		number: 1,
		title: 'Device Powering',
		description:
			'The device is a portable, hand-held unit with its power source mounted directly on the device itself. A power bank provides the necessary power to ensure continuous operation.',
	},
	{
		number: 2,
		title: 'Baseline Calculation and Standardization',
		description:
			'The system includes an automatic baseline calculator, which starts via a command sent through the web application. It collects baseline data for 1 minute and 20 seconds before prompting the patient to breathe into the device. This standardizes testing and ensures consistent data processing.',
	},
	{
		number: 3,
		title: 'Breath Sample Collection',
		description:
			'The patient exhales into the device through an air valve for 15 seconds at predefined interval, ensuring consistent timing for accurate model analysis. The valve directs the breath onto the sensor surface for precise readings and is easily removable, sanitizable, and replaceable for hygiene.',
	},
	{
		number: 4,
		title: 'Sensor Interaction and Data Capture',
		description:
			'The breath sample is directed ontothe coated Quartz Crystal Microbalance (QCM) sensor, which is treated with porphyrin metal complexes and formulated chemicals. These coatings interact specifically with the Volatile Organic Compounds (VOCs) present in a TB-positive breath sample, producing distinct readings compared to non-TB samples',
	},
	{
		number: 5,
		title: 'Error Handling',
		description:
			' If a reading is not produced or is deemed incorrect, an alert is sent to the doctor via the web application, and the patient is asked to provide another breath sample',
	},
	{
		number: 6,
		title: 'Data Processing',
		description:
			'The sensor readings are transmitted to the Jetson Nano for processing. Equipped with GPUs, the Jetson Nano efficiently handles the computational demands of machine learning and deep learning algorithms, making it suitable for real-time analysis in this portable setup.',
	},
	{
		number: 7,
		title: 'TB Status Prediction',
		description:
			'The clustering model,deployed on the Jetson Nano, analyzes the data to predict whether the patient is TB-positive or TB-negative.The model’s predictions are based on the sensor data, enabling accurateclassification',
	},
	{
		number: 8,
		title: 'Result Display',
		description:
			' The results are displayed on an interface within the web application, providing necessary context and explanations to assist the doctor or operator in understanding the predictions',
	},
	{
		number: 9,
		title: 'Sensor Reset and Preparation for Next Sample',
		description:
			'A vacuum pump introduces fresh air to clear any adsorbed VOCs from the sensor surface, ensuring accurate subsequent readings. This process takes 30 seconds, preventing influence from previous samples. The total time required per patient is about 1 minute and 20 seconds for baseline collection, 1 minute and 20 seconds for the reading, and 30 seconds for sensor cleaning.',
	},
	{
		number: 10,
		title: 'Readiness for Next Sample',
		description:
			'After the cleaning process, the device is resetand ready to take another sample',
	},
];

const HowItWorks = () => {
	return (
		<section className="how-it-works">
			<h2 className="section-title">How It Works</h2>
			<div className="steps-container">
				{steps.map((step) => (
					<div key={step.number} className="step">
						<div className="step-number">{step.number}</div>
						<div className="step-content">
							<h3 className="step-title">{step.title}</h3>
							<p className="step-description">{step.description}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default HowItWorks;
