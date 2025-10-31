const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const ProductModel = sequelize.define('Product', {
  id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  estado: { type: DataTypes.ENUM('activo', 'inactivo'), allowNull: false, defaultValue: 'activo' }
}, {
  timestamps: true,
  tableName: 'products'
});

module.exports = ProductModel;