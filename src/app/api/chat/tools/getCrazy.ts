
import { tool } from "ai";
import { z } from "zod";


export const getCrazy = tool({
  description:
    "This tool returns one standout personal moment. Use it for questions such as 'what's the craziest thing you've ever done?'",
  parameters: z.object({}),
  execute: async () => {
    return "Above is a personal highlight card. I'm currently updating this section with my own latest life and challenge moments.";
  },
});
