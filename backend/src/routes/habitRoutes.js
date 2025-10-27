const express = require('express');
const router = express.Router(); 
const habitController = require('../controllers/habitController');
const checkAuth = require('../middleware/checkAuth');

router.use(checkAuth); 

router.get('/dashboard', habitController.getDashboardData);

router.get('/types', habitController.getHabitTypes); 
router.post('/types', habitController.createHabitType);
router.get('/log', habitController.getHabitLog);
router.post('/user-habits', habitController.addHabit);
router.delete('/user-habits/:id', habitController.deleteUserHabit);

module.exports = router;
