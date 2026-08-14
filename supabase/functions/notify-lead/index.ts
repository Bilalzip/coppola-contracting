import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const TO_EMAIL = 'info@coppolahome.ca';
const FROM_EMAIL = 'Coppola Home <noreply@coppolacontracting.net>';

serve(async (req) => {
  try {
    const payload = await req.json();
    // Supabase sends { type, table, record, old_record }
    const lead = payload.record;

    if (!lead) {
      return new Response('No record in payload', { status: 400 });
    }

    const isQuote = lead.type === 'quote';
    const subject = isQuote
      ? `New Quote Request from ${lead.name}`
      : `New Contact Message from ${lead.name}`;

    const quoteDetails = isQuote
      ? `
        <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Project Type</td><td style="padding:6px 0;font-size:14px;">${lead.project_type ?? '—'}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Timeline</td><td style="padding:6px 0;font-size:14px;">${lead.timeline ?? '—'}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Project Scope</td><td style="padding:6px 0;font-size:14px;">${lead.budget ?? '—'}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Project Address</td><td style="padding:6px 0;font-size:14px;">${lead.address ?? '—'}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Preferred Contact</td><td style="padding:6px 0;font-size:14px;">${lead.preferred_contact ?? '—'}</td></tr>
      `
      : '';

    const html = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background:#f9fafb;font-family:system-ui,sans-serif;">
        <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

          <!-- Header -->
          <div style="background:#001f54;padding:28px 32px;">
            <p style="margin:0;color:#ffffff;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.7;">Coppola Home</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:600;">${subject}</h1>
          </div>

          <!-- Body -->
          <div style="padding:32px;">
            <p style="margin:0 0 24px;color:#374151;font-size:15px;">
              You have a new <strong>${isQuote ? 'quote request' : 'contact message'}</strong> submitted through the website.
            </p>

            <!-- Contact Info -->
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:8px 0;color:#6b7280;font-size:14px;width:140px;">Name</td>
                <td style="padding:8px 0;font-size:14px;font-weight:600;color:#111827;">${lead.name}</td>
              </tr>
              <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:8px 0;color:#6b7280;font-size:14px;">Email</td>
                <td style="padding:8px 0;font-size:14px;"><a href="mailto:${lead.email}" style="color:#001f54;">${lead.email}</a></td>
              </tr>
              <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:8px 0;color:#6b7280;font-size:14px;">Phone</td>
                <td style="padding:8px 0;font-size:14px;">${lead.phone ?? '—'}</td>
              </tr>
              ${quoteDetails}
            </table>

            <!-- Message -->
            ${lead.message ? `
            <div style="background:#f9fafb;border-left:3px solid #001f54;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:24px;">
              <p style="margin:0 0 6px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
              <p style="margin:0;font-size:15px;color:#111827;line-height:1.6;">${lead.message.replace(/\n/g, '<br>')}</p>
            </div>
            ` : ''}

            <!-- CTA -->
            <div style="text-align:center;margin-top:28px;">
              <a href="https://coppolacontracting.net/admin/leads" style="display:inline-block;background:#001f54;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;">
                View in Admin Panel →
              </a>
            </div>

            <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;text-align:center;">
              Reply directly to <a href="mailto:${lead.email}" style="color:#001f54;">${lead.email}</a> to respond to this ${isQuote ? 'quote request' : 'message'}.
            </p>
          </div>

          <!-- Footer -->
          <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
              Coppola Home · 269 Red River Rd, Suite 116 #1040, Thunder Bay ON P7B 1A9
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: lead.email,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return new Response(`Email failed: ${err}`, { status: 500 });
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response('Internal error', { status: 500 });
  }
});
