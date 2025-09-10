'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  ChevronRight,
  Copy,
  Check,
  Github,
  Linkedin,
  Youtube,
  Sparkles,
} from 'lucide-react';

// Named + default export to avoid import mismatches
export function Contact() {
  const contactInfo = {
    name: 'Mousa Pirzada',
    email: 'mousapir@gmail.com',
    handle: '@mousa-pirzada',
    note:
      'Always open to collaborations in AI, robotics, and product design — especially if it solves a real problem or has a clever twist.',
    socials: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mousa-pirzada/', icon: Linkedin },
      { name: 'GitHub', url: 'https://github.com/20mup', icon: Github },
      { name: 'YouTube', url: 'https://www.youtube.com/@mousapirzada4604', icon: Youtube },
    ],
  } as const;

  const openLink = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  const [copied, setCopied] = React.useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (_) {}
  };

  // Brand color tints for social badges
  const socialTint: Record<string, string> = {
    LinkedIn: 'hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30 hover:text-[#0A66C2]',
    GitHub: 'hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10 hover:border-zinc-400/40',
    YouTube: 'hover:bg-[#FF0000]/10 hover:border-[#FF0000]/30 hover:text-[#FF0000]',
  };

  // Motion variants
  const container = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  } as const;
  const item = { hidden: { opacity: 0, y: 4 }, show: { opacity: 1, y: 0 } } as const;

  return (
    <div className="mx-auto mt-8 w-full">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={[
          'relative w-full overflow-hidden rounded-3xl border border-border shadow-sm',
          'p-6 sm:p-8 md:p-12 bg-accent',
          // Softer dotted grid
          '[background-image:radial-gradient(var(--tw-ring-color,_rgba(0,0,0,0.05))_1px,transparent_1px)]',
          '[background-size:12px_12px] [background-position:0_0]',
        ].join(' ')}
      >
        {/* Subtle corner gradient tint */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,theme(colors.indigo.400/.18),transparent)]" />

        {/* Divider glow */}
        <div className="pointer-events-none absolute inset-y-8 left-1/2 hidden w-[1px] -translate-x-1/2 md:block">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />
          <div className="absolute inset-0 blur-sm opacity-40 bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />
        </div>

        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            Contact
          </h2>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{contactInfo.handle}</span>

            {/* Availability chip (upgraded) */}
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-green-100/30 px-3.5 py-1.5 text-[13px] font-medium text-foreground/80 shadow-sm border border-green-200 dark:from-green-900/20 dark:to-green-900/10 dark:border-green-900/40">
              {/* Animated pulse dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
              </span>
              Replies in ~24h • EDT
            </span>
          </div>
        </div>

        {/* Body grid */}
        <div className="relative grid grid-cols-1 items-start gap-8 md:grid-cols-[2fr_1fr]">
          {/* Left column */}
          <motion.div variants={item} className="md:pr-10">
            {/* Email row */}
            <button
              onClick={() => openLink(`mailto:${contactInfo.email}`)}
              className={[
                'group w-full rounded-2xl bg-background/70 px-4 py-3 text-left',
                'border border-border shadow-sm hover:shadow transition',
                'ring-0 hover:ring-1 hover:ring-indigo-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40',
                'backdrop-blur-[2px]',
              ].join(' ')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 opacity-90" strokeWidth={1.75} />
                  <span className="text-[15px] font-medium tracking-tight underline-offset-4 group-hover:underline">
                    {contactInfo.email}
                  </span>
                </div>
                <ChevronRight
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.75}
                />
              </div>
            </button>

            {/* CTAs */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openLink(`mailto:${contactInfo.email}`)}
                className="inline-flex items-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 px-4 py-2 text-background shadow-sm transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40"
              >
                Email me
              </button>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 hover:bg-background/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </div>

            {/* Note */}
            <p className="mt-6 max-w-prose text-[14px] leading-relaxed text-muted-foreground">
              {contactInfo.note}
            </p>
          </motion.div>

          {/* Right column */}
          <motion.div variants={item} className="rounded-2xl border border-border bg-background/60 p-4">
            {/* Header strip */}
            <div className="mb-3 rounded-lg bg-gradient-to-b from-indigo-400/10 to-transparent p-2">
              <span className="inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-wide">
                <Sparkles className="h-4 w-4" strokeWidth={1.75} /> Quick links
              </span>
              <p className="mt-1 text-[13px] text-muted-foreground">
                AIVA presented to department leadership • 2+ years tutoring experience
              </p>
            </div>

            {/* Social badges */}
            <motion.div variants={container} className="flex gap-3">
              {contactInfo.socials.map(({ name, url, icon: Icon }) => (
                <motion.button
                  key={name}
                  variants={item}
                  whileHover={{ y: -1 }}
                  onClick={() => openLink(url)}
                  className="group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40"
                  title={name}
                  aria-label={`Open ${name}`}
                >
                  <span
                    className={[
                      'flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background shadow-sm transition',
                      '[box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.35)]',
                      socialTint[name] ?? '',
                    ].join(' ')}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="mt-2 text-xs text-muted-foreground group-hover:text-foreground">
                    {name}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;
