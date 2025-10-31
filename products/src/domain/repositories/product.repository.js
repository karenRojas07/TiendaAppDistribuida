const ProductModel = require('../../infraestructure/models/product.model');

class ProductRepository {
  async save(productEntity) {
    return await ProductModel.create({
      name: productEntity.name,
      price: productEntity.price,
      stock: productEntity.stock,
      estado: productEntity.estado
    });
  }

  async findAll() {
    return await ProductModel.findAll();
  }
}

module.exports = new ProductRepository();