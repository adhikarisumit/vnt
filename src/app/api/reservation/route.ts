import { NextResponse } from 'next/server';
import { facilities, reservationSchema } from '@/lib/schemas';
import { sendNotification } from '@/lib/mail';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!rateLimit(`reservation:${ip}`)) {
    return NextResponse.json({ error: 'too-many-requests' }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }

  const parsed = reservationSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid-input' }, { status: 422 });
  }

  const data = parsed.data;
  // Bots fill the hidden field; accept silently so they don't retry.
  if (data.website) return NextResponse.json({ ok: true });

  const facility = facilities.find((f) => f.id === data.facility);
  const facilityLabel = facility ? `${facility.area} / ${facility.ja} (${facility.en})` : data.facility;

  const rows: [string, string][] = [
    ['Facility', facilityLabel],
    ['Date', data.date],
    ...(data.nights ? ([['Nights', String(data.nights)]] as [string, string][]) : []),
    ['Guests', String(data.guests)],
    ['Name', data.name],
    ...(data.company ? ([['Company', data.company]] as [string, string][]) : []),
    ['Phone', data.phone],
    ['Email', data.email],
    ['Message', data.message],
    ['Language', data.locale],
  ];

  const result = await sendNotification(`【団体予約】${facilityLabel} — ${data.name}`, rows, data.email);

  // A mail-provider outage should not lose the enquiry silently.
  if (!result.delivered && result.reason === 'send-failed') {
    return NextResponse.json({ error: 'send-failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
