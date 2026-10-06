'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeImage from '@/components/ui/SafeImage';

export interface PhotoCardItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  badge: string;
  objectPosition?: string;
}

const initialPhotos: PhotoCardItem[] = [
  {
    id: 'photo-1',
    src: '/images/hero/yuri-portrait.jpg',
    title: 'Yuri Marisa',
    subtitle: 'FEB Universitas Riau',
    badge: 'Semester 7',
    objectPosition: 'object-top',
  },
  {
    id: 'photo-2',
    src: '/images/hero/yuri-portrait-2.jpg',
    title: 'Yuri Marisa',
    subtitle: 'Riset & Ekonometri',
    badge: 'EViews 12',
    objectPosition: 'object-top',
  },
  {
    id: 'photo-3',
    src: '/images/hero/yuri-portrait-3.jpg',
    title: 'Yuri Marisa',
    subtitle: 'BAPPEDA Bengkalis',
    badge: 'Praktik Kebijakan',
    objectPosition: 'object-center',
  },
  {
    id: 'photo-4',
    src: '/images/hero/yuri-portrait-4.jpg',
    title: 'Yuri Marisa',
    subtitle: 'Publikasi Ilmiah',
    badge: 'Jurnal Terakreditasi',
    objectPosition: 'object-center',
  },
];

// =========================================================================
// PENGATURAN DELAY LOOPING FOTO HERO (dalam milidetik: 1000ms = 1 detik):
// Ubah angka PHOTO_LOOP_DELAY di bawah ini sesuai selera Anda:
// Contoh: 3000 = 3 detik (aktif saat ini), 4000 = 4 detik, 5000 = 5 detik
// =========================================================================
export const PHOTO_LOOP_DELAY = 3000;

export default function HeroPhotoDeck() {
  const [deck, setDeck] = useState<PhotoCardItem[]>(initialPhotos);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [swappedCardId, setSwappedCardId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [slideDistance, setSlideDistance] = useState(130);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive slide distance calculation
  useEffect(() => {
    const handleResize = () => {
      setSlideDistance(window.innerWidth < 640 ? 100 : 140);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Send current top card to the back of the deck
  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const activeCard = deck[0];
    setSwappedCardId(activeCard.id);

    // Phase 1: Card slides out to the side (260ms)
    setTimeout(() => {
      // Phase 2: Card reorders to the bottom of the stack and slides back in (300ms)
      setDeck((prev) => [...prev.slice(1), prev[0]]);

      setTimeout(() => {
        setSwappedCardId(null);
        setIsTransitioning(false);
      }, 300);
    }, 260);
  }, [deck, isTransitioning]);

  // Pull last card from the back to the front
  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const lastCard = deck[deck.length - 1];
    setSwappedCardId(lastCard.id);

    // Immediately put it to front but start shifted to side
    setDeck((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);

    setTimeout(() => {
      setSwappedCardId(null);
      setIsTransitioning(false);
    }, 320);
  }, [deck, isTransitioning]);

  // Auto-play timer: berganti otomatis secara looping setiap PHOTO_LOOP_DELAY (3 detik)
  useEffect(() => {
    if (isHovered) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, PHOTO_LOOP_DELAY);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [handleNext, isHovered]);

  // Keyboard controls
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  return (
    <div
      className="relative flex flex-col items-center w-full max-w-[340px] sm:max-w-[370px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Koleksi foto Yuri Marisa, berganti otomatis setiap 3 detik atau klik kartu untuk berganti foto"
    >
      {/* Visual Stack Card Deck Container */}
      <div className="relative w-full aspect-[3/4] select-none">
        {/* Ambient Offset Backdrop Frame */}
        <div className="absolute top-4 -right-3 sm:-right-4 w-full h-full rounded-2xl bg-surface-muted border border-border-subtle -z-10" />

        {/* Render stacked cards in reverse order so higher indices render lower */}
        {deck.map((card, index) => {
          const isFront = index === 0;
          const isMovingOut = isTransitioning && card.id === swappedCardId && isFront;
          const isMovingInToBack =
            isTransitioning && card.id === swappedCardId && index === deck.length - 1;

          // Compute zIndex and transform properties
          let zIndex = 30 - index * 5;
          let animateProps = {};

          if (isMovingOut) {
            zIndex = 40;
            animateProps = {
              x: slideDistance,
              y: -8,
              rotate: 8,
              scale: 1.02,
              opacity: 1,
            };
          } else if (isMovingInToBack) {
            zIndex = 2;
            animateProps = {
              x: 0,
              y: 26,
              rotate: -2.5,
              scale: 0.88,
              opacity: 0.5,
            };
          } else {
            if (index === 0) {
              animateProps = { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 };
            } else if (index === 1) {
              animateProps = { x: 0, y: 12, rotate: 3, scale: 0.95, opacity: 0.85 };
            } else if (index === 2) {
              animateProps = { x: 0, y: 22, rotate: -2.5, scale: 0.90, opacity: 0.65 };
            } else {
              animateProps = { x: 0, y: 30, rotate: 1.5, scale: 0.85, opacity: 0.45 };
            }
          }

          return (
            <motion.div
              key={card.id}
              initial={false}
              animate={animateProps}
              transition={{
                duration: isMovingOut ? 0.26 : isMovingInToBack ? 0.3 : 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ zIndex }}
              onClick={isFront ? handleNext : undefined}
              className={`absolute inset-0 rounded-2xl overflow-hidden bg-surface border border-border-subtle shadow-xl ${
                isFront ? 'cursor-pointer group' : 'pointer-events-none'
              }`}
            >
              {/* Photo Image */}
              <div className="relative w-full h-full">
                <SafeImage
                  src={card.src}
                  alt={`${card.title} - ${card.subtitle}`}
                  fill
                  priority={isFront || index === 1}
                  className={`object-cover ${card.objectPosition || 'object-top'} transition-transform duration-500 ${
                    isFront ? 'group-hover:scale-[1.02]' : ''
                  }`}
                />

                {/* Bottom Metadata Glassmorphism Capsule */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-surface/90 backdrop-blur-md border border-border-subtle flex items-center justify-between text-xs shadow-sm">
                  <div>
                    <p className="font-bold text-text-primary tracking-tight">{card.title}</p>
                    <p className="text-[11px] text-text-primary font-normal">{card.subtitle}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-surface-muted font-medium text-[10px] text-text-primary border border-border-subtle">
                    {card.badge}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
