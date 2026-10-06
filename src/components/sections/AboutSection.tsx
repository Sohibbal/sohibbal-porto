'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SafeImage from '@/components/ui/SafeImage';
import { toolsData, personalData } from '@/data/portfolioData';

export default function AboutSection() {
  return (
    <section id="tentang" className="pb-20 md:pb-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 border-t border-border-subtle">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Sticky Title & Subtitle, exactly like style.png) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4 lg:sticky lg:top-28"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
              Tools analitika & perangkat riset
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal">
              Perangkat lunak dan instrumen kuantitatif yang dioperasikan dalam pengolahan data ekonomi regional, penyusunan artikel jurnal, dan perumusan kebijakan pembangunan.
            </p>

            <div className="pt-4 border-t border-border-subtle/80 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Fokus Akademik
              </p>
              <p className="text-xs text-text-muted leading-relaxed">
                Ekonomi Pembangunan FEB Universitas Riau • Riset Pembangunan Perdesaan (IDM & SDGs) • Ekonometri Regional.
              </p>
            </div>
          </motion.div>

          {/* Right Column (Horizontal List of Rows with clean border dividers, exact style.png) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 divide-y divide-border-subtle border-y border-border-subtle"
          >
            {toolsData.map((tool) => (
              <div
                key={tool.name}
                className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                {/* Left: Tool Icon Box & Name */}
                <div className="flex items-center space-x-3.5 sm:w-1/3 shrink-0">
                  <div className="relative w-9 h-9 rounded-xl bg-surface-muted border border-border-subtle flex items-center justify-center text-xs font-bold text-text-primary shrink-0 overflow-hidden shadow-sm">
                    {tool.iconPath ? (
                      <SafeImage
                        src={tool.iconPath}
                        alt={tool.name}
                        fill
                        className="object-contain p-1.5"
                        fallbackText={tool.name.slice(0, 2).toUpperCase()}
                      />
                    ) : (
                      <span>{tool.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-text-primary group-hover:opacity-80 transition-opacity">
                      {tool.name}
                    </h3>
                    <span className="text-[11px] text-text-muted">
                      {tool.category}
                    </span>
                  </div>
                </div>

                {/* Right: Clean Functional Description */}
                <div className="sm:w-2/3">
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
