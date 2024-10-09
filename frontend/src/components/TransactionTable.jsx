import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);  // Total number of transactions
  const [page, setPage] = useState(1);  // Current page number
  const [perPage] = useState(10);  // Fixed number of records per page
  const [selectedMonth, setSelectedMonth] = useState('March');  // Default month
  const [searchTerm, setSearchTerm] = useState('');  // Search term

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/getTransactions`, {
          params: {
            month: selectedMonth,
            page: page,
            perPage: perPage,
            search: searchTerm  // Include the search term
          }
        });

        setTransactions(response.data.transactions);
        setTotal(response.data.total);  // Set total transactions for pagination
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setTransactions([]);
      }
    };

    fetchTransactions();
  }, [selectedMonth, page, perPage, searchTerm]);  // Refetch when selectedMonth, page, or searchTerm changes

  // Handle month change from dropdown
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setPage(1);  // Reset to first page when month changes
  };

  // Handle search term input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);  // Reset to first page when search term changes
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="container mt-5">
      <div className='row mb-5'>
        <div className="col-md-4">
          <label htmlFor="monthSelect" className="form-label">Select Month</label>
          <select
            id="monthSelect"
            className="form-select"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4 offset-md-4">
          <label htmlFor="searchInput" className="form-label">Search Transactions</label>
          <input
            id="searchInput"
            className="form-control"
            type="text"
            placeholder="Search by title, description, or price"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <hr />

      {/* Transactions Table */}
      <table className="table table-striped table-bordered mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.id}</td>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{transaction.category}</td>
                <td>{transaction.sold ? 'Yes' : 'No'}</td>
                <td><img src={transaction.image} alt={transaction.title} width="50" /></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
              Next
            </button>
          </li>
        </ul>
      </nav>

      <p>Total Transactions: {total}</p>
    </div>
  );
};

export default TransactionTable;