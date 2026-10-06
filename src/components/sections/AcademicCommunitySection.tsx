'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeImage from '@/components/ui/SafeImage';
import { academicCommunityData } from '@/data/portfolioData';

interface AcademicCommunitySectionProps {
  onSelectImage: (image: { src: string; title: string; subtitle?: string }) => void;
}

const categories = ['Semua', 'Asisten Laboratorium', 'AI Cohort', 'Riset & Software', 'Workshop & Hackathon'];

export default function AcademicCommunitySection({ onSelectImage }: AcademicCommunitySectionProps) {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredItems =
    activeCategory === 'Semua'
      ? academicCommunityData
      : academicCommunityData.filter((item) => item.category === activeCategory);

  return (
    <section id="jejak" className="pb-20 md:pb-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 border-t border-border-subtle">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-muted border border-border-subtle text-xs font-semibold text-text-muted rounded-none">
            <span className="w-1.5 h-1.5 bg-accent-brand" />
            <span>Aktivitas &amp; Pengabdian</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
            Jejak akademik &amp; komunitas teknologi
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal">
            Dokumentasi rekam jejak bimbingan praktikum mahasiswa di laboratorium, partisipasi akselerasi AI nasional, serta kolaborasi pengembangan sistem informasi kampus.
          </p>
        </div>

        {/* Minimalist Sharp Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand rounded-none border ${
                activeCategory === cat
                  ? 'bg-accent-brand text-background border-accent-brand shadow-sm'
                  : 'bg-surface text-text-muted border-border-subtle hover:border-accent-brand hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid with Sharp Edges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              onClick={() =>
                onSelectImage({
                  src: item.image,
                  title: `${item.role} : ${item.event}`,
                  subtitle: `Tahun ${item.year} • Kategori ${item.category}`,
                })
              }
              className="flex flex-col bg-surface border-2 border-border-subtle overflow-hidden cursor-pointer group hover:border-accent-brand transition-all duration-200 shadow-sm rounded-none"
            >
              {/* Photo Frame */}
              <div className="relative h-44 w-full bg-surface-muted overflow-hidden">
                <SafeImage
                  src={item.image}
                  alt={`${item.role} - ${item.event}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[11px] font-bold text-white px-2.5 py-1 bg-black/70 border border-white/20 rounded-none">
                    Perbesar
                  </span>
                </div>

                {/* Sharp Category Tag */}
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-surface/95 backdrop-blur-md border border-border-subtle text-[10px] font-bold text-accent-brand rounded-none">
                  {item.category}
                </div>
              </div>

              {/* Information Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <p className="text-[11px] font-bold text-accent-brand uppercase tracking-wider">
                    {item.year}
                  </p>
                  <h4 className="font-extrabold text-sm text-text-primary leading-snug pt-0.5 group-hover:text-accent-brand transition-colors">
                    {item.role}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed mt-0.5 font-normal">
                    {item.event}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mt-1.5 font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-primary font-bold group-hover:text-accent-brand transition-colors">
                  <span>Lihat Dokumentasi</span>
                  <span>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
