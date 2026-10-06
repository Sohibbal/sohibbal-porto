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

          {/* Modal Container with Sharp Edges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-5xl h-[92vh] max-h-[92vh] flex flex-col rounded-none bg-surface border-2 border-border-subtle shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3.5 sm:p-4 md:p-5 border-b border-border-subtle bg-surface/95 backdrop-blur-sm gap-3">
              <div className="flex items-center space-x-3 overflow-hidden min-w-0 pr-2">
                <div className="w-9 h-9 bg-accent-soft text-accent-brand flex items-center justify-center shrink-0 border border-border-subtle rounded-none">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 overflow-hidden">
                  <h3 className="font-extrabold text-sm sm:text-base md:text-lg text-text-primary line-clamp-1">
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
                  className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 border border-border-subtle bg-surface hover:border-accent-brand text-text-primary text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-brand rounded-none"
                  title="Buka dokumen di tab baru"
                >
                  <span>Buka Tab Baru</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  href={pdfUrl}
                  download
                  className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 border border-border-subtle bg-surface hover:border-accent-brand text-text-primary text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-brand rounded-none"
                  title="Unduh file dokumen PDF"
                >
                  <span>Unduh PDF</span>
                  <Download className="w-3.5 h-3.5 opacity-70" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Tutup jendela dokumen"
                  className="p-2 border border-border-subtle bg-surface-muted text-text-primary hover:border-accent-brand hover:text-accent-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand ml-1 rounded-none"
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
                    className="px-4 py-2 bg-accent-brand text-background font-bold text-xs rounded-none"
                  >
                    Buka PDF Langsung
                  </a>
                </div>
              </noscript>
            </div>

            {/* Modal Mobile Actions Footer */}
            <div className="sm:hidden p-3 border-t border-border-subtle bg-surface/95 flex items-center justify-between text-xs">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 border border-border-subtle font-medium text-text-primary rounded-none"
              >
                Buka di Tab Baru ↗
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 bg-accent-brand text-background font-bold rounded-none"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
