'use client';

import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  href: string;          // e.g. "/resume_giraud.pdf"
  subtitle?: string;     // e.g. "Updated Mar 2025"
  className?: string;
};

export default function ResumePill({ href, subtitle, className }: Props) {
  const openView = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const downloadFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    const a = document.createElement('a');
    a.href = href;
    a.download = href.split('/').pop() || 'resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <motion.button
      onClick={openView}
      whileHover={{ y: -1, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group relative inline-flex items-center gap-2 rounded-full px-4 py-2',
        'bg-black/80 text-white backdrop-blur-md border border-white/10 shadow-lg',
        'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
        className
      )}
      aria-label="Open resume"
    >
      {/* shimmer */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition group-hover:opacity-100">
          <span className="absolute inset-0 w-[200%] animate-[shimmer_1.75s_infinite] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.25),transparent)]" />
        </span>
      </span>

      {/* icon */}
      <motion.span
        className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/10"
        animate={{ rotate: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FileText className="h-3.5 w-3.5" />
        <Sparkles className="absolute -right-1 -top-1 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
      </motion.span>

      <span className="flex flex-col items-start leading-tight">
        <span className="text-sm font-semibold">Resume</span>
        {subtitle && <span className="text-[10px] opacity-70">{subtitle}</span>}
      </span>

      {/* View hint */}
      <span className="ml-1 hidden items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs opacity-0 transition group-hover:flex group-hover:opacity-100">
        View <ExternalLink className="h-3.5 w-3.5" />
      </span>

      {/* divider */}
      <span className="mx-1 h-4 w-px bg-white/15 hidden group-hover:block" />

      {/* Download chip */}
      <motion.span
        onClick={downloadFile}
        whileTap={{ scale: 0.95 }}
        className="hidden cursor-pointer items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs opacity-0 transition hover:bg-white/20 group-hover:flex group-hover:opacity-100"
        aria-label="Download resume"
      >
        <Download className="h-3.5 w-3.5" />
        Download
      </motion.span>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </motion.button>
  );
}
