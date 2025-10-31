class Order {
  constructor({ product_id, quantity, total }) {
    this.product_id = product_id;
    this.quantity = quantity;
    this.total = total;
  }
}

module.exports = Order;