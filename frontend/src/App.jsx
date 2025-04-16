import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [absen, setAbsen] = useState([]);
  const [nama, setNama] = useState('');
  const [editId, setEditId] = useState(null);

  // Ambil data absensi dari backend saat pertama kali load
  useEffect(() => {
    axios.get('http://localhost:5000/api/absen')
      .then(res => setAbsen(res.data))
      .catch(err => console.error('Gagal ambil data:', err));
  }, []);

  // Fungsi untuk submit absen
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama.trim()) return;

    try {
      if (editId) {
        // UPDATE
        await axios.put(`http://localhost:5000/api/absen/${editId}`, { nama });
        setAbsen(absen.map(item =>
          item.id === editId ? { ...item, nama } : item
        ));
        setEditId(null);
      } else {
        // CREATE
        const res = await axios.post('http://localhost:5000/api/absen', { nama });
        setAbsen([res.data, ...absen]);
      }
      setNama('');
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/absen/${id}`);
      setAbsen(absen.filter(item => item.id !== id));
    } catch (error) {
      console.error('Gagal menghapus:', error);
    }
  };

  const handleEdit = (item) => {
    setNama(item.nama);
    setEditId(item.id);
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', fontFamily: 'Arial', textAlign: 'center' }}>
      <h2>Absensi</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan nama"
          required
          style={{ padding: '8px', width: '80%', marginBottom: '10px', textAlign: 'center' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          {editId ? 'Simpan' : 'Absen'}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setNama('');
            }}
            style={{ marginLeft: 8 }}
          >
            Batal
          </button>
        )}
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #000' }}>
            <th style={{ padding: '8px' }}>Nama</th>
            <th style={{ padding: '8px' }}>Waktu</th>
            <th style={{ padding: '8px' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {absen.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: '8px' }}>{item.nama}</td>
              <td style={{ padding: '8px' }}>{new Date(item.waktu).toLocaleString()}</td>
              <td style={{ padding: '8px' }}>
                <button onClick={() => handleEdit(item)} style={{ marginRight: 8 }}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={{ color: 'red' }}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
