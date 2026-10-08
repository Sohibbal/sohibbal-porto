'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, RotateCcw, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: string[];
  time: string;
  isStreaming?: boolean;
}

// =========================================================================
// PENGATURAN PERTANYAAN CEPAT (QUICK PROMPTS)
// Anda dapat mengubah, menambah, atau menghapus teks pertanyaan di bawah ini.
// Teks di dalam array ini akan muncul sebagai tombol di atas kolom input chat.
// =========================================================================
const quickPrompts = [
  'Siapa Sohibbal sebenarnya?',
  'Apa saja proyek AI unggulan Sohibbal?',
  'Bagaimana rekam pengalaman sohibbal?',
  'Bagaimana cara menghubungi Sohibbal langsung?',
];

/**
 * Helper to parse markdown links [label](url), plain URLs, and **bold** text into clickable/styled JSX elements.
 */
function renderFormattedMessage(text: string, isUser = false): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)|(https?:\/\/[^\s<>()]+)|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      // Markdown link [label](url)
      elements.push(
        <a
          key={`md-link-${match.index}`}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline font-bold inline-flex items-center gap-0.5 ${
            isUser ? 'text-background hover:opacity-80' : 'text-accent-brand hover:opacity-80'
          }`}
        >
          {match[1]} ↗
        </a>
      );
    } else if (match[3]) {
      // Plain URL
      elements.push(
        <a
          key={`raw-url-${match.index}`}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline font-bold break-all inline-flex items-center gap-0.5 ${
            isUser ? 'text-background hover:opacity-80' : 'text-accent-brand hover:opacity-80'
          }`}
        >
          {match[3]} ↗
        </a>
      );
    } else if (match[4]) {
      // Bold text **text**
      elements.push(
        <strong key={`bold-${match.index}`} className="font-bold text-inherit">
          {match[4]}
        </strong>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
}

// =========================================================================
// KONFIGURASI KECEPATAN ANIMASI KETIKAN (TYPEWRITER SPEED CONFIG)
// Anda dapat mengatur seberapa cepat atau lambat chatbot mengetik di sini:
//
// 1. TYPEWRITER_INTERVAL_MS : Jeda waktu antar ketukan huruf (milidetik).
//    - Semakin BESAR angkanya, semakin SLOW / LAMBAT animasinya.
//    - Nilai Cepat       : 15 - 20 ms
//    - Nilai Slow/Alami  : 30 - 38 ms (disetel ke 35 ms agar lebih santai)
//    - Nilai Sangat Slow : 45 - 60 ms
//
// 2. TYPEWRITER_CHAR_STEP   : Jumlah huruf yang keluar per ketukan waktu.
//    - Nilai 1 : Mengetik huruf demi huruf secara presisi (rekomendasi).
//    - Nilai 2 : Dua huruf sekaligus per ketukan.
// =========================================================================
const TYPEWRITER_INTERVAL_MS = 35;
const TYPEWRITER_CHAR_STEP = 1;

interface ChatBotDrawerProps {
  isVisible?: boolean;
}

export default function ChatBotDrawer({ isVisible = true }: ChatBotDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Halo! Kenalin, aku BalBot, asisten AI resmi portofolio M. Sohibbal. Mau tanya-tanya seputar proyek AI, riset machine learning, keahlian teknis, kontak, atau cerita seru di balik perjalanan Sohibbal? Yuk, tanyakan saja, aku siap bantu!',
      time: 'Baru saja',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activeBotMsgRef = useRef<{ id: string; fullText: string; sources?: string[] } | null>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Keyboard accessibility: Escape key closes drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Cleanup typing interval on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    };
  }, []);

  // Complete typing immediately if drawer is closed mid-stream
  useEffect(() => {
    if (!isOpen && isTyping && activeBotMsgRef.current) {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
      const { id, fullText, sources } = activeBotMsgRef.current;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, text: fullText, sources, isStreaming: false } : m
        )
      );
      activeBotMsgRef.current = null;
      setIsTyping(false);
    }
  }, [isOpen, isTyping]);

  // Smooth typewriter streaming animation for assistant responses
  const streamBotMessage = (fullText: string, sources?: string[]) => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    const botMsgId = `bot-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    activeBotMsgRef.current = { id: botMsgId, fullText, sources };

    // Mengetik huruf per huruf secara santai & alami
    const step = fullText.length > 350 ? Math.max(1, TYPEWRITER_CHAR_STEP * 2) : TYPEWRITER_CHAR_STEP;
    const intervalSpeed = TYPEWRITER_INTERVAL_MS;
    const initialLength = Math.min(step, fullText.length);
    let currentIdx = initialLength;

    setMessages((prev) => [
      ...prev,
      {
        id: botMsgId,
        sender: 'assistant',
        text: fullText.slice(0, currentIdx),
        sources: undefined,
        time: timestamp,
        isStreaming: true,
      },
    ]);

    setIsTyping(true);

    if (currentIdx >= fullText.length) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId
            ? { ...m, text: fullText, sources, isStreaming: false }
            : m
        )
      );
      activeBotMsgRef.current = null;
      setIsTyping(false);
      return;
    }

    typingTimerRef.current = setInterval(() => {
      currentIdx += step;
      if (currentIdx >= fullText.length) {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMsgId
              ? { ...m, text: fullText, sources, isStreaming: false }
              : m
          )
        );
        activeBotMsgRef.current = null;
        setIsTyping(false);
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        const nextSlice = fullText.slice(0, currentIdx);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMsgId
              ? { ...m, text: nextSlice }
              : m
          )
        );
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      }
    }, intervalSpeed);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome')
        .slice(-6)
        .map((m) => ({
          role: m.sender,
          text: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: historyPayload }),
      });

      if (!res.ok) {
        throw new Error('Gagal menghubungi asisten');
      }

      const data = await res.json();
      setIsLoading(false);
      const replyText = data.reply || 'Maaf, saya tidak dapat menemukan informasi terkait hal tersebut.';
      streamBotMessage(replyText, data.sources);
    } catch (err) {
      setIsLoading(false);
      const errorMsgText = 'Koneksi BalBot sedang mengalami sedikit kendala. Silakan coba kembali dalam beberapa saat, atau langsung hubungi Sohibbal lewat [WhatsApp (Klik di sini)](https://wa.me/6282287749434) ya!';
      streamBotMessage(errorMsgText);
    }
  };

  const handleResetChat = () => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }
    activeBotMsgRef.current = null;
    setIsTyping(false);
    setIsLoading(false);
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: 'Percakapan sudah direset ya. Mau tanya apa lagi seputar proyek, keahlian, atau cerita perjalanan Sohibbal? BalBot siap jawab!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button (FAB) at Bottom Right */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50"
          >
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Tutup BalBot' : 'Buka BalBot Asisten AI Sohibbal'}
              className="group relative flex items-center space-x-2.5 px-4 py-3 bg-surface border-2 border-accent-brand text-text-primary shadow-xl hover:bg-accent-brand hover:text-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand rounded-none"
            >
              <div className="relative">
                <Bot className="w-5 h-5 text-accent-brand group-hover:text-background transition-colors" />
              </div>
              <span className="text-xs font-bold tracking-tight uppercase">
                BalBot
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-in Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-7 sm:w-[420px] sm:max-h-[600px] z-50 flex flex-col pointer-events-auto">
            {/* Mobile backdrop */}
            <div
              className="sm:hidden fixed inset-0 bg-black/60 -z-10"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col h-full sm:h-[580px] w-full bg-surface border-2 border-border-subtle shadow-2xl rounded-none overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-4 bg-surface-muted border-b border-border-subtle flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-brand text-background flex items-center justify-center rounded-none">
                    <Bot className="w-4 h-4 text-background" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                        BalBot
                      </h3>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-[11px] text-text-muted">
                      Asisten AI Portofolio Sohibbal
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={handleResetChat}
                    title="Reset percakapan"
                    className="p-1.5 text-text-muted hover:text-text-primary hover:bg-surface border border-transparent hover:border-border-subtle transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    title="Tutup (Esc)"
                    className="p-1.5 text-text-muted hover:text-text-primary hover:bg-surface border border-transparent hover:border-border-subtle transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message List Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-background text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[88%] p-3.5 rounded-none border ${
                        msg.sender === 'user'
                          ? 'bg-accent-brand text-background border-accent-brand font-medium'
                          : 'bg-surface text-text-primary border-border-subtle leading-relaxed'
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {renderFormattedMessage(msg.text, msg.sender === 'user')}
                        {msg.isStreaming && (
                          <span className="inline-block w-1.5 h-3 bg-accent-brand ml-1 align-baseline animate-pulse" />
                        )}
                      </p>

                      {/* Cited Sources for RAG Transparency */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-border-subtle/80 flex flex-wrap gap-1">
                          <span className="text-[10px] text-text-muted font-bold block w-full mb-0.5">
                            Sumber Dokumen:
                          </span>
                          {msg.sources.map((s, i) => (
                            <span
                              key={i}
                              className="text-[9px] px-1.5 py-0.5 bg-surface-muted text-text-muted border border-border-subtle"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-text-muted mt-1 px-1">
                      {msg.time}
                    </span>
                  </div>
                ))}

                {/* Loading Typing Indicator */}
                {isLoading && (
                  <div className="flex items-center space-x-2 p-3 bg-surface border border-border-subtle w-24">
                    <span className="w-1.5 h-1.5 bg-accent-brand animate-pulse" />
                    <span className="w-1.5 h-1.5 bg-accent-brand animate-pulse delay-100" />
                    <span className="w-1.5 h-1.5 bg-accent-brand animate-pulse delay-200" />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Chips (1 Baris Horisontal - Scrollable ke Kanan) */}
              <div className="w-full max-w-full overflow-x-auto horizontal-scroll-chips border-t border-border-subtle bg-surface px-3 py-2">
                <div className="flex flex-row flex-nowrap items-center gap-2 w-max">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(prompt)}
                      disabled={isLoading || isTyping}
                      className="shrink-0 whitespace-nowrap text-[11px] px-2.5 py-1 bg-surface-muted text-text-primary border border-border-subtle hover:border-accent-brand hover:text-accent-brand transition-colors text-left disabled:opacity-50 rounded-none cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Form Bar */}
              <div className="p-3 bg-surface-muted border-t border-border-subtle flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Tanyakan proyek, skill, pengalaman..."
                  className="flex-1 px-3 py-2.5 bg-surface text-text-primary text-xs border border-border-subtle focus:border-accent-brand focus:outline-none rounded-none"
                  disabled={isLoading || isTyping}
                />
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || isTyping || !inputMessage.trim()}
                  className="px-3.5 py-2.5 bg-accent-brand text-background border border-accent-brand hover:bg-accent-hover transition-colors disabled:opacity-50 flex items-center justify-center rounded-none"
                  aria-label="Kirim pesan"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
