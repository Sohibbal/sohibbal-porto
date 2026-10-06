'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // PENGATURAN DURASI LOADING SCREEN (dalam milidetik: 1000ms = 1 detik):
    // Ubah angka delayTime di bawah sesuai selera Anda:
    // - 3200ms (3.2 detik) untuk kunjungan pertama
    // - 1600ms (1.6 detik) untuk refresh di sesi yang sama
    const hasVisited = sessionStorage.getItem('yuri_visited');
    const delayTime = hasVisited ? 1600 : 3200;

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('yuri_visited', 'true');
      if (onComplete) onComplete();
    }, delayTime);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            opacity: 0.95,
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-text-primary pointer-events-auto select-none"
        >
          {/* Subtle background ambient glow */}
          <div className="absolute w-96 h-96 rounded-full bg-accent-brand/5 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col items-center space-y-6">
            {/* Monogram SVG Kinetic Drawing */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20 text-text-primary drop-shadow-sm"
              >
                {/* Outer rounded geometric frame */}
                <motion.rect
                  x="4"
                  y="4"
                  width="92"
                  height="92"
                  rx="22"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeOpacity="0.2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />

                {/* Monogram 'Y' Path */}
                <motion.path
                  d="M 28 26 L 42 46 L 42 74"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.25, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M 56 26 L 42 46"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
                />

                {/* Monogram 'M' Path */}
                <motion.path
                  d="M 52 74 L 52 44 L 64 58 L 76 44 L 76 74"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.45, ease: 'easeInOut' }}
                />
              </svg>
            </div>

            {/* Typography Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="text-center space-y-1.5"
            >
              <h2 className="text-xl font-bold tracking-tight text-text-primary">
                Yuri Marisa
              </h2>
              <p className="text-xs uppercase tracking-widest text-text-muted font-medium">
                Portfolio
              </p>
            </motion.div>

            {/* Elegant Minimal Progress Bar */}
            <div className="w-40 h-[2px] bg-border-subtle rounded-full overflow-hidden mt-2">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                className="w-full h-full bg-text-primary"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
