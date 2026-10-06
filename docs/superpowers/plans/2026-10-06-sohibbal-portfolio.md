# M. Sohibbal Portfolio & RAG Assistant Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengadaptasi dan membangun web portofolio personal resmi untuk M. Sohibbal (AI / Machine Learning Engineer & Software Developer) yang bersih, bebas generic AI slop, beraksen warna Orange TensorFlow, dilengkapi etalase 5 proyek nyata dan fitur floating RAG Chatbot interaktif di kanan bawah.

**Architecture:** Menggunakan Next.js 14 (App Router) dengan Tailwind CSS dan Framer Motion yang ringan. Seluruh data disimpan secara terstruktur dan type-safe di modul data TypeScript. Fitur RAG Chatbot diimplementasikan menggunakan Next.js API route (`/api/chat`) yang melakukan pencarian semantik atas bank pengetahuan Sohibbal dengan integrasi Google Gemini API serta graceful zero-downtime fallback.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons (minimalist), Google Gemini API (via REST / `@google/genai`), pypdfium2 / Pillow (untuk ekstraksi slide proyek).

**Spec:** `docs/superpowers/specs/2026-10-06-sohibbal-portfolio-design.md`

## Global Constraints

- Warna aksen utama wajib Orange TensorFlow (`#FF6F00` / `#EA580C`).
- Orientasi visual kartu, tombol, modal, badge, dan kontainer wajib bersudut runcing/tajam (`rounded-none` atau batas presisi geometris tanpa rounded melengkung besar/pill-shape) dengan garis outline tegas (`border border-border-subtle` atau `border-accent-brand`).
- Dilarang keras menggunakan karakter em dash di seluruh antarmuka dan teks konten (Antislop R-02).
- Hindari penumpukan ikon dan badge yang tidak fungsional; pertahankan gaya bersih dan berbasis tipografi elegan dari portofolio referensi.
- Semua elemen interaktif (tombol, tautan sosial media, modal PDF CV, filter kategori, chatbot) wajib berfungsi nyata dan terhubung ke tujuan asli (Antislop R-26 & R-35).
- Tautan sosial media wajib mencakup Instagram resmi `iib25_`, LinkedIn `msohibbal`, GitHub `Sohibbal`, Email `iibsohibbal@gmail.com`, dan WhatsApp `+6282287749434`.
- Chatbot tidak boleh crash jika variabel lingkungan `GEMINI_API_KEY` tidak tersedia; wajib memiliki fallback cerdas zero-downtime berbasis retrieval internal.

## Review Focus

1. Chatbot input kosong atau spasi: sistem wajib memvalidasi input dan tidak mengirim request kosong.
2. Lingkungan tanpa `GEMINI_API_KEY`: chatbot tetap memberikan jawaban yang relevan dari bank pengetahuan Sohibbal tanpa melempar 500 error.
3. Responsivitas drawer chatbot pada layar sempit (< 640px): chat drawer tidak boleh terpotong atau keluar dari layar mobile.
4. Aksesibilitas keyboard pada drawer chatbot dan modal: menekan tombol `Escape` wajib menutup drawer/modal yang sedang terbuka.
5. Mode gelap (Dark Mode) pada seluruh kartu berbayang glass: kontras teks memenuhi standar WCAG AA (rasio minimal 4.5:1).

---

### Task 1: Konfigurasi Tema & Desain Token (TensorFlow Orange & Lighting Glass)

**Files:**
- Modify: `src/app/globals.css:1-62`
- Modify: `tailwind.config.ts:1-35`

**Interfaces:**
- Produces: Variabel CSS `--accent-brand` bernilai `#FF6F00`, kelas utility `.glass-card` dan `.lighting-sheen`.

- [ ] **Step 1: Tulis spesifikasi token CSS di `globals.css`**

Perbarui variabel warna pada `:root` dan `.dark`:
```css
:root {
  --background: #FBF8F3;
  --surface: #FFFFFF;
  --surface-muted: #F3ECE1;
  --border-subtle: #E8E0D2;
  --text-primary: #0A1329;
  --text-muted: #4A576E;
  --accent-brand: #FF6F00;
  --accent-hover: #EA580C;
  --accent-soft: #FFF3E0;
}

.dark {
  --background: #0B0F17;
  --surface: #111827;
  --surface-muted: #1A2333;
  --border-subtle: #1F2937;
  --text-primary: #F9FAFB;
  --text-muted: #9CA3AF;
  --accent-brand: #FF7043;
  --accent-hover: #FF8A65;
  --accent-soft: #2A1708;
}
```
Tambahkan utility styling `.glass-card`:
```css
.glass-card {
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.glass-card:hover {
  border-color: rgba(255, 111, 0, 0.4);
}
```

- [ ] **Step 2: Sinkronisasi `tailwind.config.ts`**

Pastikan warna `accent-brand`, `accent-hover`, dan `accent-soft` terdefinisi dan dapat diakses oleh class Tailwind:
```typescript
colors: {
  background: 'var(--background)',
  surface: {
    DEFAULT: 'var(--surface)',
    muted: 'var(--surface-muted)',
  },
  border: {
    subtle: 'var(--border-subtle)',
  },
  text: {
    primary: 'var(--text-primary)',
    muted: 'var(--text-muted)',
  },
  accent: {
    brand: 'var(--accent-brand)',
    hover: 'var(--accent-hover)',
    soft: 'var(--accent-soft)',
  },
}
```

- [ ] **Step 3: Uji kompilasi CSS**

Jalankan: `npm run build`
Ekspektasi: Build berhasil tanpa galat Tailwind CSS.

---

### Task 2: Ekstraksi Aset Visual & Pembaruan Skema Data Portofolio

**Files:**
- Create: Script ekstraksi scratch `scratch/extract_assets.py`
- Modify: `src/types/portfolio.ts`
- Modify: `src/data/portfolioData.ts`
- Create / Copy: `public/cv.pdf` (dari `referensi/M. Sohibbal_CV_Academy.pdf`)
- Create: `public/images/projects/` (ekstraksi slide proyek dari `referensi/M. Sohibbal_Portfolio_Academy.pdf`)

**Interfaces:**
- Consumes: Berkas di `referensi/`
- Produces: Data model TypeScript `personalData`, `toolsData`, `projectsData`, `experiencesData`, `certificatesData`, `academicCommunityData`, dan `contactData`.

- [ ] **Step 1: Buat dan jalankan script Python ekstraksi gambar proyek & CV**

Ekstrak slide halaman 2 sampai 6 dari `referensi/M. Sohibbal_Portfolio_Academy.pdf` menjadi file PNG/JPG di `public/images/projects/`:
- Halaman 2 &rarr; `public/images/projects/mistech.jpg`
- Halaman 3 &rarr; `public/images/projects/intelview.jpg`
- Halaman 4 &rarr; `public/images/projects/corseo.jpg`
- Halaman 5 &rarr; `public/images/projects/smart-eppm.jpg`
- Halaman 6 &rarr; `public/images/projects/obesity-mlops.jpg`
Salin `referensi/M. Sohibbal_CV_Academy.pdf` ke `public/cv.pdf`.
Unduh atau siapkan avatar Sohibbal di `public/images/hero/sohibbal-portrait.jpg`.

- [ ] **Step 2: Perbarui antarmuka TypeScript di `src/types/portfolio.ts`**

Definisikan tipe data `ProjectItem`:
```typescript
export interface ProjectItem {
  id: string;
  title: string;
  category: 'AI / Machine Learning' | 'Mobile & Web' | 'MLOps';
  projectType: 'Group Project' | 'Individual Project';
  summary: string;
  role: string;
  contribution: string;
  whatILearned: string;
  techStack: string[];
  previewImage: string;
  githubUrl?: string;
  deployUrl?: string;
}
```
Perbarui `ContactInfo` agar mencakup `instagram`: "iib25_" dan `instagramLink`: "https://instagram.com/iib25_".

- [ ] **Step 3: Isi seluruh data riil di `src/data/portfolioData.ts`**

Tuliskan data lengkap M. Sohibbal:
- `personalData`: IPK 3.81, Teknik Informatika UNRI, moto "Keep Learn. and Code."
- `toolsData`: Kategori AI/ML, Languages, Web/Mobile, DevOps/MLOps (tanpa Whisper dan tanpa Gemini di daftar umum).
- `projectsData`: 5 proyek (MISTECH, INTELVIEW, Corseo, SMART E-PPM, MLOps Obesity).
- `experiencesData`: 6 riwayat pengalaman resmi.
- `certificatesData`: Sertifikat Distinction Graduate dan pelatihan.
- `academicCommunityData`: Rekam jejak asisten lab dan cohort.

- [ ] **Step 4: Uji tipe data TypeScript**

Jalankan: `npx tsc --noEmit`
Ekspektasi: Validasi tipe TypeScript lolos tanpa error.

---

### Task 3: Bank Pengetahuan RAG & Next.js API Route (`/api/chat`)

**Files:**
- Create: `src/data/ragKnowledgeBase.ts`
- Create: `src/app/api/chat/route.ts`

**Interfaces:**
- Produces: Endpoint `POST /api/chat` menerima `{ message: string, history?: Array<{ role: string, content: string }> }` dan mengembalikan `{ reply: string, sources?: string[] }`.

- [ ] **Step 1: Tulis data pengetahuan terstruktur di `src/data/ragKnowledgeBase.ts`**

Sediakan fungsi retrieval semantik berbasis skor kemiripan kata kunci berbobot:
```typescript
export interface KnowledgeChunk {
  id: string;
  topic: string;
  keywords: string[];
  content: string;
}

export const knowledgeChunks: KnowledgeChunk[] = [ ... ];
export function findRelevantChunks(query: string, topK = 3): KnowledgeChunk[] { ... }
```

- [ ] **Step 2: Buat route handler di `src/app/api/chat/route.ts`**

Implementasikan logika:
1. Validasi input: periksa jika pesan kosong, kembalikan status 400.
2. Ambil konteks relevan dari `findRelevantChunks(message)`.
3. Cek ketersediaan `process.env.GEMINI_API_KEY`:
   - Jika ada: panggil Gemini API dengan system prompt dan konteks dokumen.
   - Jika tidak ada: panggil generator balasan cerdas internal (fallback) berbasis konteks yang ditemukan, menjamin zero-downtime.
4. Bersihkan respons dari karakter em dash (kepatuhan Antislop).
5. Kembalikan response JSON dengan status 200.

- [ ] **Step 3: Uji endpoint `/api/chat` via HTTP request**

Jalankan test lokal atau curl sederhana:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/chat" -Method POST -ContentType "application/json" -Body '{"message":"Apa saja proyek AI Sohibbal?"}'
```
Ekspektasi: Berhasil merespons dengan informasi mengenai MISTECH, INTELVIEW, Corseo, SMART E-PPM, atau MLOps Obesity.

---

### Task 4: Komponen Floating RAG Chatbot UI

**Files:**
- Create: `src/components/ui/ChatBotDrawer.tsx`

**Interfaces:**
- Produces: Komponen `<ChatBotDrawer />` yang ditempatkan di root layout atau `page.tsx`.

- [ ] **Step 1: Buat komponen `ChatBotDrawer`**

Fitur wajib:
- Floating Action Button di pojok kanan bawah dengan ikon bot dan dot status hijau.
- Jendela drawer dengan backdrop blur, header, tombol reset, dan tombol tutup (`X`).
- 3 Quick Prompt chips:
  1. "Apa saja proyek AI unggulan Sohibbal?"
  2. "Bagaimana pengalaman Asisten Lab Sohibbal?"
  3. "Bagaimana cara menghubungi Sohibbal?"
- Daftar pesan dengan bubble user dan assistant yang kontras tinggi.
- Animasi indikator mengetik saat menunggu balasan.
- Keyboard accessibility: listener tombol `Escape` untuk menutup drawer.
- Text input dengan tombol kirim dan dukungan tombol `Enter`.

- [ ] **Step 2: Uji interaksi drawer**

Buka drawer &rarr; klik salah satu quick prompt &rarr; pastikan respons tampil rapi &rarr; tekan `Escape` &rarr; pastikan drawer tertutup.

---

### Task 5: Pembaruan Navbar, Loading Screen, dan Hero Section

**Files:**
- Modify: `src/components/sections/LoadingScreen.tsx`
- Modify: `src/components/sections/Navbar.tsx`
- Modify: `src/components/sections/HeroSection.tsx`
- Modify: `src/components/sections/HeroPhotoDeck.tsx`

**Interfaces:**
- Produces: Monogram animasi "MS", Navbar dengan link ke `#keahlian`, `#proyek`, `#pengalaman`, `#sertifikat`, `#jejak`, `#kontak`, Hero dengan orbiting tech micro-cards.

- [ ] **Step 1: Perbarui SVG Monogram di `LoadingScreen.tsx`**

Ubah path SVG dari monogram "YM" menjadi monogram "MS" (*M. Sohibbal*) dengan warna oranye TensorFlow.

- [ ] **Step 2: Sesuaikan Navbar di `Navbar.tsx`**

Perbarui item navigasi:
`navItems`: Keahlian (`#keahlian`), Proyek (`#proyek`), Pengalaman (`#pengalaman`), Sertifikat (`#sertifikat`), Jejak (`#jejak`), Kontak (`#kontak`).
Brand text: `sohibbal.porto`.

- [ ] **Step 3: Perbarui Hero Section di `HeroSection.tsx`**

- Eyebrow: `Teknik Informatika • Universitas Riau`.
- Typewriter looping: `M. Sohibbal`, `AI Engineer`, `MLOps Developer`, `Mobile & Web Developer`.
- 3 Metrik Riil: `5+ Proyek AI & Aplikasi`, `Top 10% Distinction (2x)`, `3.81 IPK`.
- Tombol: `Lihat CV ↗` (membuka `/cv.pdf`) dan `Hubungi Saya →`.

- [ ] **Step 4: Perbarui Hero Photo Deck di `HeroPhotoDeck.tsx`**

- Tampilkan avatar portrait Sohibbal di kartu tengah.
- Tambahkan 6 micro-cards melayang halus di sekeliling kartu foto: **Python**, **TensorFlow**, **Docker**, **Next.js**, **Flutter**, dan **PostgreSQL**.
- Gunakan animasi Framer Motion loop yang ringan dan hemat daya.

---

### Task 6: Pembaruan Section Proyek, Keahlian, Pengalaman, Sertifikat, dan Kontak

**Files:**
- Modify: `src/components/sections/AboutSection.tsx` (Keahlian & Tools)
- Create: `src/components/sections/ProjectsSection.tsx` (menggantikan ResearchSection)
- Create: `src/components/ui/ProjectModal.tsx`
- Modify: `src/components/sections/ExperienceSection.tsx`
- Modify: `src/components/sections/CertificatesSection.tsx`
- Modify: `src/components/sections/OrganizationSection.tsx` &rarr; ubah jadi `AcademicCommunitySection.tsx`
- Modify: `src/components/sections/ContactSection.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Implementasikan `ProjectsSection.tsx` & `ProjectModal.tsx`**

- Grid kartu proyek interaktif dengan efek lighting glass.
- Menampilkan gambar preview slide, peran kerja, badge tech stack fungsional, tombol GitHub Repo ↗, tombol Live Deploy ↗, dan tombol Lihat Detail.
- Modal menampilkan solusi masalah dan hal yang dipelajari (*What I Learned*).

- [ ] **Step 2: Sesuaikan `AboutSection.tsx`**

Tampilkan tools analitika dan engineering terbagi ke dalam 4 kategori (AI/ML, Languages, Web/Mobile, DevOps/MLOps) dengan pembatas garis bersih tanpa ikon dekoratif berlebihan.

- [ ] **Step 3: Sesuaikan `ExperienceSection.tsx` & `CertificatesSection.tsx`**

Masukkan 6 data riwayat Asisten Lab & industri serta sertifikat Distinction Graduate. Terapkan efek lighting glass halus.

- [ ] **Step 4: Sesuaikan `AcademicCommunitySection.tsx`**

Ganti kategori filter menjadi: *Semua*, *Asisten Laboratorium*, *AI Cohort*, *Workshop & Studi*.

- [ ] **Step 5: Sesuaikan `ContactSection.tsx` & `Footer.tsx`**

- Pasang tautan WhatsApp, salin email `iibsohibbal@gmail.com`, LinkedIn `msohibbal`, GitHub `Sohibbal`, dan Instagram `iib25_`.
- Footer: motto "Keep Learn. and Code." dan navigasi ringkas.

---

### Task 7: Integrasi Halaman Utama, Audit Antislop, & Verifikasi Akhir

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Satukan seluruh komponen di `src/app/page.tsx`**

Hubungkan:
- `LoadingScreen`
- `Navbar`
- `HeroSection`
- `AboutSection`
- `ProjectsSection`
- `ExperienceSection`
- `CertificatesSection`
- `AcademicCommunitySection`
- `ContactSection`
- `Footer`
- `ImageModal`
- `PdfModal`
- `ProjectModal`
- `ChatBotDrawer`

- [ ] **Step 2: Perbarui Metadata SEO di `src/app/layout.tsx`**

Ganti judul situs menjadi "M. Sohibbal • AI Engineer & Software Developer Portfolio" dengan deskripsi yang relevan.

- [ ] **Step 3: Jalankan verifikasi build produksi**

Jalankan: `npm run build`
Ekspektasi: Berhasil compile 100% tanpa error TypeScript, ESLint, atau import path.

- [ ] **Step 4: Audit Antislop & Pengujian Fungsional**

- Verifikasi tidak ada karakter em dash di seluruh kode dan teks UI.
- Verifikasi semua tautan (WhatsApp, Email copy, Instagram `iib25_`, LinkedIn, GitHub) berjalan sesuai tujuan.
- Uji fitur Chatbot di kanan bawah pada desktop dan mobile.
- Uji alih tema Light Mode dan Dark Mode.
