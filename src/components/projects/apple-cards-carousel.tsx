'use client';

import Image, { ImageProps } from 'next/image';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useOutsideClick } from '@/hooks/use-outside-click';
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from '@tabler/icons-react';

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  year?: string; // optional: show a year chip if provided
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({
  items,
  initialScroll = 0,
}: {
  items: React.ReactNode[];
  initialScroll?: number;
}) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  // Dynamic scroll distance = first card width + parent flex gap
  const getScrollDistance = () => {
    const root = carouselRef.current;
    if (!root) return 320;

    const firstCardBtn = root.querySelector<HTMLElement>('button[data-card]');
    if (!firstCardBtn) return 320;

    const width = firstCardBtn.getBoundingClientRect().width;
    // read the flex gap safely
    const parent = firstCardBtn.parentElement;
    let gap = 16;
    if (parent) {
      const cs = getComputedStyle(parent);
      const g = (cs.gap || cs.columnGap || '16').replace('px', '');
      const parsed = parseInt(g, 10);
      if (!Number.isNaN(parsed)) gap = parsed;
    }
    return width + gap;
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -getScrollDistance(),
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: getScrollDistance(),
        behavior: 'smooth',
      });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const distance = getScrollDistance();
      const scrollPosition = distance * index;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              'absolute right-0 z-[10] h-auto w-[5%] overflow-hidden bg-gradient-to-l'
            )}
          />
          <div
            className={cn(
              'mx-auto max-w-7xl',
              'flex flex-row justify-start gap-4'
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.15 * index,
                    ease: 'easeOut',
                    once: true,
                  },
                }}
                key={'card' + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* arrows */}
        <div className="mr-10 flex justify-end gap-2 md:mr-20">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200 disabled:opacity-50 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200 disabled:opacity-50 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
  imageOnly = true, // default to image-first UX
}: {
  card: Card;
  index: number;
  layout?: boolean;
  imageOnly?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') handleClose();
    }
    document.body.style.overflow = open ? 'hidden' : 'auto';
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // @ts-ignore
  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  // ---- magnetic tilt (lightweight) ----
  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;  // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const ry = (px - 0.5) * 10; // rotateY
    const rx = (0.5 - py) * 8;  // rotateX
    const tx = (px - 0.5) * 6;  // translate
    const ty = (py - 0.5) * 6;
    setTilt({ rx, ry, tx, ty });
  };
  const handleLeave = () => setTilt({ rx: 0, ry: 0, tx: 0, ty: 0 });

  return (
    <>
      {/* Modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-52 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white font-sans dark:bg-neutral-900"
            >
              {/* Close */}
              <div className="sticky top-4 z-52 flex justify-end px-8 pt-8 md:px-14 md:pt-8">
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-black/90 shadow-md dark:bg-white/90"
                  onClick={handleClose}
                >
                  <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
                </button>
              </div>

              {/* Header */}
              <div className="relative px-8 pb-0 pt-2 md:px-14">
                <div>
                  <motion.p
                    layoutId={layout ? `category-${card.title}` : undefined}
                    className="text-base font-medium text-black dark:text-white"
                  >
                    {card.category}
                  </motion.p>
                  <motion.p
                    layoutId={layout ? `title-${card.title}` : undefined}
                    className="mt-4 text-2xl font-semibold text-neutral-700 dark:text-white md:text-5xl"
                  >
                    {card.title}
                  </motion.p>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 pb-14 pt-8 md:px-14">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Preview Button — IMAGE-FIRST */}
      {imageOnly ? (
        <motion.button
          data-card
          layoutId={layout ? `card-${card.title}` : undefined}
          onClick={handleOpen}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className={cn(
            'group relative z-10 aspect-[16/9] w-[320px] overflow-hidden rounded-3xl',
            'bg-white/5 ring-1 ring-black/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]',
            'sm:w-[420px] dark:ring-white/5'
          )}
          style={{
            transform: `perspective(800px) translate3d(${tilt.tx}px, ${tilt.ty}px, 0) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            transition: 'transform 120ms ease',
          }}
          aria-label={`${card.title} — open details`}
        >
          {/* background image */}
          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            className="absolute inset-0 z-10 object-cover"
            quality={95}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 2}
          />

          {/* glossy gradient glow */}
          <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(1200px_circle_at_50%_-40%,rgba(255,255,255,0.35),transparent_40%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* top chips */}
          <div className="absolute left-3 top-3 z-30 flex gap-2">
            <span className="rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur md:text-[13px]">
              {card.category}
            </span>
            {card.year ? (
              <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-black backdrop-blur md:text-[13px]">
                {card.year}
              </span>
            ) : null}
          </div>

          {/* subtle bottom gradient + “View” hint */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-24 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 right-3 z-40 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-black opacity-0 shadow-sm transition-all duration-200 group-hover:opacity-100">
            View
          </div>

          {/* hover ring */}
          <div className="pointer-events-none absolute inset-0 z-40 rounded-3xl ring-0 ring-white/0 transition-all duration-200 group-hover:ring-2 group-hover:ring-white/30" />
        </motion.button>
      ) : (
        // Fallback: original style
        <motion.button
          data-card
          layoutId={layout ? `card-${card.title}` : undefined}
          onClick={handleOpen}
          className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 dark:bg-neutral-900"
        >
          <div className="absolute inset-x-0 top-0 z-30 h-full cursor-pointer bg-gradient-to-b from-black via-transparent to-transparent" />
          <div className="relative z-40 p-8">
            <motion.p
              layoutId={layout ? `category-${card.category}` : undefined}
              className="text-left font-sans text-sm font-medium text-white md:text-base"
            >
              {card.category}
            </motion.p>
            <motion.p
              layoutId={layout ? `title-${card.title}` : undefined}
              className="max-w-xs text-left font-sans text-xl font-semibold text-white [text-wrap:balance] md:text-3xl"
            >
              {card.title}
            </motion.p>
          </div>
          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            className="absolute inset-0 z-10 object-cover"
          />
        </motion.button>
      )}
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        'transition duration-300',
        isLoading ? 'blur-sm' : 'blur-0',
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      decoding="async"
      alt={alt ? alt : 'Project preview'}
      {...rest}
    />
  );
};
