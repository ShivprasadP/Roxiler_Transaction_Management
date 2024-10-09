import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Barchart = () => {
  const [month, setMonth] = useState('March');  // Default month is March
  const [barChartData, setBarChartData] = useState([]);  // Store the bar chart data
  const [error, setError] = useState(null);  // For error handling

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Handle month selection
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  // Fetch bar chart data for the selected month
  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/bar-chart?month=${month}`);
      // Map data to include price range labels based on the _id values
      const mappedData = response.data.map(item => {
        let priceRange = '';
        if (item._id < 100) {
          priceRange = '0 - 100';
        } else if (item._id < 200) {
          priceRange = '101 - 200';
        } else if (item._id < 300) {
          priceRange = '201 - 300';
        } else if (item._id < 400) {
          priceRange = '301 - 400';
        } else if (item._id < 500) {
          priceRange = '401 - 500';
        } else if (item._id < 600) {
          priceRange = '501 - 600';
        } else if (item._id < 700) {
          priceRange = '601 - 700';
        } else if (item._id < 800) {
          priceRange = '701 - 800';
        } else if (item._id < 900) {
          priceRange = '801 - 900';
        } else {
          priceRange = '901 - above';  // For values above 900
        }
        return {
          priceRange,  // Set the price range as a label
          count: item.count
        };
      });
      setBarChartData(mappedData);  // Set the mapped data to state
      setError(null);  // Clear any previous errors
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
      setError('Failed to fetch bar chart data.');
      setBarChartData([]);
    }
  };

  // Fetch bar chart data whenever the month is changed
  useEffect(() => {
    fetchBarChartData();
  }, [month]);

  return (
    <div className="container mt-5">
      {/* Dropdown for month selection */}
      <div className="mb-3">
        <label htmlFor="monthSelect" className="form-label">Select Month for Price Range Distribution:</label>
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

      {/* Bar chart */}
      {barChartData.length > 0 && (
        <ResponsiveContainer width="70%" height={400}>
          <BarChart
            data={barChartData}  // No layout needed, default is vertical
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="priceRange" label={{ value: 'Price Range', position: 'insideBottom', offset: -5 }} />
            <YAxis 
              type="number" 
              domain={[0, 10]}  // Domain from 0 to 100
              ticks={[0, 2, 4, 6, 8, 10]}  // Custom ticks
              label={{ value: 'Number of Items', position: 'insideLeft', angle: -90 }} 
            />
            <Tooltip />
            <Bar dataKey="count" fill="#05445e

" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Barchart;
