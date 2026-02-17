'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Code2, Globe, Mail, Phone } from 'lucide-react';

const InternshipCard = () => {
  const openMail = () => {
    window.open('mailto:w905840774@gmail', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-accent mx-auto mt-8 w-full max-w-4xl rounded-3xl px-6 py-8 font-sans sm:px-10 md:px-16 md:py-12"
    >
      <div className="mb-6 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-muted h-16 w-16 overflow-hidden rounded-full shadow-md">
            <img
              src="/avatar-landing.png"
              alt="Zenghuan Wang avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-foreground text-2xl font-semibold">
              Zenghuan Wang
            </h2>
            <p className="text-muted-foreground text-sm">AI Engineer</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <span className="flex items-center gap-1 rounded-full border border-green-500 px-3 py-0.5 text-sm font-medium text-green-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Open to Opportunities
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <Globe className="mt-1 h-5 w-5 text-green-500" />
          <div>
            <p className="text-foreground text-sm font-medium">Location</p>
            <p className="text-muted-foreground text-sm">Shenzhen, China</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-1 h-5 w-5 text-blue-500" />
          <div>
            <p className="text-foreground text-sm font-medium">Education</p>
            <p className="text-muted-foreground text-sm">
              University of Exeter (2024-2026)
            </p>
            <p className="text-muted-foreground text-sm">Guangdong (2022-2024)</p>
            <p className="text-muted-foreground text-sm">
              City University of Hong Kong (2026-2028)
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 sm:col-span-2">
          <Code2 className="mt-1 h-5 w-5 text-purple-500" />
          <div className="w-full">
            <p className="text-foreground text-sm font-medium">Focus</p>
            <ul className="text-muted-foreground list-disc pl-4 text-sm">
              <li>AI engineering and practical product building</li>
              <li>LLM applications and workflow automation</li>
              <li>Full-stack implementation for AI features</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-blue-500" />
          <span>w905840774@gmail</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-blue-500" />
          <span>+86 17665252185</span>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={openMail}
          className="cursor-pointer rounded-full bg-black px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-zinc-800"
        >
          Contact me
        </button>
      </div>
    </motion.div>
  );
};

export default InternshipCard;
