import Image from 'next/image';
import { ChevronRight, Link as LinkIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

// ---------- Accent helpers (per project) ----------
const PREVIEWS: Record<string, string> = {
  'AIVA — AI Voice Assistant': '/aiva-preview.png',
  'NoteBuddy — Voice → Structured Dental Notes': '/notebuddy-preview.png',
  'Jurassic Rescue Robot — MREN 303': '/jurassic-preview.png',
  'Autonomous Pet Feeder': '/petfeeder-preview.png',
  'Recipe Generator App': '/recipe-preview.png',
};

const ACCENTS: Record<
  string,
  { from: string; to: string; pill: string; pillText: string }
> = {
  'AIVA — AI Voice Assistant': {
    from: 'from-cyan-400/60',
    to: 'to-blue-500/60',
    pill: 'bg-cyan-600/90',
    pillText: 'text-cyan-100',
  },
  'NoteBuddy — Voice → Structured Dental Notes': {
    from: 'from-blue-500/60',
    to: 'to-indigo-500/60',
    pill: 'bg-indigo-600/90',
    pillText: 'text-indigo-100',
  },
  'Jurassic Rescue Robot — MREN 303': {
    from: 'from-amber-500/60',
    to: 'to-stone-500/60',
    pill: 'bg-amber-600/90',
    pillText: 'text-amber-100',
  },
  'Autonomous Pet Feeder': {
    from: 'from-emerald-400/60',
    to: 'to-teal-500/60',
    pill: 'bg-emerald-600/90',
    pillText: 'text-emerald-100',
  },
  'Recipe Generator App': {
    from: 'from-rose-400/60',
    to: 'to-orange-500/60',
    pill: 'bg-rose-600/90',
    pillText: 'text-rose-100',
  },
};

// ---------- Project Content Array (Mousa’s projects) ----------
const PROJECT_CONTENT = [
  {
    title: 'AIVA — AI Voice Assistant',
    description:
      'Internal voice assistant built during my internship at Systems Limited. It combined speech-to-text, retrieval-augmented generation, and text-to-speech to answer company knowledge with natural speech. Demoed to the entire Cloud & Infrastructure department and the IT division president, and proposed to scale.',
    techStack: [
      'Python',
      'LangChain',
      'FAISS Vector Search',
      'OpenAI (GPT, Whisper)',
      'ElevenLabs (TTS)',
      'Streamlit',
    ],
    date: '2023',
    links: [{ name: 'GitHub', url: 'https://github.com/20mup/ai-receptionist' }],
    images: [
      { src: '/aiva1.jpg', alt: 'AIVA landing screen' },
      { src: '/aiva2.png', alt: 'AIVA answering a voice query' },
    ],
    category: 'AI / Voice',
  },
  {
    title: 'NoteBuddy — Voice → Structured Dental Notes',
    description:
      'A desktop app used at Creekwood Dental that records dentist dictations and outputs clean SOAP-style notes. Reduced administrative burden and standardized notes across providers. Packaged as a standalone desktop app with an intuitive UI.',
    techStack: [
      'Python',
      'Whisper',
      'OpenAI',
      'Tkinter',
      'Docx Generation',
      'PyInstaller',
    ],
    date: '2025',
    links: [{ name: 'GitHub', url: 'https://github.com/20mup/notebuddy' }],
    images: [
      { src: '/notebuddy1.png', alt: 'NoteBuddy recording screen' },
      { src: '/notebuddy2.png', alt: 'Generated dental note' },
    ],
    category: 'Productivity',
  },
  {
    title: 'Jurassic Rescue Robot — MREN 303',
    description:
      'Team robotics project at Queen’s University with strict hardware constraints. Designed a robot that autonomously triggered a gate and manually retrieved a doll. Delivered a working prototype despite a late hardware failure, with mechanisms designed in SolidWorks and prototyped with 3D printing and cardboard.',
    techStack: [
      'Raspberry Pi Pico',
      'MicroPython',
      'Servo Kinematics',
      'SolidWorks',
      '3D Printing',
    ],
    date: '2024',
    links: [{ name: 'GitHub', url: 'https://github.com/20mup/jurassic-rescue-robot' }],
    images: [
      { src: '/jurassic1.png', alt: 'Jurassic Rescue Robot prototype' },
    ],
    category: 'Robotics',
  },
  {
    title: 'Autonomous Pet Feeder',
    description:
      'Smart IoT feeder that dispenses food via a mobile app. Built with a 3-person team; I led app development & integration, creating an iOS app with Siri integration. This project stood out in class for its fully functional end-to-end design, compared to other teams that only delivered web demos.',
    techStack: [
      'ESP32',
      'Arduino IDE',
      'iOS (Swift)',
      'Firebase',
      '3D Printing',
      'SolidWorks',
    ],
    date: '2023',
    links: [{ name: 'GitHub', url: 'https://github.com/20mup/autonomous-pet-feeder' }],
    images: [
      { src: '/petfeeder1.jpg', alt: 'Pet Feeder hardware' },
      { src: '/petfeeder2.png', alt: 'Pet Feeder iOS app' },
    ],
    category: 'IoT / Embedded',
  },
  {
    title: 'Recipe Generator App',
    description:
      'A fun side project that generates recipes from ingredients you have at home. Uses AI to parse inputs and suggest cooking steps. Built with Next.js for the frontend and OpenAI API for recipe generation.',
    techStack: ['Next.js', 'TailwindCSS', 'OpenAI API', 'TypeScript'],
    date: '2022',
    links: [{ name: 'GitHub', url: 'https://github.com/20mup/recipe-generator' }],
    images: [
      { src: '/recipe1.jpg', alt: 'Recipe Generator input screen' },
      { src: '/recipe2.jpg', alt: 'Generated recipe result' },
    ],
    category: 'Web / Fun',
  },
];

// ---------- Card UI ----------
interface ProjectProps {
  title: string;
  category?: string;
  description?: string;
  techStack?: string[];
  date?: string;
  links?: { name: string; url: string }[];
  images?: { src: string; alt: string }[];
}

const ProjectContent = ({ project }: { project: ProjectProps }) => {
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);
  if (!projectData) return <div>Project details not available</div>;

  const accent = ACCENTS[projectData.title] ?? {
    from: 'from-neutral-500/50',
    to: 'to-neutral-700/50',
    pill: 'bg-neutral-700/90',
    pillText: 'text-neutral-100',
  };

  const preview = PREVIEWS[projectData.title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-8"
    >
      {/* Fancy frame */}
      <div
        className={`rounded-3xl bg-gradient-to-br ${accent.from} ${accent.to} p-[1.5px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)]`}
      >
        <div className="rounded-3xl bg-[#F8F9FB] p-4 dark:bg-[#121316] md:p-6">
          {/* Hero / header */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            <div className="order-2 md:order-1 md:col-span-3">
              <div className="mb-3 flex items-center gap-2">
                <span
                  className={`rounded-full ${accent.pill} ${accent.pillText} px-3 py-1 text-xs font-medium`}
                >
                  {projectData.category ?? 'Project'}
                </span>
                <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium dark:bg-white/10">
                  {projectData.date}
                </span>
              </div>
              <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 md:text-4xl">
                {projectData.title}
              </h1>
              <p className="text-secondary-foreground mt-4 text-[15px] leading-relaxed">
                {projectData.description}
              </p>

              {/* Tech chips */}
              <div className="mt-5">
                <h3 className="mb-2 text-xs font-semibold tracking-wider text-neutral-500 dark:text-neutral-400">
                  TECHNOLOGIES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {projectData.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-neutral-200/70 bg-white px-3 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              {projectData.links?.length ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  {projectData.links.map((l, i) => (
                    <a
                      key={i}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                    >
                      <LinkIcon className="h-4 w-4" />
                      {l.name}
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Hero image */}
            <div className="order-1 md:order-2 md:col-span-2">
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                {preview ? (
                  <Image
                    src={preview}
                    alt={`${projectData.title} preview`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority={false}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400 dark:bg-neutral-800">
                    No preview
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {projectData.images?.length ? (
        <div>
          <h3 className="mb-3 text-xs font-semibold tracking-wider text-neutral-500 dark:text-neutral-400">
            SCREENSHOTS
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projectData.images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
                transition={{ duration: 0.35 }}
                className="relative aspect-video overflow-hidden rounded-2xl border border-neutral-200/60 dark:border-neutral-800"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      ) : null}
    </motion.div>
  );
};

// ---------- Preview Grid Data (used by the carousel) ----------
export const data = [
  {
    category: 'AI / Voice',
    title: 'AIVA — AI Voice Assistant',
    src: '/aiva-preview.png',
    content: <ProjectContent project={{ title: 'AIVA — AI Voice Assistant' }} />,
  },
  {
    category: 'Productivity',
    title: 'NoteBuddy — Voice → Structured Dental Notes',
    src: '/notebuddy-preview.png',
    content: (
      <ProjectContent
        project={{ title: 'NoteBuddy — Voice → Structured Dental Notes' }}
      />
    ),
  },
  {
    category: 'Robotics',
    title: 'Jurassic Rescue Robot — MREN 303',
    src: '/jurassic-preview.png',
    content: (
      <ProjectContent project={{ title: 'Jurassic Rescue Robot — MREN 303' }} />
    ),
  },
  {
    category: 'IoT / Embedded',
    title: 'Autonomous Pet Feeder',
    src: '/petfeeder-preview.png',
    content: <ProjectContent project={{ title: 'Autonomous Pet Feeder' }} />,
  },
  {
    category: 'Web / Fun',
    title: 'Recipe Generator App',
    src: '/recipe-preview.png',
    content: <ProjectContent project={{ title: 'Recipe Generator App' }} />,
  },
];
