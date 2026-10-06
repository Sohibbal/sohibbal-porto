'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SafeImage from '@/components/ui/SafeImage';
import TechIcon from '@/components/ui/TechIcon';

const techBadges = [
  { name: 'Python', role: 'AI & Data Core', pos: 'top-2 -left-6 sm:-left-12', duration: 7, delay: 0 },
  { name: 'TensorFlow', role: 'Deep Learning', pos: 'top-24 -right-6 sm:-right-12', duration: 8, delay: 1 },
  { name: 'Docker', role: 'MLOps Serving', pos: 'bottom-20 -left-6 sm:-left-10', duration: 7.5, delay: 2 },
  { name: 'Next.js', role: 'App Architecture', pos: 'bottom-2 -right-4 sm:-right-10', duration: 8.5, delay: 1.5 },
  { name: 'Flutter', role: 'Mobile Client', pos: '-top-6 right-6 sm:right-10', duration: 7.2, delay: 0.5 },
  { name: 'PostgreSQL', role: 'Data Integrity', pos: '-bottom-6 left-6 sm:left-10', duration: 8.2, delay: 2.2 },
];

interface HeroPhotoDeckProps {
  className?: string;
  /**
   * Mengatur tinggi frame foto profil.
   * Default: 'h-[340px] sm:h-[375px] lg:h-[385px]' (diselaraskan dengan tinggi teks di sampingnya).
   */
  heightClass?: string;
  /**
   * Mengatur lebar frame foto profil.
   * Default: 'w-[260px] sm:w-[285px] lg:w-[295px]' (menjaga rasio potret proporsional).
   */
  widthClass?: string;
}

export default function HeroPhotoDeck({
  className = '',
  heightClass = 'h-[340px] sm:h-[375px] lg:h-[385px]',
  widthClass = 'w-[260px] sm:w-[285px] lg:w-[295px]',
}: HeroPhotoDeckProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center py-4 select-none ${className}`}
      role="region"
      aria-label="Foto Profil M. Sohibbal dengan Tech Stack Interaktif"
    >
      {/* Central Sharp Portrait Frame */}
      <div
        className={`relative ${widthClass} ${heightClass} bg-surface border-2 border-border-subtle shadow-xl rounded-none overflow-hidden group`}
      >
        {/* Background ambient corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent-soft/30 -z-0 pointer-events-none" />

        {/* Portrait Image */}
        <SafeImage
          src="/images/hero/sohibbal-portrait.jpg"
          fallbackSrc="/images/hero/sohibbal-potrait.jpg"
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

      {/* Floating Orbiting Tech Stack Micro-Cards with Real SVG Logos & Ultra-Smooth Float */}
      {techBadges.map((badge) => (
        <motion.div
          key={badge.name}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0, 8, 0],
            x: [0, 3, 0, -3, 0],
            rotate: [0, 1.2, 0, -1.2, 0],
          }}
          transition={{
            y: {
              duration: badge.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: badge.delay,
            },
            x: {
              duration: badge.duration * 1.15,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: badge.delay * 0.7,
            },
            rotate: {
              duration: badge.duration * 1.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: badge.delay,
            },
            opacity: { duration: 0.6, delay: 0.15 },
          }}
          className={`absolute ${badge.pos} z-20 pointer-events-auto`}
        >
          <div className="px-3 py-2 bg-surface/95 backdrop-blur-md border-2 border-border-subtle shadow-lg hover:border-accent-brand hover:scale-105 transition-all duration-300 rounded-none flex items-center space-x-2.5">
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <TechIcon name={badge.name} className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-text-primary leading-none tracking-tight">
                {badge.name}
              </p>
              <p className="text-[9px] text-text-muted font-medium leading-tight mt-0.5">
                {badge.role}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
