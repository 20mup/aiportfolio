'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Search,
  User,
  FolderGit2,
  Wrench,
  Mail,
  FileDown,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface WelcomeModalProps {
  trigger?: React.ReactNode;
}

export default function WelcomeModal({ trigger }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (q: string) => {
    setIsOpen(false);
    router.push(`/chat?query=${encodeURIComponent(q)}`);
  };

  const ask = () => {
    if (!query.trim()) return;
    go(query.trim());
  };

  const defaultTrigger = (
    <Button
      variant="ghost"
      className="h-auto w-auto cursor-pointer rounded-2xl bg-white p-3 shadow-lg ring-1 ring-black/10 backdrop-blur-lg hover:bg-white/90 focus-visible:ring-0"
      onClick={() => setIsOpen(true)}
      aria-label="Open portfolio intro"
    >
      <Image
        src="/MP-logo-blackwhite.png"
        width={24}
        height={24}
        alt="MP logo"
        sizes="24px"
        priority
      />
      <span className="sr-only">Open intro</span>
    </Button>
  );

  const container = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  } as const;
  const item = { hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } } as const;

  return (
    <>
      {trigger ? (
        <div onClick={() => setIsOpen(true)} role="button" tabIndex={0} aria-label="Open intro">
          {trigger}
        </div>
      ) : (
        defaultTrigger
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          style={{ maxWidth: '1100px', width: 'min(94vw, 1100px)' }}
          className={[
            'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
            '!max-w-none',
            'max-h-[88vh] overflow-hidden rounded-2xl border-none bg-background p-0 shadow-xl',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          ].join(' ')}
        >
          {/* Corner glow */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,theme(colors.indigo.400/.15),transparent)]" />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-h-[88vh] overflow-y-auto"
          >
            {/* Header */}
            <DialogHeader className="relative flex flex-row items-start justify-between px-6 pt-6 pb-4 md:px-8 md:pt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-black/10">
                  <Image src="/MP-logo-blackwhite.png" alt="MP" width={22} height={22} sizes="40px" />
                </div>
                <div>
                  <DialogTitle className="text-3xl font-semibold tracking-tight md:text-4xl">
                    Welcome to Mousa’s AI Portfolio
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-[13.5px] leading-relaxed">
                    Engineer × AI × Robotics — ask for code, design decisions, or real-world impact.
                  </DialogDescription>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="sticky top-4 right-4 mr-2 mt-1 rounded-full border border-border bg-background p-2 text-foreground hover:bg-accent"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ✕
              </Button>
            </DialogHeader>

            {/* Body */}
            <div className="mt-4 space-y-6 px-6 pb-6 md:px-8">
              {/* Command / search bar */}
              <motion.div
                variants={item}
                className="flex items-center gap-2 rounded-2xl border border-border bg-accent/40 p-3 ring-0 focus-within:ring-2 focus-within:ring-indigo-400/30"
              >
                <Search className="ml-1 h-5 w-5 opacity-70" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && ask()}
                  placeholder="Try: Tell me about AIVA impact, or Show the Pet Feeder design choices…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  aria-label="Ask a question"
                />
                <Button
                  onClick={ask}
                  className="rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 px-4 py-2 text-white"
                >
                  Ask
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </motion.div>

              <section className="w-full space-y-8 rounded-2xl border bg-accent/20 p-6 md:p-8 shadow-sm">
                <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-8">
                  {/* What */}
                  <motion.div variants={item} className="space-y-2">
                    <h3 className="text-primary text-lg font-semibold tracking-tight">What is this?</h3>
                    <p className="text-accent-foreground leading-relaxed">
                      An interactive portfolio that answers your questions with context. Explore{' '}
                      <strong>AIVA</strong>, <strong>NoteBuddy</strong>, the
                      <strong> Autonomous Pet Feeder</strong>, and the
                      <strong> Jurassic Rescue Robot</strong>.
                    </p>
                  </motion.div>

                  {/* Divider */}
                  <div className="hidden md:block">
                    <div className="h-full w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent mx-2" />
                  </div>

                  {/* Why */}
                  <motion.div variants={item} className="space-y-2 md:pl-4">
                    <h3 className="text-primary text-lg font-semibold tracking-tight">Why this format?</h3>
                    <p className="text-accent-foreground leading-relaxed">
                      Static pages can’t adapt. This chat lets you jump straight to what you care about:
                      specific project details, design decisions, code, or impact.
                    </p>
                  </motion.div>
                </div>

                {/* Proof points */}
                <motion.div
                  variants={item}
                  className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>AIVA presented to department leadership</span>
                  <span>•</span>
                  <span>2+ years tutoring experience</span>
                  <span>•</span>
                  <span>Hands-on robotics builds</span>
                </motion.div>

                {/* Quick actions */}
                <motion.div variants={item} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Button variant="outline" className="group rounded-xl" onClick={() => go('Who are you?')}>
                    <User className="mr-2 h-4 w-4 opacity-70 transition group-hover:translate-y-[-1px]" />
                    Me
                  </Button>
                  <Button variant="outline" className="group rounded-xl" onClick={() => go('What are your projects?')}>
                    <FolderGit2 className="mr-2 h-4 w-4 opacity-70 transition group-hover:translate-y-[-1px]" />
                    Projects
                  </Button>
                  <Button variant="outline" className="group rounded-xl" onClick={() => go('What are your skills?')}>
                    <Wrench className="mr-2 h-4 w-4 opacity-70 transition group-hover:translate-y-[-1px]" />
                    Skills
                  </Button>
                  <Button variant="outline" className="group rounded-xl" onClick={() => go('How can I contact you?')}>
                    <Mail className="mr-2 h-4 w-4 opacity-70 transition group-hover:translate-y-[-1px]" />
                    Contact
                  </Button>
                </motion.div>
              </section>

              <motion.div variants={item} className="grid gap-3 sm:grid-cols-2">
                <a
                  className="group flex items-center justify-between rounded-xl border p-4 transition hover:bg-accent/40"
                  href="/#projects"
                >
                  <span className="font-medium">View Projects</span>
                  <Sparkles className="h-4 w-4 opacity-70 transition group-hover:translate-x-0.5" />
                </a>
                <a
                  className="group flex items-center justify-between rounded-xl border p-4 transition hover:bg-accent/40"
                  href="/resume.pdf"
                >
                  <span className="font-medium">Download Resume</span>
                  <FileDown className="h-4 w-4 opacity-70 transition group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            </div>

            {/* Footer CTA */}
            <div className="flex flex-col items-center gap-2 px-6 pb-6 md:px-8">
              <Button className="h-auto rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 px-5 py-3 text-white">
                Start Chatting
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() => go('How can I contact you?')}
              >
                Contact me
              </button>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}
