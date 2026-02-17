import { tool } from 'ai';
import { z } from 'zod';

export const getResume = tool({
  description:
    'This tool shows my resume.',
  parameters: z.object({}),
  execute: async () => {
    return "You can download my latest resume from the card above.";
  },
});
