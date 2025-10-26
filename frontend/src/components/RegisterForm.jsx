import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validação simples de exemplo
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      // Tenta registrar
      const response = await api.post('/auth/register', { email, password });
      
      // Se registrar com sucesso, faz o login automaticamente
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); // Sucesso! Vai para o dashboard
    } catch (err) {
      console.error('Erro no registro!', err);
      setError(err.response?.data?.msg || 'Não foi possível criar a conta.');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Criar Conta</h2>
      {error && <p className="error-message">{error}</p>}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha (mín. 6 caracteres)" required />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegisterForm;