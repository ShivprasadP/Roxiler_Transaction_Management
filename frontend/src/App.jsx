import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TransactionTable from './components/TransactionTable';
import Barchart from './components/Barchart';
import Statistics from './components/Statistics';
import Piechart from './components/Piechart';
import Combine from './components/Combine';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#d4f1f4' }}>

        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactiontable" element={<TransactionTable />} />
          <Route path="/barchart" element={<Barchart />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/piechart" element={<Piechart />} />
          <Route path="/combine" element={<Combine />} />
        </Routes>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;