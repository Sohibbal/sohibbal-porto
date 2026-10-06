'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroPhotoDeck from '@/components/sections/HeroPhotoDeck';

interface HeroSectionProps {
  onOpenCv?: () => void;
}

export default function HeroSection({ onOpenCv }: HeroSectionProps) {
  const words = ['M. Sohibbal', 'AI Engineer', 'MLOps Developer', 'Mobile & Web'];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 50 : 95;

    if (!isDeleting && currentText === currentWord) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1900);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && currentText === '') {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 250);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setCurrentText((prev) => {
        if (isDeleting) {
          return currentWord.substring(0, prev.length - 1);
        } else {
          return currentWord.substring(0, prev.length + 1);
        }
      });
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, wordIndex]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Typography with Boxed Looping Typewriter Name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Minimal Eyebrow Pill with Sharp Edges */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-surface-muted border border-border-subtle text-xs font-semibold text-text-muted rounded-none">
              <span className="w-1.5 h-1.5 bg-accent-brand" />
              <span>Teknik Informatika • Universitas Riau</span>
            </div>

            {/* Display Headline with Sharp Boxed Background & Looping Typewriter Name */}
            <div>
              <div className="inline-block p-2 sm:p-2.5 bg-surface border-2 border-border-subtle shadow-sm rounded-none">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary px-3 sm:px-4 py-1 flex items-center min-h-[1.25em]">
                  <span>{currentText}</span>
                  <span className="inline-block w-[3px] h-[0.85em] bg-accent-brand ml-1.5 animate-pulse" />
                </h1>
              </div>
            </div>

            {/* Clean Subtitle Paragraph */}
            <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-xl font-normal">
              Mahasiswa Teknik Informatika Universitas Riau dengan antusiasme tinggi di bidang machine learning, MLOps, dan rekayasa perangkat lunak terapan. Peraih predikat ganda Distinction Graduate (Top 10%) program industri nasional DBS Foundation dan Accenture.
            </p>

            {/* Clean Action Buttons: CV button with PDF modal and Contact link */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (onOpenCv) {
                    onOpenCv();
                  } else {
                    window.open('/cv.pdf', '_blank');
                  }
                }}
                className="px-6 py-3.5 bg-accent-brand text-background font-bold text-sm hover:bg-accent-hover shadow-sm transition-all duration-200 flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand rounded-none border border-accent-brand"
              >
                <span>Lihat CV ↗</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('kontak')}
                className="px-6 py-3.5 bg-surface border border-border-subtle text-text-primary font-bold text-sm hover:border-accent-brand hover:text-accent-brand transition-colors rounded-none"
              >
                <span>Hubungi Saya →</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Interactive Photo Deck with Orbiting Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <HeroPhotoDeck />
          </motion.div>
        </div>

        {/* 3-Metric Divider Row Below Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-16 md:mt-24 pt-8 border-t border-border-subtle grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0"
        >
          {/* Metric 1 */}
          <div className="md:pr-8 space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
              5+ Proyek
            </h3>
            <p className="text-xs sm:text-sm text-text-muted font-normal">
              sistem AI, machine learning terapan, mobile app, dan pipeline MLOps
            </p>
          </div>

          {/* Metric 2 */}
          <div className="md:px-8 md:border-l border-border-subtle space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-accent-brand">
              Top 10%
            </h3>
            <p className="text-xs sm:text-sm text-text-muted font-normal">
              Distinction Graduate ganda program DBS Foundation dan Accenture
            </p>
          </div>

          {/* Metric 3 */}
          <div className="md:pl-8 md:border-l border-border-subtle space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
              3.81 IPK
            </h3>
            <p className="text-xs sm:text-sm text-text-muted font-normal">
              prestasi akademik di Teknik Informatika Universitas Riau
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
