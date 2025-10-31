const axios = require('axios');
const Order = require('../../domain/entities/order.entity');
const OrderRepository = require('../../domain/repositories/order.repository');

class CreateOrderUseCase {
  async execute(data) {
    const { product_id, quantity } = data;

    if (!product_id || !quantity) {
      throw new Error('Faltan campos obligatorios: product_id o quantity');
    }

    // 🔍 Obtener el producto
    let product;
    try {
      const response = await axios.get(`http://tienda-products/api/products/${product_id}`);
      product = response.data;
      if (!product || product.id !== product_id) {
        throw new Error('El producto no existe');
      }
    } catch (err) {
      throw new Error('No se pudo validar el producto: ' + err.message);
    }

    // 📦 Verificar stock disponible
    if (product.stock < quantity) {
      throw new Error(`No hay suficiente stock disponible. Stock actual: ${product.stock}`);
    }

    // 🧮 Calcular total usando el precio del producto
    const total = quantity * product.price;

    // 📝 Crear orden con nombre del producto
    const order = new Order({
      product_id,
      quantity,
      total
    });

    // 🔄 Actualizar stock del producto
    try {
      await axios.put(`http://tienda-products/api/products/${product_id}/stock`, {
        stock: product.stock - quantity
      });
    } catch (err) {
      throw new Error('No se pudo actualizar el stock del producto: ' + err.message);
    }

    // 💾 Guardar orden
    return await OrderRepository.save(order);
  }
}

module.exports = new CreateOrderUseCase();