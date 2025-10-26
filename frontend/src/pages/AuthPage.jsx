import React from 'react';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import '../styles/AuthPage.css'; // Novo arquivo CSS

const AuthPage = () => {
  return (
    <>
      <Navbar />
      <div className="auth-page-container">
        <div className="auth-page-content">
          
          {/* Container do Registro (Esquerda) */}
          <div className="auth-form-wrapper">
            <RegisterForm />
          </div>

          {/* Divisor Vertical */}
          <div className="auth-divider"></div>

          {/* Container do Login (Direita) */}
          <div className="auth-form-wrapper">
            <LoginForm />
          </div>

        </div>
      </div>
    </>
  );
};

export default AuthPage;