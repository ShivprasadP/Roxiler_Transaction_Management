import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Statistics = () => {
  const [month, setMonth] = useState('March');  // Default month is March
  const [statistics, setStatistics] = useState(null);  // State to store the fetched statistics
  const [error, setError] = useState(null);  // Error handling state
  
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // Use environment variable for base URL

  // Function to fetch statistics from the backend
  const fetchStatistics = async (selectedMonth) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/statistics?month=${selectedMonth}`);
      setStatistics(response.data);  // Set the fetched statistics
      setError(null);  // Clear any previous errors
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setError('Failed to fetch statistics.');  // Set error message
      setStatistics(null);
    }
  };

  // useEffect to fetch statistics on mount and whenever the month changes
  useEffect(() => {
    fetchStatistics(month);  // Fetch statistics for the selected month
  }, [month]);  // This will run every time the month changes

  // Handle the change of the month from the dropdown
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="form-group mb-4">
        <label htmlFor="month">Select Month:</label>
        {/* Dropdown for selecting the month */}
        <select
          id="month"
          className="form-select"
          value={month}
          onChange={handleMonthChange}  // Change the month without a submit button
        >
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Show error if there is any */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Display the statistics table if statistics are available */}
      {statistics && (
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
              <td>{statistics.totalSaleAmount}</td>
              <td>{statistics.totalSoldItems}</td>
              <td>{statistics.totalNotSoldItems}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Statistics;
