import React from 'react';

interface SectionHeaderProps {
  category?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({
  category,
  title,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`space-y-3 mb-10 md:mb-14 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}`}>
      {category && (
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent-soft text-accent-brand border border-accent-brand/20">
          <span>{category}</span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-text-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
