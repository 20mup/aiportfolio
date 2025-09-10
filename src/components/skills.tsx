'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Cpu, Code2, Wrench, PenTool, Users, Bot } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

type Tier = 'Comfort' | 'Advanced' | 'Expert';

const TIER_ORDER: Tier[] = ['Comfort', 'Advanced', 'Expert'];

const TIER_COLORS: Record<Tier, string> = {
  Comfort: 'from-emerald-300/70 to-emerald-500/70',
  Advanced: 'from-blue-300/70 to-blue-500/70',
  Expert: 'from-purple-300/70 to-purple-500/70',
};

const skillsData: {
  category: string;
  icon: React.ReactNode;
  tier: Tier;
  points?: string[];
  chips: string[];
  tone: string; // bg/text/border classes for chips
}[] = [
  {
    category: 'AI / LLM Engineering',
    icon: <Bot className="h-5 w-5" />,
    tier: 'Expert',
    points: [
      'Production prompts & evals',
      'RAG pipelines (chunking, re-ranking, caching)',
      'Agents & tool orchestration',
    ],
    chips: [
      'OpenAI (GPT, Whisper)',
      'LangChain',
      'RAG (FAISS/Chroma)',
      'Vector Search',
      'Agents & Tool Calling',
      'ElevenLabs (TTS)',
      'Prompt Engineering',
    ],
    tone:
      'bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-900',
  },
  {
    category: 'Embedded & Robotics',
    icon: <Cpu className="h-5 w-5" />,
    tier: 'Advanced',
    points: ['Motor control & kinematics', 'Sensor IO & timing'],
    chips: [
      'Raspberry Pi Pico (MicroPython)',
      'ESP32 / Arduino (C/C++)',
      'GPIO / PWM / UART / I²C / SPI',
      'Servo Kinematics',
      'Sensors & Actuators',
      'Rapid Prototyping',
    ],
    tone:
      'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900',
  },
  {
    category: 'Apps & Web',
    icon: <Code2 className="h-5 w-5" />,
    tier: 'Expert',
    points: ['Full-stack DX', 'Desktop packaging & tooling'],
    chips: [
      'Python',
      'Flask / FastAPI',
      'Streamlit',
      'React / Next.js',
      'TypeScript / JavaScript',
      'Tailwind CSS',
      'Tkinter (desktop)',
      'PyInstaller (packaging)',
    ],
    tone:
      'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-900',
  },
  {
    category: 'Data, Cloud & Tools',
    icon: <Wrench className="h-5 w-5" />,
    tier: 'Comfort',
    points: ['Infra basics & CI hygiene'],
    chips: [
      'Supabase / PostgreSQL',
      'Git & GitHub',
      'Docker (basics)',
      'AWS (S3/EC2 basics)',
      'CI/CD (GitHub Actions)',
    ],
    tone:
      'bg-cyan-50 text-cyan-700 border border-cyan-200 dark:bg-cyan-950/30 dark:text-cyan-300 dark:border-cyan-900',
  },
  {
    category: 'Design & CAD',
    icon: <PenTool className="h-5 w-5" />,
    tier: 'Advanced',
    points: ['Product-first UI', 'CAD for mechatronics'],
    chips: ['Figma', 'SolidWorks', 'AutoCAD', 'DaVinci Resolve', 'Canva', 'Markdown/Jekyll'],
    tone:
      'bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-900',
  },
  {
    category: 'Soft Skills',
    icon: <Users className="h-5 w-5" />,
    tier: 'Advanced',
    points: ['Ship fast, communicate clearly', 'Mentor & lead by doing'],
    chips: ['Leadership (Residence Don)', 'Mentoring & Tutoring', 'Problem Solving', 'Communication', 'Time Management', 'Creativity'],
    tone:
      'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900',
  },
];

// Motion presets
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.19, 1, 0.22, 1] } },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
};

export default function Skills() {
  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className="mx-auto w-full max-w-5xl"
    >
      <Card className="w-full border-none px-0 pb-12 shadow-none">
        <CardHeader className="px-0 pb-1">
          <CardTitle className="px-0 text-4xl font-bold">
            <span className="bg-gradient-to-r from-black via-neutral-700 to-neutral-500/80 bg-clip-text text-transparent dark:from-white dark:via-zinc-300 dark:to-zinc-400">
              Skills & Expertise
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="px-0">
          <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
            {skillsData.map((section, i) => (
              <motion.div key={section.category} variants={itemVariants} className="rounded-2xl border border-neutral-200/60 p-4 dark:border-neutral-800">
                {/* Header row */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-2">
                    {section.icon}
                    <h3 className="text-lg font-semibold">{section.category}</h3>
                  </div>

                  {/* Tier bar */}
                  <TierBar tier={section.tier} />
                </div>

                {/* Bullets */}
                {section.points && (
                  <ul className="mt-3 space-y-1 text-sm text-neutral-600 dark:text-neutral-300">
                    {section.points.map((p) => (
                      <li key={p} className="leading-relaxed">• {p}</li>
                    ))}
                  </ul>
                )}

                {/* Chips */}
                <motion.div
                  className="mt-4 flex flex-wrap gap-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {section.chips.map((chip) => (
                    <motion.span
                      key={chip}
                      variants={chipVariants}
                      whileHover={{ scale: 1.04 }}
                      className={cn(
                        'rounded-full px-3 py-1 text-sm transition-colors',
                        'backdrop-blur',
                        section.tone
                      )}
                    >
                      {chip}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TierBar({ tier }: { tier: Tier }) {
  const activeIndex = TIER_ORDER.indexOf(tier);
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Level</span>
      <div className="flex h-2 w-40 overflow-hidden rounded-full bg-neutral-200/70 dark:bg-neutral-800">
        {TIER_ORDER.map((t, i) => (
          <div
            key={t}
            className={cn(
              'h-full w-1/3 bg-gradient-to-r transition-all',
              i <= activeIndex ? TIER_COLORS[t] : 'from-transparent to-transparent'
            )}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">{tier}</span>
    </div>
  );
}
