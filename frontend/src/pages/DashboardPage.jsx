import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

// Componentes
import Navbar from '../components/Navbar'; 
import AddHabitForm from '../components/AddHabitForm';
import CarbonChart from '../components/CarbonChart';
import CreateHabitTypeForm from '../components/CreateHabitTypeForm';
import HabitLog from '../components/HabitLog';

import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({ grand_total: 0, chart_data: [] });
  const [habitTypes, setHabitTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [habitLog, setHabitLog] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const refreshAllData = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const [dashResponse, typesResponse, logResponse] = await Promise.all([
        api.get('/habits/dashboard'),
        api.get('/habits/types'),
        api.get('/habits/log')
      ]);
      setDashboardData(dashResponse.data);
      setHabitTypes(typesResponse.data);
      setHabitLog(logResponse.data);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setError(err.response?.data?.msg || 'Não foi possível carregar os dados.');
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Força o redirecionamento
      }
    } finally {
      setIsLoading(false);
    }
  }, []); 

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  const handleHabitTypeCreated = () => {
    setShowCreateForm(false);
    refreshAllData();
  };
  
  const handleHabitLogChanged = () => {
    refreshAllData();
  };

  if (isLoading) {
    return (
      <>
        <Navbar /> {/* Mostra o Navbar mesmo durante o loading */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 70px)' }}>
          <div className="loading-spinner"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="error-message" style={{ margin: '40px' }}>{error}</div>
      </>
    );
  }

  return (
    <> {/* Adiciona Fragmento */}
      <Navbar /> {/* Adiciona a Navbar no topo */}
      
      <div className="dashboard-container">
        {}
        
        <div className="total-carbon-saved">
          <p>Total de CO2 Reduzido:</p>
          <span>{dashboardData.grand_total.toFixed(2)} kg</span>
        </div>
        
        <div className="dashboard-content">
          <AddHabitForm 
            habitTypes={habitTypes} 
            onHabitAdded={handleHabitLogChanged} 
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
            onHabitTypeCreated={handleHabitTypeCreated} 
          />
        )}

        <HabitLog 
          log={habitLog} 
          onHabitDeleted={handleHabitLogChanged} 
        />
      </div>
    </>
  );
};

export default DashboardPage;