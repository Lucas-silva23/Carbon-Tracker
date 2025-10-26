const db = require('../config/db');

// --- FUNÇÕES NOVAS E MODIFICADAS ---

// (Modificado) Busca hábitos globais (user_id IS NULL) + hábitos do usuário logado
exports.getHabitTypes = async (req, res) => {
  const userId = req.userId;
  try {
    const { rows } = await db.query(
      'SELECT * FROM habit_types WHERE user_id IS NULL OR user_id = $1 ORDER BY name',
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Erro em getHabitTypes:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// (Novo) Cria um novo tipo de hábito associado ao usuário
exports.createHabitType = async (req, res) => {
  const userId = req.userId;
  const { name, unit_name, carbon_factor_kg } = req.body;

  if (!name || !unit_name || !carbon_factor_kg) {
    return res.status(400).json({ msg: 'Todos os campos são obrigatórios.' });
  }

  try {
    const newType = await db.query(
      'INSERT INTO habit_types (name, unit_name, carbon_factor_kg, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, unit_name, carbon_factor_kg, userId]
    );
    res.status(201).json(newType.rows[0]);
  } catch (err) {
    console.error('Erro em createHabitType:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// (Novo) Busca o histórico (log) de hábitos registrados pelo usuário
exports.getHabitLog = async (req, res) => {
  const userId = req.userId;
  try {
    const { rows } = await db.query(
      `SELECT 
         uh.id, 
         uh.quantity, 
         uh.calculated_carbon_saved, 
         uh.date_added, 
         ht.name, 
         ht.unit_name 
       FROM user_habits uh
       JOIN habit_types ht ON uh.habit_type_id = ht.id
       WHERE uh.user_id = $1
       ORDER BY uh.date_added DESC, uh.id DESC`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Erro em getHabitLog:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// (Novo) Deleta um registro de hábito (um item do log)
exports.deleteUserHabit = async (req, res) => {
  const userId = req.userId;
  const habitId = req.params.id; 

  try {
    const deleteOp = await db.query(
      'DELETE FROM user_habits WHERE id = $1 AND user_id = $2 RETURNING *',
      [habitId, userId]
    );

    if (deleteOp.rows.length === 0) {
      return res.status(404).json({ msg: 'Registro de hábito não encontrado ou não autorizado.' });
    }

    res.status(200).json({ msg: 'Hábito deletado com sucesso.', deletedHabit: deleteOp.rows[0] });
  } catch (err) {
    console.error('Erro em deleteUserHabit:', err.message);
    res.status(500).json({ error: err.message });
  }
};


// --- FUNÇÕES ANTIGAS (AGORA COMPLETAS) ---

// (Existente) Adiciona um novo registro de hábito
exports.addHabit = async (req, res) => {
  const { habit_type_id, quantity } = req.body;
  const userId = req.userId; // Vem do middleware checkAuth

  try {
    // 1. Buscar o fator de carbono do hábito mestre
    const habitType = await db.query('SELECT carbon_factor_kg FROM habit_types WHERE id = $1', [habit_type_id]);
    if (habitType.rows.length === 0) {
      return res.status(404).json({ msg: 'Tipo de hábito não encontrado.' });
    }
    const factor = habitType.rows[0].carbon_factor_kg;

    // 2. Calcular o carbono salvo
    const calculated_carbon_saved = parseFloat(quantity) * parseFloat(factor);

    // 3. Salvar no banco
    const newHabit = await db.query(
      'INSERT INTO user_habits (user_id, habit_type_id, quantity, calculated_carbon_saved) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, habit_type_id, quantity, calculated_carbon_saved]
    );

    res.status(201).json(newHabit.rows[0]);
  } catch (err) {
    console.error('Erro em addHabit:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// (Existente) Retorna os dados agregados para o dashboard
exports.getDashboardData = async (req, res) => {
  const userId = req.userId;
  try {
    // Query 1: Total geral
    const totalResult = await db.query(
      'SELECT SUM(calculated_carbon_saved) as grand_total FROM user_habits WHERE user_id = $1',
      [userId]
    );
    const grand_total = totalResult.rows[0].grand_total || 0;

    // Query 2: Dados para o gráfico (agrupados por tipo)
    const chartResult = await db.query(
      `SELECT 
         ht.name, 
         SUM(uh.calculated_carbon_saved) as total_saved
       FROM user_habits uh
       JOIN habit_types ht ON uh.habit_type_id = ht.id
       WHERE uh.user_id = $1
       GROUP BY ht.name
       ORDER BY total_saved DESC`,
      [userId]
    );

    res.json({
      grand_total: parseFloat(grand_total),
      chart_data: chartResult.rows,
    });
  } catch (err) {
    console.error('Erro em getDashboardData:', err.message);
    res.status(500).json({ error: err.message });
  }
};