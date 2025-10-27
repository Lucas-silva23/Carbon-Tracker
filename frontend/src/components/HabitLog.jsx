import React from 'react';
import api from '../services/api';
import '../styles/HabitLog.css';

// Um pequeno ícone de lixeira
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

// Formata a data
const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const HabitLog = ({ log, onHabitDeleted }) => {
  
  const handleDelete = async (id) => {
    // Confirmação antes de deletar
    if (window.confirm('Tem certeza que deseja excluir este registro?')) {
      try {
        await api.delete(`/habits/user-habits/${id}`);
        onHabitDeleted(); // Avisa o pai (DashboardPage) para recarregar tudo
      } catch (error) {
        console.error('Erro ao deletar hábito:', error);
        alert('Não foi possível excluir o registro.');
      }
    }
  };

  return (
    <div className="habit-log-container">
      <h2>Histórico de Hábitos</h2>
      {log.length === 0 ? (
        <p className="empty-log">Nenhum hábito registrado ainda. Adicione um no formulário acima!</p>
      ) : (
        <div className="habit-log-list">
          {log.map((item) => (
            <div key={item.id} className="habit-log-item">
              <div className="habit-log-details">
                <span className="habit-log-date">{formatDate(item.date_added)}</span>
                <span className="habit-log-name">{item.name}</span>
                <span className="habit-log-quantity">
                  {item.quantity} {item.unit_name}
                </span>
              </div>
              <div className="habit-log-impact">
                <span className="habit-log-carbon">
                  -{parseFloat(item.calculated_carbon_saved).toFixed(2)} kg CO2
                </span>
                <button 
                  className="habit-log-delete-btn" 
                  onClick={() => handleDelete(item.id)}
                  title="Excluir registro"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitLog;