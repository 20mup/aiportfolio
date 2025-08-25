import Image from 'next/image';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// --- Project Content Array (Mousa’s projects) ---
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
    date: '2024',
    links: [
      { name: 'Case Study', url: '/case-aiva.pdf' },
    ],
    images: [
      { src: '/aiva1.png', alt: 'AIVA landing screen' },
      { src: '/aiva2.png', alt: 'AIVA answering a voice query' },
    ],
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
    date: '2024',
    links: [
      { name: 'Case Study', url: '/case-notebuddy.pdf' },
    ],
    images: [
      { src: '/notebuddy1.png', alt: 'NoteBuddy recording screen' },
      { src: '/notebuddy2.png', alt: 'Generated dental note' },
    ],
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
    date: '2023',
    links: [
      { name: 'Case Study', url: '/case-jurassic.pdf' },
    ],
    images: [
      { src: '/jurassic1.jpg', alt: 'Jurassic Rescue Robot prototype' },
      { src: '/jurassic2.jpg', alt: 'Robot mechanism detail' },
    ],
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
    links: [
      { name: 'Case Study', url: '/case-petfeeder.pdf' },
    ],
    images: [
      { src: '/petfeeder1.png', alt: 'Pet Feeder hardware' },
      { src: '/petfeeder2.png', alt: 'Pet Feeder iOS app' },
    ],
  },
  {
    title: 'Recipe Generator App',
    description:
      'A fun side project that generates recipes from ingredients you have at home. Uses AI to parse inputs and suggest cooking steps. Built with Next.js for the frontend and OpenAI API for recipe generation.',
    techStack: [
      'Next.js',
      'TailwindCSS',
      'OpenAI API',
      'TypeScript',
    ],
    date: '2025',
    links: [
      { name: 'GitHub', url: 'https://github.com/20mup/recipe-generator' },
    ],
    images: [
      { src: '/recipe1.png', alt: 'Recipe Generator input screen' },
      { src: '/recipe2.png', alt: 'Generated recipe result' },
    ],
  },
];

// --- Project Component Renderer ---
interface ProjectProps {
  title: string;
  description?: string;
  techStack?: string[];
  date?: string;
  links?: { name: string; url: string }[];
  images?: { src: string; alt: string }[];
}

const ProjectContent = ({ project }: { project: ProjectProps }) => {
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);

  if (!projectData) {
    return <div>Project details not available</div>;
  }

  return (
    <div className="space-y-10">
      {/* Header section */}
      <div className="rounded-3xl bg-[#F5F5F7] p-8 dark:bg-[#1D1D1F]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{projectData.date}</span>
          </div>
          <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
            {projectData.description}
          </p>
          <div className="pt-4">
            <h3 className="mb-3 text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      {projectData.links && projectData.links.length > 0 && (
        <div className="mb-24">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Links
            </h3>
            <Link className="text-muted-foreground w-4" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {projectData.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#F5F5F7] flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-[#E5E5E7] dark:bg-neutral-800 dark:hover:bg-neutral-700"
              >
                <span className="font-light capitalize">{link.name}</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Images */}
      {projectData.images && projectData.images.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {projectData.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-2xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Preview Grid Data ---
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
    content: <ProjectContent project={{ title: 'NoteBuddy — Voice → Structured Dental Notes' }} />,
  },
  {
    category: 'Robotics',
    title: 'Jurassic Rescue Robot — MREN 303',
    src: '/jurassic-preview.png',
    content: <ProjectContent project={{ title: 'Jurassic Rescue Robot — MREN 303' }} />,
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
