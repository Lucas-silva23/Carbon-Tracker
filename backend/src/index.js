require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const habitRoutes = require('./routes/habitRoutes');

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});