const express = require('express');
const {
  initializeDatabase,
  getTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData // Ensure this is imported correctly
} = require('../controllers/transactionController'); // Ensure the correct path

const router = express.Router();

// Define routes
router.get('/initialize', initializeDatabase);
router.get('/getTransactions', getTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChart);
router.get('/pie-chart', getPieChart);
router.get('/combined', getCombinedData); // Ensure this route is correct

module.exports = router;
