import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // Import the custom CSS file

const Home = () => {
  useEffect(() => {
    const initialize = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        await axios.get(`${apiBaseUrl}/initialize`);
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };

    initialize();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card d-flex flex-column h-100 p-3">
            <img src="./transactions.svg" className="card-img-top fixed-height" alt="Transaction Table" />
            <div className="card-body flex-grow-1">
              <h5 className="card-title">Transaction Table</h5>
              <p className="card-text">View and manage all transactions.</p>
              <Link to="/transactiontable" className="btn" style={{backgroundColor: '#189ab4'}}>Go to Transaction Table</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card d-flex flex-column h-100 p-3">
            <img src="./statistics.svg" className="card-img-top fixed-height" alt="Statistics" />
            <div className="card-body flex-grow-1">
              <h5 className="card-title">Statistics</h5>
              <p className="card-text">View detailed statistics of transactions.</p>
              <Link to="/statistics" className="btn" style={{backgroundColor: '#189ab4'}}>Go to Statistics</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card d-flex flex-column h-100 p-3">
            <img src="./barchart.svg" className="card-img-top fixed-height" alt="Barchart" />
            <div className="card-body flex-grow-1">
              <h5 className="card-title">Barchart</h5>
              <p className="card-text">Visualize data with bar charts.</p>
              <Link to="/barchart" className="btn" style={{backgroundColor: '#189ab4'}}>Go to Barchart</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card d-flex flex-column h-100 p-3">
            <img src="./piechart.svg" className="card-img-top fixed-height" alt="Pie Chart" />
            <div className="card-body flex-grow-1">
              <h5 className="card-title">Pie Chart</h5>
              <p className="card-text">Visualize data with pie charts.</p>
              <Link to="/piechart" className="btn" style={{backgroundColor: '#189ab4'}}>Go to Pie Chart</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card d-flex flex-column h-100 p-3">
            <img src="./combine.svg" className="card-img-top fixed-height" alt="Combine Report" />
            <div className="card-body flex-grow-1">
              <h5 className="card-title">Combine Report</h5>
              <p className="card-text">View combined reports of all data.</p>
              <Link to="/combine" className="btn" style={{backgroundColor: '#189ab4'}}>Go to Combine Report</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;