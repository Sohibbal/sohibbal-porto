'use client';

import React from 'react';

const footerLinks = [
  { label: 'Keahlian', href: '#keahlian' },
  { label: 'Proyek', href: '#proyek' },
  { label: 'Pengalaman', href: '#pengalaman' },
  { label: 'Sertifikat', href: '#sertifikat' },
  { label: 'Jejak', href: '#jejak' },
  { label: 'Kontak', href: '#kontak' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-background border-t border-border-subtle py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Brand & Motto */}
          <div className="space-y-1.5">
            <span className="font-extrabold text-lg tracking-tight text-text-primary">
              sohibbal<span className="text-accent-brand px-1 py-0.5 bg-surface-muted border border-border-subtle ml-0.5">.porto</span>
            </span>
            <p className="text-xs text-text-muted font-normal">
              &quot;Keep Learn. and Code.&quot; &bull; Pekanbaru, Riau, Indonesia
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-semibold text-text-muted">
            {footerLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="hover:text-accent-brand transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Legal & Crafting Standard */}
        <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-text-muted font-normal">
          <p>
            &copy; {currentYear} M. Sohibbal. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-[11px] text-text-muted">
            Dibangun dengan Next.js App Router, Tailwind CSS, dan RAG AI Assistant.
          </p>
        </div>
      </div>
    </footer>
  );
}
