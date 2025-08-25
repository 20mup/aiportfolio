'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Cpu, Code2, Wrench, PenTool, Users, Bot } from 'lucide-react';

const Skills = () => {
  const skillsData = [
    {
      category: 'AI / LLM Engineering',
      icon: <Bot className="h-5 w-5" />,
      skills: [
        'OpenAI (GPT, Whisper)',
        'LangChain',
        'RAG (FAISS/Chroma)',
        'Agents & Tool Calling',
        'Vector Search',
        'ElevenLabs (TTS)',
        'Prompt Engineering',
      ],
      color: 'bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-900',
    },
    {
      category: 'Embedded & Robotics',
      icon: <Cpu className="h-5 w-5" />,
      skills: [
        'Raspberry Pi Pico (MicroPython)',
        'ESP32 / Arduino (C/C++)',
        'GPIO / PWM / UART / I²C / SPI',
        'Servo Kinematics',
        'Sensors & Actuators',
        'Rapid Prototyping',
      ],
      color: 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900',
    },
    {
      category: 'Apps & Web',
      icon: <Code2 className="h-5 w-5" />,
      skills: [
        'Python',
        'Flask / FastAPI',
        'Streamlit',
        'React / Next.js',
        'TypeScript / JavaScript',
        'Tailwind CSS',
        'Tkinter (desktop)',
        'PyInstaller (packaging)',
      ],
      color: 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-900',
    },
    {
      category: 'Data, Cloud & Tools',
      icon: <Wrench className="h-5 w-5" />,
      skills: [
        'Supabase / PostgreSQL',
        'Git & GitHub',
        'Docker (basics)',
        'AWS (S3/EC2 basics)',
        'CI/CD (GitHub Actions)',
      ],
      color: 'bg-cyan-50 text-cyan-700 border border-cyan-200 dark:bg-cyan-950/30 dark:text-cyan-300 dark:border-cyan-900',
    },
    {
      category: 'Design & CAD',
      icon: <PenTool className="h-5 w-5" />,
      skills: [
        'Figma',
        'SolidWorks',
        'AutoCAD',
        'DaVinci Resolve',
        'Canva',
        'Markdown/Jekyll',
      ],
      color: 'bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-900',
    },
    {
      category: 'Soft Skills',
      icon: <Users className="h-5 w-5" />,
      skills: [
        'Leadership (Residence Don)',
        'Mentoring & Tutoring',
        'Problem Solving',
        'Communication',
        'Time Management',
        'Creativity',
      ],
      color: 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.19, 1, 0.22, 1] },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className="mx-auto w-full max-w-5xl rounded-4xl"
    >
      <Card className="w-full border-none px-0 pb-12 shadow-none">
        <CardHeader className="px-0 pb-1">
          <CardTitle className="text-primary px-0 text-4xl font-bold">
            Skills & Expertise
          </CardTitle>
        </CardHeader>

        <CardContent className="px-0">
          <motion.div
            className="space-y-8 px-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {skillsData.map((section, index) => (
              <motion.div key={index} className="space-y-3 px-0" variants={itemVariants}>
                <div className="flex items-center gap-2">
                  {section.icon}
                  <h3 className="text-accent-foreground text-lg font-semibold">
                    {section.category}
                  </h3>
                </div>

                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {section.skills.map((skill, idx) => (
                    <motion.div key={idx} variants={badgeVariants} whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}>
                      <Badge className={`border px-3 py-1.5 font-normal ${section.color}`}>
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Skills;
