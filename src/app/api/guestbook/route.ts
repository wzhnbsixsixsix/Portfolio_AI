import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'guestbook.json');

const readEntries = async (): Promise<GuestbookEntry[]> => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const raw = await fs.readFile(DATA_FILE, 'utf8').catch(async (error: NodeJS.ErrnoException) => {
      if (error.code === 'ENOENT') {
        await fs.writeFile(DATA_FILE, '[]', 'utf8');
        return '[]';
      }
      throw error;
    });

    const parsed = JSON.parse(raw) as GuestbookEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to read guestbook entries:', error);
    return [];
  }
};

const writeEntries = async (entries: GuestbookEntry[]) => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), 'utf8');
};

export async function GET() {
  const entries = await readEntries();
  return Response.json({ entries });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!name || !message) {
      return new Response('Name and message are required.', { status: 400 });
    }

    if (name.length > 60 || message.length > 800) {
      return new Response('Input is too long.', { status: 400 });
    }

    const entries = await readEntries();
    const entry: GuestbookEntry = {
      id: randomUUID(),
      name,
      message,
      createdAt: new Date().toISOString(),
    };

    const nextEntries = [entry, ...entries].slice(0, 200);
    await writeEntries(nextEntries);

    return Response.json({ entry }, { status: 201 });
  } catch (error) {
    console.error('Failed to create guestbook entry:', error);
    return new Response('Failed to save message.', { status: 500 });
  }
}
