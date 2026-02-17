import { tool } from 'ai';
import { z } from 'zod';

export const getContact = tool({
  description:
    'This tool show a my contact informations.',
  parameters: z.object({}),
  execute: async () => {
    return "You can find my contact card above. Feel free to reach out by email, phone, or GitHub.";
  },
});
