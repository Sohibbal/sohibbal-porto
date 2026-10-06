'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('sohibbal_visited');
    const delayTime = hasVisited ? 1200 : 2500;

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('sohibbal_visited', 'true');
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
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-text-primary pointer-events-auto select-none"
        >
          {/* Subtle background ambient glow */}
          <div className="absolute w-96 h-96 bg-accent-soft/20 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col items-center space-y-6">
            {/* Monogram SVG Kinetic Drawing with sharp geometric frame */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20 text-accent-brand drop-shadow-sm"
              >
                {/* Outer sharp geometric frame */}
                <motion.rect
                  x="4"
                  y="4"
                  width="92"
                  height="92"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeOpacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                />

                {/* Monogram 'M' Path */}
                <motion.path
                  d="M 22 74 L 22 30 L 36 52 L 50 30 L 50 74"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: 'easeInOut' }}
                />

                {/* Monogram 'S' Path */}
                <motion.path
                  d="M 78 35 C 78 30 74 28 66 28 C 58 28 54 32 54 38 C 54 48 78 48 78 62 C 78 70 72 74 64 74 C 56 74 52 69 52 64"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.45, ease: 'easeInOut' }}
                />
              </svg>
            </div>

            {/* Typography Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center space-y-1.5"
            >
              <h2 className="text-xl font-extrabold tracking-tight text-text-primary uppercase">
                M. Sohibbal
              </h2>
              <p className="text-[11px] uppercase tracking-widest text-text-muted font-semibold">
                AI &amp; Software Portfolio
              </p>
            </motion.div>

            {/* Sharp Minimal Progress Bar */}
            <div className="w-40 h-[2px] bg-border-subtle overflow-hidden mt-2">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="w-full h-full bg-accent-brand"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
