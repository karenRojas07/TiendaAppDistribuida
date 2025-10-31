const User = require('../models/user.model');
const bcrypt = require('bcrypt');

async function registerUser({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({ name, email, password: hashedPassword });
}

async function loginUser(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

async function getAllUsers() {
  return await User.findAll();
}

module.exports = { registerUser, loginUser, getAllUsers };