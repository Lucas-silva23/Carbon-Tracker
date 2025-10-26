const express = require('express');
const router = express.Router(); // <--- ESSE ERA O QUE FALTAVA
const habitController = require('../controllers/habitController');
const checkAuth = require('../middleware/checkAuth');

router.use(checkAuth); // Todas as rotas abaixo são protegidas

// --- Rotas existentes ---
router.get('/dashboard', habitController.getDashboardData);

// --- Rotas Modificadas e Novas ---
router.get('/types', habitController.getHabitTypes); 
router.post('/types', habitController.createHabitType);
router.get('/log', habitController.getHabitLog);
router.post('/user-habits', habitController.addHabit);
router.delete('/user-habits/:id', habitController.deleteUserHabit);

module.exports = router;
