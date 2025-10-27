import React, { useState } from 'react';
import api from '../services/api';
import '../styles/CreateHabitTypeForm.css'; 

const CreateHabitTypeForm = ({ onHabitTypeCreated }) => {
  const [name, setName] = useState('');
  const [unitName, setUnitName] = useState('');
  const [carbonFactor, setCarbonFactor] = useState(0.1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/habits/types', {
        name: name,
        unit_name: unitName,
        carbon_factor_kg: parseFloat(carbonFactor)
      });
      // Limpa o formulário
      setName('');
      setUnitName('');
      setCarbonFactor(0.1);
      // Avisa o pai (DashboardPage) que um novo tipo foi criado
      onHabitTypeCreated(); 
    } catch (err) {
      console.error('Erro ao criar tipo de hábito:', err);
      setError(err.response?.data?.msg || 'Erro ao criar hábito.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="create-habit-type-form" onSubmit={handleSubmit}>
      <h3>Cadastrar Novo Tipo de Hábito</h3>
      <p>Crie um hábito personalizado (ex: "Evitar carne", unidade "dias", fator "2.5").</p>
      {error && <p className="error-message">{error}</p>}

      <div className="form-group">
        <label htmlFor="habit-name">Nome do Hábito:</label>
        <input
          id="habit-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Usar transporte público"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="habit-unit">Unidade de Medida:</label>
        <input
          id="habit-unit"
          type="text"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          placeholder="Ex: km, dias, refeições"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="habit-factor">Fator de Carbono (kg por unidade):</label>
        <input
          id="habit-factor"
          type="number"
          value={carbonFactor}
          onChange={(e) => setCarbonFactor(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Salvar Novo Hábito'}
      </button>
    </form>
  );
};

export default CreateHabitTypeForm;