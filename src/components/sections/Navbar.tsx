'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navItems = [
  { label: 'Keahlian', href: '#keahlian' },
  { label: 'Proyek', href: '#proyek' },
  { label: 'Pengalaman', href: '#pengalaman' },
  { label: 'Sertifikat', href: '#sertifikat' },
  { label: 'Jejak', href: '#jejak' },
  { label: 'Kontak', href: '#kontak' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('keahlian');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border-subtle py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center space-x-1 text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand p-1 rounded-none"
        >
          <span className="font-extrabold text-lg tracking-tight text-text-primary group-hover:opacity-80 transition-opacity">
            sohibbal<span className="text-accent-brand px-1 py-0.5 bg-surface-muted border border-border-subtle ml-0.5">.porto</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 text-xs font-semibold text-text-muted">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`transition-colors hover:text-text-primary ${
                  isActive ? 'text-accent-brand font-bold' : ''
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action: Theme Switcher & Contact CTA */}
        <div className="flex items-center space-x-3.5">
          <ThemeToggle />

          <a
            href="#kontak"
            onClick={(e) => handleNavClick(e, '#kontak')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold bg-accent-brand text-background hover:bg-accent-hover transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:outline-none rounded-none border border-accent-brand"
          >
            Hubungi
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="md:hidden p-2 border border-border-subtle bg-surface text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand rounded-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border-subtle bg-surface/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-4 py-3 text-sm font-medium transition-colors rounded-none ${
                    isActive
                      ? 'bg-surface-muted text-accent-brand font-bold border-l-2 border-accent-brand'
                      : 'text-text-muted hover:bg-surface-muted hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-border-subtle">
            <a
              href="#kontak"
              onClick={(e) => handleNavClick(e, '#kontak')}
              className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-bold bg-accent-brand text-background hover:bg-accent-hover transition-colors shadow-sm rounded-none border border-accent-brand"
            >
              Hubungi M. Sohibbal
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
