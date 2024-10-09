import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Combine = () => {
  const [month, setMonth] = useState('March');  // Default month is March
  const [combinedData, setCombinedData] = useState({
    statistics: null,
    barChart: [],
    pieChart: []
  });
  const [error, setError] = useState(null);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Handle month selection
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  // Fetch combined data from backend
  const fetchCombinedData = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/combined?month=${month}`);
      setCombinedData(response.data);  // Set the combined data
      setError(null);
    } catch (error) {
      console.error('Error fetching combined data:', error);
      setError('Failed to fetch data for the selected month.');
      setCombinedData({ statistics: null, barChart: [], pieChart: [] });  // Reset data on error
    }
  };

  // Fetch data whenever the month is changed
  useEffect(() => {
    fetchCombinedData();
  }, [month]);

  // Function to generate random color for PieChart
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="container mt-5">
      {/* Dropdown for month selection */}
      <div className="mb-3">
        <label htmlFor="monthSelect" className="form-label">Select Month:</label>
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

      {/* Render Statistics */}
      {combinedData.statistics && (
        <div className="mb-5">
          <h3>Statistics for {month}</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Total Sales</th>
                <th>Total Sold Items</th>
                <th>Total Not Sold Items</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{combinedData.statistics.totalSaleAmount}</td>
                <td>{combinedData.statistics.totalSoldItems}</td>
                <td>{combinedData.statistics.totalNotSoldItems}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Render BarChart */}
      {combinedData.barChart.length > 0 && (
        <div className="mb-5">
          <h3>BarChart: Price Range Distribution for {month}</h3>
          <ResponsiveContainer width="70%" height={400}>
            <BarChart data={combinedData.barChart}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* Adjusted X and Y axes as per Barchart component */}
              <XAxis 
                dataKey="_id" 
                label={{ value: 'Price Range', position: 'insideBottom', offset: -5 }} 
                tickFormatter={(id) => {
                  if (id < 100) return '0 - 100';
                  else if (id < 200) return '101 - 200';
                  else if (id < 300) return '201 - 300';
                  else if (id < 400) return '301 - 400';
                  else if (id < 500) return '401 - 500';
                  else if (id < 600) return '501 - 600';
                  else if (id < 700) return '601 - 700';
                  else if (id < 800) return '701 - 800';
                  else if (id < 900) return '801 - 900';
                  return '901+';
                }}
              />
              <YAxis 
                type="number" 
                domain={[0, 10]}  // Adjusted Y-axis range with 0 - 10 items
                ticks={[0, 2, 4, 6, 8, 10]}  // Custom tick values for number of items
                label={{ value: 'Number of Items', position: 'insideLeft', angle: -90 }} 
              />
              <Tooltip />
              <Bar dataKey="count" fill="#05445e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Render PieChart */}
      {combinedData.pieChart.length > 0 && (
        <div className="mb-5">
          <h3>PieChart: Category Distribution for {month}</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Tooltip />
              <Pie
                data={combinedData.pieChart}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {combinedData.pieChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getRandomColor()} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Combine;
