import { tool } from 'ai';
import { z } from 'zod';

export const getInternship = tool({
  description:
    "Gives a summary of my internship/job interests plus my contact details. Use this tool when the user asks about opportunities.",
  parameters: z.object({}),
  execute: async () => {
    return `Here is what I am looking for 👇

- 🌍 **Location**: Shenzhen, China
- 🧑‍💻 **Focus**: AI engineering, full-stack AI applications, and practical ML products
- 🛠️ **Current Direction**: Building and expanding my AI portfolio while studying
- 🎓 **Education**:
  - University of Exeter (2024-2026)
  - Guangdong (2022-2024)
  - City University of Hong Kong (2026-2028)

📬 **Contact me**:
- Email: w905840774@gmail
- Phone: +86 17665252185
- GitHub: [github.com/wzhnbsixsixsix](https://github.com/wzhnbsixsixsix)

Open to relevant opportunities and collaborations.
    `;
  },
});
