'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { ProjectItem } from '@/types/portfolio';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Sharp Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-surface border-2 border-border-subtle shadow-2xl overflow-y-auto z-10 flex flex-col rounded-none"
        >
          {/* Header */}
          <div className="sticky top-0 bg-surface/95 backdrop-blur-md px-6 py-4 border-b border-border-subtle flex items-center justify-between z-10">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-brand">
                  {project.category}
                </span>
                <span className="text-[10px] text-text-muted">&bull;</span>
                <span className="text-[10px] text-text-muted font-medium">
                  {project.projectType}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight">
                {project.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-muted border border-border-subtle transition-all rounded-none"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6">
            {/* Slide Preview Image */}
            <div className="relative aspect-[16/9] w-full bg-surface-muted border border-border-subtle overflow-hidden rounded-none">
              <SafeImage
                src={project.previewImage}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Role & Tech Stack */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Peran: <span className="text-text-primary font-bold">{project.role}</span>
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-surface-muted text-text-primary border border-border-subtle rounded-none"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Ringkasan Proyek
              </h4>
              <p className="text-sm text-text-primary leading-relaxed font-normal">
                {project.summary}
              </p>
            </div>

            {/* Contribution */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Kontribusi &amp; Dampak
              </h4>
              <p className="text-sm text-text-muted leading-relaxed font-normal">
                {project.contribution}
              </p>
            </div>

            {/* What I Learned */}
            <div className="p-4 bg-surface-muted border-l-2 border-accent-brand space-y-1.5 rounded-none">
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent-brand">
                Pelajaran Utama (What I Learned)
              </h4>
              <p className="text-xs sm:text-sm text-text-primary leading-relaxed font-normal">
                {project.whatILearned}
              </p>
            </div>

            {/* Action Links */}
            <div className="pt-2 border-t border-border-subtle flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-surface-muted border border-border-subtle text-text-primary hover:border-accent-brand hover:text-accent-brand font-bold text-xs flex items-center space-x-2 transition-colors rounded-none"
                >
                  <Github className="w-4 h-4" />
                  <span>Lihat GitHub Repo ↗</span>
                </a>
              )}
              {project.deployUrl && (
                <a
                  href={project.deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-accent-brand text-background hover:bg-accent-hover font-bold text-xs flex items-center space-x-2 transition-colors rounded-none border border-accent-brand"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Kunjungi Live Deploy ↗</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
