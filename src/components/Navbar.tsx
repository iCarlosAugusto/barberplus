import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { barberSlug } = useParams<{ barberSlug: string }>();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Prefixo para as rotas, baseado no slug da barbearia
  const routePrefix = barberSlug ? `/${barberSlug}` : '';

  return (
    <nav className={`navbar`}>
      <div className="navbar-container">
        <Link to={routePrefix || "/"} className="navbar-logo" onClick={closeMobileMenu}>
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
              to={routePrefix || "/"} 
              className={`nav-link ${location.pathname === routePrefix || location.pathname === '/' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Sobre
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to={`${routePrefix}/services`} 
              className={`nav-link ${location.pathname.includes('/services') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Contratar
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to={`${routePrefix}/employees`} 
              className={`nav-link ${location.pathname.includes('/employees') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Profissionais
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to={`${routePrefix}/gallery`} 
              className={`nav-link ${location.pathname.includes('/gallery') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Contato
            </Link>
          </li>
        </ul>

        <div className="navbar-cta">
          <Link to={`${routePrefix}/booking`} className="booking-btn" onClick={closeMobileMenu}>
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 