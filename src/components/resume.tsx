'use client';

import { motion } from 'framer-motion';
import { Download, Eye } from 'lucide-react';

type ResumeDetails = {
  title: string;
  description: string;
  fileType: string;
  lastUpdated: string;
  fileSize?: string; // optional, since we can’t compute on client
  previewImageSrc?: string; // optional
  downloadUrl: string; // e.g. /mousa_resume.pdf
  viewUrl?: string; // same as downloadUrl by default
};

export default function Resume() {
  const resumeDetails: ResumeDetails = {
    title: "Mousa Pirzada — Résumé",
    description: "AI, Robotics & Embedded Systems",
    fileType: "PDF",
    lastUpdated: "Aug 2025",
    downloadUrl: "/mousa_resume.pdf",
    viewUrl: "/mousa_resume.pdf",
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeDetails.downloadUrl;
    link.download = resumeDetails.downloadUrl.split('/').pop() || 'mousa_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    window.open(resumeDetails.viewUrl || resumeDetails.downloadUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mx-auto w-full py-8 font-sans">
      <motion.div
        className="group relative overflow-hidden rounded-xl border bg-accent/50 p-0 transition-all duration-300 hover:shadow-md"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {/* Optional preview image */}
        {resumeDetails.previewImageSrc ? (
          <div className="aspect-[5/7] w-full overflow-hidden bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resumeDetails.previewImageSrc}
              alt="Résumé preview"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        ) : null}

        {/* Details */}
        <div className="flex items-center justify-between gap-4 p-5">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-foreground">
              {resumeDetails.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {resumeDetails.description}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
              <span>{resumeDetails.fileType}</span>
              <span>•</span>
              <span>Updated {resumeDetails.lastUpdated}</span>
              {resumeDetails.fileSize ? (
                <>
                  <span>•</span>
                  <span>{resumeDetails.fileSize}</span>
                </>
              ) : null}
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={handleView}
              className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition hover:bg-white/50 dark:hover:bg-neutral-800"
              aria-label="View résumé"
            >
              <Eye className="h-4 w-4" />
              View
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-2 text-sm font-medium text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
              aria-label="Download résumé"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
