export interface KnowledgeChunk {
  id: string;
  title: string;
  category: 'profile' | 'projects' | 'experience' | 'skills' | 'contact';
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
    id: 'experience-cohorts',
    title: 'Prestasi Cohort Industri & Penghargaan',
    category: 'experience',
    keywords: ['prestasi', 'penghargaan', 'distinction', 'top 10', 'dbs', 'accenture', 'dicoding', 'yandex', 'digitalent', 'home credit', 'sertifikat'],
    content: `Sohibbal mencatatkan pencapaian ganda sebagai Distinction Graduate (Top 10% lulusan terbaik):
1. Coding Camp powered by DBS Foundation & Dicoding (2026): Top 10% dari 700+ peserta program AI Engineer.
2. Program Asah Led by Dicoding with Accenture (2025): Top 10% dari 1.000+ peserta program Machine Learning.
Selain itu, ia menyelesaikan program spesialisasi pemodelan regresi linier Yandex & Digitalent Scholarship Kominfo (2025) serta magang berbasis proyek di Home Credit Indonesia (2025) membangun model prediktif credit scoring.`,
  },
  {
    id: 'skills',
    title: 'Keahlian Teknis & Tech Stack',
    category: 'skills',
    keywords: ['skill', 'keahlian', 'tech stack', 'teknologi', 'bahasa', 'python', 'tensorflow', 'scikit-learn', 'docker', 'nextjs', 'flutter', 'sql'],
    content: `Tech stack dan keahlian Sohibbal meliputi:
- AI & Machine Learning: TensorFlow, Scikit-Learn, PyTorch, MediaPipe, OpenCV, Retrieval-Augmented Generation (RAG).
- Bahasa Pemrograman: Python, TypeScript, JavaScript, Dart, SQL.
- Framework Web & Mobile: Next.js, React, Tailwind CSS, Flutter, Node.js.
- DevOps, MLOps, & Basis Data: Docker, Prometheus, Grafana, PostgreSQL, MySQL, Git & GitHub.`,
  },
  {
    id: 'contact',
    title: 'Kontak & Saluran Media Sosial',
    category: 'contact',
    keywords: ['kontak', 'hubungi', 'email', 'whatsapp', 'wa', 'instagram', 'linkedin', 'github', 'sosmed', 'telepon', 'kolaborasi'],
    content: `Sohibbal dapat dihubungi melalui beberapa saluran resmi:
- WhatsApp: +62 822-8774-9434 (https://wa.me/6282287749434)
- Email: iibsohibbal@gmail.com
- Instagram: @iib25_ (https://instagram.com/iib25_)
- LinkedIn: https://www.linkedin.com/in/msohibbal/
- GitHub: https://github.com/Sohibbal
Sohibbal terbuka untuk kolaborasi riset kecerdasan buatan, proyek pengembangan aplikasi, maupun peluang karir profesional.`,
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
    return [sohibbalKnowledgeChunks[0], sohibbalKnowledgeChunks[8]];
  }

  return results.slice(0, topK);
}

/**
 * Intelligent zero-downtime fallback responder
 * Ensures that if GEMINI_API_KEY is not set or network fails, the chatbot still responds accurately and politely!
 */
export function generateFallbackResponse(query: string, chunks: KnowledgeChunk[]): string {
  const queryLower = query.toLowerCase();

  if (queryLower.includes('kontak') || queryLower.includes('hubungi') || queryLower.includes('email') || queryLower.includes('wa') || queryLower.includes('instagram')) {
    return `Anda dapat menghubungi Sohibbal secara langsung melalui:\n- WhatsApp: +62 822-8774-9434\n- Email: iibsohibbal@gmail.com\n- Instagram: @iib25_\n- LinkedIn: linkedin.com/in/msohibbal\n- GitHub: github.com/Sohibbal\n\nSohibbal terbuka untuk diskusi kolaborasi riset AI, proyek software, maupun peluang kerja profesional.`;
  }

  if (queryLower.includes('proyek') || queryLower.includes('project') || queryLower.includes('karya')) {
    return `Sohibbal telah mengerjakan beberapa proyek unggulan:\n1. MISTECH: Platform edukasi mitigasi bencana untuk siswa SD (Flutter & REST API backend).\n2. INTELVIEW: Sistem evaluasi wawancara multimodal AI (OpenCV, MediaPipe, YOLO).\n3. Corseo: Sistem rekomendasi cerdas berbasis Neural Collaborative Filtering & TF-IDF (TensorFlow).\n4. SMART E-PPM: Chatbot informasi berbasis Retrieval-Augmented Generation (RAG) untuk LPPM Universitas Riau.\n5. MLOps Obesity Classification: Alur kerja klasifikasi obesitas lengkap dengan Docker, Prometheus, dan Grafana.\n\nSetiap proyek memiliki repositori GitHub dan tautan deploy yang dapat Anda lihat pada section Proyek di portofolio ini.`;
  }

  if (queryLower.includes('asisten') || queryLower.includes('lab') || queryLower.includes('ajar') || queryLower.includes('dosen')) {
    return `Di Universitas Riau, Sohibbal aktif sebagai Asisten Laboratorium:\n- Asisten Lab Kecerdasan Buatan (Lab AI, 2026 - Sekarang): Memandu praktikum algoritma AI, konsep machine learning, dan membimbing penugasan kode mahasiswa.\n- Asisten Lab Basis Data (Lab DB, 2026): Mengajar pemodelan relasional, normalisasi tabel, dan SQL query efisien.`;
  }

  if (queryLower.includes('prestasi') || queryLower.includes('sertifikat') || queryLower.includes('award') || queryLower.includes('juara') || queryLower.includes('lulus')) {
    return `Pencapaian utama Sohibbal meliputi:\n- Distinction Graduate (Top 10% dari 700+ peserta) pada Coding Camp powered by DBS Foundation & Dicoding 2026 (AI Engineer Cohort).\n- Distinction Graduate (Top 10% dari 1.000+ peserta) pada program Asah Led by Dicoding with Accenture 2025 (Machine Learning Cohort).\n- Linear Regression Modeling Specialist dari Yandex & Digitalent Scholarship Kominfo 2025.\n- Mahasiswa Teknik Informatika Universitas Riau dengan IPK 3.81.`;
  }

  if (queryLower.includes('skill') || queryLower.includes('keahlian') || queryLower.includes('stack') || queryLower.includes('tools')) {
    return `Tech stack utama Sohibbal meliputi:\n- AI & Machine Learning: TensorFlow, Scikit-Learn, PyTorch, MediaPipe, OpenCV, Retrieval-Augmented Generation (RAG).\n- Bahasa: Python, TypeScript, JavaScript, Dart, SQL.\n- Web & Mobile: Next.js, React, Tailwind CSS, Flutter, Node.js.\n- DevOps & MLOps: Docker, Prometheus, Grafana, PostgreSQL, MySQL, Git.`;
  }

  // Synthesize top chunk
  const top = chunks[0];
  return `${top.content}\n\nApakah ada hal spesifik lain tentang proyek atau pengalaman Sohibbal yang ingin Anda ketahui?`;
}
