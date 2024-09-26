const db = require('../config/database');

class Order {
	// Mendapatkan semua order beserta item terkait
	static async findAllWithItems() {
		try {
			const [rows] = await db.query(`
				SELECT o.id AS order_id, o.created_at AS order_created_at, o.updated_at AS order_updated_at,
					   oi.id AS item_id, oi.name, oi.price, oi.quantity, 
					   oi.stock, oi.sold, oi.created_at AS item_created_at, oi.updated_at AS item_updated_at
				FROM orders o
				JOIN orders_item oi ON o.id = oi.orders_id
			`);
			
			// Mengelompokkan hasil query ke dalam JSON order dan item terkait
			const orders = rows.reduce((acc, row) => {
				// Cari apakah order sudah ada di acc (array hasil pengelompokan)
				let order = acc.find(o => o.id === row.order_id);
				if (!order) {
					// Jika order belum ada, tambahkan ke acc
					order = {
						id: row.order_id,
						products: [], // Menggunakan 'products' untuk menyimpan item yang terkait
						created_at: row.order_created_at,
						updated_at: row.order_updated_at
					};
					acc.push(order);
				}
				// Tambahkan produk terkait ke dalam array products
				order.products.push({
					id: row.item_id,
					name: row.name,
					price: row.price,
					quantity: row.quantity,
					stock: row.stock,
					sold: row.sold,
					created_at: row.item_created_at,
					updated_at: row.item_updated_at
				});

				return acc;
			}, []); // Inisialisasi acc sebagai array kosong

			return orders;
		} catch (error) {
			console.error('Error fetching all orders with items:', error);
			throw error;  // Meneruskan error ke lapisan atas
		}
	}

	// Membuat order baru / Create Order
	static async create({ created_at, updated_at, products }) {
		try {
			// Insert ke tabel orders
			const [orderResult] = await db.query(
				'INSERT INTO orders (created_at, updated_at) VALUES (?, ?)', 
				[created_at, updated_at]
			);

			const orderId = orderResult.insertId; // Mendapatkan ID order yang baru dibuat

			// Insert ke tabel orders_item untuk setiap produk
			const productPromises = products.map(async (product) => {
				return db.query(
					'INSERT INTO orders_item (name, price, quantity, stock, sold, created_at, updated_at, orders_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
					[product.name, product.price, product.quantity, product.stock, product.sold, product.created_at, product.updated_at, orderId]
				);
			});

			await Promise.all(productPromises); // Tunggu hingga semua produk disimpan

			// Mengambil detail order yang baru dibuat, termasuk produk-produk terkait
			const [savedProducts] = await db.query(
				'SELECT id, name, price, quantity, stock, sold, created_at, updated_at FROM orders_item WHERE orders_id = ?',
				[orderId]
			);

			// Mengembalikan detail order beserta produk
			return {
				id: orderId,
				created_at,
				updated_at,
				products: savedProducts // Produk yang disimpan
			};
		} catch (error) {
			console.error('Error creating new order:', error);
			throw error; // Meneruskan error ke lapisan atas
		}
	}


	// Mengambil order dengan ID
	static async findById(orderId) {
		try {
			// Query untuk mengambil order dan produk terkait berdasarkan orderId
			const [rows] = await db.query(`
				SELECT o.id AS order_id, o.created_at AS order_created_at, o.updated_at AS order_updated_at,
					   oi.id AS product_id, oi.name, oi.price, oi.quantity, 
					   oi.stock, oi.sold, oi.created_at AS product_created_at, oi.updated_at AS product_updated_at
				FROM orders o
				JOIN orders_item oi ON o.id = oi.orders_id
				WHERE o.id = ?
			`, [orderId]);

			if (rows.length === 0) {
				return null; // Jika tidak ada order ditemukan
			}

			// Mengelompokkan hasil query ke dalam JSON order dan produk terkait
			const order = {
				id: rows[0].order_id,
				products: rows.map(row => ({
					id: row.product_id,
					name: row.name,
					price: row.price,
					quantity: row.quantity,
					stock: row.stock,
					sold: row.sold,
					created_at: row.product_created_at,
					updated_at: row.product_updated_at
				})),
				created_at: rows[0].order_created_at, // Pindah ke bawah products
				updated_at: rows[0].order_updated_at  // Pindah ke bawah products
			};

			return order; // Mengembalikan data order beserta produk
		} catch (error) {
			console.error('Error fetching order by ID:', error);
			throw error; // Meneruskan error ke lapisan atas
		}
	}


	// Menghapus order berdasarkan ID/ Delete Order
	static async delete(id) {
		try {
			// Ambil detail order sebelum dihapus
			const order = await this.findById(id); // Pastikan ada metode findById untuk mendapatkan detail order
			
			// Jika order tidak ditemukan, kembalikan pesan kesalahan
			if (!order) {
				return {
					message: 'Order not found',
					data: null
				};
			}

			// Hapus order dari database
			const [result] = await db.query('DELETE FROM orders WHERE id = ?', [id]);
			if (result.affectedRows === 0) {
				throw new Error(`Order with ID ${id} could not be deleted`);
			}

			// Susun respons sesuai format yang diinginkan
			return {
				message: 'Order deleted successfully',
				data: {
					id: order.id,
					products: order.products, // Sertakan detail produk dari order yang dihapus
					created_at: order.created_at,
					updated_at: order.updated_at
				}
			};
		} catch (error) {
			console.error(`Error deleting order with ID ${id}:`, error);
			throw error; // Meneruskan error ke lapisan atas
		}
	}
}

module.exports = Order;