const Order = require('../../domain/entities/order.entity');
const OrderRepository = require('../../domain/repositories/order.repository');
const axios = require('axios');

class CreateOrderUseCase {
  async execute(data) {
    const { product_id, quantity, price } = data;

    if (!product_id || !quantity || !price) {
      throw new Error('Faltan campos obligatorios: product_id, quantity o price');
    }

    // 🔍 Validar que el producto exista
    try {
      const response = await axios.get(`http://tienda-products:3006/api/products/${product_id}`);
      if (!response.data || response.data.id !== product_id) {
        throw new Error('El producto no existe');
      }
    } catch (err) {
      throw new Error('No se pudo validar el producto: ' + err.message);
    }

    // 🧮 Calcular total y crear orden
    const total = quantity * price;
    const order = new Order({ product_id, quantity, total });

    return await OrderRepository.save(order);
  }
}


module.exports = new CreateOrderUseCase();