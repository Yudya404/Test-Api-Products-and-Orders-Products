# Test-API
A example create API konfiguration for Products And Orders
=======
#Product API
Product API adalah RESTful API yang dibangun dengan Node.js, Express.js, dan MariaDB/MySQL. API ini mendukung operasi 
CRUD (Create, Read, Update, Delete) atau biasa disebut dengan metode GET, POST, PUT, DELETE untuk mengelola data product dan orders. 
Aplikasi ini juga dapat dijalankan menggunakan Docker untuk memudahkan proses deployment.

#Fitur Utama
- GET /api/products  : Mendapatkan daftar product/ List Product.
- POST /api/products  : Menambahkan product baru/ Created Product.
- GET /api/products/id  : Mendapatkan detail product berdasarkan ID.
- PUT /api/products/id : Memperbarui product berdasarkan ID/ Update Product.
- DELETE /api/products/id  : Menghapus product berdasarkan ID/ Delete Product.
- GET /api/orders  : Mendapatkan daftar order/ List order.
- POST /api/orders  : Menambahkan order baru/ Created order.
- GET /api/orders/id  : Mendapatkan detail order berdasarkan ID.
- DELETE /api/orders/id  : Menghapus order berdasarkan ID/ Delete order.

# Link Akses
- http://localhost:3000/api/products
- http://localhost:3000/api/orders

#Prasyarat Sistem
Sebelum menjalankan aplikasi ini, pastikan Anda telah menginstal perangkat berikut:

Node.js: Versi 14 atau lebih tinggi.
MariaDB/MySQL: Versi 10.4.32-MariaDB Database untuk menyimpan data product.
Docker: versi 3.8 atau yang lebih tinggi (Disarankan) Untuk menjalankan aplikasi dan database dalam container.

#Instalasi dan Menjalankan Aplikasi

1. Konfigurasi Variabel Lingkungan
Buat file .env di direktori proyek (misal: test-api) anda untuk menyimpan konfigurasi basis data dan pengaturan server:

DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=user_management
PORT=3000

*Keterangan
- DB_HOST: Host database (gunakan localhost jika dijalankan secara lokal, atau db jika menggunakan Docker).
- DB_USER: Nama pengguna untuk basis data (misalnya, root).
- DB_PASS: Kata sandi untuk pengguna basis data.
- DB_NAME: Nama database yang digunakan (misalnya, user_management).
- PORT: Port yang digunakan oleh server Node.js (default 3000).

2. Menjalankan Aplikasi Tanpa Docker (Opsional)
2.1. Install Dependencies
Jalankan perintah ini untuk menginstall dependencies yang diperlukan:
 --> npm install
 
2.2. Buat Database di MariaDB/MySQL
Sebelum menjalankan aplikasi, buat database di MariaDB atau MySQL.

3. Menjalankan Aplikasi dengan Docker (Disarankan)
3.1. Setup Docker
Jika Anda lebih memilih menjalankan aplikasi menggunakan Docker, langkah-langkah berikut akan memandu Anda.

# Jalankan Docker Compose 
Pastikan Docker dan Docker Compose sudah terinstall. Untuk menjalankan aplikasi dan database, jalankan perintah berikut:
 --> docker-compose up

*Keterangan
(Jika menggunakan Docker)
Ini akan memulai dua container:
1. db : Container MariaDB dengan database api_db.
2. app : Container Node.js yang menjalankan aplikasi pada port 3000.
3. phpmyadmin : Container phpmyadmin yang berjalan di port 8080:80.
4. Akses pada link berikut pada POSTMAN atau alat testing lainnya :
	--> http://localhost:3000/api/products
	--> http://localhost:3000/api/orders

(Jika menggunakan Server Node.js langsung)
4. Menjalankan Aplikasi dengan server Node.js langsung Gunakan perintah berikut:
 --> node app.js
5. Jangan lupa jalankan xampp (Start Apache) dan (Start Mysql).
6. Akses pada link berikut pada POSTMAN atau alat testing lainnya :
	--> http://localhost:3000/api/products
	--> http://localhost:3000/api/orders

# Menghentikan Aplikasi
(Jika Menjalankan Menggunkan Server Docker)
1. Jika Anda ingin menghentikan aplikasi dan menghapus container, jalankan perintah:
	--> docker-compose down
(Jika Menjalankan Menggunkan Server Node.js langsung)	
2. Combinasi CTRL + C

Note :
Pada saat Menjalankan Program jangan lupa import dahulu database di kedua server (Docker atau Node.js) pilih salah satu database atau db bernama
(api.db berada di folder proyek atau test api)

Lisensi
Aplikasi ini dilisensikan di bawah MIT License.
