'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Award, Code, Mail, MessageSquare } from 'lucide-react';
import React from 'react';

interface ChatLandingProps {
  submitQuery: (query: string) => void;
}

const PROJECT_BADGES = [
  'AIVA (Systems Limited)',
  'NoteBuddy (Creekwood Dental)',
  'Autonomous Pet Feeder (Queen’s)',
  'Jurassic Rescue Robot (Queen’s)',
];

const ChatLanding: React.FC<ChatLandingProps> = ({ submitQuery }) => {
  const suggested = [
    { icon: <MessageSquare className="h-4 w-4" />, text: 'Give me your 30-second intro' },
    { icon: <Code className="h-4 w-4" />, text: 'What’s your proudest project and why?' },
    { icon: <Award className="h-4 w-4" />, text: 'What are you strongest at technically?' },
    { icon: <Mail className="h-4 w-4" />, text: 'How do I reach you?' },
  ];

  // Stagger animations (typed)
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  } as const satisfies Variants;

  const item = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        // Cubic-bezier must be a 4-number tuple (not number[])
        ease: [0.19, 1, 0.22, 1] as const,
      },
    },
  } as const satisfies Variants;

  return (
    <motion.div
      className="flex w-full flex-col items-center px-4 py-6"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {/* Hero */}
      <motion.div
        variants={item}
        className="relative mb-6 flex w-full max-w-2xl flex-col items-center text-center"
      >
        {/* Memoji + glow */}
        <div className="relative mb-3 h-14 w-14">
          <div className="absolute inset-0 rounded-full blur-xl opacity-60 bg-emerald-400/30 animate-pulse" />
          <Image
            src="/landing-memojis.png"
            alt="Memoji"
            fill
            className="object-contain drop-shadow-sm"
            sizes="56px"
            priority={false}
          />
        </div>

        {/* Gradient headline with shine-on-hover */}
        <div className="group relative">
          <h2 className="mb-2 bg-gradient-to-r from-black via-zinc-700 to-zinc-500/90 bg-clip-text text-2xl font-semibold text-transparent dark:from-white dark:via-zinc-300 dark:to-zinc-400">
            Talk to me 👋
          </h2>
          {/* shine sweep */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 50%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 50%, transparent 100%)',
              animation: 'shine 1.2s ease-in-out 1',
            }}
          />
        </div>

        <p className="text-muted-foreground mx-auto max-w-md">
          Ask me about my projects, how I build things, or what I’m looking for next.
        </p>

        {/* Project badges (marquee on mobile, wrap on desktop) */}
        <div className="mt-5 w-full">
          {/* Mobile: auto-scroll marquee */}
          <div className="relative block sm:hidden">
            <motion.div
              className="flex min-w-max gap-2"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
            >
              {[...PROJECT_BADGES, ...PROJECT_BADGES].map((b, i) => (
                <Badge key={`m-${i}`}>{b}</Badge>
              ))}
            </motion.div>
          </div>

          {/* Desktop: wrapped badges */}
          <div className="hidden flex-wrap justify-center gap-2 sm:flex">
            {PROJECT_BADGES.map((b, i) => (
              <Badge key={`d-${i}`}>{b}</Badge>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Suggested questions */}
      <motion.div className="w-full max-w-md space-y-3" variants={container}>
        {suggested.map((q, i) => (
          <motion.button
            key={i}
            className="flex w-full items-center rounded-xl border border-neutral-200/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur transition-colors hover:bg-white/90 dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:bg-neutral-900"
            onClick={() => submitQuery(q.text)}
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="mr-3 rounded-full bg-neutral-100 p-2 dark:bg-neutral-800">
              {q.icon}
            </span>
            <span className="text-left">{q.text}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Local @keyframes for shine (scoped) */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }
      `}</style>
    </motion.div>
  );
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-xs text-neutral-700 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-neutral-300">
      {children}
    </div>
  );
}

export default ChatLanding;