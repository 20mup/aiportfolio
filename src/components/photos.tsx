'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

export interface PhotoItem {
  src: string;        // keep string; if you later static-import, it still works
  alt: string;
  caption?: string;
}

interface PhotosProps {
  photos: PhotoItem[];
  className?: string;
  title?: string;
}

export function Photos({ photos, className = '', title }: PhotosProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const openPhoto = (photo: PhotoItem) => setSelectedPhoto(photo);
  const closePhoto = () => setSelectedPhoto(null);

  const getGridClasses = () => {
    switch (photos.length) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      default:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    }
  };

  return (
    <div className={`mx-auto w-full ${className}`}>
      <div className="bg-accent w-full overflow-hidden rounded-3xl px-6 py-8 font-sans">
        {/* Title */}
        {title && (
          <div className="mb-8">
            <h2 className="text-foreground text-3xl font-semibold md:text-4xl">
              {title}
            </h2>
          </div>
        )}

        {/* Photos Grid */}
        <div className={`grid ${getGridClasses()} gap-6`}>
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-2xl cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => openPhoto(photo)}
            >
              {/* Force a consistent, crisp 16:9 visual card */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  // Important for sharpness: give the optimizer real targets
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  quality={95}
                  className="object-cover"
                  // make the first one eager for best first paint
                  priority={index === 0}
                />
                {/* Caption overlay (on hover) */}
                {photo.caption && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 flex items-end bg-black/30 p-4"
                  >
                    <p className="text-white text-sm sm:text-base font-medium">
                      {photo.caption}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closePhoto}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                onClick={closePhoto}
              >
                <X className="h-6 w-6" />
              </button>

              {/* High-quality full view */}
              <div className="relative h-auto w-auto max-h-[80vh]">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  // Use a generous base size for sharp modal display
                  width={1920}
                  height={1080}
                  quality={100}
                  sizes="(max-width: 1024px) 100vw, 90vw"
                  className="h-auto max-h-[80vh] w-auto max-w-[90vw] object-contain"
                />
              </div>

              {/* Caption */}
              {selectedPhoto.caption && (
                <div className="bg-black/60 p-4">
                  <p className="text-center text-white">{selectedPhoto.caption}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Photos;
