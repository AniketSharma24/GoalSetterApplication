const express = require('express');
const route = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controller/goalsController');

const { protect } = require('../middleware/authMiddleware');
route.route('/').get(protect, getGoals).post(protect, setGoal);
route.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

// route.get('/', getGoals);
// route.post('/', setGoal);
// route.put('/:id', updateGoal);
// route.delete('/:id', deleteGoal);

module.exports = route;
