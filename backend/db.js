// backend/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // default XAMPP user
  password: '',         // kosong kalau tidak diatur
  database: 'db_absen'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Terhubung ke database MySQL!');
});

module.exports = connection;
