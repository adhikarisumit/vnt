import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/schemas';
import { sendNotification } from '@/lib/mail';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!rateLimit(`contact:${ip}`)) {
    return NextResponse.json({ error: 'too-many-requests' }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid-input' }, { status: 422 });
  }

  const data = parsed.data;
  if (data.website) return NextResponse.json({ ok: true });

  const rows: [string, string][] = [
    ['Category', data.category],
    ['Name', data.name],
    ['Company', data.company],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Detail', data.detail],
    ['Language', data.locale],
  ];

  const result = await sendNotification(`【お問い合わせ】${data.category} — ${data.company}`, rows, data.email);

  if (!result.delivered && result.reason === 'send-failed') {
    return NextResponse.json({ error: 'send-failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
