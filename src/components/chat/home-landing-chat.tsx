'use client';

import FluidCursor from '@/components/FluidCursor';
import { Button } from '@/components/ui/button';
import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Laugh,
  Layers,
  Loader2,
  PartyPopper,
  UserRoundSearch,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import ChatMessageContent from './chat-message-content';
import ToolRenderer from './tool-renderer';

const questions = {
  Me: 'Who are you? I want to know more about you.',
  Projects: 'What projects are you building right now?',
  Skills: 'What are your skills? Give me a list of your soft and hard skills.',
  Study: 'Tell me about your education and study journey.',
  Contact: 'How can I contact you?',
} as const;

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Study', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
] as const;

export default function HomeLandingChat() {
  const chatApiPath = process.env.NEXT_PUBLIC_CHAT_API_URL?.trim() || '/api/chat';
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    isLoading,
    append,
    reload,
    addToolResult,
    stop,
    setInput,
  } = useChat({
    api: chatApiPath,
  });

  const hasStartedChat = messages.length > 0 || isLoading;

  const submitQuery = (query: string) => {
    if (!query.trim() || isLoading) return;
    append({
      role: 'user',
      content: query.trim(),
    });
    setInput('');
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  return (
    <div className="relative flex min-h-full w-full flex-col items-center overflow-hidden px-4 pb-10 md:pb-20">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <div
          className="hidden bg-gradient-to-b from-neutral-500/10 to-neutral-500/0 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none sm:block lg:text-[16rem]"
          style={{ marginBottom: '-2.5rem' }}
        >
          Zenghuan Wang
        </div>
      </div>

      <motion.div
        className="z-10 mt-24 mb-8 flex flex-col items-center text-center md:mt-8 md:mb-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <h2 className="text-secondary-foreground mt-1 text-xl font-semibold md:text-2xl">
          Hey, I&apos;m Zenghuan Wang 👋
        </h2>
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          AI Engineer
        </h1>
      </motion.div>

      <div className="z-10 flex w-full max-w-5xl flex-col items-center">
        <AnimatePresence mode="wait">
          {hasStartedChat ? (
            <motion.div
              key="chat-panel"
              initial={{ opacity: 0, y: 16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 420 }}
              exit={{ opacity: 0, y: 12, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 w-full overflow-hidden rounded-3xl border border-white/40 bg-white/45 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-2xl"
            >
              <div
                ref={scrollRef}
                className="custom-scrollbar h-full overflow-y-auto px-4 py-4 md:px-6"
              >
                <div className="space-y-4">
                  {messages.map((message) => {
                    if (message.role === 'user') {
                      return (
                        <div key={message.id} className="flex justify-end">
                          <div className="max-w-[85%] rounded-2xl bg-[#0171E3] px-4 py-2.5 text-sm text-white">
                            {message.content}
                          </div>
                        </div>
                      );
                    }

                    if (message.role === 'assistant') {
                      const toolInvocations =
                        message.parts
                          ?.filter(
                            (part) =>
                              part.type === 'tool-invocation' &&
                              part.toolInvocation?.state === 'result'
                          )
                          .map((part) =>
                            part.type === 'tool-invocation'
                              ? part.toolInvocation
                              : null
                          )
                          .filter(Boolean) || [];

                      return (
                        <div key={message.id} className="space-y-3">
                          {toolInvocations.length > 0 ? (
                            <ToolRenderer
                              toolInvocations={toolInvocations as any[]}
                              messageId={message.id}
                            />
                          ) : null}
                          {message.content?.trim() ? (
                            <div className="max-w-[90%] rounded-2xl bg-white/80 px-4 py-3 text-sm text-neutral-800">
                              <ChatMessageContent
                                message={message as any}
                                isLast={false}
                                isLoading={isLoading}
                                reload={reload}
                                addToolResult={addToolResult}
                                skipToolRendering
                              />
                            </div>
                          ) : null}
                        </div>
                      );
                    }

                    return null;
                  })}

                  {isLoading ? (
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Thinking...
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.form
          layout
          onSubmit={(event) => {
            event.preventDefault();
            submitQuery(input);
          }}
          className="relative w-full max-w-2xl"
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto flex items-center rounded-full border border-neutral-200 bg-white/30 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me anything…"
              className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Submit question"
              className="flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="h-5 w-5" />
              )}
            </button>
          </div>
        </motion.form>

        <motion.div
          layout
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={`mt-4 w-full max-w-2xl transition-opacity duration-300 ${
            hasStartedChat ? 'pointer-events-none opacity-35' : 'opacity-100'
          }`}
        >
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {questionConfig.map(({ key, color, icon: Icon }) => (
              <Button
                key={key}
                onClick={() => submitQuery(questions[key])}
                variant="outline"
                className="border-border hover:bg-border/30 aspect-square w-full cursor-pointer rounded-2xl border bg-white/30 py-8 shadow-none backdrop-blur-lg active:scale-95 md:p-10"
              >
                <div className="flex h-full flex-col items-center justify-center gap-1 text-gray-700">
                  <Icon size={22} strokeWidth={2} color={color} />
                  <span className="text-xs font-medium sm:text-sm">{key}</span>
                </div>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>

      {hasStartedChat ? (
        <button
          type="button"
          onClick={() => stop()}
          className="z-20 mt-4 text-xs text-neutral-500 underline underline-offset-4 hover:text-neutral-700"
        >
          Stop generating
        </button>
      ) : null}

      <FluidCursor />
    </div>
  );
}
