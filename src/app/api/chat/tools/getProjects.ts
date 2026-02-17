
import { tool } from "ai";
import { z } from "zod";


export const getProjects = tool({
  description:
    "This tool shows a list of Zenghuan Wang's projects.",
  parameters: z.object({}),
  execute: async () => {
    return "My project cards are shown above. Ask me if you want details about any specific one.";
  },
});
