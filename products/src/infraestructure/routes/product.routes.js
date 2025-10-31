const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product.model');
const CreateProductUseCase = require('../../application/use-cases/create-product.usecase');
const ProductRepository = require('../../domain/repositories/product.repository');

router.post('/', async (req, res) => {
  try {
    const product = await CreateProductUseCase.execute(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await ProductRepository.findAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await ProductModel.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/stock', async (req, res) => {
  try {
    const { stock } = req.body;
    const product = await ProductModel.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    product.stock = stock;
    await product.save();

    res.status(200).json({ message: 'Stock actualizado', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;