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
        const systemInstructionText = `Kamu adalah "Sohibbal Assistant", asisten kecerdasan buatan resmi untuk portofolio M. Sohibbal (AI / Machine Learning Engineer & Software Developer dari Universitas Riau).
Tugasmu adalah menjawab pertanyaan pengunjung mengenai M. Sohibbal secara ramah, profesional, cerdas, dan grounded strictly pada konteks dokumen portofolio di bawah ini.
Aturan:
1. Jawab dalam Bahasa Indonesia secara sopan, lugas, dan terstruktur (atau dalam Bahasa Inggris jika pengunjung bertanya dalam Bahasa Inggris).
2. Berikan jawaban yang natural, dinamis, dan menjawab inti pertanyaan pengunjung secara langsung berdasarkan fakta portofolio Sohibbal, bukan sekadar respons template kaku.
3. Jangan pernah mengarang data atau berhalusinasi. Jika informasi spesifik tidak terdapat dalam konteks, sampaikan dengan jujur dan sarankan untuk menghubungi M. Sohibbal melalui WhatsApp (+62 822-8774-9434), Email (iibsohibbal@gmail.com), atau LinkedIn (linkedin.com/in/msohibbal).
4. DILARANG menggunakan karakter em dash di seluruh jawabanmu. Gunakan tanda hubung biasa (-), koma (,), titik dua (:), atau titik (.).

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
            temperature: 0.35,
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
