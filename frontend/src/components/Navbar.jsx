import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{backgroundColor: '#189ab4'}}>
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center ms-5" href="#">
          <img src="./logo.jpeg" alt="Logo" width="80" height="50" className="d-inline-block align-top" />
          <span className="ms-3">Roxiler Transaction Management</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link me-5">Home</Link>
            </li>
            <li className="nav-item dropdown me-5">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Reports
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li>
                    <Link to="/transactiontable" className="dropdown-item">Transaction Table</Link>
                </li>
                <li>
                    <Link to="/barchart" className="dropdown-item">Bar Chart</Link>
                </li>
                <li>
                    <Link to="/statistics" className="dropdown-item">Statistics</Link>
                </li>
                <li>
                    <Link to="/piechart" className="dropdown-item">Pie Chart</Link>
                </li>
                <li>
                    <Link to="/combine" className="dropdown-item">Combine Report</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;