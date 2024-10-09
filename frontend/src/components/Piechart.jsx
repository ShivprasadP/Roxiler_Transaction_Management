import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Piechart = () => {
  const [month, setMonth] = useState('March'); // Default month is March
  const [pieChartData, setPieChartData] = useState([]); // Store pie chart data
  const [error, setError] = useState(null); // For error handling

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Handle month selection
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  // Fetch pie chart data for the selected month
  const fetchPieChartData = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/pie-chart?month=${month}`);
      setPieChartData(response.data); // Set the fetched data
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
      setError('Failed to fetch pie chart data.');
      setPieChartData([]); // Clear data on error
    }
  };

  // Fetch pie chart data whenever the month is changed
  useEffect(() => {
    fetchPieChartData();
  }, [month]);

  return (
    <div className="container mt-5">
      {/* Dropdown for month selection */}
      <div className="mb-3">
        <label htmlFor="monthSelect" className="form-label">Select Month for Category Distribution:</label>
        <select
          id="monthSelect"
          className="form-select"
          value={month}
          onChange={handleMonthChange}
        >
          <option value="" disabled>Select a month</option>
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Show error if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Pie chart */}
      {pieChartData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Tooltip />
            <Pie
              data={pieChartData}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getRandomColor()} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default Piechart;
