require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/user.routes');
const User = require('./models/user.model');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

// Reintento de conexión a la base de datos
const startServer = async () => {
  let retries = 5;
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('✅ Conectado a la base de datos');
      await sequelize.sync();
      app.listen(process.env.PORT || 3000, () => {
        console.log(`🚀 Servidor corriendo en el puerto ${process.env.PORT}`);
      });
      break;
    } catch (err) {
      console.error('❌ Error al conectar con la base de datos:', err.message);
      retries--;
      console.log(`🔁 Reintentando conexión... (${5 - retries}/5)`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};

startServer();