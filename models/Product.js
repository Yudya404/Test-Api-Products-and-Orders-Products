const db = require('../config/database');

class Product {
  // Mendapatkan semua product/ List Product
  static async findAll() {
    try {
      const [rows] = await db.query('SELECT * FROM product');
      return rows;
    } catch (error) {
      console.error('Error fetching all product:', error);
      throw error;  // Meneruskan error ke lapisan atas
    }
  }

  // Mencari product berdasarkan ID/ Detail Product
  static async findById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM product WHERE id = ?', [id]);
      if (rows.length === 0) {
        throw new Error(`Product with ID ${id} not found`);
      }
      return rows[0];
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  }

  // Membuat product baru/ Create Product
	static async create({ name, price, stock, sold, created_at, updated_at }) {
	  try {
		const [result] = await db.query(
		  'INSERT INTO product (name, price, stock, sold, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)', 
		  [name, price, stock, sold, created_at, updated_at]
		);
		return result;
	  } catch (error) {
		console.error('Error creating new product:', error);
		throw error;
	  }
	}

  // Mengupdate data product/ Update Product
	static async update(id, { name, price, stock, sold, created_at, updated_at }) {
	  try {
		const [result] = await db.query(
		  'UPDATE product SET name = ?, price = ?, stock = ?, sold = ?, created_at = ?, updated_at = ? WHERE id = ?', 
		  [name, price, stock, sold, created_at, updated_at, id]
		);
		return result;
	  } catch (error) {
		console.error(`Error updating product with ID ${id}:`, error);
		throw error;
	  }
	}


  // Menghapus product berdasarkan ID/ Delete Product
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM product WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        throw new Error(`User with ID ${id} not found or could not be deleted`);
      }
      return { message: `Product with ID ${id} has been deleted` };
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Product;
