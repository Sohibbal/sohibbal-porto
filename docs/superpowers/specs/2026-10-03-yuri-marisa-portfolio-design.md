# Spesifikasi Desain: Website Portofolio Yuri Marisa

**Tanggal**: 3 Oktober 2026  
**Status**: Disetujui (Approved)  
**Tipe Proyek**: Architectural (Pembuatan website baru dari nol)  
**Target Platform**: Next.js (App Router), Tailwind CSS, Framer Motion, Vercel-ready  

---

## 1. Ringkasan Eksekutif & Tujuan

Website portofolio ini dibangun khusus untuk **Yuri Marisa**, mahasiswa program studi Ekonomi Pembangunan Universitas Riau (Semester 7), peneliti muda, dan pegiat organisasi. Website dirancang berbasis **Single Page Application (SPA)** yang menyajikan rekam jejak akademik, publikasi riset ilmiah, pengalaman magang kebijakan publik di BAPPEDA, advokasi lingkungan bersama WALHI Riau, sertifikasi resmi, serta pengalaman kepanitiaan.

### Prinsip Utama & Standar Kualitas (Antislop & Craftsmanship)
1. **Content-Driven (Berdasarkan Fakta)**: Seluruh teks, riset, pengalaman, sertifikat, dan kontak diambil murni dari dokumen [Portofolio Yuri Marisa.pdf](file:///D:/Project/yuri-portofolio/referensi/Portofolio%20Yuri%20Marisa.pdf) tanpa manipulasi data, tanpa testimonial palsu, dan tanpa klaim metrik yang diada-adakan (mematuhi aturan antislop R-17, R-18, R-36, R-38).
2. **Ketiadaan Tanda Em Dash (—)**: Selaras dengan aturan R-02 antislop, tidak menggunakan karakter em dash (`—`) pada seluruh teks antarmuka. Digunakan koma, titik dua, atau tanda kurung untuk pemisahan klausa.
3. **Tipografi & Estetika Tanpa AI Slop**: Meniru ketegasan visual dari [style.png](file:///D:/Project/yuri-portofolio/referensi/style.png) (botku.id) dengan layout bersih, hierarki tipografi tegas (*tight tracking* pada heading), *spacing* lega, dan tanpa dekorasi berlebihan seperti badge bertumpuk atau icon tanpa fungsi (R-04, R-09).
4. **Palet Warna Alami dari PDF**: Warna dasar mengadopsi nuansa *soft slate blue / cool icy grey* dari cover dokumen portofolio dengan aksen biru almamater Universitas Riau.
5. **Dual Theme yang Fungsional**: Dilengkapi *theme switcher* Light Mode (default) dan Dark Mode di sudut kanan atas dengan kontras tinggi (WCAG AA $\ge 4.5:1$, aturan R-21, R-25, R-34).
6. **Animasi Mulus & Elegan**: Menggunakan Framer Motion untuk loading screen kinetic monogram, transisi scroll, dan modal lightbox tanpa animasi template yang memusingkan (R-19).
7. **Kesiapan Deploy Vercel**: Struktur kode Next.js teroptimasi penuh untuk *production build* (`npm run build`) tanpa error TypeScript maupun linting.

---

## 2. Arsitektur Teknis & Tech Stack

* **Framework**: Next.js 14/15 (App Router)
* **Bahasa**: TypeScript (`strict: true`)
* **Styling**: Tailwind CSS dengan skema variabel warna kustom (Light & Dark theme)
* **Animasi**: Framer Motion (`framer-motion`)
* **Icons**: Lucide React (`lucide-react`) secara fungsional
* **Komponen Modal**: Native HTML Dialog / Accessible Backdrop dengan `AnimatePresence` Framer Motion
* **Clipboard API**: Native navigator clipboard untuk salin email instan

---

## 3. Sistem Desain & Token Warna

Palet warna diekstrak langsung dari dokumen portofolio Yuri Marisa dan disesuaikan untuk kenyamanan visual serta aksesibilitas kontras:

### 3.1 Light Mode (Default)
* **Latar Belakang Utama (`bg-background`)**: `#F4F7FA` (Cool Ice Mist / Slate sangat lembut)
* **Kartu & Permukaan (`bg-surface`)**: `#FFFFFF` (Pure White)
* **Garis Batas (`border-subtle`)**: `#E2E8F0` / `#CBD5E1`
* **Sub-Surface / Aksen Kontainer (`bg-accent-soft`)**: `#E6EFF5` (Powder Slate dari cover PDF)
* **Teks Utama (`text-primary`)**: `#0F172A` (Deep Slate Navy, rasio kontras tinggi)
* **Teks Sekunder (`text-muted`)**: `#475569` (Slate 600)
* **Aksen Utama (`accent-brand`)**: `#2563EB` (UNRI Royal Blue)
* **Aksen Hover (`accent-hover`)**: `#1D4ED8`

### 3.2 Dark Mode (Theme Switcher Kanan Atas)
* **Latar Belakang Utama (`bg-background`)**: `#090D16` (Deep Midnight Slate)
* **Kartu & Permukaan (`bg-surface`)**: `#111827` (Slate 900)
* **Garis Batas (`border-subtle`)**: `#1E293B` (Slate 800)
* **Sub-Surface / Aksen Kontainer (`bg-accent-soft`)**: `#162032`
* **Teks Utama (`text-primary`)**: `#F8FAFC` (Slate 50)
* **Teks Sekunder (`text-muted`)**: `#94A3B8` (Slate 400)
* **Aksen Utama (`accent-brand`)**: `#38BDF8` (Luminous Sky Blue)
* **Aksen Hover (`accent-hover`)**: `#60A5FA`

### 3.3 Tipografi
* **Font Primer**: Plus Jakarta Sans / Inter
* **Skala Tipografi**:
  * Display Heading: `text-4xl md:text-6xl font-bold tracking-tight`
  * Section Heading: `text-2xl md:text-3xl font-bold tracking-tight`
  * Subsection / Card Title: `text-lg md:text-xl font-semibold`
  * Body Text: `text-sm md:text-base leading-relaxed`
  * Caption / Label: `text-xs md:text-sm font-medium uppercase tracking-wider`

---

## 4. Struktur Komponen & Alur Interaksi

```
RootLayout
└── Providers (ThemeProvider)
    ├── LoadingScreen (Monogram "YM" kinetic drawing & intro reveal)
    ├── Navbar (Sticky glass header, navigation anchors, theme toggle)
    ├── Main
    │   ├── HeroSection (Editorial profile, CTA, portrait frame)
    │   ├── AboutSection (Bio naratif, software & tools grid, mini gallery)
    │   ├── ResearchSection (3 kartu publikasi jurnal dengan abstrak & link)
    │   ├── ExperienceSection (BAPPEDA Bengkalis & SELARAS WALHI Riau)
    │   ├── CertificatesSection (Grid sertifikat dengan pemicu modal)
    │   ├── OrganizationSection (8 kartu kepanitiaan, MC, dan kompetisi)
    │   └── ContactSection (WhatsApp, email copy-to-clipboard, Instagram)
    ├── ImageModal (Lightbox untuk preview dokumen sertifikat & foto kegiatan)
    └── Footer (Copyright, back-to-top, ketersediaan riset/kolaborasi)
```

### 4.1 Loading Screen (Kinetic Monogram Reveal)
* Menggambar monogram inisial **"YM"** menggunakan animasi garis SVG path (`strokeDasharray` / `strokeDashoffset`).
* Memunculkan teks nama *"Yuri Marisa"* dan deskripsi singkat secara halus.
* Setelah durasi $\approx 1.2$ detik, overlay loader bergeser ke atas (`y: -100%`) dan fade out, mengungkap Hero Section.
* Menyimpan status ke `sessionStorage` agar tidak mengganggu navigasi berulang dalam sesi browser yang sama.

### 4.2 Navbar (Sticky Navigation & Theme Switcher)
* Terapung di bagian atas dengan efek *backdrop blur* halus.
* **Kiri**: Identitas teks "Yuri Marisa" yang dapat diklik untuk *smooth scroll* ke puncak halaman.
* **Tengah**: Menu navigasi anchor (`#tentang`, `#riset`, `#pengalaman`, `#sertifikat`, `#organisasi`, `#kontak`) dengan deteksi section aktif.
* **Kanan**:
  * Tombol switch Light / Dark mode dengan ikon Sun/Moon beranimasi rotasi halus.
  * Tombol CTA cepat "Hubungi".
* **Mobile Drawer**: Menu responsif bersih yang ramah sentuhan (target sentuh $\ge 44\text{px}$).

### 4.3 Hero Section
* **Kolom Kiri**:
  * Kategori/Sub-headline: *"Mahasiswa Ekonomi Pembangunan • Peneliti Muda"*
  * Headline besar: **Yuri Marisa**
  * Paragraf pengantar fokus riset ekonomi regional, analisis ekonometri, dan perencanaan pembangunan daerah.
  * Tombol aksi: *"Jelajahi Riset"* (lompat ke `#riset`) dan *"Hubungi Saya"* (lompat ke `#kontak`).
* **Kolom Kanan**:
  * Bingkai foto portrait Yuri Marisa (memakai blazer almamater UNRI biru dari cover PDF) dengan sudut melengkung halus dan efek bayangan lembut.

### 4.4 About & Tools Section
* Narasi profil mahasiswa Universitas Riau semester 7.
* **Tools & Software Grid**:
  1. **EViews 12**: Analisis ekonometri, regresi berganda, dan data time-series.
  2. **Microsoft Excel**: Tabulasi data statistik, formulasi analitik, dan charting.
  3. **Mendeley**: Manajemen referensi akademik dan sitasi ilmiah.
  4. **Microsoft Word**: Penulisan dokumen karya ilmiah dan laporan kerja dinas.
  5. **Canva**: Desain materi presentasi visual.
  6. **CapCut**: Produksi dan penyuntingan konten video kreatif.

### 4.5 Research & Publications Section
Menampilkan 3 karya publikasi ilmiah:
1. **Jurnal Riset Ilmiah *Sinergi***
   * *Judul*: "Evaluasi Perencanaan Pembangunan Desa Berbasis IDM dan SDGs Desa: Studi Kasus RKPDes Desa Resam Lapis"
   * *Penulis*: Yuri Marisa, Taryono, Wellyn Cesharing Meylan, Syakirah Athiyyah Fitri, Melani Noviantori Ramadhan, Renata Deliana, Naila Septa Ridhoni.
   * *Fokus*: Evaluasi kesesuaian dokumen RKPDes dengan Indeks Desa Membangun (IDM) dan SDGs Desa.
2. **Jurnal Manajemen dan Bisnis *Strategia***
   * *Judul*: "Pengaruh Pendidikan dan Kesehatan Terhadap Pembangunan Modal Manusia di Provinsi Riau Tahun 2015 – 2024"
   * *Penulis*: Yuri Marisa, Naila Septa Ridhoni, B. Isyandi, Ufira Isbah, Dahlan Tampubolon.
   * *Fokus*: Analisis regresi linier berganda dengan EViews 12 menguji pengaruh Rata-rata Lama Sekolah (RLS) dan Usia Harapan Hidup (UHH) terhadap Indeks Pembangunan Manusia (IPM).
3. **Jurnal Multidisipliner *Kapalamada***
   * *Judul*: "Strategi Penguatan Agroindustri Sagu Kabupaten Kepulauan Meranti untuk Meningkatkan Daya Saing Produk Lokal"
   * *Penulis*: Yuri Marisa, Diva Tri Ramadani, Renata Deliana, Muhammad Bintang Anugrah, Eka Armay Pallis.
   * *Fokus*: Analisis strategi rantai nilai komoditas sagu unggulan di Kabupaten Kepulauan Meranti untuk daya saing pasar lokal dan regional.

### 4.6 Experience Section (Pengalaman Lapangan & Kebijakan)
* **BAPPEDA Kabupaten Bengkalis (Magang - Juli 2025)**:
  * Penempatan di Bidang Perencanaan, Pengendalian, dan Evaluasi Pembangunan Daerah (PPEPD).
  * Verifikasi & validasi kelengkapan dokumen Evaluasi Rencana Kerja (Renja) 47 Organisasi Perangkat Daerah (OPD).
  * Persiapan teknis & logistik Rapat Wali Data lintas instansi (BAPPEDA, BPS, Diskominfo).
  * Pengelolaan administrasi kearsipan dan distribusi dokumen strategis perencanaan daerah.
* **SELARAS WALHI Riau (Mei 2026)**:
  * Sekolah Keadilan Antar Generasi di Pulau Beting Aceh, Rupat Utara.
  * Pelatihan kepemimpinan lingkungan, advokasi hak lingkungan hidup, analisis perubahan iklim, dan audit sampah bersama masyarakat Desa Suka Damai.

### 4.7 Certificates Section (Dengan Modal Lightbox)
* Menampilkan kartu dokumen sertifikat yang dapat diklik untuk membuka **Modal Lightbox** resolusi tinggi:
  1. **Sertifikat Kepengurusan LPII FEB UNRI**: Anggota Bagian Riset dan Kajian (Periode 2024–2025).
  2. **Sertifikat Magang BAPPEDA Kabupaten Bengkalis**: Pelaksanaan magang dengan nilai predikat **Baik** (Juli 2025).
  3. **Sertifikat Workshop EViews**: Pelatihan analisis data EViews oleh Laboratorium Penelitian Ekonomi dan Bisnis FEB UNRI.
* *Catatan Aset*: Gambar awal disiapkan dalam bentuk placeholder terstruktur di folder `public/images/certificates/`, siap digantikan oleh pengguna secara manual.

### 4.8 Organization & Committee Section
Menampilkan 8 pengalaman kepemimpinan dan kompetisi kreatif:
1. Project Leader di salah satu Program Kerja Divisi
2. Koordinator (CO) Konsumsi IE Cup 2024
3. Leader of FPVC pada INSTINCT 8
4. Moderator Seminar ICON X EDOV Festival 2024
5. Anggota Hubungan & Informasi Dokumentasi (HID) pada Pesta Rakyat IE 2024
6. Master of Ceremony (MC) Pelantikan Pengurus HMJ IE 2025
7. Leader of Consumption INSTINCT 9
8. Juara 1 Sayembara Video Kreatif oleh WALHI Riau

### 4.9 Contact Section & Footer
* **WhatsApp**: Tombol interaktif langsung menuju `https://wa.me/6285374355652`
* **Email Mahasiswa**: `yuri.marisa1059@student.unri.ac.id` dengan tombol *Copy Email* dan feedback konfirmasi.
* **Instagram**: Link menuju `https://instagram.com/yuriiiee__`
* **Footer**: Teks hak cipta Yuri Marisa, indikator status ketersediaan riset/kolaborasi, dan tautan *Back to Top*.

### 4.10 Modal Lightbox (Interaktivitas Detail)
* Komponen pop-up yang dapat digunakan kembali (*reusable*):
  * Menampilkan gambar dokumen atau foto resolusi penuh.
  * Menampilkan judul dan metadata deskripsi dokumen.
  * Dapat ditutup dengan menekan tombol **X**, mengklik area luar (*backdrop*), atau menekan tombol **Escape** keyboard (Aksesibilitas R-32).

---

## 5. Struktur Direktori Proyek

```
yuri-portofolio/
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-10-03-yuri-marisa-portfolio-design.md
├── public/
│   ├── images/
│   │   ├── hero/
│   │   │   └── yuri-portrait.jpg
│   │   ├── publications/
│   │   │   ├── paper-sinergi.jpg
│   │   │   ├── paper-strategia.jpg
│   │   │   └── paper-kapalamada.jpg
│   │   ├── experience/
│   │   │   ├── bappeda/
│   │   │   └── walhi/
│   │   ├── certificates/
│   │   │   ├── lpii-unri.jpg
│   │   │   ├── bappeda-cert.jpg
│   │   │   └── eviews-workshop.jpg
│   │   └── organizations/
│   │       ├── project-leader.jpg
│   │       ├── ie-cup.jpg
│   │       ├── fpvc-instinct8.jpg
│   │       ├── moderator-edov.jpg
│   │       ├── pesta-rakyat.jpg
│   │       ├── mc-hmj.jpg
│   │       ├── instinct9.jpg
│   │       └── walhi-juara1.jpg
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── ImageModal.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── SectionHeader.tsx
│   │   ├── sections/
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ResearchSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── CertificatesSection.tsx
│   │   │   ├── OrganizationSection.tsx
│   │   │   └── ContactSection.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── portfolioData.ts
│   └── types/
│       └── portfolio.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 6. Model Data TypeScript (`src/types/portfolio.ts`)

```typescript
export interface Publication {
  id: string;
  title: string;
  journal: string;
  category: string;
  authors: string[];
  abstract: string;
  focus: string;
  link?: string;
  previewImage: string;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  location?: string;
  description: string[];
  images: string[];
  tags: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
}

export interface OrganizationItem {
  id: string;
  role: string;
  event: string;
  year: string;
  image: string;
  category: 'Kepanitiaan' | 'Kepemimpinan' | 'Prestasi' | 'Dokumentasi' | 'Public Speaking';
}

export interface ToolItem {
  name: string;
  category: string;
  description: string;
  iconName: string;
}
```

---

## 7. Rencana Verifikasi & Uji Kualitas (Delivery Gate)

Sebelum dinyatakan selesai dan siap deploy, proyek wajib melalui verifikasi ketat:
1. **Verifikasi Build**: Menjalankan `npm run build` dan memastikan output SSG statis Next.js berhasil $100\%$ tanpa error TypeScript atau lint.
2. **Uji Dual Theme (Light & Dark)**: Memastikan teks dan komponen terbaca sempurna di kedua mode tanpa cacat kontras warna (mematuhi R-34).
3. **Uji Interaktivitas Komponen**:
   - Loading Screen membuka halaman secara mulus.
   - Smooth navigation anchor meloncat ke section yang tepat.
   - Theme toggle berganti instan dan menyimpan preferensi.
   - Tombol salin email memunculkan feedback visual.
   - Modal Lightbox sertifikat dapat dibuka, ditutup dengan klik luar, tombol silang, maupun tombol Escape keyboard.
4. **Uji Responsivitas Mobile**: Tidak ada horizontal overflow pada viewport $\le 375\text{px}$, ukuran target sentuh nyaman ($\ge 44\text{px}$).
