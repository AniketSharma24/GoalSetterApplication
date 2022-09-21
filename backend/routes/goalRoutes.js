const express = require('express');
const route = express.Router();
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controller/goalsController');

route.route('/').get(getGoals).post(setGoal);
route.route('/:id').put(updateGoal).delete(deleteGoal);

// route.get('/', getGoals);
// route.post('/', setGoal);
// route.put('/:id', updateGoal);
// route.delete('/:id', deleteGoal);

module.exports = route;
