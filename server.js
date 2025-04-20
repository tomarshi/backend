const express = require('express'); // Import Express
const mongoose = require('mongoose'); // Import Mongoose for database connection
const bodyParser = require('body-parser'); // Middleware for parsing JSON bodies
const cors = require('cors'); // Middleware for CORS
const Feedback = require('./models/feedback'); // Import Feedback model

const app = express(); // Initialize the Express app
const PORT = 3000; // Define the port for the server

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming JSON requests

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/carbon-footprint', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

// Add your API routes here
// Save feedback to the database
app.post('/api/feedback', async (req, res) => {
  const { userName, userFeedback } = req.body;
  try {
    const feedback = new Feedback({ userName, userFeedback });
    await feedback.save();
    res.json({ message: 'Feedback saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

// Get all feedback (optional)
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); // Fetch all feedbacks
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});
app.use(express.static('frontend')); // Serve HTML, CSS, JS from the 'public' folder
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html'); // Ensure your 'index.html' is in the 'public' folder
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});