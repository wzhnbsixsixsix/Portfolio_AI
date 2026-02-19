'use client';

import { motion } from 'framer-motion';
import { FormEvent, useEffect, useMemo, useState } from 'react';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
};

export default function GuestbookSection() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const response = await fetch('/api/guestbook');
        if (!response.ok) {
          throw new Error('Failed to load guestbook entries.');
        }

        const data = (await response.json()) as { entries: GuestbookEntry[] };
        setEntries(Array.isArray(data.entries) ? data.entries : []);
      } catch (loadError) {
        console.error(loadError);
        setError('Failed to load entries, please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadEntries();
  }, []);

  const entryCountText = useMemo(() => {
    if (entries.length === 0) return 'No entries yet. Be the first one!';
    return `${entries.length} entries`;
  }, [entries.length]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !message.trim()) {
      setError('Please fill in both name and message.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          isPrivate,
        }),
      });

      if (!response.ok) {
        const reason = await response.text();
        throw new Error(reason || 'Failed to submit entry');
      }

      const data = (await response.json()) as { entry: GuestbookEntry };
      
      // Only add to local list if it's public
      if (!isPrivate) {
        setEntries((prev) => [data.entry, ...prev].slice(0, 200));
      } else {
        setError('Private message received! (Visible to admin only)');
        // Wait a bit then clear the success message
        setTimeout(() => setError(''), 3000);
      }
      
      setMessage('');
      setIsPrivate(false);
    } catch (submitError) {
      console.error(submitError);
      setError('Failed to submit, please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 py-10">
      <div>
        <h2 className="text-foreground text-3xl font-semibold md:text-5xl">
          Leave a Message
        </h2>
        <p className="text-muted-foreground mt-3 text-sm md:text-base">
          Leave your thoughts on this portfolio or collaboration intentions. These messages will be saved.
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        onSubmit={handleSubmit}
        className="bg-accent rounded-3xl p-5 md:p-8"
      >
        <div className="grid gap-4">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={60}
            placeholder="Your Name"
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base md:text-sm outline-none transition focus:border-neutral-500"
          />

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={800}
            placeholder="Say something..."
            rows={5}
            className="w-full resize-none rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base md:text-sm outline-none transition focus:border-neutral-500"
          />

          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground text-xs">
              {message.length}/800
            </span>
            <div className="flex items-center gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-600 select-none hover:text-neutral-900">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="accent-black h-4 w-4 rounded border-gray-300"
                />
                <span>Private</span>
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>

          {error ? (
            <p className={`text-sm ${error.includes('received') ? 'text-green-600' : 'text-red-500'}`}>
              {error}
            </p>
          ) : null}
        </div>
      </motion.form>

      <div>
        <p className="text-muted-foreground mb-4 text-sm">{entryCountText}</p>

        {isLoading ? (
          <div className="text-muted-foreground text-sm">Loading entries...</div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-neutral-200 bg-white p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">{entry.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap text-neutral-700">
                  {entry.message}
                </p>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <a href="/admin" className="text-xs text-neutral-400 hover:text-neutral-800 transition-colors flex items-center gap-1">
            <span className="opacity-50">Admin Access</span>
        </a>
      </div>
    </div>
  );
}
