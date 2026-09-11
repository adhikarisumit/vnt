import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.MAIL_FROM ?? 'VNT GROUP <noreply@vntgroup.co.jp>';
const to = (process.env.MAIL_TO ?? 'info@vntgroup.co.jp').split(',').map((s) => s.trim());

const resend = apiKey ? new Resend(apiKey) : null;

export type MailResult = { delivered: boolean; reason?: string };

/**
 * Sends a notification to the office inbox. Without RESEND_API_KEY configured
 * the payload is logged instead of dropped, so local and preview environments
 * still show what would have gone out.
 */
export async function sendNotification(subject: string, rows: [string, string][], replyTo?: string): Promise<MailResult> {
  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');

  if (!resend) {
    console.warn(`[mail] RESEND_API_KEY not set — not sending.\nSubject: ${subject}\n${text}`);
    return { delivered: false, reason: 'not-configured' };
  }

  try {
    await resend.emails.send({
      from,
      to,
      subject,
      replyTo,
      text,
      html: renderHtml(subject, rows),
    });
    return { delivered: true };
  } catch (error) {
    console.error('[mail] send failed', error);
    return { delivered: false, reason: 'send-failed' };
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderHtml(subject: string, rows: [string, string][]) {
  const body = rows
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding:10px 16px 10px 0;font:500 12px/1.6 system-ui;color:#8c8781;white-space:nowrap;vertical-align:top;letter-spacing:.08em;text-transform:uppercase">${escapeHtml(label)}</th>
          <td style="padding:10px 0;font:400 14px/1.7 system-ui;color:#111;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('');

  return `<div style="background:#f6f3ed;padding:32px">
    <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e8e2d7;padding:32px">
      <p style="margin:0 0 4px;font:400 11px/1 system-ui;letter-spacing:.3em;text-transform:uppercase;color:#b3924f">VNT GROUP</p>
      <h1 style="margin:0 0 24px;font:400 20px/1.4 Georgia,serif;color:#0a0a0b">${escapeHtml(subject)}</h1>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid #e8e2d7">${body}</table>
    </div>
  </div>`;
}
