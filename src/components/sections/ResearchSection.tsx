'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SafeImage from '@/components/ui/SafeImage';
import { publicationsData } from '@/data/portfolioData';

interface ResearchSectionProps {
  onSelectImage?: (image: { src: string; title: string; subtitle?: string }) => void;
  onSelectPdf?: (pdf: { pdfUrl: string; title: string; subtitle?: string }) => void;
}

export default function ResearchSection({ onSelectImage, onSelectPdf }: ResearchSectionProps) {
  return (
    <section id="riset" className="pb-20 md:pb-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 border-t border-border-subtle">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
            Publikasi riset & karya ilmiah
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal">
            Tiga naskah penelitian akademik yang telah disusun dan dipublikasikan pada jurnal ilmiah terakreditasi di bidang ekonomi pembangunan.
          </p>
        </div>

        {/* 3 Research Cards with identical style to CertificatesSection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {publicationsData.map((pub, idx) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              onClick={() => {
                if (onSelectPdf && pub.pdfUrl) {
                  onSelectPdf({
                    pdfUrl: pub.pdfUrl,
                    title: pub.title,
                    subtitle: `${pub.journal} (${pub.year})`,
                  });
                } else if (onSelectImage) {
                  onSelectImage({
                    src: pub.previewImage,
                    title: pub.title,
                    subtitle: `${pub.journal} (${pub.year})`,
                  });
                }
              }}
              className="flex flex-col justify-between rounded-2xl bg-surface border border-border-subtle p-6 hover:border-text-primary/40 transition-all duration-200 cursor-pointer group shadow-sm"
            >
              <div className="space-y-4">
                {/* Paper Preview Image Frame (Identical to Certificate preview frame) */}
                <div className="relative h-48 w-full rounded-xl overflow-hidden bg-surface-muted border border-border-subtle">
                  <SafeImage
                    src={pub.previewImage}
                    alt={pub.title}
                    fill
                    className="object-cover object-top p-1 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[11px] font-medium text-white px-3 py-1.5 rounded-lg bg-black/70">
                      Klik untuk Baca Naskah PDF
                    </span>
                  </div>
                </div>

                {/* Paper Information Details: Title first, then Journal Name & Year */}
                <div className="space-y-2.5">
                  <h3 className="font-bold text-base text-text-primary leading-snug line-clamp-2 group-hover:text-accent-brand transition-colors">
                    {pub.title}
                  </h3>

                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-text-muted line-clamp-1">
                      {pub.journal}
                    </p>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-surface-muted border border-border-subtle text-text-primary font-bold shrink-0">
                      {pub.year}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-text-muted">
                    Penulis : <span className="text-text-primary">{pub.authors.join(', ')}</span>
                  </p>

                  <p className="text-xs text-text-muted leading-relaxed line-clamp-3 pt-0.5 font-normal">
                    {pub.abstract}
                  </p>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-text-primary">
                <span>Baca Naskah PDF</span>
                <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
