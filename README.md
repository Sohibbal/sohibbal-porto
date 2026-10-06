# Portofolio Riset & Pembangunan Daerah - Yuri Marisa

Website portofolio resmi untuk **Yuri Marisa**, mahasiswa program studi Ekonomi Pembangunan Fakultas Ekonomi dan Bisnis Universitas Riau (Semester 7), peneliti muda, dan pegiat organisasi kemahasiswaan.

Dibangun dengan **Next.js (App Router)**, **Tailwind CSS**, dan **Framer Motion**, dirancang siap untuk di-*deploy* langsung ke **Vercel** dengan performa tinggi dan tampilan estetis.

---

## Fitur Utama

- **Kinetic Monogram Loading Screen**: Animasi garis SVG path monogram "YM" dengan *reveal motion* halus saat pertama kali web dibuka (didukung *session storage guard*).
- **Dual Theme (Light & Dark Mode)**: 
  - **Light Mode (Default)**: Palet *Soft Slate & Ice Mist* terinspirasi langsung dari warna asli dokumen PDF Yuri Marisa dipadukan dengan aksen almamater UNRI Royal Blue (`#2563EB`).
  - **Dark Mode**: Nuansa *Deep Midnight Slate* (`#090D16` & `#111827`) berlatar nyaman di mata dengan aksen Sky Blue (`#38BDF8`).
- **Interactive Lightbox Modal**: Seluruh sertifikat dan foto dokumentasi kegiatan dapat diklik untuk melihat gambar dokumen ukuran penuh dengan kontrol tombol `Esc`, klik di luar *backdrop*, atau tombol Close.
- **Showcase Riset & Publikasi Ilmiah**:
  1. *Jurnal Sinergi*: Evaluasi Perencanaan Pembangunan Desa Berbasis IDM dan SDGs Desa (Studi Kasus RKPDes Desa Resam Lapis).
  2. *Jurnal Strategia*: Pengaruh Pendidikan dan Kesehatan Terhadap Pembangunan Modal Manusia di Provinsi Riau Tahun 2015 : 2024.
  3. *Jurnal Kapalamada*: Strategi Penguatan Agroindustri Sagu Kabupaten Kepulauan Meranti untuk Meningkatkan Daya Saing Produk Lokal.
- **Pengalaman Lapangan & Kebijakan Publik**:
  - Magang BAPPEDA Kabupaten Bengkalis (Bidang PPEPD - Verifikasi & Validasi Dokumen Renja 47 OPD, Rapat Wali Data lintas instansi).
  - SELARAS WALHI Riau (Sekolah Keadilan Antar Generasi di Pulau Beting Aceh, Rupat Utara).
- **8 Rekam Jejak Kepanitiaan, MC, dan Prestasi**: Filter kategori dinamis (Kepemimpinan, Kepanitiaan, Public Speaking, Dokumentasi, Prestasi).
- **Saluran Kontak Siap Pakai**: Tombol langsung WhatsApp, salin alamat email dengan feedback instan, dan link Instagram.
- **Standar Antislop & Aksesibilitas**: Bebas dari karakter em dash, bebas dari klaim/angka palsu, rasio kontras teks memenuhi WCAG AA, dan navigasi ramah keyboard.

---

## Panduan Penempatan & Penggantian Aset Gambar

Semua gambar telah diekstrak secara otomatis dari file PDF portofolio asli dan tersimpan di dalam folder `public/images/`. Jika Anda ingin mengganti file gambar dengan resolusi yang lebih baru atau foto lainnya secara manual, silakan letakkan file dengan nama yang sama ke folder berikut:

```
public/images/
├── hero/
│   └── yuri-portrait.jpg        # Foto utama portrait Yuri (rasio 3:4)
├── publications/
│   ├── paper-sinergi.jpg        # Preview paper Jurnal Sinergi
│   ├── paper-strategia.jpg      # Preview paper Jurnal Strategia
│   └── paper-kapalamada.jpg     # Preview paper Jurnal Kapalamada
├── experience/
│   ├── bappeda/
│   │   ├── bappeda-1.jpg        # Foto kegiatan dinas BAPPEDA
│   │   └── bappeda-2.jpg        # Foto kantor / dokumen BAPPEDA
│   └── walhi/
│       ├── walhi-1.jpg          # Foto aksi pesisir Pulau Beting Aceh
│       └── walhi-2.jpg          # Foto sosial warga Desa Suka Damai
├── certificates/
│   ├── lpii-unri.jpg            # Sertifikat Kepengurusan LPII FEB UNRI
│   ├── bappeda-cert.jpg         # Sertifikat Magang BAPPEDA Bengkalis
│   └── eviews-workshop.jpg      # Sertifikat Workshop Analisis Data EViews
├── tools/
│   ├── eviews.svg               # Icon EViews 12
│   ├── excel.svg                # Icon Microsoft Excel
│   ├── mendeley.svg             # Icon Mendeley
│   ├── word.svg                 # Icon Microsoft Word
│   ├── canva.svg                # Icon Canva
│   └── capcut.svg               # Icon CapCut
└── organizations/
    ├── project-leader.jpg       # Foto Project Leader Proker Divisi
    ├── ie-cup.jpg               # Foto CO Konsumsi IE Cup 2024
    ├── fpvc-instinct8.jpg       # Foto Leader FPVC INSTINCT 8
    ├── moderator-edov.jpg       # Foto Moderator Seminar EDOV 2024
    ├── pesta-rakyat.jpg         # Foto Tim HID Pesta Rakyat IE
    ├── mc-hmj.jpg               # Foto MC Pelantikan Pengurus HMJ
    ├── instinct9.jpg            # Foto Leader Konsumsi INSTINCT 9
    └── walhi-juara1.jpg         # Foto Juara 1 Sayembara Video WALHI
```

---

## Menjalankan Proyek Secara Lokal

1. **Install Dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Buka peramban di [http://localhost:3000](http://localhost:3000).

3. **Kompilasi Produksi (Production Build)**:
   ```bash
   npm run build
   ```

---

## Panduan Deploy ke Vercel (Siap Pakai)

Proyek ini telah dikonfigurasi secara optimal untuk Vercel:

### Opsi A: Melalui GitHub (Paling Direkomendasikan)
1. Buat repositori baru di akun GitHub Anda (misal: `yuri-marisa-portfolio`).
2. Hubungkan dan push commit lokal ke GitHub:
   ```bash
   git remote add origin https://github.com/<username-anda>/yuri-marisa-portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. Buka dashboard [Vercel](https://vercel.com/) $\rightarrow$ Klik **"Add New Project"**.
4. Impor repositori GitHub tersebut. Vercel akan otomatis mendeteksi framework **Next.js**.
5. Klik tombol **Deploy**. Dalam 1-2 menit website akan langsung aktif online dengan domain `.vercel.app` gratis atau custom domain Anda!

### Opsi B: Melalui Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Jalankan perintah di terminal root proyek:
   ```bash
   vercel
   ```
3. Ikuti petunjuk singkat di layar untuk deploy instan.
