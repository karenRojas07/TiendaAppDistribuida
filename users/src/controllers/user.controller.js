const { registerUser, loginUser } = require('../services/user.service');
const {getAllUsers} = require('../services/user.service');

async function register(req, res) {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'Usuario creado', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const user = await loginUser(req.body.name, req.body.email);
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
    res.status(200).json({ message: 'Login exitoso', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { register, login, getUsers };