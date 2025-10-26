import React, { useState } from 'react';
import api from '../services/api';
import '../styles/AddHabitForm.css'; // Novo arquivo CSS para o formulário

const AddHabitForm = ({ habitTypes, onHabitAdded }) => {
  const [selectedHabitId, setSelectedHabitId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHabitId) {
      setError('Por favor, selecione um hábito.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await api.post('/habits/user-habits', {
        habit_type_id: parseInt(selectedHabitId),
        quantity: parseFloat(quantity)
      });
      onHabitAdded(); 
      setSelectedHabitId('');
      setQuantity(1);
    } catch (err) {
      console.error('Erro ao adicionar hábito:', err);
      setError(err.response?.data?.msg || 'Erro ao adicionar hábito.');
    } finally {
      setLoading(false);
    }
  };

  const selectedHabit = habitTypes.find(h => h.id === parseInt(selectedHabitId));

  return (
    <form className="add-habit-form" onSubmit={handleSubmit}>
      <h3>Adicionar Novo Hábito</h3>
      {error && <p className="error-message">{error}</p>}

      <div className="form-group">
        <label htmlFor="habit-select">Hábito:</label>
        <select 
          id="habit-select"
          value={selectedHabitId} 
          onChange={(e) => setSelectedHabitId(e.target.value)} 
          required
        >
          <option value="">Selecione um hábito</option>
          {habitTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group quantity-input-group">
        <label htmlFor="quantity-input">Quantidade:</label>
        <input 
          id="quantity-input"
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          min="0.1"
          step="0.1"
          required 
        />
        {selectedHabit && <span className="unit-display">{selectedHabit.unit_name}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Adicionando...' : 'Adicionar Hábito'}
      </button>
    </form>
  );
};
export default AddHabitForm;