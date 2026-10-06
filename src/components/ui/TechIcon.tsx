'use client';

import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
}

export default function TechIcon({ name, className = 'w-4 h-4' }: TechIconProps) {
  const normalized = name.toLowerCase();

  // 1. Python
  if (normalized.includes('python')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.91 2C6.72 2 7.03 4.25 7.03 4.25L7.04 6.58H12V7.36H4.22S2 7.11 2 12.28C2 17.44 3.94 17.17 3.94 17.17H5.97V14.36S5.86 11.02 9.24 11.02H14.16S17.42 11.12 17.42 7.85V4.38S17.69 2 11.91 2ZM9.03 3.42C9.62 3.42 10.1 3.9 10.1 4.49C10.1 5.08 9.62 5.56 9.03 5.56C8.44 5.56 7.96 5.08 7.96 4.49C7.96 3.9 8.44 3.42 9.03 3.42Z"
          fill="#387EB8"
        />
        <path
          d="M12.09 22C17.28 22 16.97 19.75 16.97 19.75L16.96 17.42H12V16.64H19.78S22 16.89 22 11.72C22 6.56 20.06 6.83 20.06 6.83H18.03V9.64S18.14 12.98 14.76 12.98H9.84S6.58 12.88 6.58 16.15V19.62S6.31 22 12.09 22ZM14.97 20.58C14.38 20.58 13.9 20.1 13.9 19.51C13.9 18.92 14.38 18.44 14.97 18.44C15.56 18.44 16.04 18.92 16.04 19.51C16.04 20.1 15.56 20.58 14.97 20.58Z"
          fill="#FFE052"
        />
      </svg>
    );
  }

  // 2. TensorFlow
  if (normalized.includes('tensorflow')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7V17L7.5 14.5V9.5L12 12V2L12 2Z" fill="#E53935" />
        <path d="M12 2L21 7V17L16.5 14.5V9.5L12 12V2L12 2Z" fill="#FF8F00" />
        <path d="M12 14.5L7.5 17L12 19.5L16.5 17L12 14.5Z" fill="#FFB300" />
        <path d="M12 19.5L7.5 17V22L12 19.5Z" fill="#F4511E" />
        <path d="M12 19.5L16.5 17V22L12 19.5Z" fill="#FB8C00" />
      </svg>
    );
  }

  // 3. Docker
  if (normalized.includes('docker')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.98 11.08H16.3V8.78H13.98V11.08ZM11.16 11.08H13.48V8.78H11.16V11.08ZM8.34 11.08H10.66V8.78H8.34V11.08ZM5.52 11.08H7.84V8.78H5.52V11.08ZM11.16 8.38H13.48V6.08H11.16V8.38ZM8.34 8.38H10.66V6.08H8.34V8.38ZM5.52 8.38H7.84V6.08H5.52V8.38ZM8.34 5.68H10.66V3.38H8.34V5.68ZM22.5 12.04C22.06 11.78 20.88 11.48 19.72 12.08C19.34 11.08 18.52 10.42 18.52 10.42L18.16 11.08C18.16 11.08 18.9 11.7 19.04 12.94C18.42 13.28 17.06 13.3 16.02 12.64L15.42 13.32C16.88 14.36 18.9 14.18 19.78 13.56C20.36 14.28 21.36 14.28 21.84 14.24C22.28 13.62 22.5 12.82 22.5 12.04ZM21.94 14.98C21.4 15.02 20.58 14.86 19.98 14.24C19.76 14.38 19.5 14.52 19.2 14.64C17.76 15.22 15.48 15.02 14.26 13.88C14.02 14.08 13.56 14.14 13.12 14.14H2.46C2.18 15.28 2.38 17.5 4.14 18.84C5.9 20.18 8.64 20.62 12.04 20.62C17.34 20.62 21.08 17.9 21.94 14.98Z"
          fill="#2496ED"
        />
      </svg>
    );
  }

  // 4. Next.js
  if (normalized.includes('next.js') || normalized.includes('nextjs')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.834 17.994l-5.698-7.377v7.377H10.5V6.75h1.636l5.772 7.493V6.75h1.636v11.244h-1.71z" />
      </svg>
    );
  }

  // 5. Flutter
  if (normalized.includes('flutter')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.28 2.05L3.89 12.44L7.43 15.98L21.36 2.05H14.28Z" fill="#42A5F5" />
        <path d="M14.28 10.36L8.49 16.15L12.03 19.69L21.36 10.36H14.28Z" fill="#29B6F6" />
        <path d="M12.03 19.69L14.28 21.94H21.36L15.57 16.15L12.03 19.69Z" fill="#0277BD" />
      </svg>
    );
  }

  // 6. PostgreSQL
  if (normalized.includes('postgres') || normalized.includes('sql') && !normalized.includes('scikit')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.18 16.5C16.92 16.8 16.32 17.3 14.92 17.3C13.22 17.3 12.52 16.3 12.02 15.6C11.52 14.9 10.82 14.5 9.92 14.5C8.32 14.5 7.12 15.8 7.02 16C6.62 14.8 6.52 13.4 6.72 12.1C6.92 10.8 7.62 9.5 8.72 8.6C9.82 7.7 11.22 7.2 12.62 7.3C14.02 7.4 15.32 8.1 16.22 9.2C17.12 10.3 17.52 11.7 17.52 13.1C17.52 14.3 17.42 15.5 17.18 16.5Z"
          fill="#336791"
        />
      </svg>
    );
  }

  // 7. Scikit-Learn
  if (normalized.includes('scikit')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7" cy="12" r="5" fill="#F89939" />
        <circle cx="17" cy="12" r="5" fill="#3499CD" opacity="0.9" />
        <path d="M12 8.5C13.3 9.4 14.1 10.6 14.1 12C14.1 13.4 13.3 14.6 12 15.5C10.7 14.6 9.9 13.4 9.9 12C9.9 10.6 10.7 9.4 12 8.5Z" fill="#2B5B84" />
      </svg>
    );
  }

  // 8. PyTorch
  if (normalized.includes('pytorch')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 2.5L12 4L13.5 5.5L16.5 2.5L13.5 2.5Z" fill="#EE4C2C" />
        <path
          d="M16.5 5.5C14.5 3.5 11.5 3.5 9.5 5.5C7.5 7.5 7.5 10.5 9.5 12.5L13.5 16.5C14.5 17.5 15.5 18 16.5 18C18.5 18 20 16.5 20 14.5C20 13.5 19.5 12.5 18.5 11.5L17 13C17.5 13.5 17.8 14 17.8 14.5C17.8 15.3 17.3 15.8 16.5 15.8C16 15.8 15.5 15.5 15 15L11 11C9.8 9.8 9.8 8.2 11 7C12.2 5.8 13.8 5.8 15 7L16.5 5.5Z"
          fill="#EE4C2C"
        />
      </svg>
    );
  }

  // 9. MediaPipe & OpenCV
  if (normalized.includes('opencv') || normalized.includes('mediapipe')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="7" r="4" fill="#EA4335" />
        <circle cx="6.5" cy="16.5" r="4" fill="#34A853" />
        <circle cx="17.5" cy="16.5" r="4" fill="#4285F4" />
        <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // 10. RAG / Retrieval-Augmented Generation
  if (normalized.includes('rag') || normalized.includes('retrieval')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6H20V8H4V6Z" fill="#FF6F00" />
        <path d="M4 11H14V13H4V11Z" fill="#FF8F00" />
        <path d="M4 16H11V18H4V16Z" fill="#FFA000" />
        <circle cx="17.5" cy="15.5" r="3.5" stroke="#FF6F00" strokeWidth="2" />
        <path d="M20 18L22 20" stroke="#FF6F00" strokeWidth="2" strokeLinecap="square" />
      </svg>
    );
  }

  // 11. TypeScript & JavaScript
  if (normalized.includes('typescript') || normalized.includes('javascript') || normalized.includes('ts')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" fill="#3178C6" />
        <path d="M12.5 12H8.5V10H14.5V12H12.5V19H10.5V12H12.5Z" fill="white" />
        <path d="M15.5 17C16 17.5 16.8 17.8 17.5 17.8C18.4 17.8 19 17.3 19 16.6C19 15.8 18.4 15.4 17.2 14.8C15.8 14.2 14.8 13.5 14.8 12C14.8 10.5 16 9.5 17.8 9.5C18.8 9.5 19.8 9.9 20.4 10.5L19.2 12C18.8 11.6 18.2 11.4 17.6 11.4C16.9 11.4 16.5 11.7 16.5 12.2C16.5 12.7 17 13 18.1 13.5C19.7 14.2 20.8 14.9 20.8 16.5C20.8 18.1 19.5 19.2 17.5 19.2C16.2 19.2 15 18.6 14.2 17.7L15.5 17Z" fill="white" />
      </svg>
    );
  }

  // 12. Dart
  if (normalized.includes('dart')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4L12 2L20 6L14 14L4 4Z" fill="#00B4AB" />
        <path d="M14 14L20 6L20 16L12 22L14 14Z" fill="#0175C2" />
        <path d="M4 4L14 14L8 18L2 12L4 4Z" fill="#29B6F6" />
      </svg>
    );
  }

  // 13. Tailwind CSS
  if (normalized.includes('tailwind')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 6C9.33 6 7.67 7.33 7 10C8 8.67 9.17 8.17 10.5 8.5C11.26 8.7 11.8 9.25 12.4 9.86C13.38 10.85 14.52 12 17 12C19.67 12 21.33 10.67 22 8C21 9.33 19.83 9.83 18.5 9.5C17.74 9.3 17.2 8.75 16.6 8.14C15.62 7.15 14.48 6 12 6ZM7 12C4.33 12 2.67 13.33 2 16C3 14.67 4.17 14.17 5.5 14.5C6.26 14.7 6.8 15.25 7.4 15.86C8.38 16.85 9.52 18 12 18C14.67 18 16.33 16.67 17 14C16 15.33 14.83 15.83 13.5 15.5C12.74 15.3 12.2 14.75 11.6 14.14C10.62 13.15 9.48 12 7 12Z"
          fill="#06B6D4"
        />
      </svg>
    );
  }

  // 14. Prometheus & Grafana
  if (normalized.includes('prometheus') || normalized.includes('grafana')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15 8L22 12L15 16L12 22L9 16L2 12L9 8L12 2Z" fill="#F46800" />
        <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
      </svg>
    );
  }

  // 15. Git & GitHub
  if (normalized.includes('git')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21.62 10.45L13.55 2.38C13.06 1.89 12.26 1.89 11.77 2.38L9.94 4.21L12.08 6.35C12.59 6.18 13.19 6.29 13.6 6.7C14.01 7.11 14.12 7.71 13.95 8.22L16.03 10.3C16.54 10.13 17.14 10.24 17.55 10.65C18.15 11.25 18.15 12.22 17.55 12.82C16.95 13.42 15.98 13.42 15.38 12.82C14.97 12.41 14.86 11.81 15.03 11.3L13.08 9.35V14.8C13.25 14.94 13.4 15.12 13.5 15.33C14.1 15.93 14.1 16.9 13.5 17.5C12.9 18.1 11.93 18.1 11.33 17.5C10.73 16.9 10.73 15.93 11.33 15.33C11.48 15.18 11.66 15.07 11.85 14.99V9.28L9.8 11.33C9.65 11.48 9.47 11.59 9.28 11.67V14.8C9.45 14.94 9.6 15.12 9.7 15.33C10.3 15.93 10.3 16.9 9.7 17.5C9.1 18.1 8.13 18.1 7.53 17.5C6.93 16.9 6.93 15.93 7.53 15.33C7.94 14.92 8.54 14.81 9.05 14.98V11.22C8.54 11.05 7.94 11.16 7.53 11.57C6.93 12.17 5.96 12.17 5.36 11.57C4.76 10.97 4.76 10 5.36 9.4C5.77 8.99 6.37 8.88 6.88 9.05L8.91 7.02L7.38 5.49L2.38 10.49C1.89 10.98 1.89 11.78 2.38 12.27L10.45 20.34C10.94 20.83 11.74 20.83 12.23 20.34L21.62 10.95C22.11 10.46 22.11 9.96 21.62 10.45Z"
          fill="#F05032"
        />
      </svg>
    );
  }

  // Default clean code block icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
