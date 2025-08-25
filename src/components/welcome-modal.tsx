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
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface WelcomeModalProps {
  trigger?: React.ReactNode;
}

export default function WelcomeModal({ trigger }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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
        priority
      />
      <span className="sr-only">Open intro</span>
    </Button>
  );

  const go = (q: string) => {
    setIsOpen(false);
    router.push(`/chat?query=${encodeURIComponent(q)}`);
  };

  return (
    <>
      {trigger ? <div onClick={() => setIsOpen(true)}>{trigger}</div> : defaultTrigger}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-background z-52 max-h-[85vh] overflow-auto rounded-2xl border-none p-0 shadow-xl sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[1000px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex h-full flex-col"
          >
            {/* Header */}
            <DialogHeader className="relative flex flex-row items-start justify-between px-6 pt-6 pb-4 md:px-8 md:pt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-black/10">
                  <Image src="/MP-logo-blackwhite.png" alt="MP" width={22} height={22} />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold tracking-tight md:text-3xl">
                    Welcome to Mousa’s AI Portfolio
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-sm">
                    Ask me anything — projects, skills, context, or contact details.
                  </DialogDescription>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="sticky top-4 right-4 mr-2 mt-1 rounded-full bg-black p-2 text-white hover:bg-black/90"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ✕
              </Button>
            </DialogHeader>

            {/* Body */}
            <div className="space-y-6 px-6 pb-6 md:px-8">
              <section className="w-full space-y-8 rounded-2xl border bg-accent/30 p-6 md:p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* What */}
                  <div className="space-y-2">
                    <h3 className="text-primary text-lg font-semibold">What is this?</h3>
                    <p className="text-accent-foreground leading-relaxed">
                      An interactive portfolio that answers your questions with context.
                      Explore <strong>AIVA</strong>, <strong>NoteBuddy</strong>, the
                      <strong> Autonomous Pet Feeder</strong>, and the
                      <strong> Jurassic Rescue Robot</strong>.
                    </p>
                  </div>

                  {/* Why */}
                  <div className="space-y-2">
                    <h3 className="text-primary text-lg font-semibold">Why this format?</h3>
                    <p className="text-accent-foreground leading-relaxed">
                      Static pages can’t adapt. This chat lets you jump straight to what you
                      care about: specific project details, design decisions, code, or impact.
                    </p>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Button variant="outline" className="rounded-xl" onClick={() => go("Who are you? I want to know more about you.")}>
                    Me
                  </Button>
                  <Button variant="outline" className="rounded-xl" onClick={() => go("What are your projects? What are you working on right now?")}>
                    Projects
                  </Button>
                  <Button variant="outline" className="rounded-xl" onClick={() => go("What are your skills? Give me a list of your soft and hard skills.")}>
                    Skills
                  </Button>
                  <Button variant="outline" className="rounded-xl" onClick={() => go("How can I contact you?")}>
                    Contact
                  </Button>
                </div>
              </section>

              {/* Links */}
              <div className="grid gap-3 sm:grid-cols-2">
                <a className="rounded-xl border p-4 hover:bg-accent/30" href="/#projects">
                  View Projects
                </a>
                <a className="rounded-xl border p-4 hover:bg-accent/30" href="/resume.pdf">
                  Download Resume
                </a>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="flex flex-col items-center gap-2 px-6 pb-6 md:px-8">
              <Button onClick={() => setIsOpen(false)} className="h-auto rounded-full px-5 py-3">
                Start Chatting
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
