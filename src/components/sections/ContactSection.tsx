'use client';

import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { contactData } from '@/data/portfolioData';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(contactData.email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = contactData.email;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      } catch (err) {
        console.error('Failed to copy', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <section id="kontak" className="pb-20 md:pb-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 border-t border-border-subtle">
        {/* Signature Collaboration Card with Vertically Aligned Right Action Buttons */}
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-14 bg-surface border border-border-subtle shadow-sm overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-soft/20 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

          {/* Left Column: Heading & Information */}
          <div className="relative z-10 space-y-4 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surface-muted border border-border-subtle text-xs font-semibold text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-brand" />
              <span>Kontak & Kolaborasi</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
              Mari berdiskusi dan berkolaborasi.
            </h2>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal pt-1">
              Terbuka untuk kolaborasi riset ekonomi pembangunan, formulasi dokumen perencanaan daerah, analisis ekonometri kebijakan publik, maupun peluang karir profesional.
            </p>
          </div>

          {/* Right Column: Vertically Aligned Contact Action Buttons */}
          <div className="relative z-10 flex flex-col gap-3.5 w-full sm:w-80 shrink-0">
            {/* WhatsApp Button */}
            <a
              href={contactData.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl bg-accent-brand text-background font-bold text-sm hover:opacity-90 shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand"
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.761.814 2.791.814 3.18 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm3.376 8.21c-.14.394-.814.729-1.127.765-.313.036-.694.048-2.18-.553-1.898-.767-3.123-2.695-3.218-2.822-.095-.127-.764-1.018-.764-1.942s.475-1.378.644-1.567c.17-.189.37-.236.494-.236.124 0 .248 0 .356.006.114.006.267-.042.417.319.155.374.529 1.294.576 1.388.047.094.078.204.016.328-.063.124-.095.201-.189.31-.094.109-.199.243-.284.327-.094.093-.193.195-.083.385.11.19.489.807 1.05 1.306.721.642 1.328.841 1.518.935.19.094.301.079.414-.047.113-.127.483-.563.612-.756.129-.193.258-.161.433-.097.175.064 1.11.523 1.301.618.191.095.318.142.365.221.047.079.047.458-.093.852zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.399C8.423 21.493 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
                <span>WhatsApp</span>
              </div>
              <span className="text-xs opacity-80 font-normal">Kirim Pesan →</span>
            </a>

            {/* Email Button */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl bg-surface-muted border border-border-subtle text-text-primary font-bold text-sm hover:bg-surface-muted/80 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand"
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-text-primary shrink-0" />
                <span>{copied ? 'Email' : 'Email'}</span>
              </div>
              <span className="text-xs text-text-muted font-normal">
                {copied ? 'Tersalin ✓' : 'Salin.'}
              </span>
            </button>

            {/* Instagram Button */}
            <a
              href={contactData.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl bg-surface-muted border border-border-subtle text-text-primary font-bold text-sm hover:bg-surface-muted/80 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand"
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram</span>
              </div>
              <span className="text-xs text-text-muted font-normal">Kunjungi ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
