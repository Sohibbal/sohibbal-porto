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
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-muted border border-border-subtle text-xs font-semibold text-text-muted rounded-none">
            <span className="w-1.5 h-1.5 bg-accent-brand" />
            <span>Kredensial Resmi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
            Penghargaan &amp; sertifikasi resmi
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal">
            Pencapaian lulusan terbaik peringkat 10% teratas pada program industri kecerdasan buatan nasional serta sertifikasi pemodelan statistik terapan.
          </p>
        </div>

        {/* 3 Certificates Sharp Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {certificatesData.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() =>
                onSelectImage({
                  src: cert.image,
                  title: cert.title,
                  subtitle: `${cert.issuer} • ${cert.date}`,
                })
              }
              className="flex flex-col justify-between bg-surface border-2 border-border-subtle p-6 hover:border-accent-brand transition-all duration-200 cursor-pointer group shadow-sm rounded-none"
            >
              <div className="space-y-4">
                {/* Certificate Preview Frame */}
                <div className="relative h-48 w-full bg-surface-muted border border-border-subtle overflow-hidden rounded-none">
                  <SafeImage
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[11px] font-bold text-white px-3 py-1.5 bg-black/80 border border-white/20 rounded-none">
                      Klik untuk Memperbesar
                    </span>
                  </div>

                  {cert.badge && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-surface border border-border-subtle text-[10px] font-bold text-accent-brand rounded-none">
                      {cert.badge}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold text-accent-brand uppercase tracking-wider">
                    {cert.date}
                  </p>
                  <h3 className="font-extrabold text-base text-text-primary leading-snug group-hover:text-accent-brand transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-semibold text-text-primary">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-3 pt-1 font-normal">
                    {cert.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between text-xs font-bold text-text-primary group-hover:text-accent-brand transition-colors">
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
