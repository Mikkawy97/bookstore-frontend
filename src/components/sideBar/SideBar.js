import React from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/logo.png';  // Import the logo
import './SideBar.css'; // Optional for custom styles

const Sidebar = () => {
  return (
    <div className='sidebar'>
    <div className="d-flex flex-column vh-100 px-4 " style={{backgroundColor: '#fff',fontFamily: 'Poppins, sans-serif' }}>
      {/* Logo Section */}
      <div className="text-center py-5">
        <img src={logo} alt="Book World Logo" className='img-fluid'/>
        
      </div>
      
      {/* Navigation Links */}
      <Nav className="flex-column  ">
        <Nav.Link href="/" className="text-dark d-flex align-items-center px-5   py-3">
          <i className="bi bi-shop me-3"></i> Shop
        </Nav.Link>
        <Nav.Link href="/stores" className="text-dark d-flex align-items-center px-5  py-3">
          <i className="bi bi-shop-window me-3"></i> Stores
        </Nav.Link>
        <Nav.Link href="/authors" className="text-dark d-flex align-items-center px-5  py-3">
          <i className="bi bi-people me-3"></i> Authors
        </Nav.Link>
        <Nav.Link href="/books" className="text-dark d-flex align-items-center px-5  py-3">
          <i className="bi bi-book me-3"></i> Books
        </Nav.Link>
      </Nav>

      {/* Bottom Section */}
      <div className="mt-auto mb-4">
        <Nav.Link href="/logout" className="text-dark d-flex align-items-center px-5  py-3">
          <i className="bi bi-box-arrow-left me-3"></i> Log Out
        </Nav.Link>
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
