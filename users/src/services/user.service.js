const User = require('../models/user.model');
const bcrypt = require('bcrypt');

async function registerUser({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({ name, email, password: hashedPassword });
}

async function loginUser(name, email) {
  return await User.findOne({ where: { name, email } });
}

async function getAllUsers() {
  return await User.findAll();
}

module.exports = { registerUser, loginUser, getAllUsers };