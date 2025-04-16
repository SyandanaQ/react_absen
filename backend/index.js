// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/absen', (req, res) => {
  db.query('SELECT * FROM absensi ORDER BY waktu DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post('/api/absen', (req, res) => {
  const { nama } = req.body;
  if (!nama) return res.status(400).json({ error: 'Nama harus diisi' });

  db.query('INSERT INTO absensi (nama) VALUES (?)', [nama], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const insertedId = result.insertId;
    db.query('SELECT * FROM absensi WHERE id = ?', [insertedId], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.status(201).json(rows[0]);
    });
  });
});

app.put('/api/absen/:id', (req, res) => {
    const { id } = req.params;
    const { nama } = req.body;
  
    db.query('UPDATE absensi SET nama = ? WHERE id = ?', [nama, id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id, nama });
    });
  });

  app.delete('/api/absen/:id', (req, res) => {
    const { id } = req.params;
  
    db.query('DELETE FROM absensi WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Data berhasil dihapus', id });
    });
  });
  

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
