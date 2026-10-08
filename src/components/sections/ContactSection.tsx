'use client';

import React, { useState } from 'react';
import { Mail, Instagram } from 'lucide-react';
import { contactData } from '@/data/portfolioData';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(contactData.email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = contactData.email;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Gagal menyalin email', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <section id="kontak" className="pb-20 md:pb-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 border-t border-border-subtle">
        {/* Signature Collaboration Sharp Card */}
        <div className="relative p-8 sm:p-12 lg:p-14 bg-surface border-2 border-border-subtle shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12 rounded-none">
          {/* Subtle Ambient Background Corner Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-soft/20 blur-3xl pointer-events-none" />

          {/* Left Column: Heading & Information */}
          <div className="relative z-10 space-y-4 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-muted border border-border-subtle text-xs font-semibold text-text-muted rounded-none">
              <span className="w-1.5 h-1.5 bg-accent-brand" />
              <span>Kontak &amp; Kolaborasi</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
              Mari berdiskusi dan berkolaborasi.
            </h2>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal pt-1">
              Terbuka untuk diskusi riset kecerdasan buatan, arsitektur machine learning, pengembangan aplikasi web dan mobile, maupun peluang karir profesional.
            </p>

            <div className="pt-2 flex items-center space-x-4 text-xs font-bold text-text-muted">
              <span>{contactData.location}</span>
            </div>
          </div>

          {/* Right Column: Vertically Aligned Sharp Contact Buttons */}
          <div className="relative z-10 flex flex-col gap-3 w-full sm:w-80 shrink-0">
            {/* WhatsApp Button */}
            <a
              href={contactData.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-5 py-3.5 bg-accent-brand text-background font-bold text-sm hover:bg-accent-hover shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand rounded-none border border-accent-brand"
            >
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.761.814 2.791.814 3.18 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm3.376 8.21c-.14.394-.814.729-1.127.765-.313.036-.694.048-2.18-.553-1.898-.767-3.123-2.695-3.218-2.822-.095-.127-.764-1.018-.764-1.942s.475-1.378.644-1.567c.17-.189.37-.236.494-.236.124 0 .248 0 .356.006.114.006.267-.042.417.319.155.374.529 1.294.576 1.388.047.094.078.204.016.328-.063.124-.095.201-.189.31-.094.109-.199.243-.284.327-.094.093-.193.195-.083.385.11.19.489.807 1.05 1.306.721.642 1.328.841 1.518.935.19.094.301.079.414-.047.113-.127.483-.563.612-.756.129-.193.258-.161.433-.097.175.064 1.11.523 1.301.618.191.095.318.142.365.221.047.079.047.458-.093.852zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.399C8.423 21.493 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
                <span>WhatsApp</span>
              </div>
              <span className="text-xs opacity-90 font-normal">Kirim Pesan →</span>
            </a>

            {/* Email Button */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full flex items-center justify-between px-5 py-3.5 bg-surface border border-border-subtle text-text-primary font-bold text-sm hover:border-accent-brand hover:text-accent-brand transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand rounded-none"
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent-brand shrink-0" />
                <span>Email</span>
              </div>
              <span className="text-xs text-text-muted font-normal">
                {copied ? 'Tersalin ✓' : 'Salin Alamat'}
              </span>
            </button>

            {/* Instagram Button */}
            <a
              href={contactData.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-5 py-3.5 bg-surface border border-border-subtle text-text-primary font-bold text-sm hover:border-accent-brand hover:text-accent-brand transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand rounded-none"
            >
              <div className="flex items-center space-x-3">
                <Instagram className="w-4 h-4 text-accent-brand shrink-0" />
                <span>Instagram</span>
              </div>
              <span className="text-xs text-text-muted font-normal">@{contactData.instagram} ↗</span>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
