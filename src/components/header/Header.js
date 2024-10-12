import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Header.css'; // Optional for custom styles
import Profile from '../../assets/profile.png'; 

const Header = () => {
  return (
    <div>
    <header className="d-flex justify-content-between align-items-center px-4" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
      {/* Middle Section - Title and Breadcrumbs */}
     <div className=' py-5'>
      <h5>Shop</h5>
      <div className="d-flex align-items-center text-muted">
        <p className="mb-0 me-2">Shop</p>
        <span className="mx-1">/</span>
        <p className="mb-0">Books</p>
      </div>
      </div> 

      {/* Right Section - User Profile */}
      <div className="d-flex align-items-center">
      <img 
          src={Profile}
          alt="Profile" 
          className=" img-fluid me-2" 
          
        />
        <span className="">Jacob Jones</span>
       
      </div>
    </header>
    </div>
  );
};

export default Header;
