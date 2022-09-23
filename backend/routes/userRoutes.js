const express = require('express');
const route = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controller/userController');

route.post('/', registerUser);
route.post('/login', loginUser);
const { protect } = require('../middleware/authMiddleware');
route.get('/me', protect, getMe);

module.exports = route;
