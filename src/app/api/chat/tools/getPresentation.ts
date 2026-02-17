import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'This tool returns a concise personal introduction of Zenghuan Wang.',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation:
        "I'm Zenghuan Wang, an AI Engineer based in Shenzhen, China. I'm focused on building practical AI products and continuously improving through projects and international study experiences.",
    };
  },
});
