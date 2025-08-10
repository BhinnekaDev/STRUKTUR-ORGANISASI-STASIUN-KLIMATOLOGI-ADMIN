
---

# 📘 STRUKTUR ORGANISASI STASIUN KLIMATOLOGI — **ADMIN**

*Aplikasi web untuk mengelola data struktur organisasi stasiun klimatologi BMKG secara terpusat dan real-time.*

> Digunakan oleh **admin BMKG** untuk memperbarui data jabatan, personel, dan hierarki organisasi.

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fgithub.com%2FBhinnekaDev%2FSTRUKTUR-ORGANISASI-STASIUN-KLIMATOLOGI-ADMIN\&label=Repo%20GitHub\&up_color=blue\&style=flat-square)](https://github.com/BhinnekaDev/STRUKTUR-ORGANISASI-STASIUN-KLIMATOLOGI-ADMIN)
[![Stars](https://img.shields.io/github/stars/BhinnekaDev/STRUKTUR-ORGANISASI-STASIUN-KLIMATOLOGI-ADMIN?style=flat-square)](https://github.com/BhinnekaDev/STRUKTUR-ORGANISASI-STASIUN-KLIMATOLOGI-ADMIN/stargazers)
[![Forks](https://img.shields.io/github/forks/BhinnekaDev/STRUKTUR-ORGANISASI-STASIUN-KLIMATOLOGI-ADMIN?style=flat-square)](https://github.com/BhinnekaDev/STRUKTUR-ORGANISASI-STASIUN-KLIMATOLOGI-ADMIN/network)
[![Last Commit](https://img.shields.io/github/last-commit/BhinnekaDev/STRUKTUR-ORGANISASI-STASIUN-KLIMATOLOGI-ADMIN?style=flat-square)](https://github.com/BhinnekaDev/STRUKTUR-ORGANISASI-STASIUN-KLIMATOLOGI-ADMIN/commits/main)

![Platform](https://img.shields.io/badge/platform-Web-blue?style=flat-square)
![Next.js](https://img.shields.io/badge/built%20with-Next.js-000000?logo=nextdotjs\&style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react\&logoColor=white\&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript\&logoColor=white\&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwindcss\&logoColor=white\&style=flat-square)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel\&logoColor=white\&style=flat-square)

---

## 🌐 Demo <a id="demo"></a>

**[https://struktur-organisasi-stasiun-klimato-admin.vercel.app](https://struktur-organisasi-stasiun-klimato-admin.vercel.app)** (akses terbatas, login diperlukan)

---

## 🚀 Fitur <a id="fitur"></a>

| Modul                   | Deskripsi                                                  |
| ----------------------- | ---------------------------------------------------------- |
| **Login & Auth**        | Autentikasi admin menggunakan email/password & JWT         |
| **Manajemen Jabatan**   | Tambah, ubah, hapus data jabatan dalam struktur organisasi |
| **Manajemen Personel**  | Tambah, ubah, hapus data personel beserta detail tugas     |
| **Pengaturan Hierarki** | Mengatur urutan & hubungan antar jabatan                   |
| **Upload Foto**         | Upload foto personel untuk ditampilkan di aplikasi publik  |
| **API Management**      | CRUD data yang langsung terhubung dengan aplikasi publik   |
| **Responsive Layout**   | Tampilan optimal di desktop & perangkat mobile             |
| **Dark/Light Mode**     | Tampilan tema otomatis sesuai preferensi pengguna          |

---

## ⚙️ Teknologi <a id="teknologi"></a>

| Layer           | Stack                                                            |
| --------------- | ---------------------------------------------------------------- |
| **Frontend**    | Next.js 15.4.x, React 19.1.x, TypeScript 5.9.x, Tailwind CSS 4.0 |
| **Backend**     | Node.js / Express, API REST, JWT Auth                            |
| **Database**    | MongoDB / PostgreSQL                                             |
| **CI & Deploy** | GitHub Actions, Vercel Edge Runtime                              |

---

## 🛠️ Instalasi <a id="instalasi"></a>

```bash
# Klon repo
$ git clone https://github.com/BhinnekaDev/STRUKTUR-ORGANISASI-STASIUN-KLIMATOLOGI-ADMIN.git
$ cd STRUKTUR-ORGANISASI-STASIUN-KLIMATOLOGI-ADMIN

# Instal dependensi
$ npm install
```

Buat file **.env**:

```env
NEXT_PUBLIC_API_BASE_URL_KLIMATOLOGI=https://api.kamu.com/api
```

Jalankan mode development:

```bash
$ npm run dev
```

Akses **[http://localhost:3000](http://localhost:3000)**

---

## 🖥️ Penggunaan <a id="penggunaan"></a>

1. Login menggunakan akun admin yang valid.
2. Gunakan menu navigasi untuk mengelola jabatan, personel, dan hierarki.
3. Perubahan tersimpan otomatis ke database dan sinkron dengan aplikasi publik.
4. Gunakan fitur pencarian untuk menemukan data dengan cepat.
5. Logout jika sudah selesai.

---

## 🤝 Kontribusi <a id="kontribusi"></a>

1. Fork ➜ branch ➜ coding
2. Commit dengan pesan jelas
3. Jalankan `npm run lint` sebelum PR
4. Submit Pull Request

---

## 📜 Lisensi <a id="lisensi"></a>

MIT © 2025 [Bhinneka Dev](https://github.com/BhinnekaDev)

---

<p align="center">
  <img alt="Cuplikan Admin" src="https://github.com/user-attachments/assets/7f5c6b07-6141-482d-b898-7b0addd29184" width="80%" />
</p>

<p align="center"><sub>Bhinneka Developer © 2025</sub></p>

---
