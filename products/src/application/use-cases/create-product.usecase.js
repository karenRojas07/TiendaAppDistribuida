const Product = require('../../domain/entities/product.entity');
const ProductRepository = require('../../domain/repositories/product.repository');

class CreateProductUseCase {
  async execute(data) {
    const product = new Product(data);
    return await ProductRepository.save(product);
  }
}

module.exports = new CreateProductUseCase();