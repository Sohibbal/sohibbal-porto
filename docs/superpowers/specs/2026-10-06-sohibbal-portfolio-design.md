# Desain Spesifikasi: Portofolio Personal & Asisten RAG M. Sohibbal

**Tanggal**: 06 Oktober 2026  
**Status**: Disetujui (Draft Terfinalisasi)  
**Pemilik Proyek**: M. Sohibbal  
**Framework & Teknologi**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Google Gemini API  

---

## 1. Ringkasan Eksekutif & Tujuan Proyek

Proyek ini bertujuan untuk mengadaptasi dan merombak struktur portofolio yang telah ada menjadi portofolio resmi **M. Sohibbal**, seorang mahasiswa Teknik Informatika Universitas Riau (IPK 3.81) dengan fokus utama pada **AI / Machine Learning Engineering**, **MLOps**, serta **Fullstack & Mobile Development**.

Prinsip utama desain ini adalah:
1. **Mempertahankan Nilai Estetika Asli**: Menjaga gaya visual website yang bersih, minimalis, dan berbasis tipografi elegan seperti portofolio referensi, tanpa menambahkan ikon dan badge yang tidak fungsional.
2. **Karakter Visual Khusus AI Engineer**: Memadukan palet warna Minimal Tech (*Clean Slate* pada mode terang dan *Deep Charcoal/Navy* `#0D1117` pada mode gelap) dengan warna aksen khas **Orange TensorFlow** (`#FF6F00` / `#EA580C`).
3. **Bukti Nyata Tanpa Klaim Kosong**: Menampilkan 5 proyek nyata yang telah dikerjakan, riwayat mengajar resmi sebagai Asisten Laboratorium AI dan Basis Data UNRI, serta pencapaian ganda *Distinction Graduate* (Top 10%) di program industri nasional (DBS Foundation & Accenture).
4. **Fitur Interaktif RAG Chatbot**: Mengintegrasikan asisten chatbot cerdas berbasis *Retrieval-Augmented Generation* (RAG) di pojok kanan bawah yang mampu menjawab pertanyaan pengunjung secara akurat berdasarkan data asli Sohibbal.

---

## 2. Identitas Desain & Standar Antislop

### 2.1 Palet Warna & Tipografi
- **Warna Aksen**: Orange TensorFlow (`#FF6F00` / `#F97316`), menggantikan aksen biru sebelumnya.
- **Mode Terang (Light)**:
  - Latar Belakang: `#FBF8F3` (Soft Slate Warm)
  - Permukaan Kartu: `#FFFFFF` (dengan batas halus `#E8E0D2`)
  - Teks Utama: `#0A1329`
  - Teks Sekunder: `#4A576E`
- **Mode Gelap (Dark)**:
  - Latar Belakang: `#0B0F17` / `#0D1117`
  - Permukaan Kartu: `#111827` (dengan batas halus `#1F2937`)
  - Teks Utama: `#F9FAFB`
  - Teks Sekunder: `#9CA3AF`
- **Tipografi**: `Plus Jakarta Sans` / font sans clean sistematis, mengedepankan keterbacaan tinggi dan hierarki teks yang tegas tanpa huruf kapital berlebihan.
- **Aturan Tipografi Antislop**: Dilarang keras menggunakan karakter em dash di seluruh tampilan antarmuka dan konten. Gunakan tanda titik dua, tanda kurung, koma, atau tanda strip pendek (`-`) yang wajar.

### 2.2 Geometri Sudut Runcing, Outline Tegas & Efek Lighting Glass
- **Sudut Runcing (Sharp Edges / Non-Rounded)**: Seluruh kartu di setiap section, frame foto, container, modal, tombol, badge fungsional, dan drawer chatbot menggunakan orientasi sudut runcing/tajam (`rounded-none` atau sudut presisi geometris tanpa radius melengkung besar/pill-shape).
- **Outline Tegas (Crisp Precision Borders)**: Menggunakan garis batas yang tegas dan kontras (`border border-border-subtle` atau `border-accent-brand`), dengan efek pantulan garis tepi (*border sheen*) saat interaksi/hover (`hover:border-accent-brand transition-colors duration-200`).
- **Smooth Lighting Glass**: Permukaan kartu memadukan latar belakang semi-transparan halus (`bg-surface/90 backdrop-blur-md`) dengan outline tegas, memberikan nuansa teknologi presisi tinggi (high-precision engineering aesthetic).
- **Minimalisme Elemen**: Menghindari tumpukan badge (*badge-stacking*) dan dekorasi berlebih. Badge hanya berupa kotak bersudut tegas untuk hal fungsional seperti label kategori atau status rilis.
- **Framer Motion Ringan**: Durasi transisi ringkas (0.3 sampai 0.4 detik) dengan kurva pergerakan `ease: [0.16, 1, 0.3, 1]`, dibatasi pada properti `opacity` dan pergeseran sumbu Y minimal (`y: 12px`) untuk memastikan pengalaman bebas lag di perangkat mobile.

---

## 3. Struktur Halaman & Rincian Section

### 3.1 Loading Screen (Kinetic Monogram)
- Menampilkan animasi garis SVG path monogram **"MS"** (*M. Sohibbal*).
- Garis digambar dinamis dengan warna aksen oranye TensorFlow.
- Dilengkapi *sessionStorage guard* agar hanya berjalan dengan durasi penuh pada kunjungan pertama sesi peramban.

### 3.2 Sticky Glass Navbar
- **Brand**: `sohibbal.porto` dengan aksen oranye minimal.
- **Tautan Navigasi Bersih**: *Keahlian*, *Proyek*, *Pengalaman*, *Sertifikat*, *Jejak*, *Kontak*.
- **Aksi Kanan**: Tombol alih tema (*Light/Dark switcher*) dan tombol aksi langsung *Hubungi*.
- **Menu Seluler**: Panel drawer responsif yang mudah dijangkau dengan tombol tap target standar minimal 44px.

### 3.3 Hero Section
- **Eyebrow Tag**: `Teknik Informatika • Universitas Riau`.
- **Nama & Peran**: Kotak pengetik otomatis berulang (*typewriter*):
  - *M. Sohibbal*
  - *AI & Machine Learning Engineer*
  - *MLOps Developer*
  - *Fullstack & Mobile Developer*
- **Deskripsi Ringkas**: Pengantar fokus analitika data, implementasi model machine learning pada skenario nyata, dan pengembangan perangkat lunak terintegrasi.
- **Hero Photo Deck**:
  - Foto utama profil Sohibbal dalam kartu berestetika modern rasio 3:4.
  - Kartu mikro icon tech stack utama (*Python, TensorFlow, Docker, Next.js, Flutter, PostgreSQL*) melayang halus (*smooth floating/orbiting motion*) di sekeliling kartu foto tanpa mengganggu fokus visual utama.
- **3 Metrik Riil**:
  1. `5+ Proyek`: Sistem AI, machine learning, mobile, dan dashboard terapan.
  2. `Top 10%`: Lulusan terbaik ganda (*Distinction Graduate*) program DBS Foundation dan Accenture.
  3. `3.81 IPK`: Rekam jejak akademik di Universitas Riau.
- **Tombol Aksi**:
  - `Lihat CV ↗` (Membuka berkas PDF CV resmi melalui modal dokumen).
  - `Hubungi Saya →` (Navigasi mulus ke bagian kontak).

### 3.4 Section Keahlian & Tech Stack (`#keahlian`)
- Menampilkan daftar keahlian tanpa tumpukan ikon yang tidak perlu:
  - **AI & Machine Learning**: TensorFlow, Scikit-Learn, PyTorch, MediaPipe, OpenCV, Retrieval-Augmented Generation (RAG).
  - **Bahasa Pemrograman**: Python, TypeScript, JavaScript, Dart, SQL.
  - **Pengembangan Web & Aplikasi**: Next.js, React, Tailwind CSS, Flutter, Node.js.
  - **DevOps, Basis Data, & Alat**: Docker, PostgreSQL, MySQL, Prometheus, Grafana, Git.
- Desain baris tabel minimalis dengan pembagi garis bersih (*divider lines*), memuat nama teknologi, kategori, dan deskripsi fungsional singkat.

### 3.5 Section Proyek Unggulan (`#proyek`)
Menggantikan naskah publikasi riset menjadi etalase 5 proyek nyata yang diekstrak dari dokumen portofolio resmi Sohibbal:
1. **MISTECH** (*Disaster Education Platform*):
   - Peran: Mobile Developer.
   - Kolaborasi: FKIP Universitas Riau.
   - Ringkasan: Aplikasi mobile Flutter untuk pembelajaran mitigasi bencana siswa SD dan web dashboard manajemen konten edukasi serta kuis.
   - Tech Stack: Flutter, Dart, REST API, Database Management.
   - Tautan: GitHub (`github.com/Sohibbal/mistech-app`), Live Deploy (`mistechgeosentra.com`).
2. **INTELVIEW** (*AI-Powered Interview Assessment System*):
   - Peran: AI/ML Engineer.
   - Ringkasan: Sistem evaluasi wawancara otomatis multimodal yang menganalisis aspek visual, ujaran, dan bahasa.
   - Tech Stack: OpenCV, MediaPipe, YOLO, Python, Multimodal AI Pipeline.
   - Tautan: GitHub (`github.com/zennn08/intelview`), Live Deploy (`aqul-intelview.hf.space`).
3. **Corseo** (*AI Recommendation Engine*):
   - Peran: AI/ML Engineer.
   - Ringkasan: Sistem rekomendasi kursus, lowongan kerja, dan forum diskusi menggunakan pendekatan hybrid Neural Collaborative Filtering dan Content-Based Filtering.
   - Tech Stack: TensorFlow, TF-IDF, Dimensionality Reduction, Python.
   - Tautan: GitHub (`github.com/Diki04/Corseo`), Live Deploy (`corseo.mistechgeosentra.com`).
4. **SMART E-PPM** (*RAG Information Chatbot*):
   - Peran: AI/ML Engineer.
   - Mitra: Lembaga Penelitian dan Pengabdian kepada Masyarakat (LPPM) Universitas Riau.
   - Ringkasan: Chatbot berbasis Retrieval-Augmented Generation untuk mempermudah akses informasi, pengumuman, dan panduan E-PPM melalui antarmuka percakapan.
   - Tech Stack: Python, Retrieval-Augmented Generation (RAG), Document Embeddings, LLM Integration.
   - Tautan: GitHub (`github.com/Diki04/E-PPM-Landing-Page`), Live Deploy (`e-ppm.unri.ac.id/home/`).
5. **MLOps Obesity Classification**:
   - Peran: MLOps Developer (Proyek Mandiri).
   - Ringkasan: Alur kerja machine learning end-to-end mulai dari optimasi model Random Forest dengan GridSearch hingga deployment kontainer Docker dan monitoring metrik dengan Prometheus serta Grafana.
   - Tech Stack: Scikit-Learn, Docker, Prometheus, Grafana, Python.
   - Tautan: GitHub (`github.com/Sohibbal/obesity-classification`), DockerHub (`hub.docker.com/r/sohibbal/obesity-classification`).

Setiap kartu proyek dilengkapi:
- Pratinjau gambar slide dokumen asli.
- Badge badge tech stack fungsional dan peran kerja.
- Tombol tautan langsung ke **GitHub Repo ↗** dan **Live Deploy ↗**.
- Tombol modal untuk membaca detail kontribusi dan hal yang dipelajari (*What I Learned*).

### 3.6 Section Pengalaman Asisten Lab & Industri (`#pengalaman`)
Tata letak garis waktu vertikal (*vertical timeline*) yang memuat rekam jejak formal:
1. **Asisten Laboratorium Kecerdasan Buatan (Lab AI)**: Universitas Riau (2026 - Sekarang)
   - Memandu sesi praktikum AI mengenai konsep algoritma, machine learning, dan evaluasi tugas pemrograman.
2. **AI Engineer Cohort**: Coding Camp powered by DBS Foundation & Dicoding (2026)
   - Lulusan terbaik program intensif deep learning, arsitektur model, dan kustomisasi AI terapan.
3. **Asisten Laboratorium Basis Data**: Universitas Riau (2026)
   - Memfasilitasi praktikum SQL, perancangan basis data relasional, pemodelan ER, dan normalisasi.
4. **Software Engineer**: LPPM Universitas Riau (2025)
   - Mengembangkan chatbot berbasis RAG untuk sistem informasi pengumuman dan panduan pengguna.
5. **Machine Learning Cohort**: Asah Led by Dicoding with Accenture (2025)
   - Menyelesaikan pelatihan intensif rekayasa machine learning, prapemrosesan data, dan MLOps.
6. **Project-Based Internship**: Home Credit Indonesia (2025)
   - Membangun model credit scoring berbasis data nasabah untuk mendukung keputusan kelayakan pinjaman.

### 3.7 Section Sertifikat & Penghargaan Resmi (`#sertifikat`)
Grid kartu interaktif dengan fitur Lightbox perbesaran sertifikat:
- **Distinction Graduate**: Coding Camp DBS Foundation & Dicoding 2026 (Top 10% dari 700+ peserta).
- **Distinction Graduate**: Asah Led by Dicoding with Accenture 2025 (Top 10% dari 1.000+ peserta).
- **Linear Regression Specialist**: Yandex & Digitalent Scholarship Kominfo 2025.
- **Sertifikat Pengalaman LPPM & Asisten Dosen UNRI**.

### 3.8 Section Jejak Akademik & Komunitas (`#jejak`)
Filter kategori tab minimalis (*Semua*, *Asisten Laboratorium*, *AI Cohort*, *Riset & Praktik*):
- Menampilkan foto dokumentasi dan catatan aktivitas ilmiah serta komunitas teknologi secara ringkas dan kredibel.

### 3.9 Section Kontak & Media Sosial (`#kontak`)
Kartu kolaborasi eksklusif dengan tombol tindakan langsung:
- **WhatsApp**: Tautan langsung ke nomor `+6282287749434` dengan pesan pengantar.
- **Salin Email**: Tombol salin instan alamat `iibsohibbal@gmail.com` disertai umpan balik visual.
- **LinkedIn**: Tautan profil `linkedin.com/in/msohibbal`.
- **GitHub**: Tautan profil `github.com/Sohibbal`.
- **Instagram**: Tautan profil `instagram.com/iib25_` (user `iib25_`).

---

## 4. Arsitektur Teknis RAG Chatbot

### 4.1 Komponen Antarmuka Pengguna (`src/components/ui/ChatBotDrawer.tsx`)
- Tombol FAB mengambang di pojok kanan bawah layar (`bottom-6 right-6 z-50`).
- Efek pencahayaan lembut dengan indikator status aktif berwarna hijau.
- Jendela percakapan (drawer modal) dilengkapi:
  - Header: Nama "Sohibbal Assistant", indikator online, tombol reset percakapan, dan tombol close.
  - Suggestion Chips: Tombol pertanyaan cepat untuk mempermudah pengunjung (misal: "Proyek AI unggulan?", "Pengalaman Asisten Lab?", "Kontak & Media Sosial?").
  - Pesan Terstruktur: Balasan ramah, jelas, bebas halusinasi, dan dapat dihentikan kapan saja.
  - Aksesibilitas: Menutup jendela dengan tombol keyboard `Esc` dan navigasi fokus yang ramah pembaca layar.

### 4.2 Knowledge Base Terstruktur (`src/data/ragKnowledgeBase.ts`)
Bank data pengetahuan yang diindeks secara tematik:
- Dokumen profil personal dan keunggulan kompetitif.
- Dokumen 5 proyek inti lengkap dengan teknologi, solusi masalah, dan arsitektur alur kerja.
- Dokumen pengalaman akademik mengajar di laboratorium dan pengalaman industri.
- Dokumen kontak dan panduan kerja sama.

### 4.3 Endpoint API Route (`src/app/api/chat/route.ts`)
- Menerima permintaan `POST` berformat JSON `{ message: string, history: Array<{ role: string, content: string }> }`.
- **Mekanisme Retrieval**: Melakukan pencarian keselarasan semantik antara pertanyaan pengguna dan bank pengetahuan Sohibbal.
- **Mekanisme Generasi**:
  - Jika variabel lingkungan `GEMINI_API_KEY` tersedia: Memanggil Google Gemini API dengan *system instruction* khusus agar menghasilkan jawaban alami dan terfokus pada fakta dokumen Sohibbal.
  - Jika variabel lingkungan `GEMINI_API_KEY` tidak tersedia: Beralih secara cerdas (*intelligent fallback*) ke mesin pencarian konteks internal berbasis kaidah semantik sehingga chatbot tetap berfungsi optimal tanpa kendala teknis.

---

## 5. Rencana Pengujian & Verifikasi

Sebelum menyatakan implementasi selesai, alur verifikasi berikut harus dipenuhi:
1. **Pemeriksaan Kompilasi**: Menjalankan `npm run build` dan memastikan proses build TypeScript Next.js sukses tanpa peringatan atau error.
2. **Audit Antislop**:
   - Memastikan tidak ada karakter em dash di seluruh antarmuka.
   - Memastikan kontras warna teks terhadap latar belakang lolos uji WCAG AA (minimal rasio 4.5:1).
   - Memastikan tidak ada data atau angka palsu.
3. **Uji Elemen Interaktif**:
   - Memastikan semua tautan sosial media (Instagram `iib25_`, LinkedIn, GitHub, WhatsApp) aktif dan menuju alamat yang benar.
   - Memastikan modal PDF CV dapat dibuka dan diunduh.
   - Memastikan tombol filter tab pada jejak akademik berfungsi instan.
   - Memastikan percakapan pada RAG Chatbot merespons dengan akurat dan dapat ditutup menggunakan keyboard `Esc`.
