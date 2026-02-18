'use client';

import GuestbookSection from '@/components/guestbook/guestbook-section';
import Presentation from '@/components/presentation';
import AllProjects from '@/components/projects/AllProjects';
import Skills from '@/components/skills';
import { motion } from 'framer-motion';
import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  MessageSquareText,
  NotebookPen,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Chat from './chat';

const sections = [
  { key: 'chat', label: 'Chat', icon: MessageSquareText },
  { key: 'about', label: 'About', icon: UserRound },
  { key: 'projects', label: 'Featured Projects', icon: FolderKanban },
  { key: 'skills', label: 'My Skills', icon: Sparkles },
  { key: 'guestbook', label: '留言', icon: NotebookPen },
] as const;

const clampIndex = (index: number) =>
  Math.max(0, Math.min(index, sections.length - 1));

function ShrinkingChatStrip({
  active,
  onJumpToChat,
}: {
  active: boolean;
  onJumpToChat: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isCollapsed = active && !isHovered;

  return (
    <div className="mb-8 flex w-full justify-center">
      <motion.div
        initial={false}
        animate={{
          width: isCollapsed ? 320 : 760,
          scale: isCollapsed ? 0.92 : 1,
          opacity: active ? 1 : 0.9,
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 28,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="max-w-full"
      >
        <div className="mx-auto flex items-center rounded-full border border-[#E5E5E9] bg-[#ECECF0] py-2 pr-2 pl-6 shadow-sm">
          <input
            readOnly
            value={isCollapsed ? '' : 'Jump back to chat and ask anything...'}
            placeholder={isCollapsed ? 'Chat' : ''}
            onClick={onJumpToChat}
            className="text-md w-full cursor-pointer border-none bg-transparent placeholder:text-gray-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onJumpToChat}
            className="flex items-center justify-center rounded-full bg-[#0171E3] p-2 text-white transition-colors hover:bg-blue-600"
            aria-label="Go back to chat"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function ChatHorizontalPages() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((nextIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    const safeIndex = clampIndex(nextIndex);
    container.scrollTo({
      left: safeIndex * container.clientWidth,
      behavior: 'smooth',
    });
    setActiveIndex(safeIndex);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateActiveIndex = () => {
      const next = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIndex(clampIndex(next));
    };

    container.addEventListener('scroll', updateActiveIndex, { passive: true });
    return () => {
      container.removeEventListener('scroll', updateActiveIndex);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        scrollToIndex(activeIndex + 1);
      }
      if (event.key === 'ArrowLeft') {
        scrollToIndex(activeIndex - 1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, scrollToIndex]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute top-4 left-1/2 z-[80] -translate-x-1/2 px-4">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-neutral-200 bg-white/85 p-1.5 shadow-sm backdrop-blur-md">
          {sections.map(({ key, label, icon: Icon }, index) => (
            <button
              key={key}
              type="button"
              onClick={() => scrollToIndex(index)}
              className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition md:text-sm ${
                activeIndex === index
                  ? 'bg-black text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous page"
        onClick={() => scrollToIndex(activeIndex - 1)}
        disabled={activeIndex === 0}
        className="absolute top-1/2 left-4 z-[80] -translate-y-1/2 rounded-full border border-neutral-200 bg-white/85 p-2 text-neutral-800 shadow-sm backdrop-blur-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label="Next page"
        onClick={() => scrollToIndex(activeIndex + 1)}
        disabled={activeIndex === sections.length - 1}
        className="absolute top-1/2 right-4 z-[80] -translate-y-1/2 rounded-full border border-neutral-200 bg-white/85 p-2 text-neutral-800 shadow-sm backdrop-blur-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div
        ref={containerRef}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <section className="h-full w-screen flex-none snap-start">
          <Chat embedded />
        </section>

        <section className="h-full w-screen flex-none snap-start overflow-y-auto px-6 pt-24 pb-10">
          <div className="mx-auto w-full max-w-6xl">
            <ShrinkingChatStrip
              active={activeIndex === 1}
              onJumpToChat={() => scrollToIndex(0)}
            />
            <Presentation />
          </div>
        </section>

        <section className="h-full w-screen flex-none snap-start overflow-y-auto px-6 pt-24 pb-16">
          <div className="mx-auto w-full max-w-7xl">
            <AllProjects title="Featured Projects" />
          </div>
        </section>

        <section className="h-full w-screen flex-none snap-start overflow-y-auto px-6 pt-24 pb-16">
          <div className="mx-auto w-full max-w-6xl">
            <Skills />
          </div>
        </section>

        <section className="h-full w-screen flex-none snap-start overflow-y-auto px-6 pt-24 pb-16">
          <GuestbookSection />
        </section>
      </div>
    </div>
  );
}
