import React from 'react';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import '../styles/AuthPage.css'; 

const AuthPage = () => {
  return (
    <>
      <Navbar />
      <div className="auth-page-container">
        <div className="auth-page-content">
          
          {}
          <div className="auth-form-wrapper">
            <RegisterForm />
          </div>

          {}
          <div className="auth-divider"></div>

          {}
          <div className="auth-form-wrapper">
            <LoginForm />
          </div>

        </div>
      </div>
    </>
  );
};

export default AuthPage;