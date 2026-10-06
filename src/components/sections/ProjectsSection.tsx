'use client';

import React from 'react';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import TechIcon from '@/components/ui/TechIcon';
import { projectsData } from '@/data/portfolioData';
import { ProjectItem } from '@/types/portfolio';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export default function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  // Duplikasi data 4x untuk looping mulus tanpa celah di semua ukuran layar
  const duplicatedProjects = [...projectsData, ...projectsData, ...projectsData, ...projectsData];

  return (
    <section id="proyek" className="pb-20 md:pb-28 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 border-t border-border-subtle">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-muted border border-border-subtle text-xs font-semibold text-text-muted rounded-none">
              <span className="w-1.5 h-1.5 bg-accent-brand" />
              <span>Karya &amp; Implementasi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
              Featured AI &amp; Software Projects
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal">
              Etalase 5 proyek nyata mencakup sistem evaluasi wawancara multimodal, mesin rekomendasi neural, asisten informasi RAG, aplikasi mitigasi bencana mobile, dan alur kerja MLOps.
            </p>
          </div>

          {/* Interactive Pause Hint */}
          <div className="hidden sm:inline-flex items-center space-x-2 px-3 py-1.5 bg-surface border border-border-subtle text-[11px] font-medium text-text-muted rounded-none self-start sm:self-auto shrink-0 shadow-sm">
            <span className="w-1.5 h-1.5 bg-accent-brand animate-pulse" />
            <span>Arahkan kursor untuk menjeda slider</span>
          </div>
        </div>

        {/* Compact Container-Bounded Slider Track with Edge Gradient Blur Vignette */}
        <div className="relative w-full overflow-hidden marquee-container py-2">
          {/* Left Edge Gradient Blur Fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-16 md:w-24 z-20 bg-gradient-to-r from-background via-background/85 to-transparent backdrop-blur-[2px]" />

          {/* Right Edge Gradient Blur Fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-16 md:w-24 z-20 bg-gradient-to-l from-background via-background/85 to-transparent backdrop-blur-[2px]" />

          {/* Continuous Animated Marquee Track (Left to Right) */}
          <div className="animate-marquee-ltr flex gap-6 lg:gap-8">
            {duplicatedProjects.map((project, idx) => (
              <div
                key={`${project.id}-${idx}`}
                className="w-[300px] sm:w-[340px] md:w-[360px] shrink-0 flex flex-col justify-between bg-surface border-2 border-border-subtle p-5 hover:border-accent-brand transition-all duration-200 group rounded-none shadow-sm select-none"
              >
              <div className="space-y-4">
                {/* Slide Preview Frame with Sharp Edges */}
                <div
                  onClick={() => onSelectProject(project)}
                  className="relative aspect-[16/9] w-full bg-surface-muted border border-border-subtle overflow-hidden cursor-pointer rounded-none group/img"
                >
                  <SafeImage
                    src={project.previewImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[11px] font-bold text-white px-3 py-1.5 bg-black/80 border border-white/20 rounded-none">
                      Buka Detail Proyek
                    </span>
                  </div>

                  {/* Sharp Corner Category Tag */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-surface/95 backdrop-blur-md border border-border-subtle text-[10px] font-extrabold text-accent-brand rounded-none">
                    {project.category}
                  </div>
                </div>

                {/* Project Metadata */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      onClick={() => onSelectProject(project)}
                      className="font-extrabold text-base sm:text-lg text-text-primary leading-snug group-hover:text-accent-brand transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-surface-muted text-text-muted border border-border-subtle rounded-none shrink-0">
                      {project.role}
                    </span>
                  </div>

                  <p className="text-xs text-text-muted leading-relaxed line-clamp-3 font-normal">
                    {project.summary}
                  </p>

                  {/* Tech Stack Badges (Sharp) */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 bg-surface-muted text-text-primary border border-border-subtle rounded-none"
                      >
                        <TechIcon name={tech} className="w-3 h-3 shrink-0" />
                        <span>{tech}</span>
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-surface-muted text-text-muted border border-border-subtle rounded-none">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 mt-5 border-t border-border-subtle flex items-center justify-between text-xs">
                {/* External Links */}
                <div className="flex items-center space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Lihat Repositori GitHub"
                      className="p-1.5 bg-surface-muted border border-border-subtle text-text-muted hover:text-text-primary hover:border-accent-brand transition-colors rounded-none"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.deployUrl && (
                    <a
                      href={project.deployUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Kunjungi Live Deploy"
                      className="p-1.5 bg-surface-muted border border-border-subtle text-text-muted hover:text-text-primary hover:border-accent-brand transition-colors rounded-none"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* View Details Button */}
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="font-bold text-xs text-text-primary group-hover:text-accent-brand transition-colors flex items-center space-x-1"
                >
                  <span>Detail</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
}
