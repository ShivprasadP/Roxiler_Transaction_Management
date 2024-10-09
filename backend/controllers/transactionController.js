// controllers/transactionController.js
const axios = require('axios');
const Transaction = require('../models/Transaction');

// initializing database
exports.initializeDatabase = async (req, res) => {
  try {
    const { data } = await axios.get(process.env.THIRD_PARTY_API);
    await Transaction.deleteMany(); 
    await Transaction.insertMany(data);
    res.status(200).json({ message: 'Database initialized with transaction data' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize database' });
  }
};

// get all transactions
exports.getTransactions = async (req, res) => {
    try {
      const { search = '', page = 1, perPage = 10, month } = req.query;
  
      // Pagination calculation
      const limit = parseInt(perPage) || 10; //
      const skip = (parseInt(page) - 1) * limit || 0;
  
      // Convert month name to number 1 to 12
      let monthNumber = null;
      if (month) {
        const monthNames = [
          "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];
        monthNumber = monthNames.indexOf(month) + 1;
      }
  
      // month filter
      let monthFilter = {};
      if (monthNumber) {
        monthFilter = {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        };
      }
  
      // search query
      const searchFilter = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          ...(isNaN(Number(search)) ? [] : [{ price: Number(search) }])
        ]
      };
  
      // Combine monthFilter and searchFilter
      const query = { ...monthFilter, ...searchFilter };
  
      // total count of transactions matching
      const totalTransactions = await Transaction.countDocuments(query);
  
      // Fetch transactions with pagination
      const transactions = await Transaction.find(query)
        .skip(skip)
        .limit(limit);
  
      res.status(200).json({
        total: totalTransactions,
        currentPage: parseInt(page),
        perPage: limit,
        transactions,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  };
  

// Get statistics for a selected month
exports.getStatistics = async (req, res) => {
    try {
      const { month } = req.query;
  
      // Convert month name to number 1 to 12
      let monthNumber = null;
      if (month) {
        const monthNames = [
          "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];
        monthNumber = monthNames.indexOf(month) + 1;
      }
  
      //month filter
      let monthFilter = {};
      if (monthNumber) {
        monthFilter = {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        };
      }
  
      // total sale amount
      const totalSaleAmount = await Transaction.aggregate([
        { $match: { ...monthFilter, sold: true } },
        { $group: { _id: null, totalSales: { $sum: "$price" } } }
      ]);
  
      // total number of sold and not sold
      const soldItemsCount = await Transaction.countDocuments({ ...monthFilter, sold: true });
      const notSoldItemsCount = await Transaction.countDocuments({ ...monthFilter, sold: false });
  
      res.status(200).json({
        totalSaleAmount: totalSaleAmount[0]?.totalSales || 0,
        totalSoldItems: soldItemsCount,
        totalNotSoldItems: notSoldItemsCount
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch statistics' });
    }
  };


// Get data for bar chart (price range distribution)
exports.getBarChart = async (req, res) => {
    try {
      const { month } = req.query;
  
      // Convert month name to number (1 for January, 12 for December)
      let monthNumber = null;
      if (month) { 
        const monthNames = [
          "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];
        monthNumber = monthNames.indexOf(month) + 1; // Adding 1 because JavaScript months are 0-indexed
      }
  
      // Build month filter using MongoDB's $expr to extract the month part of dateOfSale
      let monthFilter = {};
      if (monthNumber) {
        monthFilter = {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        };
      }
  
      // Use MongoDB aggregation to group by price ranges and count the number of items in each range
      const priceRangeData = await Transaction.aggregate([
        { $match: monthFilter }, // Match transactions for the selected month
        {
          $bucket: {
            groupBy: "$price", // Group by the price field
            boundaries: [0, 101, 201, 301, 401, 501, 601, 701, 801, 901, Infinity], // Define price ranges
            default: "901+", // Catch-all for items with price above 901
            output: {
              count: { $sum: 1 } // Count the number of items in each range
            }
          }
        }
      ]);
  
      // Format the response as a list of price ranges with item counts
      res.status(200).json(priceRangeData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch bar chart data' });
    }
  };

exports.getPieChart = async (req, res) => {
  try {
    const { month } = req.query;

    // Convert month name to number (1 for January, 12 for December)
    let monthNumber = null;
    if (month) {
      const monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
      ];
      monthNumber = monthNames.indexOf(month) + 1; // Adding 1 because JavaScript months are 0-indexed
    }

    // Build month filter using MongoDB's $expr to extract the month part of dateOfSale
    let monthFilter = {};
    if (monthNumber) {
      monthFilter = {
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
      };
    }

    // Use MongoDB aggregation to group by category and count the number of items in each category
    const categoryData = await Transaction.aggregate([
      { $match: monthFilter }, // Match transactions for the selected month
      {
        $group: {
          _id: "$category", // Group by category
          count: { $sum: 1 } // Count the number of items in each category
        }
      }
    ]);

    // Format the response as an array of objects
    const result = categoryData.map(item => ({
      category: item._id,
      count: item.count
    }));

    // Return the category counts as a response
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pie chart data' });
  }
};

// Get combined data (Statistics, Bar Chart, and Pie Chart)

exports.getCombinedData = async (req, res) => {
  try {
      const { month } = req.query;

      // Reuse existing APIs by calling them programmatically
      const [statisticsRes, barChartRes, pieChartRes] = await Promise.all([
          axios.get(`${process.env.BASE_URL}/api/transactions/statistics`, { params: { month } }),
          axios.get(`${process.env.BASE_URL}/api/transactions/bar-chart`, { params: { month } }),
          axios.get(`${process.env.BASE_URL}/api/transactions/pie-chart`, { params: { month } })
      ]);

      const statistics = statisticsRes.data;
      const barChart = barChartRes.data;
      const pieChart = pieChartRes.data;

      const combinedData = {
          statistics,
          barChart,
          pieChart,
      };

      res.status(200).json(combinedData);

  } catch (error) {
      console.error('Error fetching combined data:', error);  // Log the error
      res.status(500).json({ error: 'Failed to fetch combined data' });
  }
};