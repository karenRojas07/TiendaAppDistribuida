const OrderModel = require('../../infrastructure/database/models/order.model');

class OrderRepository {
  async save(order) {
    return await OrderModel.create(order);
  }

  async findAll() {
    return await OrderModel.findAll();
  }
}

module.exports = new OrderRepository();