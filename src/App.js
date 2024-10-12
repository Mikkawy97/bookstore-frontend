import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShopPage from './components/ShopPage';
import StoresPage from './components/StoresPage';
import Sidebar from './components/sideBar/SideBar';
import Header from './components/header/Header';
import './App.css'; // Ensure CSS is imported

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/" element={<ShopPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;