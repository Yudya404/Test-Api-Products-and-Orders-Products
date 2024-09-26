const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,       // Menunggu koneksi jika penuh
  connectionLimit: 10,            // Batas maksimum koneksi dalam pool
  queueLimit: 0                   // Antrian koneksi tidak terbatas
});

module.exports = pool.promise();
