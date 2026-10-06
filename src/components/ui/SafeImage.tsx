'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  fallbackText?: string;
}

export default function SafeImage({
  src,
  alt,
  fallbackSrc,
  fallbackText,
  className = '',
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-surface-muted border border-border-subtle text-text-muted p-4 text-center rounded-none ${className}`}
      >
        <svg
          className="w-8 h-8 opacity-40 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-xs font-medium">
          {fallbackText || alt || 'Gambar Dokumen'}
        </span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleImageError}
    />
  );
}
