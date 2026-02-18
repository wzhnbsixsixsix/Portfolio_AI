'use client';

import GuestbookSection from '@/components/guestbook/guestbook-section';
import Presentation from '@/components/presentation';
import AllProjects from '@/components/projects/AllProjects';
import Skills from '@/components/skills';
import {
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  MessageSquareText,
  NotebookPen,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import HomeLandingChat from './home-landing-chat';

const sections = [
  { key: 'home', label: 'Home', icon: MessageSquareText },
  { key: 'about', label: 'About', icon: UserRound },
  { key: 'projects', label: 'Featured Projects', icon: FolderKanban },
  { key: 'skills', label: 'My Skills', icon: Sparkles },
  { key: 'guestbook', label: '留言', icon: NotebookPen },
] as const;

const clampIndex = (index: number) =>
  Math.max(0, Math.min(index, sections.length - 1));

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
        <section className="h-full w-screen flex-none snap-start overflow-y-auto pt-14">
          <HomeLandingChat />
        </section>

        <section className="h-full w-screen flex-none snap-start overflow-y-auto px-6 pt-24 pb-16">
          <div className="mx-auto w-full max-w-6xl">
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
          <div className="mx-auto w-full max-w-6xl">
            <GuestbookSection />
          </div>
        </section>
      </div>
    </div>
  );
}
