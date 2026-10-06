'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SafeImage from '@/components/ui/SafeImage';
import { experiencesData } from '@/data/portfolioData';

interface ExperienceSectionProps {
  onSelectImage?: (image: { src: string; title: string; subtitle?: string }) => void;
}

export default function ExperienceSection({ onSelectImage }: ExperienceSectionProps) {
  return (
    <section id="pengalaman" className="pb-20 md:pb-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 border-t border-border-subtle">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Sticky Title & Subtitle) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4 lg:sticky lg:top-28"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-muted border border-border-subtle text-xs font-semibold text-text-muted rounded-none">
              <span className="w-1.5 h-1.5 bg-accent-brand" />
              <span>Rekam Jejak &amp; Pengalaman</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
              Asisten laboratorium &amp; program industri
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal">
              Dedikasi mengajar di laboratorium kecerdasan buatan dan basis data Universitas Riau, rekayasa software di LPPM, serta pencapaian lulusan terbaik pada program industri nasional.
            </p>

            <div className="pt-4 border-t border-border-subtle space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Pilar Pengalaman
              </p>
              <p className="text-xs text-text-muted leading-relaxed">
                Asisten Praktikum AI &bull; Asisten Praktikum Basis Data &bull; Software Engineer Chatbot LPPM &bull; Cohort AI DBS &amp; Accenture &bull; Pemodelan Risiko Home Credit.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Vertical Timeline Style with Sharp Geometric Nodes */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 relative pl-6 sm:pl-8 border-l-2 border-border-subtle space-y-12 my-2"
          >
            {experiencesData.map((exp) => (
              <div key={exp.id} className="relative space-y-4 group">
                {/* Timeline Square Node on the vertical line */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 bg-background border-2 border-accent-brand group-hover:bg-accent-brand transition-colors rounded-none" />

                {/* Timeline Header Info */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent-brand px-2.5 py-0.5 bg-surface-muted border border-border-subtle rounded-none">
                      {exp.period}
                    </span>
                    {exp.location && (
                      <span className="text-xs text-text-muted">
                        &bull; {exp.location}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-text-primary pt-1">
                    {exp.organization}
                  </h3>

                  <p className="text-xs sm:text-sm font-bold text-text-muted">
                    {exp.role}
                  </p>
                </div>

                {/* Description Bullets */}
                <div className="space-y-2 text-xs sm:text-sm text-text-muted leading-relaxed font-normal pt-1">
                  {exp.description.map((item, i) => (
                    <p key={i} className="flex items-start space-x-2.5">
                      <span className="text-accent-brand font-bold shrink-0 mt-0.5">&bull;</span>
                      <span>{item}</span>
                    </p>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[11px] font-medium bg-surface-muted border border-border-subtle text-text-primary rounded-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
