'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pb-12 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-border-subtle">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-1">
              <span className="font-extrabold text-base tracking-tight text-text-primary">
                yurimarisa<span className="text-accent-brand">.id</span>
              </span>
            </div>
            <p className="text-xs text-text-muted">
              Program Studi Ekonomi Pembangunan • Fakultas Ekonomi dan Bisnis Universitas Riau
            </p>
          </div>

          {/* Quick Links & Back to Top */}
          <div className="flex items-center space-x-6 text-xs text-text-muted">
            <a
              href="#tentang"
              className="hover:text-accent-brand transition-colors"
            >
              Tentang
            </a>
            <a
              href="#riset"
              className="hover:text-accent-brand transition-colors"
            >
              Riset
            </a>
            <a
              href="#pengalaman"
              className="hover:text-accent-brand transition-colors"
            >
              Pengalaman
            </a>
            <a
              href="#sertifikat"
              className="hover:text-accent-brand transition-colors"
            >
              Sertifikat
            </a>
            <a
              href="#organisasi"
              className="hover:text-accent-brand transition-colors"
            >
              Organisasi
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Kembali ke atas halaman"
              className="p-2.5 rounded-full border border-border-subtle bg-surface-muted/60 text-text-primary hover:bg-accent-brand hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border-subtle/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-text-muted gap-2">
          <p>© 2026 Yuri Marisa. Seluruh hak cipta dilindungi undang-undang.</p>
        </div>
      </div>
    </footer>
  );
}
