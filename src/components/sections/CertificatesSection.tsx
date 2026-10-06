'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SafeImage from '@/components/ui/SafeImage';
import { certificatesData } from '@/data/portfolioData';

interface CertificatesSectionProps {
  onSelectImage: (image: { src: string; title: string; subtitle?: string }) => void;
}

export default function CertificatesSection({ onSelectImage }: CertificatesSectionProps) {
  return (
    <section id="sertifikat" className="pb-20 md:pb-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 border-t border-border-subtle">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
            Sertifikat & pencapaian resmi
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal">
            Dokumentasi kelulusan magang di instansi pemerintah daerah, kepengurusan lembaga riset ilmiah, serta lokakarya keahlian perangkat lunak ekonometri.
          </p>
        </div>

        {/* 3 Certificates Minimal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {certificatesData.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              onClick={() =>
                onSelectImage({
                  src: cert.image,
                  title: cert.title,
                  subtitle: `${cert.issuer} • ${cert.date}`,
                })
              }
              className="flex flex-col justify-between rounded-2xl bg-surface border border-border-subtle p-6 hover:border-text-primary/40 transition-all duration-200 cursor-pointer group shadow-sm"
            >
              <div className="space-y-4">
                {/* Certificate Preview Image Frame */}
                <div className="relative h-48 w-full rounded-xl overflow-hidden bg-surface-muted border border-border-subtle">
                  <SafeImage
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[11px] font-medium text-white px-3 py-1.5 rounded-lg bg-black/70">
                      Klik untuk Memperbesar
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[11px] font-medium text-text-muted">
                    {cert.date}
                  </p>
                  <h3 className="font-bold text-base text-text-primary leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-medium text-text-primary">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-3 pt-1 font-normal">
                    {cert.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-text-primary">
                <span>Lihat Dokumen Asli</span>
                <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
