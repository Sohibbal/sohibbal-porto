'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeImage from '@/components/ui/SafeImage';
import { organizationsData } from '@/data/portfolioData';

interface OrganizationSectionProps {
  onSelectImage: (image: { src: string; title: string; subtitle?: string }) => void;
}

const categories = ['Semua', 'Kepemimpinan', 'Kepanitiaan', 'Public Speaking', 'Dokumentasi', 'Prestasi'];

export default function OrganizationSection({ onSelectImage }: OrganizationSectionProps) {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredItems =
    activeCategory === 'Semua'
      ? organizationsData
      : organizationsData.filter((item) => item.category === activeCategory);

  return (
    <section id="organisasi" className="pb-20 md:pb-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 border-t border-border-subtle">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
            Pengalaman kepanitiaan & organisasi
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal">
            Rekam jejak keaktifan dalam kepemimpinan proyek divisi, koordinasi logistik kemahasiswaan, public speaking, serta prestasi kompetisi kreatif.
          </p>
        </div>

        {/* Minimalist Filter Tabs (No icons, clean pill tabs) */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand ${
                activeCategory === cat
                  ? 'bg-accent-brand text-background shadow-sm'
                  : 'bg-surface-muted text-text-muted hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 8 Organization Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              onClick={() =>
                onSelectImage({
                  src: item.image,
                  title: `${item.role} : ${item.event}`,
                  subtitle: `Tahun ${item.year} • Kategori ${item.category}`,
                })
              }
              className="flex flex-col rounded-2xl bg-surface border border-border-subtle overflow-hidden cursor-pointer group hover:border-text-primary/40 transition-all duration-200 shadow-sm"
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
                  <span className="text-[11px] font-medium text-white px-2.5 py-1 rounded bg-black/60">
                    Perbesar
                  </span>
                </div>

                {/* Minimal text category label */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-surface/90 backdrop-blur-md border border-border-subtle text-[10px] font-semibold text-text-primary">
                  {item.category}
                </div>
              </div>

              {/* Information Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <p className="text-[11px] font-medium text-text-muted">
                    {item.year}
                  </p>
                  <h4 className="font-bold text-sm text-text-primary leading-snug pt-0.5">
                    {item.role}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed mt-0.5 font-normal">
                    {item.event}
                  </p>
                </div>

                <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-primary font-semibold">
                  <span>Lihat Foto</span>
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
