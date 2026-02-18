'use client';

import { Suspense } from 'react';
import ChatHorizontalPages from '@/components/chat/chat-horizontal-pages';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatHorizontalPages />
    </Suspense>
  );
}
