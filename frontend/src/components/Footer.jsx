import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Roxiler Transaction Management</h5>
            <p>
              Manage your transactions efficiently with our comprehensive reports.
            </p>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/" className="text-dark">Home</Link>
              </li>
              <li>
                <Link to="/transactiontable" className="text-dark">Transaction Table</Link>
              </li>
              <li>
                <Link to="/barchart" className="text-dark">Bar Chart</Link>
              </li>
              <li>
                <Link to="/statistics" className="text-dark">Statistics</Link>
              </li>
              <li>
                <Link to="/piechart" className="text-dark">Pie Chart</Link>
              </li>
              <li>
                <Link to="/combine" className="text-dark">Combine Report</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <p className="text-dark mb-0">Email: support@roxiler.com</p>
              </li>
              <li>
                <p className="text-dark mb-0">Phone: +1 234 567 890</p>
              </li>
              <li>
                <p className="text-dark mb-0">Address: Amar Business Zone, Swati Park, Veerbhadra Nagar, Baner, Pune, Maharashtra 411045</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Roxiler Transaction Management
      </div>
    </footer>
  );
};

export default Footer;