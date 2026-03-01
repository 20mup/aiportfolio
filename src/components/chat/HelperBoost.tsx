import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  BriefcaseIcon,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleEllipsis,
  CodeIcon,
  GraduationCapIcon,
  Laugh,
  Layers,
  MailIcon,
  Sparkles,
  UserRoundSearch,
  UserSearch,
  Gamepad2,
} from 'lucide-react';
import { useState } from 'react';
import { Drawer } from 'vaul';

interface HelperBoostProps {
  submitQuery?: (query: string) => void;
  setInput?: (value: string) => void;
}

/* ------------------------- Quick question payloads ------------------------- */
const questions = {
  Me: 'Give me a quick intro to Mousa.',
  Projects:
    'Show me your projects (AIVA, NoteBuddy, Jurassic Robot, Pet Feeder, Pantry Recipes).',
  Skills:
    'List Mousa’s core AI/embedded/robotics skills.',
  Esports:
    'Tell me about your League of Legends esports background.',
  Contact:
    'How can I contact you?',
} as const;

/* ------------------------- Buttons shown above chat ------------------------ */
const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Esports', color: '#7C3AED', icon: Gamepad2 },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
] as const;

/* --------------------------- Drawer helper content ------------------------- */
/**
 * These are the “highlight” questions that get the black background + sparkles.
 * Keep these as your best “entry points”.
 */
const specialQuestions = [
  '✨ Who are you (30 seconds)?',
  '✨ Why should I hire you?',
  '✨ What projects are you most proud of?',
  '✨ What are your core skills (with proof)?',
  '✨ Tell me about your esports journey',
  '✨ How can I reach you?',
];

const questionsByCategory = [
  {
    id: 'me',
    name: 'Me',
    icon: UserSearch,
    questions: [
      '✨ Who are you (30 seconds)?',
      'What motivates you to build things?',
      'How did you get into tech/engineering (cars, gaming, robotics)?',
      'Where do you want to be in 3–5 years?',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: BriefcaseIcon,
    questions: [
      '✨ Why should I hire you?',
      'What makes you a valuable teammate (real examples)?',
      'What kind of roles are you looking for right now?',
      'How do you approach shipping fast without breaking quality?',
      'What’s your educational background and what are you focusing on?',
    ],
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: CodeIcon,
    questions: [
      '✨ What projects are you most proud of?',
      'Deep dive AIVA (architecture + impact)',
      'Deep dive NoteBuddy (what it does + how it works)',
      'Tell me the engineering story of Jurassic Rescue Robot (constraints, prototypes, tradeoffs)',
      'Explain the Autonomous Pet Feeder end-to-end (hardware + app + Siri). What broke during integration?',
    ],
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: GraduationCapIcon,
    questions: [
      '✨ What are your core skills (with proof)?',
      'What’s your strongest technical edge right now?',
      'How do you design RAG systems (chunking, reranking, evals)?',
      'What’s your embedded/robotics comfort level (protocols, sensors, control)?',
    ],
  },
  {
    id: 'esports',
    name: 'Esports',
    icon: Gamepad2,
    questions: [
      '✨ Tell me about your esports journey',
      'What were your peak ranks/achievements (Halo + League) and what did it take to get there?',
      'Which roles/champions did you main and why did they fit your style?',
      'How does esports translate to engineering work (practice, review, teamwork, pressure)?',
      'What did you do with Queen’s University Esports (leadership + results)?',
    ],
  },
  {
    id: 'contact',
    name: 'Contact & Future',
    icon: MailIcon,
    questions: [
      '✨ How can I reach you?',
      'What kind of project/role would make you say “yes” immediately?',
      'Where are you located and are you open to relocation/remote/hybrid?',
    ],
  },
] as const;

/* ------------------------------ Small chevron ------------------------------ */
const AnimatedChevron = () => (
  <motion.div
    animate={{ y: [0, -4, 0] }}
    transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
    className="text-primary mb-1.5"
  >
    <ChevronUp size={16} />
  </motion.div>
);

export default function HelperBoost({ submitQuery, setInput }: HelperBoostProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);

  const handleQuestionClick = (questionKey: string) => {
    if (submitQuery) {
      // @ts-expect-error – runtime keys are from questionConfig
      submitQuery(questions[questionKey]);
    }
  };

  const handleDrawerQuestionClick = (question: string) => {
    submitQuery?.(question);
    setOpen(false);
  };

  const toggleVisibility = () => setIsVisible((v) => !v);

  return (
    <>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <div className="w-full">
          {/* Toggle Button */}
          <div
            className={
              isVisible ? 'mb-2 flex justify-center' : 'mb-0 flex justify-center'
            }
          >
            <button
              onClick={toggleVisibility}
              className="flex items-center gap-1 px-3 py-1 text-xs text-gray-500 transition-colors hover:text-gray-700"
            >
              {isVisible ? (
                <>
                  <ChevronDown size={14} />
                  Hide quick questions
                </>
              ) : (
                <>
                  <ChevronUp size={14} />
                  Show quick questions
                </>
              )}
            </button>
          </div>

          {/* Quick buttons */}
          {isVisible && (
            <div className="w-full">
              <div
                className="flex w-full flex-wrap gap-1 md:gap-3"
                style={{ justifyContent: 'safe center' }}
              >
                {questionConfig.map(({ key, color, icon: Icon }) => (
                  <Button
                    key={key}
                    onClick={() => handleQuestionClick(key)}
                    variant="outline"
                    className="border-border hover:bg-border/30 h-auto min-w-[100px] flex-shrink-0 cursor-pointer rounded-xl border bg-white/80 px-4 py-3 shadow-none backdrop-blur-sm transition-none active:scale-95"
                  >
                    <div className="flex items-center gap-3 text-gray-700">
                      <Icon size={18} strokeWidth={2} color={color} />
                      <span className="text-sm font-medium">{key}</span>
                    </div>
                  </Button>
                ))}

                {/* More / drawer trigger */}
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Drawer.Trigger className="group relative flex flex-shrink-0 items-center justify-center">
                        <motion.div
                          className="hover:bg-border/30 flex h-auto cursor-pointer items-center space-x-1 rounded-xl border border-neutral-200 bg-white/80 px-4 py-3 text-sm backdrop-blur-sm transition-all duration-200 dark:border-neutral-800 dark:bg-neutral-900"
                          whileHover={{ scale: 1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3 text-gray-700">
                            <CircleEllipsis
                              className="h-[20px] w-[18px]"
                              strokeWidth={2}
                            />
                          </div>
                        </motion.div>
                      </Drawer.Trigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <AnimatedChevron />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Content */}
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-100 bg-black/60 backdrop-blur-xs" />
          <Drawer.Content className="fixed right-0 bottom-0 left-0 z-100 mt-24 flex h-[80%] flex-col rounded-t-[10px] bg-gray-100 outline-none lg:h-[60%]">
            <div className="flex-1 overflow-y-auto rounded-t-[10px] bg-white p-4">
              <div className="mx-auto max-w-md space-y-4">
                <div
                  aria-hidden
                  className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300"
                />
                <div className="mx-auto w-full max-w-md">
                  <div className="space-y-8 pb-16">
                    {questionsByCategory.map((category) => (
                      <CategorySection
                        key={category.id}
                        name={category.name}
                        Icon={category.icon}
                        questions={category.questions}
                        onQuestionClick={handleDrawerQuestionClick}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

/* ------------------------------ Drawer pieces ------------------------------ */
interface CategorySectionProps {
  name: string;
  Icon: React.ElementType;
  questions: readonly string[];
  onQuestionClick: (question: string) => void;
}

function CategorySection({
  name,
  Icon,
  questions,
  onQuestionClick,
}: CategorySectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5 px-1">
        <Icon className="h-5 w-5" />
        <Drawer.Title className="text-[22px] font-medium text-gray-900">
          {name}
        </Drawer.Title>
      </div>

      <Separator className="my-4" />

      <div className="space-y-3">
        {questions.map((question, index) => (
          <QuestionItem
            key={index}
            question={question}
            onClick={() => onQuestionClick(question)}
            isSpecial={specialQuestions.includes(question)}
          />
        ))}
      </div>
    </div>
  );
}

interface QuestionItemProps {
  question: string;
  onClick: () => void;
  isSpecial: boolean;
}

function QuestionItem({ question, onClick, isSpecial }: QuestionItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={cn(
        'flex w-full items-center justify-between rounded-[10px]',
        'text-md px-6 py-4 text-left font-normal',
        'transition-all',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        isSpecial ? 'bg-black' : 'bg-[#F7F8F9]'
      )}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ backgroundColor: isSpecial ? undefined : '#F0F0F2' }}
      whileTap={{
        scale: 0.98,
        backgroundColor: isSpecial ? undefined : '#E8E8EA',
      }}
    >
      <div className="flex items-center">
        {isSpecial && <Sparkles className="mr-2 h-4 w-4 text-white" />}
        <span className={isSpecial ? 'font-medium text-white' : ''}>
          {question}
        </span>
      </div>
      <motion.div
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <ChevronRight
          className={cn(
            'h-5 w-5 shrink-0',
            isSpecial ? 'text-white' : 'text-primary'
          )}
        />
      </motion.div>
    </motion.button>
  );
}