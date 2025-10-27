const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Função de registro de usuário
exports.register = async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Por favor, insira email e senha.' });
  }
  try {
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ msg: 'Usuário já existe.' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email, password_hash]
    );

    // Gerar token
    const token = jwt.sign({ userId: newUser.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error('Erro no Registro:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Função de login de usuário
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Por favor, insira email e senha.' });
  }

  try {
    // Buscar usuário por email
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ msg: 'Credenciais inválidas.' });
    }

    // Comparar a senha
    const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas.' });
    }

    // Gerar e retornar um novo token JWT
    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Erro no Login:', err.message);
    res.status(500).json({ error: err.message });
  }
};