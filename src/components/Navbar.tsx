import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <span className="logo-text">BEAUTY</span>
          <span className="logo-dot">.</span>
        </Link>

        <div className="menu-icon" onClick={toggleMobileMenu}>
          <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Sobre
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/services" 
              className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Contratar
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/gallery" 
              className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Contato
            </Link>
          </li>
        </ul>

        <div className="navbar-cta">
          <Link to="/booking" className="booking-btn" onClick={closeMobileMenu}>
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 