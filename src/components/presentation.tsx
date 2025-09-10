'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function Presentation() {
  // Personal information
  const profile = {
    name: 'Mousa Pirzada',
    age: 'Mechatronics & Robotics (Queen’s University)',
    location: 'Toronto, Canada',
    description:
      "Hey 👋\nI’m Mousa. I build voice-AI, embedded systems, and robots that actually ship.\nRecent wins: AIVA (Systems Limited), NoteBuddy (Creekwood Dental), and the Jurassic Rescue Robot.",
    src: '/mousa.jpg',
    fallbackSrc:
      'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?q=80&w=1200&auto=format&fit=crop',
  };

  // Use state so Next/Image can swap to a fallback on error
  const [imgSrc, setImgSrc] = useState(profile.src);

  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const paragraphAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 },
    },
  };

  const tags = [
    'AI & Robotics',
    'LangChain • Whisper',
    'Embedded (Pico/ESP32/Arduino)',
    'Python • C++ • TS',
    'Streamlit • Flask • Next.js',
    'Supabase • FAISS',
    'Systems Limited',
    'Creekwood Dental',
  ];

  return (
    <div className="mx-auto w-full max-w-5xl py-6 font-sans">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Image */}
        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="relative h-full w-full overflow-hidden rounded-2xl">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="h-full w-full"
            >
              <Image
                src={imgSrc}
                alt={profile.name}
                width={800}
                height={800}
                priority
                className="h-full w-full object-cover object-center"
                onError={() => setImgSrc(profile.fallbackSrc)}
              />
            </motion.div>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <motion.div initial="hidden" animate="visible" variants={textVariants}>
            <h1 className="from-foreground to-muted-foreground bg-gradient-to-r bg-clip-text text-xl font-semibold text-transparent md:text-3xl">
              {profile.name}
            </h1>
            <div className="mt-1 flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
              <p className="text-muted-foreground">{profile.age}</p>
              <div className="bg-border hidden h-1.5 w-1.5 rounded-full md:block" />
              <p className="text-muted-foreground">{profile.location}</p>
            </div>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={paragraphAnimation}
            className="text-foreground mt-6 whitespace-pre-line leading-relaxed"
          >
            {profile.description}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Presentation;
