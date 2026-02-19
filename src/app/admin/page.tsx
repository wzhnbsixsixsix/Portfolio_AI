'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  isPrivate?: boolean;
}

interface ChatLog {
  id: string;
  timestamp: string;
  role?: 'user' | 'assistant';
  content: string;
}

interface AdminData {
  guestbook: GuestbookEntry[];
  chatLogs: ChatLog[];
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AdminData | null>(null);
  const [activeTab, setActiveTab] = useState<'guestbook' | 'chat'>('guestbook');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2185') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/data');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (isoDate: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(isoDate));
  };

  const deleteEntry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;
    
    try {
      const res = await fetch('/api/admin/delete', {
        method: 'POST',
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        fetchData(); // Refresh list
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting');
    }
  };

  if (!isAuthenticated) {
    // ... existing login UI ...
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
        {/* ... */}
         <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onSubmit={handleLogin}
          className="w-full max-w-sm overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
        >
          {/* ... login form content ... */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
              <Lock className="h-5 w-5 text-neutral-500" />
            </div>
          </div>
          
          <div className="mb-6 text-center">
            <h1 className="text-xl font-semibold">Admin Access</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Please enter the access code to continue.
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter passcode"
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-center text-lg outline-none transition focus:border-neutral-400 focus:bg-white"
              autoFocus
            />
            {error && <p className="text-center text-sm text-red-500">{error}</p>}
            
            <button
              type="submit"
              className="w-full rounded-xl bg-black py-3 font-medium text-white transition hover:bg-neutral-800"
            >
              Access Dashboard
            </button>
          </div>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-6 md:p-12">
      {/* ... header and tabs ... */}
       <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Manage guestbook entries and view chat history.
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm font-medium text-neutral-500 hover:text-black"
          >
            Logout
          </button>
        </header>

        <div className="mb-6 flex gap-2 rounded-xl bg-white p-1.5 shadow-sm w-fit">
            {/* ... tab buttons ... */}
          <button
            onClick={() => setActiveTab('guestbook')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === 'guestbook'
                ? 'bg-neutral-100 text-black'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Guestbook ({data?.guestbook.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === 'chat'
                ? 'bg-neutral-100 text-black'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Chat Logs ({data?.chatLogs.length || 0})
          </button>
          <button
            onClick={fetchData}
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 ml-2 border-l border-neutral-100"
          >
            Refresh
          </button>
        </div>

        {isLoading && !data ? (
          <div className="text-center py-20 text-neutral-500">Loading data...</div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {activeTab === 'guestbook' ? (
                <motion.div
                  key="guestbook"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-4"
                >
                  {data?.guestbook.map((entry) => (
                    <div
                      key={entry.id}
                      className={`relative rounded-xl border p-5 ${
                        entry.isPrivate
                          ? 'border-amber-200 bg-amber-50/50'
                          : 'border-neutral-200 bg-white'
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{entry.name}</span>
                          {entry.isPrivate && (
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                              Private
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-muted-foreground text-xs">
                            {formatDate(entry.createdAt)}
                            </span>
                            <button 
                                onClick={() => deleteEntry(entry.id)}
                                className="text-xs text-red-500 hover:text-red-700 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                      </div>
                      <p className="text-neutral-700 whitespace-pre-wrap">{entry.message}</p>
                    </div>
                  ))}
                  {/* ... empty state ... */}
                   {data?.guestbook.length === 0 && (
                    <p className="text-center py-10 text-neutral-500">No guestbook entries found.</p>
                  )}
                </motion.div>
              ) : (
                // ... chat log view ...
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-3"
                >
                  {data?.chatLogs.map((log) => (
                    <div
                      key={log.id}
                      className="rounded-xl border border-neutral-200 bg-white p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            (log.role || 'user') === 'assistant'
                              ? 'bg-purple-50 text-purple-600'
                              : 'bg-blue-50 text-blue-600'
                          }`}
                        >
                          {(log.role || 'user') === 'assistant' ? 'AI Response' : 'User Message'}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {formatDate(log.timestamp)}
                        </span>
                      </div>
                      <p className="text-neutral-700 whitespace-pre-wrap font-mono text-sm bg-neutral-50 p-3 rounded-lg">
                        {log.content}
                      </p>
                    </div>
                  ))}
                  {data?.chatLogs.length === 0 && (
                    <p className="text-center py-10 text-neutral-500">No chat logs found.</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
