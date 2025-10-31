const CreateOrderUseCase = require('../../application/use-cases/create-order.usecase');
const OrderRepository = require('../../domain/repositories/order.repository');

async function createOrder(req, res) {
  try {
    const order = await CreateOrderUseCase.execute(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await OrderRepository.findAll();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createOrder, getOrders };