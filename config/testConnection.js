const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',      // Ganti sesuai dengan konfigurasi Anda
  user: 'root',           // Ganti sesuai dengan username Anda
  password: '',           // Ganti sesuai dengan password Anda jika ada
  database: 'api_db'    // Ganti sesuai dengan nama database Anda
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
  connection.end();
});
