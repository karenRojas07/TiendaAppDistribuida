const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const OrderModel = sequelize.define('Order', {
  id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
  product_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  total: { type: DataTypes.DECIMAL(12, 2).UNSIGNED, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: true,
  tableName: 'orders'
});

module.exports = OrderModel;