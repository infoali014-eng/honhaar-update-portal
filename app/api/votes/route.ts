import { NextResponse } from 'next/server';

const NAMESPACE = 'honhaar-portal-live-production-2026';
const ABACUS_BASE = 'https://abacus.jasoncameron.dev';

async function fetchCount(key: string): Promise<number> {
  try {
    const res = await fetch(`${ABACUS_BASE}/get/${NAMESPACE}/${key}`, {
      cache: 'no-store',
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return typeof data.value === 'number' ? data.value : 0;
  } catch {
    return 0;
  }
}

async function incrementCount(key: string): Promise<number> {
  try {
    const res = await fetch(`${ABACUS_BASE}/hit/${NAMESPACE}/${key}`, {
      cache: 'no-store',
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return typeof data.value === 'number' ? data.value : 0;
  } catch {
    return 0;
  }
}

export async function GET() {
  const [khatta, khatti] = await Promise.all([
    fetchCount('dahi_khatta'),
    fetchCount('dahi_khatti'),
  ]);

  return NextResponse.json(
    {
      khatta,
      khatti,
      total: khatta + khatti,
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const choice = body?.choice;

    if (choice !== 'khatta' && choice !== 'khatti') {
      return NextResponse.json({ error: 'Invalid choice' }, { status: 400 });
    }

    const key = choice === 'khatta' ? 'dahi_khatta' : 'dahi_khatti';
    await incrementCount(key);

    const [khatta, khatti] = await Promise.all([
      fetchCount('dahi_khatta'),
      fetchCount('dahi_khatti'),
    ]);

    return NextResponse.json({
      khatta,
      khatti,
      total: khatta + khatti,
      success: true,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to process vote' }, { status: 500 });
  }
}
