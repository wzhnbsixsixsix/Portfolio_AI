import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Load Inter font for non-Apple devices
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Zenghuan Wang | AI Engineer',
  description:
    'Interactive AI portfolio of Zenghuan Wang, featuring projects, skills, education, and contact information.',
  keywords: [
    'Zenghuan Wang',
    'Portfolio',
    'AI Engineer',
    'AI',
    'Interactive',
    'Machine Learning',
    'Data Science',
    'Next.js',
    'React',
  ],
  authors: [
    {
      name: 'Zenghuan Wang',
      url: 'https://github.com/wzhnbsixsixsix',
    },
  ],
  creator: 'Zenghuan Wang',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/wzhnbsixsixsix',
    title: 'Zenghuan Wang | AI Engineer',
    description:
      'Interactive AI portfolio of Zenghuan Wang.',
    siteName: 'Zenghuan Wang Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zenghuan Wang | AI Engineer',
    description: 'Interactive AI portfolio of Zenghuan Wang.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          inter.variable
        )}
      >
        <main className="flex min-h-screen flex-col">{children}</main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
