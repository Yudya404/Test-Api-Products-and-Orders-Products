const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

// Rute untuk mendapatkan semua order beserta produk terkait
router.get('/with-products', orderController.getOrdersWithProducts); // Tambahkan ini

// Rute untuk order lainnya
router.get('/', orderController.getOrders);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.delete('/:id', orderController.deleteOrder);

// Mengatasi endpoint tidak ditemukan
router.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

module.exports = router;
