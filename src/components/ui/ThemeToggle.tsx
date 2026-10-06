'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('sohibbal_theme');
    // Default adalah dark mode, kecuali jika user secara spesifik memilih 'light'
    if (savedTheme === 'light') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('sohibbal_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 border border-border-subtle bg-surface flex items-center justify-center opacity-0 rounded-none" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={theme === 'light' ? 'Beralih ke mode gelap' : 'Beralih ke mode terang'}
      className="relative p-2 border border-border-subtle bg-surface text-text-primary hover:border-accent-brand hover:text-accent-brand focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:outline-none transition-colors duration-200 rounded-none"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {theme === 'light' ? (
          <Sun className="w-4 h-4 text-accent-brand" />
        ) : (
          <Moon className="w-4 h-4 text-accent-brand" />
        )}
      </motion.div>
    </button>
  );
}
