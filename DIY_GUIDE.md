# DIY 改造指南（把这个项目改成你的 AI 作品集）

这份指南的目标是：让你在 1-2 小时内，把当前项目从“作者个人信息”替换成“你自己的版本”。

---

## 1. 开始前要准备的材料

先准备这些内容，再动手改代码会更快：

1. 个人信息
- 姓名、职位标题（一句话）
- 个人简介（50-120 字）
- 城市/国家、教育经历、工作/实习经历
- 联系方式（邮箱、LinkedIn、GitHub、X 等）

2. 作品集素材
- 你想展示的项目列表（建议 4-8 个）
- 每个项目的：简介、技术栈、时间、链接（网站/GitHub/视频）
- 每个项目至少 1-3 张截图（建议 16:9）

3. 视觉资源
- 头像（建议 1:1）
- 首页形象图（`landing-memojis.png` 可替换）
- 可选：动效视频（`final_memojis.webm` / `final_memojis_ios.mp4`）
- Logo、favicon

4. 简历文件
- PDF 简历
- 简历预览图（PNG/JPG）

5. 大模型 API
- 至少一种可用配置：
  - `CHAT_API_KEY` + `CHAT_BASE_URL` + `CHAT_MODEL`
  - 或 OpenAI / DashScope 兼容配置

---

## 2. 本地启动（先跑通）

```bash
pnpm install
cp .env.example .env
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000)。

`.env` 最低可用示例：

```env
CHAT_API_KEY=你的key
CHAT_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
CHAT_MODEL=qwen-plus
```

---

## 3. 必改文件总表（最重要）

| 模块 | 改哪里 | 你要改什么 |
|---|---|---|
| 站点标题/SEO | `src/app/layout.tsx` | `title`、`description`、`keywords`、`authors`、`openGraph`、`twitter`、`url` |
| 首页主文案 | `src/app/page.tsx` | 姓名、职位（`Hey, I'm ...` / `AI Engineer`）、快捷提问文案 |
| 欢迎弹窗 | `src/components/welcome-modal.tsx` | 弹窗标题、介绍文案、Logo、联系跳转文案 |
| 聊天人格 | `src/app/api/chat/prompt.ts` | 整段系统提示词（身份、经历、语气、规则） |
| 聊天工具文案 | `src/app/api/chat/tools/*.ts` | 各工具返回文本（姓名、联系方式、实习信息等） |
| 个人介绍卡 | `src/components/presentation.tsx` | `profile` 对象（姓名、年龄、地点、简介、头像） |
| 技能卡 | `src/components/skills.tsx` | `skillsData` 数组（分类与技能项） |
| 联系方式卡 | `src/components/contact.tsx` | 邮箱、社交链接、@账号 |
| 实习/求职卡 | `src/components/InternshipCard.tsx` | 头像、姓名、目标地点/时长、技术栈、联系方式 |
| 项目总数据 | `src/components/projects/Data.tsx` | 所有项目（标题、描述、栈、链接、图片、预览卡） |
| 运动/兴趣图 | `src/components/sport.tsx`、`src/components/crazy.tsx` | 图片和 caption（可换成你的生活/兴趣） |
| 简历卡 | `src/components/resume.tsx` | 标题、更新时间、`downloadUrl`、预览图路径 |
| 聊天快捷提问 | `src/components/chat/HelperBoost.tsx` | 快速问题、分类问题内容 |
| GitHub star API | `src/app/api/github-stars/route.ts` | 仓库地址 `owner/repo` |
| 静态部署路径 | `src/lib/base-path.ts` + `.env` | `NEXT_PUBLIC_BASE_PATH`（部署到子路径时） |

---

## 4. `public/` 资源替换清单

建议直接保留原文件名替换内容，避免改一堆引用路径：

- 首页形象：`public/landing-memojis.png`
- 动效视频：`public/final_memojis.webm`、`public/final_memojis_ios.mp4`
- 头像：`public/profil-raph.png`、`public/avatar-raphael.jpg`
- 简历：`public/resume_giraud.pdf`、`public/resume_giraud_preview.png`
- Logo：`public/logo-toukoum.svg`
- favicon：`public/favicon.svg`
- 项目图：`public/*preview*` 和各项目截图（在 `Data.tsx` 里有对应文件名）

你也可以改文件名，但要同步修改对应组件里的路径。

---

## 5. AI 能力相关配置（必须理解）

1. 聊天后端入口：`src/app/api/chat/route.ts`
- 已支持 OpenAI 兼容接口，通常不用改逻辑
- 主要通过 `.env` 切换模型和服务商

2. 前后端分离部署时
- 前端环境变量：`NEXT_PUBLIC_CHAT_API_URL=https://你的后端域名/api/chat`
- 后端环境变量：`ALLOWED_ORIGIN=https://你的前端域名`

3. 同站部署（如同一个 Vercel 项目）
- `NEXT_PUBLIC_CHAT_API_URL` 留空，默认走 `/api/chat`

---

## 6. 推荐改造顺序（省时间）

1. 先改文案与数据
- `layout.tsx`、`page.tsx`、`prompt.ts`
- `presentation.tsx`、`skills.tsx`、`contact.tsx`
- `projects/Data.tsx`、`resume.tsx`

2. 再替换 `public/` 素材

3. 最后调细节
- 快捷问题（`HelperBoost.tsx`）
- 欢迎弹窗（`welcome-modal.tsx`）
- 实习卡（`InternshipCard.tsx`，如果你不需要可不展示相关提问）

---

## 7. 上线前检查清单

1. 功能检查
- 首页能进入聊天页
- 提问 “Who are you / skills / projects / contact” 均能返回
- 简历可下载
- 项目卡点击后内容和图片正常

2. 内容检查
- 没有残留原作者姓名/邮箱/链接（用下面命令查）

```bash
rg -n "Toukoum|Raphael|raphael|giraud|toukoum.fr|LightOn|Mont Blanc|Aaaaby" src public README.md
```

3. 部署检查
- `.env` 已配置模型 key
- 跨域场景已设置 `ALLOWED_ORIGIN`
- 子路径部署已设置 `NEXT_PUBLIC_BASE_PATH`

---

## 8. 可选优化（不是必须）

1. 把 `src/app/api/chat/prompt.ts` 改成“结构化变量拼接”
- 例如把“个人资料”抽到单独 JSON/TS 文件，后期维护更轻松

2. 把 `src/components/projects/Data.tsx` 改成外部数据源
- 用 `data/projects.json` 或 CMS，避免每次改代码

3. 增加中英文双语
- 主页文案、工具返回文案、prompt 都可按语言路由切换

---

如果你愿意，我可以下一步直接帮你做“模板化改造”：把所有硬编码个人信息抽成一个 `profile.config.ts`，你以后只改一个文件就能全站更新。
