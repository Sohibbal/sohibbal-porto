# Portofolio Resmi AI Engineer & Software Developer: M. Sohibbal

Website portofolio resmi untuk **M. Sohibbal**, mahasiswa program studi Teknik Informatika Fakultas Teknik Universitas Riau (IPK 3.81), AI / Machine Learning Engineer, MLOps Developer, dan peraih predikat ganda *Distinction Graduate* (Top 10%) program industri nasional DBS Foundation & Dicoding serta Accenture.

Dibangun dengan **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, dan **Framer Motion**, dirancang siap untuk di-*deploy* langsung ke **Vercel** dengan performa tinggi dan tampilan estetis beraksen **Orange TensorFlow** (`#FF6F00`).

---

## Fitur Utama

- **Floating RAG Chatbot Assistant (Kanan Bawah)**:
  - Asisten cerdas berbasis Retrieval-Augmented Generation (RAG) di pojok kanan bawah.
  - Menjawab pertanyaan seputar keahlian, riwayat mengajar, detail proyek, dan kontak secara akurat berdasarkan bank data dokumen resmi Sohibbal.
  - Terintegrasi dengan Next.js API Route (`/api/chat`), Google Gemini API, dan *zero-downtime intelligent fallback*.
  - Aksesibilitas keyboard penuh (tombol `Esc` untuk menutup drawer).
- **Desain Geometris Sudut Runcing & Outline Tegas**:
  - Seluruh kartu, container, modal, dan tombol menggunakan sudut runcing tegas (`rounded-none`), menciptakan nuansa *high-precision engineering aesthetic*.
  - Efek *lighting glass* halus (`backdrop-blur-md`) dengan pantulan garis tepi (*border sheen*) saat interaksi.
- **Kinetic Monogram Loading Screen**:
  - Animasi garis SVG path monogram "MS" (*M. Sohibbal*) dengan warna oranye TensorFlow.
  - Dilengkapi *session storage guard* agar transisi berlangsung cepat saat refresh.
- **Dual Theme (Light & Dark Mode)**:
  - **Light Mode**: Palet *Soft Slate Warm* (`#FBF8F3` & `#FFFFFF`) dengan teks kontras tinggi.
  - **Dark Mode (Default)**: Nuansa *Deep Charcoal & Slate* (`#0B0F17` & `#111827`) berlatar nyaman di mata dengan aksen TensorFlow Orange (`#FF7043`).
- **Hero Photo Deck dengan Orbiting Tech Stack**:
  - Foto profil Sohibbal didampingi kartu mikro teknologi inti (*Python, TensorFlow, Docker, Next.js, Flutter, PostgreSQL*) yang mengorbit/melayang halus di sekeliling kartu.
- **5 Featured AI & Software Projects**:
  1. *MISTECH*: Platform edukasi mitigasi bencana untuk siswa SD (Flutter & REST API backend).
  2. *INTELVIEW*: Sistem evaluasi wawancara otomatis berbasis multimodal AI (OpenCV, MediaPipe, YOLO).
  3. *Corseo*: Sistem rekomendasi cerdas hybrid Neural Collaborative Filtering dan Content-Based Filtering (TensorFlow).
  4. *SMART E-PPM*: Chatbot informasi berbasis Retrieval-Augmented Generation (RAG) untuk LPPM Universitas Riau.
  5. *MLOps Obesity Classification*: Alur kerja machine learning end-to-end dengan optimasi GridSearch, Docker, Prometheus, dan Grafana.
  - Setiap proyek dilengkapi pratinjau slide resolusi tinggi, badge peran, tautan langsung ke **GitHub Repo ↗**, **Live Deploy ↗**, dan **Modal Arsitektur Proyek**.
- **Rekam Jejak Asisten Laboratorium & Pengalaman Industri**:
  - Timeline vertikal pengalaman Asisten Lab AI dan Lab Basis Data UNRI, Software Engineer LPPM, Cohort AI DBS Foundation, Cohort ML Asah Accenture, serta Magang Home Credit.
- **Sertifikasi & Penghargaan Resmi**:
  - Lightbox modal untuk melihat sertifikat Distinction Graduate ganda dan sertifikasi pemodelan statistik.
- **Jejak Akademik & Komunitas Teknologi**:
  - Filter kategori dinamis (*Semua*, *Asisten Laboratorium*, *AI Cohort*, *Riset & Software*, *Workshop & Hackathon*).
- **Saluran Kontak Siap Pakai**:
  - Tombol langsung WhatsApp, salin alamat email dengan umpan balik visual, Instagram resmi (`@iib25_`), LinkedIn, dan GitHub.
- **Standar Antislop & Aksesibilitas**:
  - Bebas dari karakter em dash, bebas dari klaim/angka palsu, rasio kontras teks memenuhi WCAG AA, dan navigasi ramah keyboard.

---

## Struktur Folder Aset

Semua aset gambar dan dokumen telah disusun rapi di dalam folder `public/`:

```
public/
├── cv.pdf                           # Berkas PDF resmi CV M. Sohibbal
├── images/
│   ├── hero/
│   │   └── sohibbal-portrait.jpg    # Foto profil utama M. Sohibbal (rasio 3:4)
│   ├── projects/
│   │   ├── mistech.jpg              # Slide pratinjau proyek MiSTech
│   │   ├── intelview.jpg            # Slide pratinjau proyek INTELVIEW
│   │   ├── corseo.jpg               # Slide pratinjau proyek Corseo
│   │   ├── smart-eppm.jpg           # Slide pratinjau proyek SMART E-PPM
│   │   └── obesity-mlops.jpg        # Slide pratinjau proyek MLOps Obesity
│   ├── certificates/                # Sertifikat resmi kelulusan & penghargaan
│   └── organizations/               # Dokumentasi kegiatan asisten lab & cohort
```

---

## Konfigurasi Variabel Lingkungan (Opsional)

Untuk mengaktifkan model LLM Google Gemini pada RAG Chatbot, Anda dapat menambahkan berkas `.env.local` di root proyek:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

*Catatan: Jika `GEMINI_API_KEY` tidak diisi, chatbot otomatis beroperasi menggunakan mesin pencarian semantik lokal internal tanpa kendala (zero-downtime fallback).*

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

3. **Kompilasi Produksi**:
   ```bash
   npm run build
   ```

---

## Panduan Deploy ke Vercel

1. Hubungkan repositori ini ke akun GitHub Anda:
   ```bash
   git add .
   git commit -m "feat: complete M. Sohibbal portfolio overhaul"
   git remote add origin https://github.com/Sohibbal/sohibbal-portfolio.git
   git branch -M main
   git push -u origin main
   ```
2. Buka dashboard [Vercel](https://vercel.com/) $\rightarrow$ Klik **"Add New Project"**.
3. Impor repositori GitHub tersebut (Vercel otomatis mendeteksi framework **Next.js**).
4. (Opsional) Tambahkan Environment Variable `GEMINI_API_KEY` di pengaturan Vercel.
5. Klik **Deploy**. Website akan langsung aktif online!
