const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please check fields');
  }

  // if user already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userToCreate = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (userToCreate) {
    res.status(201).json({
      _id: userToCreate.id,
      name: userToCreate.name,
      email: userToCreate.email,
      token: generateJWT(userToCreate._id),
    });
  } else {
    res.status(400);
    throw new Error('Error creating user');
  }
});
// @desc Authenticate an user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userToCreate = await User.findOne({ email });

  if (userToCreate && (await bcrypt.compare(password, userToCreate.password))) {
    res.json({
      _id: userToCreate.id,
      name: userToCreate.name,
      email: userToCreate.email,
      token: generateJWT(userToCreate._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});
// @desc Get user data
// @route GET /api/users/me
// @access Public
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// Generate Token (JWT)
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
