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

const quickPrompts = [
  'Apa saja proyek AI unggulan Sohibbal?',
  'Bagaimana pengalaman Asisten Lab Sohibbal?',
  'Bagaimana cara menghubungi Sohibbal?',
];

export default function ChatBotDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Halo! Saya Sohibbal Assistant, asisten cerdas berbasis Retrieval-Augmented Generation (RAG). Silakan tanyakan apa saja seputar proyek AI, keahlian machine learning, riwayat mengajar, atau kontak M. Sohibbal.',
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

    const step = Math.max(1, Math.min(5, Math.ceil(fullText.length / 110)));
    const intervalSpeed = 22;
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
      const errorMsgText = 'Koneksi asisten sedang mengalami kendala. Silakan coba kembali dalam beberapa saat atau hubungi Sohibbal langsung melalui WhatsApp di +62 822-8774-9434.';
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
        text: 'Percakapan telah direset. Silakan tanyakan hal lain seputar portofolio dan proyek Sohibbal!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button (FAB) at Bottom Right */}
      <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Tutup Asisten AI' : 'Buka Asisten AI RAG Sohibbal'}
          className="group relative flex items-center space-x-2.5 px-4 py-3 bg-surface border-2 border-accent-brand text-text-primary shadow-xl hover:bg-accent-brand hover:text-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand rounded-none"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-accent-brand group-hover:text-background transition-colors" />
          </div>
          <span className="text-xs font-bold tracking-tight uppercase">
            Tanya AI
          </span>
        </button>
      </div>

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
                  <div className="w-8 h-8 bg-accent-brand text-background flex items-center justify-center font-bold text-xs">
                    AI
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                        Sohibbal Assistant
                      </h3>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-[11px] text-text-muted">
                      RAG Architecture Guide
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
                        {msg.text}
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

              {/* Quick Prompt Chips */}
              <div className="p-2.5 bg-surface border-t border-border-subtle flex flex-wrap gap-1.5 overflow-x-auto">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isLoading || isTyping}
                    className="text-[11px] px-2.5 py-1 bg-surface-muted text-text-primary border border-border-subtle hover:border-accent-brand hover:text-accent-brand transition-colors text-left disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
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
