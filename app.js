const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Gunakan routes untuk order dan produk
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);  // Route untuk produk

// Handling undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
