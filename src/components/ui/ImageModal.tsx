'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ExternalLink } from 'lucide-react';
import SafeImage from './SafeImage';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  subtitle?: string;
  description?: string;
  link?: string;
  linkText?: string;
}

export default function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  title,
  subtitle,
  description,
  link,
  linkText,
}: ImageModalProps) {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
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

          {/* Modal Container with Sharp Edges & Scrollable Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-none bg-surface border-2 border-border-subtle shadow-2xl overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-5 border-b border-border-subtle bg-surface/95 backdrop-blur-md">
              <div className="space-y-0.5 pr-4">
                <h3 className="font-bold text-base sm:text-lg text-text-primary line-clamp-1">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-xs text-text-muted line-clamp-1">
                    {subtitle}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup jendela pratinjau"
                className="p-2 border border-border-subtle bg-surface-muted text-text-primary hover:border-accent-brand hover:text-accent-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand rounded-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="relative min-h-[260px] sm:min-h-[420px] w-full bg-slate-950/20 flex items-center justify-center p-3 sm:p-6">
              <div className="relative w-full h-[260px] sm:h-[400px]">
                <SafeImage
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Modal Description & Details (Keterangan Lengkap Sesuai Card) */}
            {description && (
              <div className="p-4 sm:p-6 border-t border-border-subtle bg-surface-muted/30 space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-accent-brand">
                  Keterangan &amp; Deskripsi
                </h4>
                <p className="text-xs sm:text-sm text-text-primary leading-relaxed font-normal">
                  {description}
                </p>

                {link && (
                  <div className="pt-2">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-3.5 py-2 bg-accent-brand text-background text-xs font-bold hover:bg-accent-hover transition-colors rounded-none shadow-sm"
                    >
                      <span>{linkText || 'Buka Artikel Jurnal Ilmiah'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Modal Footer (Tanpa Tombol Tutup di Kanan Bawah) */}
            <div className="p-3 sm:p-4 border-t border-border-subtle bg-surface/90 flex items-center justify-between text-xs text-text-muted">
              <span className="flex items-center space-x-1.5">
                <ZoomIn className="w-4 h-4 text-accent-brand" />
                <span>Tekan Esc atau klik tombol silang (X) di atas untuk menutup</span>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
