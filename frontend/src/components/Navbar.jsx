import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token; 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Carbon Tracker
        </Link>
        
        <div className="navbar-menu">
          {isLoggedIn ? (
            <button className="navbar-button btn-logout" onClick={handleLogout}>
              Sair
            </button>
          ) : (
            <>
              <Link to="/auth" className="navbar-button btn-secondary"> {}
                Login
              </Link>
              <Link to="/auth" className="navbar-button btn-primary"> {}
                Registrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;