const Order = require('../models/Order'); // Model order

// Mendapatkan daftar semua order
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAllWithItems();
        res.json({ message: 'Order List', data: orders });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
};

// Fungsi untuk mendapatkan semua order dengan produk terkait
exports.getOrdersWithProducts = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT o.id AS orders_id, o.created_at AS order_created_at, o.updated_at AS order_updated_at,
                   oi.id AS item_id, oi.name, oi.price, oi.quantity, 
                   oi.stock, oi.sold, oi.created_at AS item_created_at, oi.updated_at AS item_updated_at
            FROM orders o
            JOIN orders_item oi ON o.id = oi.orders_id
        `);

        // Mengelompokkan hasil query ke dalam JSON order dan produk terkait
        const orders = rows.reduce((acc, row) => {
            // Cari apakah order sudah ada di acc (array hasil pengelompokan)
            let order = acc.find(o => o.id === row.order_id);

            if (!order) {
                // Jika order belum ada, tambahkan ke acc
                order = {
                    id: row.order_id,
                    products: [], // Tempatkan products di atas
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

            // Set created_at dan updated_at untuk order, pastikan hanya di-set satu kali
            if (!order.created_at) {
                order.created_at = row.order_created_at;
            }
            if (!order.updated_at) {
                order.updated_at = row.order_updated_at;
            }

            return acc;
        }, []); // Inisialisasi acc sebagai array kosong

        // Kembalikan hasil dengan format JSON yang diinginkan
        res.json({ message: "Order List", data: orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Menambahkan order baru
exports.createOrder = async (req, res) => {
    console.log('Request Body:', req.body); // Debugging untuk melihat data yang dikirimkan
    const { created_at, updated_at, products } = req.body;

    // Validasi products
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Products must be an array and cannot be empty.' });
    }

    try {
        // Membuat order baru di database
        const newOrder = await Order.create({ created_at, updated_at, products });
        
        // Menyusun respons JSON dengan produk yang diinput
        res.status(201).json({
            message: 'Order created',
            data: {
                id: newOrder.id,
                products: newOrder.products, // Sertakan produk yang dimasukkan
                created_at: newOrder.created_at, // Tanggal order
                updated_at: newOrder.updated_at  // Tanggal update
            }
        });
    } catch (error) {
        console.error('Error in createOrder:', error); // Debugging untuk melihat error
        res.status(500).json({ error: 'Failed to create order' });
    }
};

// Mendapatkan order berdasarkan ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json({ message: 'Order Detail', data: order });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Menghapus order berdasarkan ID
exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id; // Ambil ID dari parameter URL
        
        // Menghapus order dan mendapatkan respons dari model
        const result = await Order.delete(orderId);
        
        // Kirim respons sukses
        res.status(200).json(result);
    } catch (error) {
        // Jika terjadi kesalahan, kirim respons kesalahan
        console.error('Failed to delete order:', error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
};
