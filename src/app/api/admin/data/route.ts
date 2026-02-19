import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const GUESTBOOK_FILE = path.join('/tmp', 'guestbook.json');
const CHAT_LOGS_FILE = path.join('/tmp', 'chat-logs.json');

async function readJsonFile(filePath: string) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export async function GET() {
    const [guestbook, chatLogs] = await Promise.all([
        readJsonFile(GUESTBOOK_FILE),
        readJsonFile(CHAT_LOGS_FILE),
    ]);

    return Response.json({ guestbook, chatLogs });
}
