'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SafeImage from '@/components/ui/SafeImage';

const techBadges = [
  { name: 'Python', role: 'AI & Data Core', pos: 'top-2 -left-6 sm:-left-10', delay: 0 },
  { name: 'TensorFlow', role: 'Deep Learning', pos: 'top-24 -right-6 sm:-right-10', delay: 0.6 },
  { name: 'Docker', role: 'MLOps Serving', pos: 'bottom-20 -left-6 sm:-left-8', delay: 1.2 },
  { name: 'Next.js', role: 'App Architecture', pos: 'bottom-2 -right-4 sm:-right-8', delay: 1.8 },
  { name: 'Flutter', role: 'Mobile Client', pos: '-top-6 right-8 sm:right-12', delay: 0.9 },
  { name: 'PostgreSQL', role: 'Data Integrity', pos: '-bottom-6 left-8 sm:left-12', delay: 1.5 },
];

export default function HeroPhotoDeck() {
  return (
    <div
      className="relative flex flex-col items-center justify-center w-full max-w-[340px] sm:max-w-[380px] py-8 select-none"
      role="region"
      aria-label="Foto Profil M. Sohibbal dengan Tech Stack Interaktif"
    >
      {/* Central Sharp Portrait Frame */}
      <div className="relative w-full aspect-[3/4] bg-surface border-2 border-border-subtle shadow-xl rounded-none overflow-hidden group">
        {/* Background ambient corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-accent-soft/30 -z-0 pointer-events-none" />

        {/* Portrait Image */}
        <SafeImage
          src="/images/hero/sohibbal-portrait.jpg"
          alt="M. Sohibbal - AI Engineer & Software Developer"
          fill
          priority
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Sharp Bottom Glass Capsule Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-4 bg-surface/95 backdrop-blur-md border-t-2 border-border-subtle flex items-center justify-between text-xs rounded-none">
          <div>
            <p className="font-extrabold text-sm text-text-primary tracking-tight">
              M. Sohibbal
            </p>
            <p className="text-[11px] text-text-muted font-medium">
              Teknik Informatika • UNRI
            </p>
          </div>
          <span className="px-2.5 py-1 bg-surface-muted border border-border-subtle text-[10px] font-bold text-accent-brand uppercase tracking-wider rounded-none">
            IPK 3.81
          </span>
        </div>
      </div>

      {/* Floating Orbiting Tech Stack Micro-Cards */}
      {techBadges.map((badge, idx) => (
        <motion.div
          key={badge.name}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -6, 0, 6, 0],
          }}
          transition={{
            y: {
              duration: 4.5 + (idx % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: badge.delay,
            },
            opacity: { duration: 0.5, delay: 0.2 * idx },
          }}
          className={`absolute ${badge.pos} z-20 pointer-events-auto`}
        >
          <div className="px-3 py-2 bg-surface/95 backdrop-blur-md border border-border-subtle shadow-lg hover:border-accent-brand transition-colors rounded-none flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-accent-brand rounded-none" />
            <div>
              <p className="text-[11px] font-bold text-text-primary leading-none">
                {badge.name}
              </p>
              <p className="text-[9px] text-text-muted leading-tight mt-0.5">
                {badge.role}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
