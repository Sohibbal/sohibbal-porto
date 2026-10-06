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
          {/* Left Column (Sticky Title & Subtitle, identical to AboutSection / Tools) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4 lg:sticky lg:top-28"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
              Dari kampus sampai kebijakan nyata
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal">
              Pengalaman nyata dalam birokrasi perencanaan daerah di BAPPEDA Kabupaten Bengkalis serta advokasi keberlanjutan lingkungan hidup pesisir bersama WALHI Riau.
            </p>

            <div className="pt-4 border-t border-border-subtle/80 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Pilar Pengalaman
              </p>
              <p className="text-xs text-text-muted leading-relaxed">
                Evaluasi Renja 47 OPD • Koordinasi Lintas Sektor BAPPEDA, BPS, Diskominfo • Kepemimpinan Advokasi Lingkungan.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Vertical Timeline Style (Mengalir ke bawah) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 relative pl-6 sm:pl-8 border-l-2 border-border-subtle space-y-12 my-2"
          >
            {experiencesData.map((exp, idx) => (
              <div key={exp.id} className="relative space-y-4 group">
                {/* Timeline Node Dot on the vertical line */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-background border-2 border-accent-brand shadow-sm group-hover:scale-125 transition-transform" />

                {/* Timeline Header Info */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted px-2.5 py-0.5 rounded-md bg-surface-muted border border-border-subtle">
                      {exp.period}
                    </span>
                    {exp.location && (
                      <span className="text-xs text-text-muted">
                        • {exp.location}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary pt-1">
                    {exp.organization}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-text-muted">
                    {exp.role}
                  </p>
                </div>

                {/* Description Bullets */}
                <div className="space-y-2 text-xs sm:text-sm text-text-muted leading-relaxed font-normal pt-1">
                  {exp.description.map((item, i) => (
                    <p key={i} className="flex items-start space-x-2.5">
                      <span className="text-accent-brand font-bold shrink-0 mt-0.5">•</span>
                      <span>{item}</span>
                    </p>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-surface-muted border border-border-subtle text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Photo Previews with Click to Zoom */}
                <div className="grid grid-cols-2 gap-3 pt-3">
                  {exp.images.map((img, imgIdx) => (
                    <div
                      key={imgIdx}
                      onClick={() =>
                        onSelectImage &&
                        onSelectImage({
                          src: img,
                          title: exp.organization,
                          subtitle: `${exp.role} : ${exp.period}`,
                        })
                      }
                      className="relative h-36 sm:h-40 rounded-xl overflow-hidden bg-surface-muted border border-border-subtle cursor-pointer group/img shadow-sm"
                    >
                      <SafeImage
                        src={img}
                        alt={`${exp.organization} dokumentasi`}
                        fill
                        className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[11px] font-medium text-white px-2.5 py-1 rounded-lg bg-black/70">
                          Perbesar Foto
                        </span>
                      </div>
                    </div>
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
