import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledgeBase, generateFallbackResponse } from '@/data/ragKnowledgeBase';

interface HistoryItem {
  role?: 'user' | 'assistant';
  text?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { error: 'Pesan tidak boleh kosong.' },
        { status: 400 }
      );
    }

    const cleanMessage = message.trim();
    const relevantChunks = searchKnowledgeBase(cleanMessage, 4);
    const contextText = relevantChunks.map((c) => `[${c.title}]: ${c.content}`).join('\n\n');

    const rawKey = process.env.GEMINI_API_KEY || '';
    const apiKey = rawKey.replace(/^["']|["']$/g, '').trim();

    let assistantReply = '';

    if (apiKey) {
      try {
        const systemInstructionText = `Kamu adalah "BalBot", asisten AI resmi yang ramah, cerdas, asyik, dan komunikatif untuk portofolio M. Sohibbal (AI / Machine Learning Engineer & Software Developer dari Universitas Riau).

GAYA BAHASA & KEPRIBADIAN:
- Berbicaralah dengan gaya bahasa manusia yang mengalir alami, ramah, hangat, santai tapi tetap sopan dan pintar. Hindari gaya bahasa kaku seperti mesin atau template birokrasi.
- Panggil dirimu "BalBot" saat memperkenalkan diri atau saat relevan.
- Tanggapi pertanyaan pengunjung secara langsung, kontekstual, dan solutif.
- Jika pengunjung bertanya dalam Bahasa Inggris, jawab dengan Bahasa Inggris yang alami dan engaging.

FORMAT TAUTAN & MEDIA SOSIAL:
- Jika merekomendasikan kontak atau media sosial, SELALU sediakan teks "klik di sini" dalam format markdown link agar pengunjung bisa langsung mengkliknya:
  * WhatsApp: [WhatsApp Sohibbal (Klik di sini)](https://wa.me/6282287749434) (+62 822-8774-9434)
  * Instagram: [Instagram @iib25_ (Klik di sini)](https://instagram.com/iib25_)
  * LinkedIn: [LinkedIn Sohibbal (Klik di sini)](https://www.linkedin.com/in/msohibbal/)
  * GitHub: [GitHub Sohibbal (Klik di sini)](https://github.com/Sohibbal)
  * Email: [Kirim Email ke Sohibbal](mailto:iibsohibbal@gmail.com) (iibsohibbal@gmail.com)
- Untuk portofolio dan publikasi:
  * Portofolio Yuri Marisa: [Portofolio Yuri Marisa (Klik di sini)](https://yuri-marisa.vercel.app/)
  * Jurnal Riset SYSTEC: [Artikel Jurnal SYSTEC (Klik di sini)](https://systec.ejournal.unri.ac.id/index.php/systec/article/view/48)

KONTEKS KHUSUS: PACAR & SUPPORT SYSTEM (YURI MARISA):
- Sohibbal sudah memiliki pacar sekaligus support system terbaik bernama Yuri Marisa.
- Yuri adalah mahasiswi Universitas Riau prodi Ekonomi Pembangunan angkatan 2023, berasal dari daerah Bantan, Kabupaten Bengkalis.
- Mereka mulai dekat dan berpacaran saat masa KKN tahun 2026 di Desa Pebadaran, Kecamatan Pusako, Kabupaten Siak.
- Kisah takdir unik: Sebelum KKN, di tahun 2022 mereka sebenarnya sudah pernah berada di satu lokasi yang sama saat Pelatda OSN Tingkat Provinsi di Hotel Mutiara Merdeka, Pekanbaru (saat itu Sohibbal mewakili bidang Kimia dan Yuri di bidang Ekonomi).
- Yuri selalu menjadi penyemangat nomor satu bagi Sohibbal.
- Tautan portofolio web Yuri: [Portofolio Yuri Marisa (Klik di sini)](https://yuri-marisa.vercel.app/)
- Jika ada pengunjung yang menanyakan pacar, pasangan, doi, cinta, atau support system Sohibbal, ceritakan kisah manis ini secara hangat dan sertakan link portofolio Yuri!

ATURAN WAJIB:
1. Jawaban harus grounded strictly pada dokumen portofolio Sohibbal di bawah ini. Jangan mengarang fakta.
2. DILARANG menggunakan karakter em dash di seluruh jawabanmu. Gunakan tanda hubung biasa (-), koma (,), titik dua (:), atau titik (.).

KONTEKS RESMI PORTOFOLIO M. SOHIBBAL:
${contextText}`;

        const geminiContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

        if (Array.isArray(history)) {
          for (const item of (history as HistoryItem[]).slice(-6)) {
            if (item && typeof item.text === 'string' && item.text.trim()) {
              geminiContents.push({
                role: item.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: item.text.trim() }],
              });
            }
          }
        }

        geminiContents.push({
          role: 'user',
          parts: [{ text: cleanMessage }],
        });

        const candidateModels = [
          'gemini-flash-lite-latest',
          'gemini-2.5-flash',
          'gemini-flash-latest',
        ];

        const payload = {
          systemInstruction: {
            parts: [{ text: systemInstructionText }],
          },
          contents: geminiContents,
          generationConfig: {
            temperature: 0.45,
            maxOutputTokens: 800,
          },
        };

        for (const model of candidateModels) {
          try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
            const res = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
              signal: AbortSignal.timeout(8000),
            });

            if (res.ok) {
              const data = await res.json();
              const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (candidate && typeof candidate === 'string' && candidate.trim()) {
                assistantReply = candidate.replace(/\u2014/g, '-').trim();
                break;
              }
            }
          } catch {
            // Cascade to next candidate model
          }
        }
      } catch (err) {
        console.error('Gemini API call failed, falling back to local retrieval:', err);
      }
    }

    // Zero-downtime intelligent fallback if API key is not present or all API calls failed
    if (!assistantReply) {
      assistantReply = generateFallbackResponse(cleanMessage, relevantChunks);
    }

    // Ensure strict Antislop compliance (no em dash)
    assistantReply = assistantReply.replace(/\u2014/g, '-');

    return NextResponse.json({
      reply: assistantReply,
      sources: relevantChunks.map((c) => c.title),
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kendala dalam memproses pertanyaan Anda.' },
      { status: 500 }
    );
  }
}
