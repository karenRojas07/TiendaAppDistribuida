require('dotenv').config();
const express = require('express');
const sequelize = require('./infraestructure/database/sequelize');
const productRoutes = require('./infraestructure/routes/product.routes');

const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

const startServer = async () => {
  let retries = 4;
  while (true) {
    try {
      await sequelize.authenticate();
      console.log('✅ Conectado a la base de datos');
      await sequelize.sync();
      app.listen(process.env.PORT || 3006, () => {
        console.log(`🚀 Servidor de productos corriendo en el puerto ${process.env.PORT || 3006}`);
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