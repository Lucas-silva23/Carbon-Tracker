import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token; 

  const handleLogout = () => {
    // 1. Remove o token de autenticação do armazenamento local
    localStorage.removeItem('token');
    
    // 2. Redireciona o usuário para a página inicial (HomePage)
    // O Navbar irá re-renderizar automaticamente e mostrar 
    // os botões "Login" e "Registrar".
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
              <Link to="/auth" className="navbar-button btn-secondary"> {/* MUDANÇA AQUI */}
                Login
              </Link>
              <Link to="/auth" className="navbar-button btn-primary"> {/* MUDANÇA AQUI */}
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