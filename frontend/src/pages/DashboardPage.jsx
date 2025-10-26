import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// Nossos componentes
import AddHabitForm from '../components/AddHabitForm';
import CarbonChart from '../components/CarbonChart';
import CreateHabitTypeForm from '../components/CreateHabitTypeForm';
import HabitLog from '../components/HabitLog';

import '../styles/DashboardPage.css';

const DashboardPage = () => {
  console.log('--- [DashboardPage] Componente Montado ---');

  // Estados existentes
  const [dashboardData, setDashboardData] = useState({ grand_total: 0, chart_data: [] });
  const [habitTypes, setHabitTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Novos estados
  const [habitLog, setHabitLog] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Função de Logout (estável)
  const handleLogout = useCallback(() => {
    console.warn('--- [handleLogout] Sendo chamado! ---');
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  // Função para recarregar TUDO (estável)
  const refreshAllData = useCallback(async () => {
    console.log('[refreshAllData]... Iniciando busca de dados...');
    setIsLoading(true);
    setError('');
    
    try {
      console.log('[refreshAllData]... 1. Buscando /dashboard');
      const dashPromise = api.get('/habits/dashboard');
      
      console.log('[refreshAllData]... 2. Buscando /types');
      const typesPromise = api.get('/habits/types');
      
      console.log('[refreshAllData]... 3. Buscando /log');
      const logPromise = api.get('/habits/log');

      // Espera todas as chamadas terminarem
      console.log('[refreshAllData]... Aguardando todas as promises...');
      const [dashResponse, typesResponse, logResponse] = await Promise.all([
        dashPromise,
        typesPromise,
        logPromise
      ]);

      console.log('--- [refreshAllData] SUCESSO! Todas as chamadas retornaram. ---');
      
      setDashboardData(dashResponse.data);
      setHabitTypes(typesResponse.data);
      setHabitLog(logResponse.data);

    } catch (err) {
      // --- SE ALGO DER ERRADO, VAI CAIR AQUI ---
      console.error('--- [refreshAllData] ERRO! A chamada falhou. ---');
      console.error('Objeto de erro completo:', err);

      if (err.response) {
        // Erro veio do backend (404, 500, 401)
        console.error('Erro de resposta do servidor:', err.response.data);
        if (err.response.status === 401) {
          console.error('ERRO 401! Token inválido ou expirado. Deslogando...');
          handleLogout();
        } else {
          // Outro erro de servidor (ex: 500)
          setError(err.response.data.msg || 'Erro interno do servidor.');
        }
      } else if (err.request) {
        // Erro de rede (backend offline)
        console.error('Erro de rede: O backend não respondeu.', err.request);
        setError('Não foi possível conectar ao servidor. Tente novamente.');
      } else {
        // Outro erro de Javascript
        console.error('Erro de Javascript no código:', err.message);
        setError('Um erro inesperado ocorreu no frontend.');
      }
    } finally {
      // --- ESSE BLOCO *SEMPRE* DEVE RODAR ---
      console.log('[refreshAllData]... Bloco FINALLY executado. Desligando o loading.');
      setIsLoading(false);
    }
  }, [handleLogout]); // Dependência está correta

  // useEffect inicial
  useEffect(() => {
    console.log('[useEffect]... Rodando pela primeira vez. Chamando refreshAllData.');
    refreshAllData();
  }, [refreshAllData]); // Dependência está correta

  // Renderização
  if (isLoading) {
    console.log('[Render]... isLoading=true. Mostrando spinner.');
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    console.log(`[Render]... isLoading=false, error=${error}. Mostrando erro.`);
    return <div className="error-message" style={{ margin: '40px' }}>{error}</div>;
  }

  console.log('[Render]... isLoading=false, sem erro. Mostrando Dashboard.');
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Meu Painel de Carbono</h1>
        <button className="logout-button" onClick={handleLogout}>Sair</button>
      </header>
      
      <div className="total-carbon-saved">
        <p>Total de CO2 Reduzido:</p>
        <span>{dashboardData.grand_total.toFixed(2)} kg</span>
      </div>
      
      <div className="dashboard-content">
        <AddHabitForm 
          habitTypes={habitTypes} 
          onHabitAdded={refreshAllData} // Simplificado
        />
        <CarbonChart chartData={dashboardData.chart_data} />
      </div>

      <div className="toggle-form-container">
        <button 
          className="toggle-create-form-btn" 
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Cancelar' : 'Cadastrar Novo Tipo de Hábito'}
        </button>
      </div>
      
      {showCreateForm && (
        <CreateHabitTypeForm 
          onHabitTypeCreated={() => {
            setShowCreateForm(false);
            refreshAllData();
          }}
        />
      )}

      <HabitLog 
        log={habitLog} 
        onHabitDeleted={refreshAllData} // Simplificado
      />
    </div>
  );
};

export default DashboardPage;