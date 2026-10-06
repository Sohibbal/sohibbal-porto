'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import SafeImage from './SafeImage';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  subtitle?: string;
}

export default function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  title,
  subtitle,
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

          {/* Modal Container with Sharp Edges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-none bg-surface border-2 border-border-subtle shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border-subtle bg-surface/90 backdrop-blur-sm">
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
            <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] max-h-[70vh] w-full bg-slate-950/20 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
              <div className="relative w-full h-full min-h-[300px] sm:min-h-[440px]">
                <SafeImage
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t border-border-subtle bg-surface/90 flex items-center justify-between text-xs text-text-muted">
              <span className="flex items-center space-x-1.5">
                <ZoomIn className="w-4 h-4 text-accent-brand" />
                <span>Tekan Esc atau klik di luar untuk menutup</span>
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 bg-surface-muted border border-border-subtle hover:border-accent-brand hover:text-accent-brand transition-colors font-medium rounded-none"
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
