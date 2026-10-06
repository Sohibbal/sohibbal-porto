# Yuri Marisa Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun website portofolio statis interaktif berbasis Next.js (App Router), Tailwind CSS, dan Framer Motion untuk Yuri Marisa, lengkap dengan dual theme (Light & Dark), kinetic monogram loading screen, modal lightbox dokumen sertifikat, dan siap deploy ke Vercel tanpa kendala.

**Architecture:** Single Page Application (SPA) modular dengan Next.js App Router, pemisahan data konten statis terstruktur di `src/data/portfolioData.ts`, komponen section mandiri di `src/components/sections/`, komponen UI pendukung (Modal Lightbox & Theme Toggle) di `src/components/ui/`, serta transisi animasi halus berbasis Framer Motion.

**Tech Stack:** Next.js 14/15 (App Router, TypeScript), Tailwind CSS, Framer Motion, Lucide React.

**Spec:** [2026-10-03-yuri-marisa-portfolio-design.md](file:///D:/Project/yuri-portofolio/docs/superpowers/specs/2026-10-03-yuri-marisa-portfolio-design.md)

## Global Constraints

- Wajib bebas dari karakter em dash (`—`) pada seluruh teks antarmuka (aturan antislop R-02).
- Palet warna wajib merefleksikan PDF portofolio: Light Mode (default: soft slate `#F4F7FA`, kartu putih `#FFFFFF`, aksen almamater UNRI blue `#2563EB`) dan Dark Mode (`#090D16`, `#111827`, `#38BDF8`).
- Dual theme wajib beroperasi $100\%$ tanpa ada elemen yang pecah kontrasnya (memenuhi standar WCAG AA $\ge 4.5:1$).
- Setiap tombol atau link wajib memiliki tujuan nyata dan berfungsi (aturan antislop R-26).
- Teks, riset, pengalaman kerja, sertifikat, dan kontak wajib bersumber murni dari [Portofolio Yuri Marisa.pdf](file:///D:/Project/yuri-portofolio/referensi/Portofolio%20Yuri%20Marisa.pdf) tanpa klaim atau angka buatan.
- Asset gambar sertifikat disiapkan sebagai placeholder terstruktur di folder `public/images/` yang siap diganti secara manual oleh pengguna.
- Seluruh kode wajib lulus kompilasi `npm run build` tanpa error TypeScript ataupun linting demi kesiapan deploy Vercel.

## Review Focus

1. **Hydration Mismatch pada Theme & Loading Screen**: Rendering awal di server tidak boleh menyebabkan flicker tema atau error hidrasi dengan `localStorage` / `sessionStorage`. Gunakan mounted check dan script class sederhana.
2. **Keyboard Accessibility pada Modal Lightbox**: Memastikan modal dapat dibuka dengan klik atau Enter, dan ditutup dengan tombol `Escape`, klik backdrop, atau tombol Close dengan fokus yang kembali teratur (R-32).
3. **Overflow Horizontal pada Mobile**: Memastikan animasi Framer Motion (`x: 50` atau `scale`) tidak memicu scrollbar horizontal pada layar sempit ($\le 375\text{px}$). Gunakan `overflow-x-hidden` pada wrapper utama (R-03).
4. **Copy-to-Clipboard Fallback**: Penanganan penyalinan email yang aman jika `navigator.clipboard` tidak tersedia atau dibatasi oleh izin browser.
5. **Asset Fallback**: Jika gambar sertifikat belum diisi oleh pengguna di folder `public/images/`, komponen harus tetap menampilkan placeholder elegan berformat SVG tanpa merusak layout.

---

### Task 1: Scaffolding Proyek Next.js & Konfigurasi Lingkungan

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`

**Interfaces:**
- Produces: Fondasi Next.js App Router dengan TypeScript, Tailwind CSS, dan Framer Motion yang siap dijalankan dengan `npm run dev` dan `npm run build`.

- [ ] **Step 1: Inisialisasi package.json dan install dependensi**

Inisialisasi dependensi:
```json
{
  "name": "yuri-marisa-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "framer-motion": "^11.11.11",
    "lucide-react": "^0.454.0",
    "next": "^14.2.15",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.5.4"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```
Jalankan instalasi dependensi dengan `npm install`.

- [ ] **Step 2: Konfigurasi tsconfig.json, next.config.js, dan postcss.config.js**

Konfigurasi `tsconfig.json` dengan path alias `@/*`:
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Konfigurasi `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
```

Konfigurasi `postcss.config.js`:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 3: Konfigurasi Tailwind Tokens & globals.css**

Atur `tailwind.config.ts` untuk mendukung `darkMode: 'class'` dan variabel CSS palet PDF:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        "border-subtle": "var(--border-subtle)",
        "text-primary": "var(--text-primary)",
        "text-muted": "var(--text-muted)",
        "accent-brand": "var(--accent-brand)",
        "accent-hover": "var(--accent-hover)",
        "accent-soft": "var(--accent-soft)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

Di `src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #F4F7FA;
  --surface: #FFFFFF;
  --surface-muted: #E6EFF5;
  --border-subtle: #E2E8F0;
  --text-primary: #0F172A;
  --text-muted: #475569;
  --accent-brand: #2563EB;
  --accent-hover: #1D4ED8;
  --accent-soft: #DBEAFE;
}

.dark {
  --background: #090D16;
  --surface: #111827;
  --surface-muted: #162032;
  --border-subtle: #1E293B;
  --text-primary: #F8FAFC;
  --text-muted: #94A3B8;
  --accent-brand: #38BDF8;
  --accent-hover: #60A5FA;
  --accent-soft: #0C4A6E;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--background);
  color: var(--text-primary);
  min-height: 100vh;
  overflow-x: hidden;
}
```

- [ ] **Step 4: Layout & Root HTML Provider**

Buat `src/app/layout.tsx` dengan metadata lengkap Yuri Marisa, inline theme script pencegah flash of incorrect theme, dan viewport:
```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yuri Marisa | Portofolio Riset & Pembangunan Daerah",
  description: "Portofolio akademik, riset ekonometri, pengalaman kebijakan publik di BAPPEDA Bengkalis, dan organisasi Yuri Marisa, Mahasiswa Ekonomi Pembangunan Universitas Riau.",
  keywords: ["Yuri Marisa", "Ekonomi Pembangunan", "Universitas Riau", "BAPPEDA Bengkalis", "Riset Ekonometri", "EViews"],
  authors: [{ name: "Yuri Marisa" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('yuri_theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-accent-soft selection:text-accent-brand">
        {children}
      </body>
    </html>
  );
}
```

Buat `src/app/page.tsx` sementara:
```tsx
export default function Home() {
  return (
    <main className="p-8 text-center text-text-primary">
      <h1 className="text-3xl font-bold">Yuri Marisa Portfolio</h1>
    </main>
  );
}
```

- [ ] **Step 5: Verifikasi build dan jalankan commit**

Jalankan: `npm run build`  
Pastikan status: SUCCESS (Tanpa error TypeScript / lint).  
Commit:
```bash
git add package.json tsconfig.json next.config.js tailwind.config.ts postcss.config.js src/
git commit -m "feat: setup next.js scaffolding and tailwind theme tokens"
```

---

### Task 2: Pemodelan Data & Konten Statis Portofolio

**Files:**
- Create: `src/types/portfolio.ts`
- Create: `src/data/portfolioData.ts`

**Interfaces:**
- Produces: `portfolioData` lengkap mencakup data profil personal, 6 tools/software, 3 publikasi riset, 2 pilar pengalaman kerja lapangan, 3 dokumen sertifikat, 8 kepanitiaan/organisasi, dan informasi kontak lengkap.

- [ ] **Step 1: Tulis interface TypeScript di `src/types/portfolio.ts`**

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
}

export interface ContactInfo {
  whatsapp: string;
  whatsappDisplay: string;
  whatsappLink: string;
  email: string;
  instagram: string;
  instagramLink: string;
}
```

- [ ] **Step 2: Tulis konten lengkap di `src/data/portfolioData.ts`**

Mencakup data riil dari 8 halaman PDF:
- Bio & Tools (EViews 12, Microsoft Excel, Mendeley, Microsoft Word, Canva, CapCut).
- Publikasi Riset: Jurnal Sinergi (Evaluasi RKPDes Desa Resam Lapis), Jurnal Strategia (Pengaruh Pendidikan & Kesehatan terhadap Modal Manusia Riau), Jurnal Kapalamada (Agroindustri Sagu Kepulauan Meranti).
- Magang BAPPEDA Bengkalis (validasi dokumen Renja 47 OPD, Rapat Wali Data, PPEPD).
- WALHI Riau (SELARAS di Pulau Beting Aceh, Rupat Utara).
- 3 Sertifikat (LPII FEB UNRI, BAPPEDA Bengkalis, Workshop EViews).
- 8 Kepanitiaan & Organisasi.
- Kontak (WA, Email UNRI, Instagram).

- [ ] **Step 3: Verifikasi tipe data dan commit**

Jalankan: `npx tsc --noEmit`  
Pastikan tipe valid tanpa error.  
Commit:
```bash
git add src/types/portfolio.ts src/data/portfolioData.ts
git commit -m "feat: add typed static portfolio data from pdf source"
```

---

### Task 3: Penyiapan Direktori Aset & Placeholder Elegan

**Files:**
- Create: `public/images/hero/yuri-portrait.svg` (dan fallback portrait)
- Create: `public/images/publications/paper-sinergi.svg`
- Create: `public/images/publications/paper-strategia.svg`
- Create: `public/images/publications/paper-kapalamada.svg`
- Create: `public/images/certificates/lpii-unri.svg`
- Create: `public/images/certificates/bappeda-cert.svg`
- Create: `public/images/certificates/eviews-workshop.svg`
- Create: `public/images/organizations/placeholder-org.svg`
- Create: `src/components/ui/SafeImage.tsx` (komponen image wrapper dengan fallback gracefully)

**Interfaces:**
- Produces: Struktur folder `public/images/` yang siap menerima file gambar riil dari pengguna, serta komponen `SafeImage` yang merender SVG placeholder bersih jika gambar asli belum dimasukkan.

- [ ] **Step 1: Buat subfolder di `public/images/`**

Subfolder:
- `public/images/hero/`
- `public/images/publications/`
- `public/images/experience/`
- `public/images/certificates/`
- `public/images/organizations/`

- [ ] **Step 2: Buat placeholder SVG berkualitas tinggi untuk sertifikat dan publikasi**

Buat file SVG representatif dengan rasio dokumen resmi dan gaya minimalis (warna slate dan aksen almamater UNRI) sehingga tampilan website tetap rapi sebelum pengguna menaruh file gambar asli.

- [ ] **Step 3: Implementasikan `SafeImage.tsx`**

Komponen ini memanfaatkan `next/image` dengan penanganan `onError` otomatis menuju fallback SVG placeholder jika file gambar asli gagal dimuat.

- [ ] **Step 4: Commit**

```bash
git add public/images/ src/components/ui/SafeImage.tsx
git commit -m "feat: setup asset structure and elegant fallback safe image component"
```

---

### Task 4: Komponen Loading Screen (Kinetic Monogram Reveal)

**Files:**
- Create: `src/components/sections/LoadingScreen.tsx`

**Interfaces:**
- Consumes: `onComplete?: () => void`
- Produces: Komponen overlay layar penuh dengan animasi garis SVG monogram inisial "YM", teks reveal nama, dan animasi geser ke atas (`y: -100%`) setelah selesai. Menyimpan flag di `sessionStorage` (`yuri_visited`).

- [ ] **Step 1: Implementasikan LoadingScreen dengan Framer Motion**

Fitur utama:
- SVG path inisial "Y" dan "M" dengan motion path `pathLength: [0, 1]` durasi 0.9 detik.
- Teks *"Yuri Marisa"* dan *"Ekonomi Pembangunan • Universitas Riau"* muncul dengan `opacity` fade.
- AnimatePresence untuk transisi exit mengangkat layar ke atas (`exit={{ y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }`).
- Cek `sessionStorage.getItem('yuri_visited')`: jika ada, langsung panggil `onComplete` tanpa jeda; jika belum, set flag dan jalankan animasi.

- [ ] **Step 2: Uji interaksi loading screen di browser**

Verifikasi visual: animasi garis terbentuk mulus, teks muncul, dan layar terangkat mengungkap konten di bawahnya.
- [ ] **Step 3: Commit**

```bash
git add src/components/sections/LoadingScreen.tsx
git commit -m "feat: add kinetic monogram loading screen with session storage guard"
```

---

### Task 5: Navbar & Theme Switcher (Light & Dark Mode)

**Files:**
- Create: `src/components/ui/ThemeToggle.tsx`
- Create: `src/components/sections/Navbar.tsx`

**Interfaces:**
- Consumes: Navigasi anchor IDs (`#tentang`, `#riset`, `#pengalaman`, `#sertifikat`, `#organisasi`, `#kontak`)
- Produces: Floating glass navbar dengan sticky backdrop blur, scroll spy penanda menu aktif, tombol switch Light/Dark dengan animasi ikon Sun/Moon, dan mobile drawer yang dapat dibuka/tutup dengan mudah.

- [ ] **Step 1: Implementasikan `ThemeToggle.tsx`**

Membaca class `dark` pada `document.documentElement`, merubah state, menyimpan preferensi ke `localStorage.setItem('yuri_theme', theme)`, dan menganimasikan rotasi ikon Sun / Moon dengan Framer Motion. Tombol dilengkapi `aria-label="Ubah tema"` dan indikator fokus keyboard yang jelas (R-32).

- [ ] **Step 2: Implementasikan `Navbar.tsx`**

Fitur:
- Deteksi scroll untuk menambahkan bayangan/border saat di-scroll.
- IntersectionObserver / scroll listener untuk menandai link section yang sedang aktif di viewport.
- Tombol burger mobile menu yang membuka slide drawer responsif dengan target sentuh $\ge 44\text{px}$.
- Tombol aksi "Hubungi" yang melompat ke `#kontak`.

- [ ] **Step 3: Uji fungsi tema dan navigasi**

Pastikan pergantian tema merubah seluruh variabel CSS warna instan tanpa error hidrasi.  
- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ThemeToggle.tsx src/components/sections/Navbar.tsx
git commit -m "feat: add sticky blurred navbar and animated theme toggle"
```

---

### Task 6: Hero Section & About / Tools Section

**Files:**
- Create: `src/components/ui/SectionHeader.tsx`
- Create: `src/components/sections/HeroSection.tsx`
- Create: `src/components/sections/AboutSection.tsx`

**Interfaces:**
- Consumes: `portfolioData.personal`, `portfolioData.tools`
- Produces:
  - Hero Section dengan layout asimetris, headline editorial nama Yuri Marisa, narasi singkat, tombol aksi cepat, dan frame foto portrait.
  - SectionHeader reusable dengan tag kategori dan judul section.
  - About Section berisi narasi mahasiswa semester 7 Universitas Riau dan grid 6 tools (EViews 12, Excel, Mendeley, Word, Canva, CapCut) dengan deskripsi fungsi analitis.

- [ ] **Step 1: Implementasikan `SectionHeader.tsx`**

Komponen reusable dengan badge kategori halus, judul h2 besar, dan deskripsi pengantar.

- [ ] **Step 2: Implementasikan `HeroSection.tsx`**

Menerapkan layout 2 kolom:
- Kiri: Label status *"Mahasiswa Ekonomi Pembangunan • Peneliti Muda"*, H1 *"Yuri Marisa"* dengan font tebal dan tracking rapat, narasi pengantar, tombol CTA *"Jelajahi Riset"* dan *"Hubungi Saya"*.
- Kanan: Frame portrait foto almamater UNRI beresolusi tajam dengan sudut melengkung halus dan ambient shadow.

- [ ] **Step 3: Implementasikan `AboutSection.tsx`**

Menerapkan narasi profil, kartu sorotan kompetensi (Riset Kebijakan, Ekonometri Terapan, Kepemimpinan Organisasi), serta grid kartu tools analitika tanpa icon generik berlebihan.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/SectionHeader.tsx src/components/sections/HeroSection.tsx src/components/sections/AboutSection.tsx
git commit -m "feat: add hero section and about section with analytical tools grid"
```

---

### Task 7: Research & Field Experience Sections

**Files:**
- Create: `src/components/sections/ResearchSection.tsx`
- Create: `src/components/sections/ExperienceSection.tsx`

**Interfaces:**
- Consumes: `portfolioData.publications`, `portfolioData.experiences`
- Produces:
  - Research Section menampilkan 3 publikasi jurnal ilmiah (Sinergi, Strategia, Kapalamada) dengan preview kartu dokumen, daftar penulis, abstrak ringkas, dan tombol aksi naskah.
  - Experience Section menampilkan Magang BAPPEDA Kabupaten Bengkalis (validasi dokumen 47 OPD, Rapat Wali Data lintas instansi) dan SELARAS WALHI Riau di Pulau Beting Aceh.

- [ ] **Step 1: Implementasikan `ResearchSection.tsx`**

Menampilkan kartu riset terstruktur:
- Judul jurnal, tahun, dan kategori.
- Judul lengkap penelitian akademik.
- Penulis riset (menampilkan Yuri Marisa dan rekan).
- Ringkasan temuan dan metodologi riset (kualitatif / ekonometri EViews).
- Tombol baca naskah riset.

- [ ] **Step 2: Implementasikan `ExperienceSection.tsx`**

Menampilkan format dua pilar pengalaman kebijakan dan sosial:
- Pilar 1: BAPPEDA Kabupaten Bengkalis (Bidang PPEPD) dengan 3 poin tanggung jawab utama dan tag kompetensi.
- Pilar 2: SELARAS WALHI Riau (Pulau Beting Aceh) dengan narasi advokasi lingkungan hidup dan audit sampah pesisir.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ResearchSection.tsx src/components/sections/ExperienceSection.tsx
git commit -m "feat: add research publications and field policy experience sections"
```

---

### Task 8: Certificates, Organizations & Modal Lightbox

**Files:**
- Create: `src/components/ui/ImageModal.tsx`
- Create: `src/components/sections/CertificatesSection.tsx`
- Create: `src/components/sections/OrganizationSection.tsx`

**Interfaces:**
- Consumes: `portfolioData.certificates`, `portfolioData.organizations`
- Produces:
  - Modal Lightbox (`ImageModal`) dengan backdrop blur, animasi masuk/keluar `AnimatePresence`, penutupan via tombol Esc/klik luar/tombol X.
  - Certificates Section dengan 3 kartu sertifikat yang dapat diklik untuk memunculkan modal resolusi penuh.
  - Organization Section dengan 8 kartu dokumentasi kepanitiaan, MC, dan kompetisi.

- [ ] **Step 1: Implementasikan `ImageModal.tsx`**

Fitur aksesibilitas & UX:
- Event listener `keydown` untuk tombol `Escape`.
- Lock scroll body (`document.body.style.overflow = 'hidden'`) saat modal aktif.
- Transisi `motion.div` scale dan opacity.
- Tampilan judul dokumen, instansi penerbit, dan tombol unduh/tutup.

- [ ] **Step 2: Implementasikan `CertificatesSection.tsx`**

Menampilkan 3 kartu sertifikat resmi (LPII FEB UNRI, BAPPEDA Bengkalis, Workshop EViews). Klik pada kartu memicu `setSelectedImage` untuk membuka `ImageModal`.

- [ ] **Step 3: Implementasikan `OrganizationSection.tsx`**

Menampilkan 8 pengalaman kepanitiaan dan prestasi (Project Leader, CO Konsumsi IE Cup, Leader FPVC INSTINCT 8, Moderator EDOV Festival, Tim Dokumentasi HID Pesta Rakyat, MC HMJ, Leader Konsumsi INSTINCT 9, Juara 1 Sayembara Video Kreatif WALHI). Dilengkapi kartu foto dan kategori kegiatan.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ImageModal.tsx src/components/sections/CertificatesSection.tsx src/components/sections/OrganizationSection.tsx
git commit -m "feat: add certificates lightbox modal and organization activity showcase"
```

---

### Task 9: Contact Section, Footer & Integrasi Seluruh Komponen

**Files:**
- Create: `src/components/sections/ContactSection.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: Seluruh komponen section (`LoadingScreen`, `Navbar`, `HeroSection`, `AboutSection`, `ResearchSection`, `ExperienceSection`, `CertificatesSection`, `OrganizationSection`, `ContactSection`, `Footer`, `ImageModal`).
- Produces: Halaman tunggal terintegrasi yang menyatu utuh, siap dinikmati pengguna dengan transisi animasi halus dan navigasi responsif.

- [ ] **Step 1: Implementasikan `ContactSection.tsx`**

Fitur:
- Kartu WhatsApp langsung membuka chat ke `+6285374355652`.
- Kartu Email `yuri.marisa1059@student.unri.ac.id` dengan tombol salin cepat (*copy to clipboard*) yang memunculkan toast/status *"Tersalin!"*.
- Kartu Instagram menuju `@yuriiiee__`.
- Status kartu ketersediaan riset/kolaborasi.

- [ ] **Step 2: Implementasikan `Footer.tsx`**

Berisi teks hak cipta profesional Yuri Marisa, link navigasi kembali ke atas (*Back to Top*), dan kutipan penutup ekonomi pembangunan.

- [ ] **Step 3: Integrasikan seluruh komponen di `src/app/page.tsx`**

Menggabungkan state `loading`, mengelola state `activeModalItem`, merender semua section secara berurutan, dan membungkus dengan container yang bebas overflow.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/ContactSection.tsx src/components/Footer.tsx src/app/page.tsx
git commit -m "feat: integrate all portfolio sections, contact channels, and footer"
```

---

### Task 10: Uji Kualitas, Verifikasi Antislop & Kesiapan Deploy Vercel

**Files:**
- Test / Audit: Seluruh file di `src/`
- Documentation: `README.md` (panduan memasukkan gambar asli dan deploy Vercel)

- [ ] **Step 1: Jalankan audit antislop pada seluruh teks**

Verifikasi:
- Tidak ada karakter em dash (`—`) di seluruh antarmuka.
- Tidak ada kata klise AI marketing (*cutting-edge*, *revolutionary*, *seamless*).
- Tidak ada angka atau testimonial palsu.
- Rasio kontras teks memenuhi WCAG AA di Light Mode maupun Dark Mode.

- [ ] **Step 2: Uji responsivitas mobile dan interaksi komponen**

Periksa:
- Viewport mobile (375px, 414px) tidak memiliki scrollbar horizontal.
- Semua tombol navigasi melompat ke section yang sesuai.
- Modal terbuka dan tertutup dengan tombol Esc.
- Tombol salin email menyalin alamat email dengan benar.
- Theme switch berfungsi instan.

- [ ] **Step 3: Jalankan kompilasi produksi `npm run build`**

Jalankan perintah build Next.js:
```bash
npm run build
```
Pastikan output: `Route (app) / Size First Load JS` sukses 100% tanpa peringatan atau error.

- [ ] **Step 4: Buat `README.md` informatif**

Menjelaskan:
- Struktur direktori gambar `public/images/` untuk mengganti gambar sertifikat dan foto portofolio.
- Cara menjalankan proyek secara lokal (`npm run dev`).
- Cara deploy satu klik ke Vercel via GitHub atau Vercel CLI.

- [ ] **Step 5: Commit akhir**

```bash
git add README.md
git commit -m "docs: add readme guide for asset replacement and vercel deployment"
```
