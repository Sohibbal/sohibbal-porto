import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledgeBase, generateFallbackResponse } from '@/data/ragKnowledgeBase';

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
    const relevantChunks = searchKnowledgeBase(cleanMessage, 3);
    const contextText = relevantChunks.map((c) => `[${c.title}]: ${c.content}`).join('\n\n');

    const apiKey = process.env.GEMINI_API_KEY;

    let assistantReply = '';

    if (apiKey) {
      try {
        const systemInstruction = `Kamu adalah "Sohibbal Assistant", asisten kecerdasan buatan resmi untuk portofolio M. Sohibbal (AI / Machine Learning Engineer & Software Developer dari Universitas Riau).
Tugasmu adalah menjawab pertanyaan pengunjung mengenai M. Sohibbal dengan ramah, profesional, ringkas, dan strictly berbasis pada konteks dokumen di bawah ini.
Aturan:
1. Jawab dalam Bahasa Indonesia secara sopan dan natural (atau dalam Bahasa Inggris jika pengunjung bertanya dalam Bahasa Inggris).
2. Jangan pernah mengarang data atau berhalusinasi. Jika informasi tidak terdapat dalam konteks, katakan dengan sopan bahwa informasi tersebut belum tercantum dan sarankan untuk menghubungi Sohibbal melalui WhatsApp (+62 822-8774-9434) atau Email (iibsohibbal@gmail.com).
3. DILARANG menggunakan karakter em dash di seluruh jawabanmu. Gunakan tanda titik dua (:), tanda koma (,), titik (.), tanda kurung (), atau tanda strip pendek (-) yang wajar.

KONTEKS DOKUMEN RESMI SOHIBBAL:
${contextText}`;

        const payload = {
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nPertanyaan Pengunjung: "${cleanMessage}"` }],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 600,
          },
        };

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidate) {
            assistantReply = candidate.replace(/\u2014/g, '-').trim();
          }
        }
      } catch (err) {
        console.error('Gemini API call failed, falling back to local retrieval:', err);
      }
    }

    // Zero-downtime intelligent fallback if API key is not present or API call failed
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
