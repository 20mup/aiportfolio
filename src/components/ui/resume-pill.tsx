'use client';

import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  href?: string;             // e.g. "/resume.pdf" (optional -> shows disabled state)
  subtitle?: string;         // e.g. "Updated Mar 2025"
  className?: string;
  size?: 'sm' | 'md';        // size control
  label?: string;            // defaults to "Resume"
  previewText?: string;      // defaults to "View"
  downloadText?: string;     // defaults to "Download"
};

export default function ResumePill({
  href,
  subtitle,
  className,
  size = 'md',
  label = 'Resume',
  previewText = 'View',
  downloadText = 'Download',
}: Props) {
  const isDisabled = !href;

  const openView = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDisabled) return;
    window.open(href!, '_blank', 'noopener,noreferrer');
  };

  const downloadFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDisabled) return;
    const a = document.createElement('a');
    a.href = href!;
    a.download = href!.split('/').pop() || 'resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const sizing = {
    sm: {
      pad: 'px-3 py-1.5',
      iconWrap: 'h-5 w-5',
      icon: 'h-3 w-3',
      title: 'text-xs',
      sub: 'text-[10px]',
      chip: 'px-1.5 py-0.5 text-[10px]',
      dividerH: 'h-3',
    },
    md: {
      pad: 'px-4 py-2',
      iconWrap: 'h-6 w-6',
      icon: 'h-3.5 w-3.5',
      title: 'text-sm',
      sub: 'text-[11px]',
      chip: 'px-2 py-1 text-xs',
      dividerH: 'h-4',
    },
  }[size];

  return (
    <motion.button
      onClick={openView}
      whileHover={isDisabled ? undefined : { y: -1, scale: 1.02 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      disabled={isDisabled}
      className={cn(
        'group relative inline-flex items-center gap-2 rounded-full',
        sizing.pad,
        'border shadow-lg backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2',
        isDisabled
          ? 'cursor-not-allowed border-white/10 bg-black/40 text-white/60 focus-visible:ring-white/20'
          : 'cursor-pointer border-white/10 bg-black/80 text-white focus-visible:ring-white/60 hover:bg-black/85',
        'dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15',
        className
      )}
      aria-label={isDisabled ? 'Resume not available' : 'Open resume'}
      title={isDisabled ? 'Resume not available' : 'Open resume'}
    >
      {/* shimmer */}
      {!isDisabled && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 -translate-x-full opacity-0 transition group-hover:opacity-100">
            <span className="absolute inset-0 w-[200%] animate-[shimmer_1.75s_infinite] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.25),transparent)]" />
          </span>
        </span>
      )}

      {/* icon */}
      <motion.span
        className={cn(
          'relative flex items-center justify-center rounded-full bg-white/10',
          sizing.iconWrap
        )}
        animate={isDisabled ? undefined : { rotate: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FileText className={cn(sizing.icon)} />
        {!isDisabled && (
          <Sparkles className="absolute -right-1 -top-1 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </motion.span>

      {/* text */}
      <span className="flex flex-col items-start leading-tight">
        <span className={cn('font-semibold', sizing.title)}>{label}</span>
        {subtitle && (
          <span className={cn('opacity-70', sizing.sub)}>{subtitle}</span>
        )}
      </span>

      {/* View chip */}
      {!isDisabled && (
        <span className={cn(
          'ml-1 hidden items-center gap-1 rounded-full bg-white/10 opacity-0 transition group-hover:flex group-hover:opacity-100',
          sizing.chip
        )}>
          {previewText} <ExternalLink className={cn(sizing.icon)} />
        </span>
      )}

      {/* divider */}
      {!isDisabled && (
        <span className={cn('mx-1 hidden w-px bg-white/15 group-hover:block', sizing.dividerH)} />
      )}

      {/* Download chip */}
      {!isDisabled && (
        <motion.span
          onClick={downloadFile}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'hidden cursor-pointer items-center gap-1 rounded-full bg-white/10 opacity-0 transition hover:bg-white/20 group-hover:flex group-hover:opacity-100',
            sizing.chip
          )}
          aria-label="Download resume"
          title="Download resume"
        >
          <Download className={cn(sizing.icon)} />
          {downloadText}
        </motion.span>
      )}

      {/* keyframes */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </motion.button>
  );
}
