import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Se não houver token, redireciona para a nova página
    return <Navigate to="/auth" replace />; {/* MUDANÇA AQUI */}
  }

  return children;
};

export default ProtectedRoute;