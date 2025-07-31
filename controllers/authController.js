const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: 'Email already exists' });

  const user = await User.create({ first_name, last_name, email, password });
  res.status(201).json({ token: generateToken(user._id) });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ token: generateToken(user._id) });
};
module.exports = {
  register,
  login,
};