import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage'; // 1. IMPORTAR A NOVA PÁGINA
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

// 2. REMOVA OS IMPORTS de LoginPage e RegisterPage

function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} /> {/* 3. ADICIONAR NOVA ROTA */}
      
      {/* 4. REMOVER as rotas /login e /register */}
      
      {/* Rota Protegida */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;