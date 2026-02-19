import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const GUESTBOOK_FILE = path.join('/tmp', 'guestbook.json');

export async function POST(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            return new Response('ID needed', { status: 400 });
        }

        let entries = [];
        try {
            const data = await fs.readFile(GUESTBOOK_FILE, 'utf8');
            entries = JSON.parse(data);
        } catch (e) {
            return new Response('Error reading entries', { status: 500 });
        }

        if (!Array.isArray(entries)) entries = [];

        const newEntries = entries.filter((entry: any) => entry.id !== id);

        await fs.writeFile(GUESTBOOK_FILE, JSON.stringify(newEntries, null, 2), 'utf8');

        return Response.json({ success: true });
    } catch (error) {
        console.error('Delete error', error);
        return new Response('Error deleting entry', { status: 500 });
    }
}
