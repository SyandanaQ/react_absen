# React Absensi

Aplikasi absensi sederhana menggunakan **React** untuk frontend dan **Express** untuk backend, dengan database **MySQL**.

## Fitur
- Menambah, mengedit, dan menghapus data absensi.
- Menampilkan daftar absensi yang tercatat.

## Teknologi
- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: MySQL (menggunakan XAMPP)

## Instalasi

1. **Clone Repository**:
    ```bash
    git clone https://github.com/SyandanaQ/react_absen.git
    ```

2. **Instalasi Frontend**:
    ```bash
    cd frontend
    npm install
    ```

3. **Instalasi Backend**:
    ```bash
    cd backend
    npm install
    ```

4. **Konfigurasi Database**:
    - Pastikan MySQL di XAMPP berjalan.
    - Buat database `absensi_db` dan import skema dari `backend/db.sql`.

5. **Menjalankan Aplikasi**:
    - Jalankan Backend:
      ```bash
      cd backend
      npm start
      ```
    - Jalankan Frontend:
      ```bash
      cd frontend
      npm run dev
      ```

Frontend akan berjalan di `http://localhost:3000`, dan backend di `http://localhost:5000`.

## Kontribusi
Fork repository ini dan kirim pull request untuk berkontribusi.

## Lisensi
Lisen proyek ini menggunakan [MIT License](LICENSE).
