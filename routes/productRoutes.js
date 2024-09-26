const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/', productController.getProduct);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct); // Perbaikan di sini

router.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

module.exports = router;
