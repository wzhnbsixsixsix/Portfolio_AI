
import { tool } from "ai";
import { z } from "zod";


export const getSports = tool({
  description:
    'This tool shows extracurricular or life-moment photos.',
  parameters: z.object({}),
  execute: async () => {
    return 'Here are some personal moments outside pure technical work.';
  },
});
