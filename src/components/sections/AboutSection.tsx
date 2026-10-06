'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { toolsData } from '@/data/portfolioData';
import TechIcon from '@/components/ui/TechIcon';

export default function AboutSection() {
  return (
    <section id="keahlian" className="pb-20 md:pb-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 border-t border-border-subtle">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Sticky Title & Academic Context) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4 lg:sticky lg:top-28"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-muted border border-border-subtle text-xs font-semibold text-text-muted rounded-none">
              <span className="w-1.5 h-1.5 bg-accent-brand" />
              <span>Keahlian &amp; Instrumen</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
              Tech stack &amp; instrumen rekayasa
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal">
              Rangkaian pustaka machine learning, bahasa pemrograman, dan infrastruktur MLOps yang digunakan dalam riset, pelatihan model, dan implementasi aplikasi cerdas.
            </p>

            <div className="pt-4 border-t border-border-subtle space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Fokus Rekayasa
              </p>
              <p className="text-xs text-text-muted leading-relaxed">
                Pemodelan Deep Learning &bull; Sistem Rekomendasi &bull; Pipeline Multimodal AI &bull; Retrieval-Augmented Generation &bull; Kontainerisasi MLOps.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Sharp Table Rows with Clean Divider Lines & Official Logos */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 divide-y divide-border-subtle border-y border-border-subtle bg-surface"
          >
            {toolsData.map((tool) => (
              <div
                key={tool.name}
                className="py-4 sm:py-5 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-surface-muted/50 transition-colors"
              >
                {/* Left: Official Vector Tech Icon + Name & Category */}
                <div className="sm:w-5/12 shrink-0 flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-surface-muted border border-border-subtle flex items-center justify-center shrink-0 group-hover:border-accent-brand/40 group-hover:bg-accent-brand/5 transition-colors rounded-none">
                    <TechIcon name={tool.name} className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-text-primary group-hover:text-accent-brand transition-colors">
                      {tool.name}
                    </h3>
                    <span className="text-[11px] text-text-muted font-medium">
                      {tool.category}
                    </span>
                  </div>
                </div>

                {/* Right: Clean Functional Description */}
                <div className="sm:w-7/12">
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
                    {tool.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
