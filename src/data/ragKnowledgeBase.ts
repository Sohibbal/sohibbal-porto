export interface KnowledgeChunk {
  id: string;
  title: string;
  category: 'profile' | 'projects' | 'experience' | 'skills' | 'contact' | 'research';
  keywords: string[];
  content: string;
}

export const sohibbalKnowledgeChunks: KnowledgeChunk[] = [
  {
    id: 'profile',
    title: 'Profil & Pendidikan M. Sohibbal',
    category: 'profile',
    keywords: ['sohibbal', 'siapa', 'biodata', 'kuliah', 'kampus', 'universitas', 'ipk', 'jurusan', 'latar belakang', 'motto', 'pendidikan', 'riau', 'pekanbaru'],
    content: `M. Sohibbal adalah mahasiswa Teknik Informatika di Fakultas Teknik Universitas Riau (angkatan 2023 - sekarang) dengan IPK 3.81. Ia memiliki spesialisasi sebagai AI / Machine Learning Engineer, MLOps Developer, serta Fullstack & Mobile Developer. Motto pribadinya adalah "Keep Learn. and Code." Sohibbal berdomisili di Pekanbaru, Riau, Indonesia, dan aktif mengembangkan solusi kecerdasan buatan terapan untuk memecahkan masalah nyata.`,
  },
  {
    id: 'project-mistech',
    title: 'Proyek MiSTech (Disaster Education Platform)',
    category: 'projects',
    keywords: ['mistech', 'bencana', 'edukasi', 'flutter', 'sekolah', 'sd', 'mobile', 'mitigasi', 'fkip', 'proyek'],
    content: `MiSTech adalah platform edukasi mitigasi bencana interaktif untuk siswa SD yang dikembangkan bersama mahasiswa PGSD FKIP Universitas Riau. Sohibbal berperan sebagai Mobile Developer & Backend, membangun aplikasi mobile Flutter dan REST API backend serta web dashboard untuk manajemen materi edukasi dan kuis bencana. Repositori GitHub: https://github.com/Sohibbal/mistech-app dan Live Deploy: https://mistechgeosentra.com/.`,
  },
  {
    id: 'project-intelview',
    title: 'Proyek INTELVIEW (AI Interview Assessment)',
    category: 'projects',
    keywords: ['intelview', 'interview', 'wawancara', 'multimodal', 'yolo', 'opencv', 'mediapipe', 'ai', 'asesmen', 'proyek'],
    content: `INTELVIEW adalah sistem evaluasi wawancara otomatis berbasis kecerdasan buatan (multimodal AI). Sohibbal berperan sebagai AI/ML Engineer yang merancang pipeline analisis mencakup speech-to-text, evaluasi percakapan wawancara, serta ekstraksi fitur visual sesi wawancara menggunakan OpenCV, MediaPipe, dan YOLO. Repositori GitHub: https://github.com/zennn08/intelview dan Live Deploy di Hugging Face Space: https://aqul-intelview.hf.space.`,
  },
  {
    id: 'project-corseo',
    title: 'Proyek Corseo (AI Recommendation System)',
    category: 'projects',
    keywords: ['corseo', 'rekomendasi', 'kursus', 'lowongan', 'ncf', 'collaborative', 'content-based', 'tensorflow', 'tf-idf', 'proyek'],
    content: `Corseo adalah sistem rekomendasi berbasis AI untuk membantu pengguna menemukan kursus, lowongan kerja, dan forum diskusi yang relevan. Sohibbal bertindak sebagai AI/ML Engineer yang membangun model hybrid Neural Collaborative Filtering (NCF) dan Content-Based Filtering menggunakan TensorFlow, TF-IDF, serta teknik reduksi dimensi data. Repositori GitHub: https://github.com/Diki04/Corseo dan Live Deploy: https://corseo.mistechgeosentra.com.`,
  },
  {
    id: 'project-smarteppm',
    title: 'Proyek SMART E-PPM (RAG Chatbot LPPM UNRI)',
    category: 'projects',
    keywords: ['smart e-ppm', 'eppm', 'lppm', 'unri', 'rag', 'chatbot', 'retrieval', 'dokumen', 'informasi', 'proyek'],
    content: `SMART E-PPM adalah asisten chatbot cerdas yang dikembangkan bersama LPPM Universitas Riau untuk membantu sivitas akademika mengakses pengumuman dan panduan E-PPM. Sohibbal berperan sebagai AI/ML Engineer yang membangun pipeline Retrieval-Augmented Generation (RAG), meliputi pemrosesan dokumen resmi, pembentukan embedding, information retrieval semantik, dan integrasi LLM agar jawaban kontekstual dan akurat. Repositori GitHub: https://github.com/Diki04/E-PPM-Landing-Page dan Tautan Resmi: https://e-ppm.unri.ac.id/home/.`,
  },
  {
    id: 'project-obesity',
    title: 'Proyek MLOps Obesity Classification',
    category: 'projects',
    keywords: ['mlops', 'obesity', 'obesitas', 'docker', 'prometheus', 'grafana', 'random forest', 'gridsearch', 'klasifikasi', 'proyek'],
    content: `MLOps Obesity Classification adalah proyek mandiri Sohibbal yang mengeksplorasi alur kerja end-to-end machine learning untuk klasifikasi tingkat obesitas. Model Random Forest dioptimasi dengan GridSearch, kemudian dikemas ke dalam kontainer Docker dan dipantau metrik performanya secara real-time menggunakan Prometheus dan Grafana. Repositori GitHub: https://github.com/Sohibbal/obesity-classification dan DockerHub: https://hub.docker.com/r/sohibbal/obesity-classification.`,
  },
  {
    id: 'experience-teaching',
    title: 'Pengalaman Asisten Laboratorium UNRI',
    category: 'experience',
    keywords: ['asisten', 'lab', 'laboratorium', 'ai', 'basis data', 'database', 'mengajar', 'dosen', 'unri', 'praktikum', 'pengalaman'],
    content: `Sohibbal dipercaya sebagai Asisten Laboratorium Kecerdasan Buatan (Lab AI) di Universitas Riau (2026 - sekarang) membimbing mahasiswa dalam pemahaman algoritma AI, konsep machine learning, dan evaluasi kode praktikum. Sebelumnya ia juga menjadi Asisten Laboratorium Basis Data (Lab DB) UNRI (2026) membimbing praktikum perancangan skema relasional, pemodelan ER, normalisasi tabel, dan SQL query.`,
  },
  {
    id: 'research-cv-systec',
    title: 'Publikasi Riset Computer Vision (Jurnal SYSTEC UNRI)',
    category: 'research',
    keywords: ['riset', 'penelitian', 'jurnal', 'systec', 'cifake', 'cnn', 'efficientnet', 'vision transformer', 'vit', 'computer vision', 'deep learning', 'data mining', 'unri'],
    content: `Sebagai salah satu luaran mata kuliah Data Mining (2026), M. Sohibbal bersama tim melakukan riset komparatif bertajuk "Perbandingan Kinerja Model CNN EfficientNetB0 dan Vision Transformer Untuk Klasifikasi Citra Real-Fake" yang dipublikasikan pada Journal of System & Technology (SYSTEC) UNRI Vol. 2 No. 1 (2026). Penelitian ini menguji 120.000 citra pada dataset CIFAKE (citra asli CIFAR-10 vs citra AI sintetis Stable Diffusion v1.4). Hasil riset menunjukkan bahwa Vision Transformer (ViT) mencapai akurasi 97,15% dengan precision dan recall seimbang di atas 97%, mengungguli EfficientNetB0 (akurasi 84,79%). Tautan publikasi resmi: https://systec.ejournal.unri.ac.id/index.php/systec/article/view/48.`,
  },
  {
    id: 'experience-cohorts',
    title: 'Prestasi Cohort Industri & Penghargaan',
    category: 'experience',
    keywords: ['prestasi', 'penghargaan', 'distinction', 'top 10', 'dbs', 'accenture', 'dicoding', 'yandex', 'digitalent', 'home credit', 'sertifikat', 'basis data'],
    content: `Sohibbal mencatatkan pencapaian ganda sebagai Distinction Graduate (Top 10% lulusan terbaik):
1. Coding Camp powered by DBS Foundation & Dicoding (2026): Top 10% dari 700+ peserta program AI Engineer.
2. Program Asah Led by Dicoding with Accenture (2025): Top 10% dari 1.000+ peserta program Machine Learning.
Selain itu, ia mengantongi sertifikat resmi Asisten Laboratorium Basis Data Lanjut UNRI (2026), menyelesaikan pelatihan spesialisasi pemodelan regresi linier Yandex & Digitalent Scholarship Kominfo (2025), serta menyelesaikan program Data Scientist Project-Based Internship di Home Credit Indonesia dengan nilai akhir 89.34 (Predikat Excellent).`,
  },
  {
    id: 'skills',
    title: 'Keahlian Teknis & Tech Stack',
    category: 'skills',
    keywords: ['skill', 'keahlian', 'tech stack', 'teknologi', 'bahasa', 'python', 'tensorflow', 'scikit-learn', 'pytorch', 'langchain', 'hugging face', 'docker', 'nextjs', 'flutter', 'sql'],
    content: `Tech stack dan keahlian Sohibbal meliputi:
- AI & Machine Learning: TensorFlow, Scikit-Learn, PyTorch, LangChain, Hugging Face, MediaPipe, OpenCV, Retrieval-Augmented Generation (RAG).
- Bahasa Pemrograman: Python, TypeScript, JavaScript, Dart, SQL.
- Framework Web & Mobile: Next.js, React, Tailwind CSS, Flutter, Node.js.
- DevOps, MLOps, & Basis Data: Docker, Prometheus, Grafana, PostgreSQL, MySQL, Git & GitHub.`,
  },
  {
    id: 'contact',
    title: 'Kontak & Saluran Media Sosial',
    category: 'contact',
    keywords: ['kontak', 'hubungi', 'email', 'whatsapp', 'wa', 'instagram', 'ig', 'linkedin', 'github', 'sosmed', 'telepon', 'kolaborasi'],
    content: `Sohibbal dapat dihubungi langsung melalui saluran resmi berikut:
- WhatsApp: [WhatsApp Sohibbal (Klik di sini)](https://wa.me/6282287749434) (+62 822-8774-9434)
- Instagram: [Instagram @iib25_ (Klik di sini)](https://instagram.com/iib25_)
- LinkedIn: [LinkedIn Sohibbal (Klik di sini)](https://www.linkedin.com/in/msohibbal/)
- GitHub: [GitHub Sohibbal (Klik di sini)](https://github.com/Sohibbal)
- Email: [Kirim Email ke Sohibbal](mailto:iibsohibbal@gmail.com) (iibsohibbal@gmail.com)
Sohibbal sangat terbuka untuk diskusi kolaborasi riset kecerdasan buatan, proyek rekayasa software, maupun peluang kerja profesional.`,
  },
  {
    id: 'support-system-yuri',
    title: 'Support System & Pasangan (Yuri Marisa)',
    category: 'profile',
    keywords: ['yuri', 'marisa', 'pacar', 'pasangan', 'cewek', 'doi', 'support system', 'kkn', 'pebadaran', 'pusako', 'siak', 'bengkalis', 'bantan', 'osn', 'pelatda', 'mutiara merdeka', 'ekonomi', 'cinta'],
    content: `Support system utama sekaligus pacar M. Sohibbal bernama Yuri Marisa. Yuri adalah mahasiswi Universitas Riau program studi Ekonomi Pembangunan angkatan 2023, yang berasal dari Kabupaten Bengkalis (tepatnya daerah Bantan). 
Mereka resmi saling mengenal dan dekat saat masa Kuliah Kerja Nyata (KKN) tahun 2026 di Desa Pebadaran, Kecamatan Pusako, Kabupaten Siak. 
Menariknya, sebelum masa KKN tersebut, mereka sebenarnya sudah pernah berada di satu lokasi yang sama pada tahun 2022 saat mengikuti Pelatda OSN Tingkat Provinsi di Hotel Mutiara Merdeka, Pekanbaru (saat itu Sohibbal mewakili bidang Kimia dan Yuri di bidang Ekonomi). 
Yuri adalah sosok penyemangat nomor satu yang selalu memberikan energi positif dalam perjalanan akademik, riset, dan rekayasa AI Sohibbal. Portofolio web Yuri Marisa dapat diakses di: [Portofolio Yuri Marisa (Klik di sini)](https://yuri-marisa.vercel.app/).`,
  },
];

/**
 * Semantic keyword relevance scoring for RAG retrieval
 */
export function searchKnowledgeBase(query: string, topK = 3): KnowledgeChunk[] {
  const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const queryTokens = normalizedQuery.split(/\s+/).filter((t) => t.length > 2);

  if (queryTokens.length === 0) {
    return sohibbalKnowledgeChunks.slice(0, topK);
  }

  const scoredChunks = sohibbalKnowledgeChunks.map((chunk) => {
    let score = 0;
    const lowerContent = chunk.content.toLowerCase();
    const lowerTitle = chunk.title.toLowerCase();

    for (const token of queryTokens) {
      if (chunk.keywords.some((kw) => kw.includes(token) || token.includes(kw))) {
        score += 6;
      }
      if (lowerTitle.includes(token)) {
        score += 4;
      }
      if (lowerContent.includes(token)) {
        score += 2;
      }
    }

    return { chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);

  const results = scoredChunks.filter((item) => item.score > 0).map((item) => item.chunk);

  if (results.length === 0) {
    return [sohibbalKnowledgeChunks[0], sohibbalKnowledgeChunks[sohibbalKnowledgeChunks.length - 2]];
  }

  return results.slice(0, topK);
}

/**
 * Intelligent zero-downtime fallback responder
 * Ensures that if GEMINI_API_KEY is not set or network fails, the chatbot still responds accurately, friendly, and naturally!
 */
export function generateFallbackResponse(query: string, chunks: KnowledgeChunk[]): string {
  const queryLower = query.toLowerCase();

  // 1. Support system / Pacar (Yuri Marisa)
  if (
    queryLower.includes('yuri') ||
    queryLower.includes('marisa') ||
    queryLower.includes('pacar') ||
    queryLower.includes('pasangan') ||
    queryLower.includes('doi') ||
    queryLower.includes('cewek') ||
    queryLower.includes('support system') ||
    queryLower.includes('cinta')
  ) {
    return `Sohibbal punya pacar sekaligus support system terbaik bernama **Yuri Marisa**!\n\nYuri adalah mahasiswi Universitas Riau prodi Ekonomi Pembangunan (angkatan 2023) yang berasal dari daerah Bantan, Kabupaten Bengkalis.\n\nKisah pertemuan mereka cukup unik dan seru:\n- Mereka mulai dekat dan menjalin hubungan saat kegiatan KKN tahun 2026 di Desa Pebadaran, Kecamatan Pusako, Kabupaten Siak.\n- Namun sebenarnya, mereka sudah pernah berada di satu lokasi yang sama di tahun 2022 saat Pelatda OSN Tingkat Provinsi di Hotel Mutiara Merdeka, Pekanbaru. Waktu itu Sohibbal mewakili bidang Kimia, sedangkan Yuri di bidang Ekonomi.\n\nYuri selalu jadi pendukung nomor satu yang menyemangati Sohibbal dalam studi dan riset teknologi. Kamu juga bisa lihat portofolio web Yuri langsung di sini: [Portofolio Yuri Marisa (Klik di sini)](https://yuri-marisa.vercel.app/)!`;
  }

  // 2. Kontak & Media Sosial
  if (
    queryLower.includes('kontak') ||
    queryLower.includes('hubungi') ||
    queryLower.includes('email') ||
    queryLower.includes('wa') ||
    queryLower.includes('whatsapp') ||
    queryLower.includes('instagram') ||
    queryLower.includes('ig') ||
    queryLower.includes('linkedin') ||
    queryLower.includes('github') ||
    queryLower.includes('sosmed')
  ) {
    return `Mau ngobrol langsung atau diskusi proyek dengan Sohibbal? Yuk, langsung hubungi lewat kontak dan media sosial berikut (tinggal klik saja):\n\n- WhatsApp: [WhatsApp Sohibbal (Klik di sini)](https://wa.me/6282287749434) (+62 822-8774-9434)\n- Instagram: [Instagram @iib25_ (Klik di sini)](https://instagram.com/iib25_)\n- LinkedIn: [LinkedIn Sohibbal (Klik di sini)](https://www.linkedin.com/in/msohibbal/)\n- GitHub: [GitHub Sohibbal (Klik di sini)](https://github.com/Sohibbal)\n- Email: [Kirim Email ke Sohibbal](mailto:iibsohibbal@gmail.com) (iibsohibbal@gmail.com)\n\nSohibbal ramah dan selalu terbuka untuk kolaborasi riset AI, proyek software, maupun tawaran kesempatan kerja. Sapa aja sekarang!`;
  }

  // 3. Proyek Unggulan
  if (queryLower.includes('proyek') || queryLower.includes('project') || queryLower.includes('karya') || queryLower.includes('portfolio')) {
    return `Sohibbal sudah mengembangkan beberapa proyek unggulan di bidang AI, mobile, dan MLOps:\n\n1. **MISTECH**: Platform edukasi mitigasi bencana interaktif untuk siswa SD (Flutter & REST API). Lihat di [Live Website](https://mistechgeosentra.com/) atau cek [GitHub](https://github.com/Sohibbal/mistech-app).\n2. **INTELVIEW**: Sistem evaluasi wawancara otomatis multimodal AI (OpenCV, MediaPipe, YOLO). Coba live demo di [Hugging Face Space](https://aqul-intelview.hf.space) atau cek [GitHub](https://github.com/zennn08/intelview).\n3. **Corseo**: Sistem rekomendasi berbasis AI menggunakan Neural Collaborative Filtering & TF-IDF (TensorFlow). Akses di [Live Website](https://corseo.mistechgeosentra.com) atau cek [GitHub](https://github.com/Diki04/Corseo).\n4. **SMART E-PPM**: Chatbot informasi RAG untuk sivitas akademika LPPM Universitas Riau. Kunjungi [Situs Resmi E-PPM](https://e-ppm.unri.ac.id/home/).\n5. **MLOps Obesity Classification**: Pipeline machine learning terintegrasi Docker, Prometheus, dan Grafana. Cek [GitHub](https://github.com/Sohibbal/obesity-classification).\n\nMau tahu detail arsitektur dari proyek yang mana? Tanyakan aja ke BalBot!`;
  }

  // 4. Riset & Publikasi
  if (queryLower.includes('riset') || queryLower.includes('jurnal') || queryLower.includes('penelitian') || queryLower.includes('cifake') || queryLower.includes('cv')) {
    return `Sohibbal aktif melakukan riset Computer Vision yang sudah dipublikasikan di jurnal ilmiah:\n\n- Judul Riset: *Perbandingan Kinerja Model CNN EfficientNetB0 dan Vision Transformer Untuk Klasifikasi Citra Real-Fake*\n- Publikasi: Journal of System & Technology (SYSTEC) UNRI Vol. 2 No. 1 (2026)\n- Hasil Utama: Model Vision Transformer (ViT) terbukti sangat tangguh dengan akurasi 97,15% pada 120.000 citra dataset CIFAKE, mengungguli CNN EfficientNetB0 (84,79%).\n- Tautan Jurnal: [Baca Artikel Jurnal SYSTEC (Klik di sini)](https://systec.ejournal.unri.ac.id/index.php/systec/article/view/48)`;
  }

  // 5. Asisten Laboratorium
  if (queryLower.includes('asisten') || queryLower.includes('lab') || queryLower.includes('ajar') || queryLower.includes('dosen') || queryLower.includes('praktikum')) {
    return `Di Universitas Riau, Sohibbal dipercaya sebagai Asisten Laboratorium:\n\n- **Asisten Lab Kecerdasan Buatan (Lab AI, 2026 - Sekarang)**: Membimbing praktikum algoritma AI, konsep machine learning, dan evaluasi implementasi kode mahasiswa.\n- **Asisten Lab Basis Data (Lab DB, 2026)**: Mengajar pemodelan relasional, normalisasi tabel, dan SQL query efisien.\n\nSohibbal senang berbagi ilmu dan mendiskusikan implementasi teknis bersama teman-teman mahasiswa.`;
  }

  // 6. Prestasi & Penghargaan
  if (queryLower.includes('prestasi') || queryLower.includes('sertifikat') || queryLower.includes('award') || queryLower.includes('juara') || queryLower.includes('lulus') || queryLower.includes('dbs')) {
    return `Beberapa pencapaian membanggakan yang diraih Sohibbal:\n\n- **Distinction Graduate (Top 10% dari 700+ peserta)** pada Coding Camp powered by DBS Foundation & Dicoding 2026 (AI Engineer Cohort).\n- **Distinction Graduate (Top 10% dari 1.000+ peserta)** pada program Asah Led by Dicoding with Accenture 2025 (Machine Learning Cohort).\n- **Linear Regression Modeling Specialist** dari Yandex & Digitalent Scholarship Kominfo 2025.\n- Mahasiswa Teknik Informatika Universitas Riau dengan IPK 3.81.`;
  }

  // 7. Tech Stack & Keahlian
  if (queryLower.includes('skill') || queryLower.includes('keahlian') || queryLower.includes('stack') || queryLower.includes('tools') || queryLower.includes('teknologi')) {
    return `Tech stack utama yang sering dipakai Sohibbal:\n\n- **AI & Machine Learning**: TensorFlow, Scikit-Learn, PyTorch, LangChain, Hugging Face, MediaPipe, OpenCV, serta arsitektur Retrieval-Augmented Generation (RAG).\n- **Bahasa Pemrograman**: Python, TypeScript, JavaScript, Dart, SQL.\n- **Web & Mobile**: Next.js, React, Tailwind CSS, Flutter, Node.js.\n- **DevOps, MLOps, & Database**: Docker, Prometheus, Grafana, PostgreSQL, MySQL, Git & GitHub.`;
  }

  // Synthesize top chunk
  const top = chunks[0];
  return `${top.content}\n\nAda hal lain yang ingin kamu tanyakan seputar portofolio, proyek, atau perjalanan Sohibbal? BalBot siap membantu!`;
}
