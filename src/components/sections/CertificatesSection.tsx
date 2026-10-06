'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, SlidersHorizontal, ArrowRight } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { certificatesData } from '@/data/portfolioData';

interface CertificatesSectionProps {
  onSelectImage: (image: {
    src: string;
    title: string;
    subtitle?: string;
    description?: string;
  }) => void;
}

export default function CertificatesSection({ onSelectImage }: CertificatesSectionProps) {
  const [isSliderMode, setIsSliderMode] = useState(true);

  // Duplikasi 4x untuk looping mulus tanpa celah di slider
  const duplicatedCerts = [
    ...certificatesData,
    ...certificatesData,
    ...certificatesData,
    ...certificatesData,
  ];

  const handleCardClick = (cert: (typeof certificatesData)[0]) => {
    onSelectImage({
      src: cert.image,
      title: cert.title,
      subtitle: `${cert.issuer} • ${cert.date}`,
      description: cert.description,
    });
  };

  // Komponen card terpadu agar ukuran tinggi, padding, frame gambar, dan scale di kedua mode 100% identik
  const renderCertificateCard = (
    cert: (typeof certificatesData)[0],
    keySuffix?: string | number
  ) => (
    <div
      key={keySuffix ? `${cert.id}-${keySuffix}` : cert.id}
      onClick={() => handleCardClick(cert)}
      className={`${
        isSliderMode ? 'w-[310px] sm:w-[340px] lg:w-[360px] shrink-0' : 'w-full'
      } flex flex-col justify-between bg-surface border-2 border-border-subtle p-6 hover:border-accent-brand transition-all duration-200 cursor-pointer group shadow-sm rounded-none select-none`}
    >
      <div className="space-y-4">
        {/* Certificate Preview Frame (Tinggi h-48 dan scale presisi identik) */}
        <div className="relative h-48 w-full bg-surface-muted border border-border-subtle overflow-hidden rounded-none">
          <SafeImage
            src={cert.image}
            alt={cert.title}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-[11px] font-bold text-white px-3 py-1.5 bg-black/80 border border-white/20 rounded-none">
              Perbesar &amp; Detail
            </span>
          </div>

          {cert.badge && (
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#0A1329]/85 backdrop-blur-md border border-white/15 text-[10px] font-extrabold text-accent-brand rounded-none">
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
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  );

  return (
    <section id="sertifikat" className="pb-20 md:pb-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 border-t border-border-subtle">
        {/* Section Header with View Toggle Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl space-y-3">
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

          {/* Mode Toggle Button: Lihat Semua (Grid) vs Mode Slider */}
          <div className="flex items-center space-x-3 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setIsSliderMode(!isSliderMode)}
              className="inline-flex items-center space-x-2 px-3.5 py-2 bg-surface border border-border-subtle hover:border-accent-brand text-xs font-bold text-text-primary hover:text-accent-brand transition-all shadow-sm rounded-none"
              title={isSliderMode ? 'Tampilkan seluruh sertifikat dalam format grid' : 'Kembali ke mode slider meluncur'}
            >
              {isSliderMode ? (
                <>
                  <LayoutGrid className="w-3.5 h-3.5 text-accent-brand" />
                  <span>Lihat Semua</span>
                </>
              ) : (
                <>
                  <SlidersHorizontal className="w-3.5 h-3.5 text-accent-brand" />
                  <span>Mode Slider</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* View Mode 1: Continuous Marquee Slider */}
        {isSliderMode ? (
          <div className="relative w-full overflow-hidden marquee-container py-2">
            {/* Left Edge Gradient Blur Fade */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-8 md:w-12 z-20 bg-gradient-to-r from-background via-background/85 to-transparent backdrop-blur-[2px]" />

            {/* Right Edge Gradient Blur Fade */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-8 md:w-12 z-20 bg-gradient-to-l from-background via-background/85 to-transparent backdrop-blur-[2px]" />

            {/* Continuous Animated Marquee Track */}
            <div className="animate-marquee-ltr flex gap-6 lg:gap-8">
              {duplicatedCerts.map((cert, idx) =>
                renderCertificateCard(cert, idx)
              )}
            </div>
          </div>
        ) : (
          /* View Mode 2: Full Original Grid */
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {certificatesData.map((cert) => renderCertificateCard(cert))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
