const Product = require('../models/Product');

// Mendapatkan daftar semua produk/ List Product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findAll();
    res.json({ message: 'Product List', data: product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
};

// Menambahkan produk baru/ Create Produk
exports.createProduct = async (req, res) => {
  const { name, price, stock, sold, created_at, updated_at } = req.body;
  try {
    // Membuat produk baru dan mendapatkan insertId
    const result = await Product.create({ name, price, stock, sold, created_at, updated_at });

    // Mengambil produk baru berdasarkan insertId
    const newProduct = await Product.findById(result.insertId);

    // Mengirimkan respons berhasil dengan data produk yang baru dibuat
    res.status(201).json({
      message: 'Product created successfully',
      data: newProduct, // Data produk yang lengkap
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// Mendapatkan product berdasarkan ID/ Detail Product
exports.getProductById = async (req, res) => {
  try {
    // Cari produk berdasarkan ID
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      // Produk tidak ditemukan
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Produk ditemukan, kirimkan data produk
    res.status(200).json({
      message: 'Product Detail',
      data: product, // Data produk yang ditemukan
    });
  } catch (err) {
    // Kesalahan pada server atau database
    res.status(500).json({ message: 'Error retrieving product' });
  }
};

// Mengupdate produk berdasarkan ID/ Update Produk
exports.updateProduct = async (req, res) => {
  const { name, price, stock, sold, created_at, updated_at } = req.body;
  try {
    // Cari produk berdasarkan ID sebelum di-update
    const product = await Product.findById(req.params.id);

    if (product) {
      // Update produk jika ditemukan
      await Product.update(req.params.id, { name, price, stock, sold, created_at, updated_at });
      
      // Ambil data produk yang sudah diperbarui
      const updatedProduct = await Product.findById(req.params.id);
      
      // Mengirimkan respons dengan data produk yang telah diperbarui
      res.status(200).json({
        message: 'Product updated successfully',
        data: updatedProduct, // Data produk setelah diupdate
      });
    } else {
      // Produk tidak ditemukan
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    // Kesalahan pada server atau database
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Menghapus produk berdasarkan ID/ Delete Produk
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Cari produk berdasarkan ID
    const product = await Product.findById(id);
    
    if (product) {
      // Hapus produk jika ditemukan
      await Product.delete(id);
      
      // Mengirimkan respons dengan data produk yang dihapus
      res.status(200).json({
        message: 'Product deleted successfully',
        data: product, // Produk yang baru saja dihapus
      });
    } else {
      // Produk tidak ditemukan
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    // Kesalahan pada server atau database
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

