'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Code2, Globe, ShieldCheck, Download, Mail } from 'lucide-react';

const InternshipCard = () => {
  const openMail = () => {
    window.open('mailto:mousapir@gmail.com', '_blank');
  };

  const viewResume = () => {
    // put your PDF at /public/resume_mousa.pdf
    window.open('/mousa_resume.pdf', '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-accent mx-auto mt-8 w-full max-w-4xl rounded-3xl px-6 py-8 font-sans sm:px-10 md:px-16 md:py-12"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="bg-muted h-16 w-16 overflow-hidden rounded-full shadow-md">
            <img
              src="/mousa.jpg" // place your headshot in /public
              alt="Mousa Pirzada avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-foreground text-2xl font-semibold">Mousa Pirzada</h2>
            <p className="text-muted-foreground text-sm">Internship Application</p>
          </div>
        </div>

        {/* Live badge */}
        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <span className="flex items-center gap-1 rounded-full border border-green-500 px-3 py-0.5 text-sm font-medium text-green-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Live
          </span>
        </div>
      </div>

      {/* Key Info */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-1 h-5 w-5 text-blue-500" />
          <div>
            <p className="text-foreground text-sm font-medium">Duration</p>
            <p className="text-muted-foreground text-sm">~12 months — starting September 2025</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Globe className="mt-1 h-5 w-5 text-green-500" />
          <div>
            <p className="text-foreground text-sm font-medium">Location</p>
            <p className="text-muted-foreground text-sm">
              Toronto/GTA • Ottawa • Kingston • Remote — open to U.S. with sponsorship
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:col-span-2">
          <ShieldCheck className="mt-1 h-5 w-5 text-amber-500" />
          <div>
            <p className="text-foreground text-sm font-medium">Work Authorization</p>
            <p className="text-muted-foreground text-sm">
              Canadian citizen; may require U.S. visa sponsorship for roles in the United States.
            </p>
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex items-start gap-3 sm:col-span-2">
          <Code2 className="mt-1 h-5 w-5 text-purple-500" />
          <div className="w-full">
            <p className="text-foreground text-sm font-medium">Tech Stack</p>
            <div className="text-muted-foreground grid grid-cols-1 gap-y-1 text-sm sm:grid-cols-2">
              <ul className="list-disc pl-4">
                <li>Python, C/C++, TypeScript/JavaScript</li>
                <li>React/Next.js, Tailwind CSS</li>
                <li>Flask/FastAPI, Streamlit</li>
                <li>Supabase/PostgreSQL</li>
              </ul>
              <ul className="list-disc pl-4">
                <li>LangChain, Whisper, RAG (FAISS/Chroma)</li>
                <li>Git & GitHub, CI (GH Actions)</li>
                <li>Prompt engineering, agents/tool-calling</li>
                <li>
                  <a
                    href="/chat?query=List%20Mousa%E2%80%99s%20skills"
                    className="cursor-pointer items-center text-blue-500 underline"
                  >
                    See more
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* What I bring */}
      <div className="mt-10">
        <p className="text-foreground mb-2 text-lg font-semibold">What I bring</p>
        <ul className="text-foreground list-disc space-y-1 pl-5 text-sm">
          <li>
            Built <strong>AIVA</strong> (AI voice assistant) end-to-end during internship at Systems Limited.
          </li>
          <li>
            Shipped <strong>NoteBuddy</strong> (voice → structured notes) used at Creekwood Dental.
          </li>
          <li>
            Delivered <strong>Jurassic Rescue Robot</strong> under strict hardware constraints (MREN 303).
          </li>
          <li>
            2+ years tutoring university STEM; leadership as a Residence Don.
          </li>
        </ul>
      </div>

      {/* Goal */}
      <div className="mt-8">
        <p className="text-foreground mb-2 text-lg font-semibold">Goal</p>
        <p className="text-foreground text-sm">
          Join a bold team building AI/robotics that matter. I move fast, learn faster, and love shipping
          useful tools. Let’s build something people actually use.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={openMail}
          className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-zinc-800"
        >
          <Mail className="h-4 w-4" />
          Contact me
        </button>
        <button
          onClick={viewResume}
          className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-semibold transition-colors duration-300 hover:bg-white/60 dark:hover:bg-neutral-800"
        >
          <Download className="h-4 w-4" />
          View résumé
        </button>
      </div>
    </motion.div>
  );
};

export default InternshipCard;
