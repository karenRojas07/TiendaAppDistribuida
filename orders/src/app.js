require('dotenv').config();
const express = require('express');
const sequelize = require('./infrastructure/database/sequelize');
const orderRoutes = require('./infrastructure/routes/order.routes');

const app = express();
app.use(express.json());
app.use('/api/orders', orderRoutes);

const startServer = async () => {
  let retries = 4;
  while (true) {
    try {
      await sequelize.authenticate();
      console.log('✅ Conectado a la base de datos');
      await sequelize.sync();
      app.listen(process.env.PORT || 3005, () => {
        console.log(`🚀 Servidor corriendo en el puerto ${process.env.PORT}`);
      });
      break;
    } catch (err) {
      console.error('❌ Error al conectar con la base de datos:', err.message);
      if (retries === 0) {
        console.error('⛔ No se pudo conectar después de varios intentos. Abortando.');
        process.exit(1);
      }
      retries--;
      console.log(`🔁 Reintentando conexión en 6 segundos... (${4 - retries}/4)`);
      await new Promise(res => setTimeout(res, 6000));
    }
  }
};

startServer();
