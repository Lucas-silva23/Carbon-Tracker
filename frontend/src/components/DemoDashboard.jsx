import React from 'react';
import CarbonChart from './CarbonChart'; // Reutilizamos seu gráfico!
import '../styles/HabitLog.css'; // Reutilizamos o estilo do log!
import '../styles/DemoDashboard.css'; // CSS específico para o demo
import { Link } from 'react-router-dom';

// Dados "fake" para o gráfico
const fakeChartData = [
  { name: 'Andar de bicicleta', total_saved: 42.5 },
  { name: 'Reciclar plástico', total_saved: 30.1 },
  { name: 'Usar sacola reutilizável', total_saved: 5.8 },
];

// Ícone de Lixeira "fake"
const FakeTrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#546E7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
    <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const DemoDashboard = () => {
  return (
    <div className="demo-dashboard-wrapper">
      <div className="demo-overlay">
        <h3>Apenas uma demonstração. <Link to="/auth">Crie sua conta</Link> para começar!</h3>
      </div>
      
      {/* Total Salvo FAKE */}
      <div className="total-carbon-saved" style={{ marginTop: '0' }}>
        <p>Total de CO2 Reduzido:</p>
        <span>78.40 kg</span>
      </div>

      {/* Gráfico FAKE */}
      <div className="dashboard-content">
        <div className="demo-form-placeholder">
          <h3>Adicionar Hábito</h3>
          <div className="form-group">
            <label>Hábito:</label>
            <select disabled><option>Selecione um hábito</option></select>
          </div>
          <div className="form-group">
            <label>Quantidade:</label>
            <input type="number" value="10" disabled />
          </div>
          <button disabled>Adicionar Hábito</button>
        </div>
        <CarbonChart chartData={fakeChartData} />
      </div>

      {/* Log FAKE (reutilizando estilos do HabitLog) */}
      <div className="habit-log-container" style={{ marginTop: '40px' }}>
        <h2>Histórico de Demonstração</h2>
        <div className="habit-log-list">
          {/* Item 1 */}
          <div className="habit-log-item">
            <div className="habit-log-details">
              <span className="habit-log-date">25/10/2025</span>
              <span className="habit-log-name">Andar de bicicleta</span>
              <span className="habit-log-quantity">10 km</span>
            </div>
            <div className="habit-log-impact">
              <span className="habit-log-carbon">-2.10 kg CO2</span>
              <button className="habit-log-delete-btn" disabled><FakeTrashIcon /></button>
            </div>
          </div>
          {/* Item 2 */}
          <div className="habit-log-item">
            <div className="habit-log-details">
              <span className="habit-log-date">24/10/2025</span>
              <span className="habit-log-name">Reciclar plástico</span>
              <span className="habit-log-quantity">2 kg</span>
            </div>
            <div className="habit-log-impact">
              <span className="habit-log-carbon">-3.00 kg CO2</span>
              <button className="habit-log-delete-btn" disabled><FakeTrashIcon /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoDashboard;