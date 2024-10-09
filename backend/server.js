const express = require('express');
const cors = require('cors'); // Import cors package
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactionRoutes');
require('dotenv').config();

const app = express();

// Enable CORS for all origins (or restrict to frontend only)
app.use(cors({ origin: 'http://localhost:5173' })); // Use this if you want to allow only the frontend origin
// app.use(cors()); // This will allow requests from any origin

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Transaction routes
app.use('/api/transactions', transactionRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
