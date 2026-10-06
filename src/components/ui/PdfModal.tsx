'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, FileText } from 'lucide-react';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  subtitle?: string;
}

export default function PdfModal({
  isOpen,
  onClose,
  pdfUrl,
  title,
  subtitle,
}: PdfModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-5xl h-[92vh] max-h-[92vh] flex flex-col rounded-2xl bg-surface border border-border-subtle shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3.5 sm:p-4 md:p-5 border-b border-border-subtle bg-surface/95 backdrop-blur-sm gap-3">
              <div className="flex items-center space-x-3 overflow-hidden min-w-0 pr-2">
                <div className="w-9 h-9 rounded-xl bg-accent-soft text-accent-brand flex items-center justify-center shrink-0 border border-border-subtle">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 overflow-hidden">
                  <h3 className="font-bold text-sm sm:text-base md:text-lg text-text-primary line-clamp-1">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-xs text-text-muted line-clamp-1">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons: Open in Tab, Download, Close */}
              <div className="flex items-center space-x-2 shrink-0">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-border-subtle bg-surface hover:bg-surface-muted text-text-primary text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-brand"
                  title="Buka dokumen di tab baru"
                >
                  <span>Buka Tab Baru</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  href={pdfUrl}
                  download
                  className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-border-subtle bg-surface hover:bg-surface-muted text-text-primary text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-brand"
                  title="Unduh file dokumen PDF"
                >
                  <span>Unduh PDF</span>
                  <Download className="w-3.5 h-3.5 opacity-70" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Tutup jendela dokumen"
                  className="p-2 rounded-full border border-border-subtle bg-surface-muted/60 text-text-primary hover:bg-accent-brand hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal PDF Viewer Body */}
            <div className="relative flex-1 w-full bg-slate-900 overflow-hidden flex flex-col">
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=0`}
                title={title}
                className="w-full h-full border-0 bg-white"
              />

              {/* Fallback info for small screens or browsers without inline PDF rendering */}
              <noscript>
                <div className="p-8 text-center text-text-muted bg-surface">
                  <p className="mb-4">Browser Anda tidak mendukung pratinjau dokumen langsung.</p>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-accent-brand text-white font-medium text-sm"
                  >
                    Buka Dokumen PDF
                  </a>
                </div>
              </noscript>
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t border-border-subtle bg-surface/95 flex items-center justify-between text-xs text-text-muted">
              <div className="flex items-center space-x-3">
                <span className="hidden sm:inline">
                  Gunakan fitur zoom dan scroll di dalam viewer dokumen untuk membaca selengkapnya.
                </span>
                <span className="sm:hidden">
                  Tekan Esc atau tombol silang untuk menutup.
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden px-3 py-1.5 rounded-lg border border-border-subtle bg-surface hover:bg-surface-muted text-text-primary text-xs font-medium"
                >
                  Buka Tab Baru ↗
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-surface-muted hover:bg-accent-brand hover:text-white transition-colors font-medium text-text-primary"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
