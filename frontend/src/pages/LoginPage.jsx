// Exemplo para LoginPage.jsx (RegisterPage.jsx é similar)
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importe Link
import api from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para exibir erros
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/'); 
    } catch (err) {
      console.error('Erro no login!', err);
      setError(err.response?.data?.msg || 'Erro ao tentar fazer login.');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Exibe erro */}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
      <button type="submit">Entrar</button>
      <p className="auth-link">
        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </form>
  );
};
export default LoginPage;