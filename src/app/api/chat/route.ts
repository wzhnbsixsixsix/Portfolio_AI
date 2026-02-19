import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { promises as fs } from 'fs';
import path from 'path';
import { SYSTEM_PROMPT } from './prompt';
import { getContact } from './tools/getContact';
import { getCrazy } from './tools/getCrazy';
import { getInternship } from './tools/getIntership';
import { getPresentation } from './tools/getPresentation';
import { getProjects } from './tools/getProjects';
import { getResume } from './tools/getResume';
import { getSkills } from './tools/getSkills';
import { getSports } from './tools/getSport';

export const runtime = 'nodejs';
export const maxDuration = 30;

const LOG_FILE = path.join('/tmp', 'chat-logs.json');

async function logEntry(role: string, content: string) {
  try {
    if (!content) return;

    const logEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      role,
      content,
    };

    // console.log(`[Chat Log] ${role}: ${content}`);

    const dir = path.dirname(LOG_FILE);
    await fs.mkdir(dir, { recursive: true });

    let existingLogs = [];
    try {
      const data = await fs.readFile(LOG_FILE, 'utf8');
      existingLogs = JSON.parse(data);
    } catch (e) {
      // Ignore read error, start fresh
    }

    if (!Array.isArray(existingLogs)) existingLogs = [];

    // Keep last 100 chats
    const updatedLogs = [logEntry, ...existingLogs].slice(0, 100);
    await fs.writeFile(LOG_FILE, JSON.stringify(updatedLogs, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to log chat:', err);
  }
}

const DEFAULT_DASHSCOPE_BASE_URL =
  'https://dashscope.aliyuncs.com/compatible-mode/v1';
const DEFAULT_DASHSCOPE_MODEL = 'qwen-plus';
const DEFAULT_OPENAI_MODEL = 'gpt-4o-mini';

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN ?? '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  Vary: 'Origin',
};

function getModelConfig() {
  const apiKey =
    process.env.CHAT_API_KEY ??
    process.env.DASHSCOPE_API_KEY ??
    process.env.OPENAI_API_KEY;

  const configuredModel =
    process.env.CHAT_MODEL ??
    process.env.DASHSCOPE_MODEL ??
    process.env.OPENAI_MODEL;

  const configuredBaseURL =
    process.env.CHAT_BASE_URL ??
    process.env.DASHSCOPE_BASE_URL ??
    process.env.OPENAI_BASE_URL;

  const modelLooksLikeQwen = configuredModel
    ?.trim()
    .toLowerCase()
    .startsWith('qwen');

  const usesDashScope =
    Boolean(process.env.DASHSCOPE_API_KEY) ||
    Boolean(process.env.DASHSCOPE_BASE_URL) ||
    configuredBaseURL?.includes('dashscope.aliyuncs.com') ||
    Boolean(modelLooksLikeQwen);

  const baseURL =
    configuredBaseURL ??
    (usesDashScope ? DEFAULT_DASHSCOPE_BASE_URL : undefined);

  const model =
    configuredModel ??
    (usesDashScope ? DEFAULT_DASHSCOPE_MODEL : DEFAULT_OPENAI_MODEL);

  return { apiKey, baseURL, model };
}

// ❌ Pas besoin de l'export ici, Next.js n'aime pas ça
function errorHandler(error: unknown) {
  if (error == null) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: Request) {
  try {
    const { apiKey, baseURL, model } = getModelConfig();
    if (!apiKey) {
      return new Response(
        'Missing API key. Set CHAT_API_KEY, DASHSCOPE_API_KEY, or OPENAI_API_KEY.',
        {
          status: 500,
          headers: corsHeaders,
        }
      );
    }

    const llm = createOpenAI({
      apiKey,
      baseURL,
    });

    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response('Invalid request body: messages must be an array.', {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Log the user message
    await logEntry('user', messages[messages.length - 1].content);

    const tools = {
      getProjects,
      getPresentation,
      getResume,
      getContact,
      getSkills,
      getSports,
      getCrazy,
      getInternship,
    };

    const result = streamText({
      model: llm(model),
      messages: [SYSTEM_PROMPT, ...messages],
      toolCallStreaming: true,
      tools,
      maxSteps: 2,
      onFinish: async (event) => {
        // Log the assistant response
        await logEntry('assistant', event.text);
      },
    });

    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error('Global error:', err);
    const errorMessage = errorHandler(err);
    return new Response(errorMessage, { status: 500, headers: corsHeaders });
  }
}
