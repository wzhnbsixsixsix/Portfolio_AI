'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownToLine, Download, Eye, File } from 'lucide-react';
import Image from 'next/image';

import { withBasePath } from '@/lib/base-path';

export function Resume() {
  // Resume details
  const resumeDetails = {
    title: "Zenghuan Wang's Resume",
    description: 'AI Engineer',
    fileType: 'PDF',
    lastUpdated: 'February 2026',
    fileSize: '0.5 MB',
    previewImageSrc: '/huan01.jpg',
    downloadUrl: '/wang_cv.pdf',
  };

  // Removed programmatic download handler

  return (
    <div className="mx-auto w-full py-8 font-sans">
      <a
        href={withBasePath(resumeDetails.downloadUrl)}
        download="wang_cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <motion.div
          className="group relative cursor-pointer overflow-hidden rounded-xl bg-accent p-0 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.0, ease: 'easeOut' }}
          whileHover={{ scale: 1.01 }}
        >
          {/* Details area (bottom part) */}
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  {resumeDetails.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {resumeDetails.description}
                </p>
                <div className="mt-1 flex text-xs text-muted-foreground">
                  <span>{resumeDetails.fileType}</span>
                  <span className="mx-2">•</span>
                  <span>Updated {resumeDetails.lastUpdated}</span>
                  <span className="mx-2">•</span>
                  <span>{resumeDetails.fileSize}</span>
                </div>
              </div>

              {/* Download indicator */}
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-primary-foreground group-hover:bg-black/80"
                initial={{ scale: 1 }}
              >
                <Download className="h-5 w-5" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </a>
    </div>
  );
}

export default Resume;
