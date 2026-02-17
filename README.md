![image](assets/readme-photo.png)
 
# World's first AI portfolio 🤖✨  

**Static portfolios are dead.**  
So I built [toukoum.fr](https://toukoum.fr).

Instead of making you scroll endlessly, my portfolio adapts to *you*.  
Ask a question — my AI avatar replies instantly.

## 👇 What can you ask?

- 🧠 **Tech recruiter?** Ask about my stack & results  
- 💻 **Dev?** Dive into my code & mindset  
- 🧑‍🤝‍🧑 **Friend or family?** See what I’ve been working on  

---

This is not a portfolio.  
It’s a **conversation tailored to your curiosity**.

➡️ **Try it now:** [https://toukoum.fr](https://toukoum.fr)  
*What will you ask?*

## 🚀 Local setup

### Prerequisites
- **Node.js** (v18+)
- **pnpm**
- **DashScope API key** (recommended) or OpenAI-compatible API key

### Setup
1. Clone and install:
   ```bash
   git clone <your-repo-url>
   cd portfolio
   pnpm install
   ```
2. Create `.env` from `.env.example`
3. Minimal DashScope config:
   ```env
   CHAT_API_KEY=your_dashscope_api_key
   CHAT_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
   CHAT_MODEL=qwen-plus
   ```
4. Run:
   ```bash
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## 🧩 Make it your own portfolio

Edit these files first:
- `src/app/layout.tsx` (title, description, SEO, social metadata)
- `src/app/page.tsx` (landing text and quick questions)
- `src/app/api/chat/prompt.ts` (AI personality + rules)
- `src/app/api/chat/tools/*.ts` (all your profile data: projects, skills, contact, resume, etc.)
- `src/components/projects/Data.tsx` (project cards and gallery)
- `public/*` (avatar, screenshots, CV, logos)

## 🤖 DashScope (Qwen) compatibility

This repo now supports OpenAI-compatible endpoints directly in `src/app/api/chat/route.ts`.

Priority order for chat config:
1. `CHAT_API_KEY` / `CHAT_BASE_URL` / `CHAT_MODEL`
2. `DASHSCOPE_API_KEY` / `DASHSCOPE_BASE_URL` / `DASHSCOPE_MODEL`
3. `OPENAI_API_KEY` / `OPENAI_BASE_URL` / `OPENAI_MODEL`

Default when DashScope is detected:
- Base URL: `https://dashscope.aliyuncs.com/compatible-mode/v1`
- Model: `qwen-plus`

DashScope is auto-detected when:
- `DASHSCOPE_*` envs are set, or
- `CHAT_BASE_URL` points to DashScope, or
- `CHAT_MODEL` starts with `qwen` (for example `qwen-plus`).

## ▲ Deploy on Vercel with DashScope

In your Vercel project settings, set:

```env
CHAT_API_KEY=your_dashscope_api_key
CHAT_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
CHAT_MODEL=qwen-plus
```

If frontend and API are deployed in the same Vercel project, keep `NEXT_PUBLIC_CHAT_API_URL` empty so the app uses `/api/chat`.

## 📦 Deploy to GitHub Pages

GitHub Pages only serves static files, so Next.js API routes (`/api/chat`) cannot run there directly.

Use this architecture:
1. **Frontend** on GitHub Pages (this repo, static export).
2. **Chat backend** on Vercel (or any Node host) using this same `/api/chat` route with DashScope key.
3. Set frontend env: `NEXT_PUBLIC_CHAT_API_URL=https://<your-backend-domain>/api/chat`.

### Included workflow
- File: `.github/workflows/deploy-pages.yml`
- It builds static output and deploys `out/` to GitHub Pages.
- Build command:
  ```bash
  pnpm build:pages
  ```

### Required GitHub repository variable
- `NEXT_PUBLIC_CHAT_API_URL` = your deployed backend API URL.

### Backend CORS
Set backend env:
```env
ALLOWED_ORIGIN=https://<your-username>.github.io
```
If you use project pages (`/<repo-name>`), origin is still `https://<your-username>.github.io`.



#### 🔖 Tags

`#AIPortfolio` `#InnovationInTech` `#DigitalResume` `#JobSearch` `#TechInnovation` `#WebDevelopment` `#FutureTech`
