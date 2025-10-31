export default function (code: string, name: string, qrUrl: string) {
	return `<!doctype html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <meta http-equiv="x-ua-compatible" content="ie=edge"/>
      <title>RSVP Accepted — Your Invitation & Entry Pass</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
        .preheader { display:none!important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; }
      </style>
    </head>
    <body style="margin:0; padding:0; background:#0a0a0a;">
      <div class="preheader">Your RSVP was accepted. This email contains your unique entry pass (QR + code).</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0a0a0a;">
        <tr>
          <td style="padding:24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px; margin:0 auto; background:#0f0f0f; border:1px solid rgba(255,215,0,0.28); border-radius:14px; box-shadow:0 8px 30px rgba(255,215,0,0.15);">
              <tr>
                <td style="height:6px; background:#FFD700; border-top-left-radius:14px; border-top-right-radius:14px;"></td>
              </tr>
              <tr>
                <td style="text-align:center; padding:28px 18px 10px 18px;">
                  <h1 style="margin:10px 0 0 0; font-family:'Playfair Display', Georgia, 'Times New Roman', serif; font-size:22px; line-height:1.35; color:#fff; font-weight:700;">
                    RSVP Accepted — You're Invited!
                  </h1>
                  <div style="margin-top:8px; font-family:'Playfair Display', Georgia, 'Times New Roman', serif; font-size:14px; color:#E9E3C7;">
                    Funmbi <span style="color:#DC143C;">&</span> Tope
                  </div>
                  <div style="margin:14px auto 0 auto; width:120px; height:1px; background:linear-gradient(to right, transparent, #FFD700, transparent);"></div>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 22px 8px 22px; color:#E9E3C7; font-size:14px; line-height:1.6; font-family:'Playfair Display', Georgia, 'Times New Roman', serif;">
                  <p style="margin:0 0 14px 0;">Dear ${name},</p>
                  <p style="margin:0 0 14px 0;">
                    Your RSVP has been accepted. This email is your entry pass for our double celebration.
                    Please bring it on the day.
                  </p>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:18px 0; background:#131313; border:1px solid rgba(255,215,0,0.35); border-radius:12px;">
                    <tr>
                      <td style="padding:16px; text-align:center;">
                        <div style="font-size:11px; text-transform:uppercase; letter-spacing:2px; color:#FFD700; margin-bottom:8px;">
                          Invitation Code
                        </div>
                        <div style="font-size:26px; font-weight:700; letter-spacing:2px; color:#ffffff;">
                          ${code}
                        </div>
                        <div style="margin-top:8px; font-size:12px; color:#D7C78A;">
                          Name on RSVP: <strong style="color:#FFD700;">${name}</strong>
                        </div>
                        <div style="margin-top:14px;">
                          <img src="cid:${qrUrl}" alt="QR Code for entry" width="120" height="120" style="border-radius:8px; display:block; margin:0 auto; border:1px solid rgba(255,215,0,0.25);" />
                        </div>
                        <div style="margin-top:10px; font-size:11px; color:#D7C78A;">
                          Present this code or QR at the entrance
                        </div>
                      </td>
                    </tr>
                  </table>
                  <div style="margin:0 0 14px 0; font-size:13px; color:#E9E3C7;">
                    <div style="margin-bottom:4px;"><strong style="color:#FFD700;">Event Details</strong></div>
                    <div style="margin:2px 0;">📅 <span style="color:#F1E3A0;">December 27, 12:00 noon prompt</span></div>
                    <div style="margin:2px 0;">📍 <span style="color:#F1E3A0;">Mayfair hall: Otunba Jobi-Fele Way, Alausa, Ikeja.</span></div>
                  </div>
                  <div style="margin:18px 0 8px 0; padding:12px; border-radius:10px; background:#1a0f12; border:1px solid rgba(220,20,60,0.55); color:#ffd7dc; font-size:12px;">
                    ⚠️ Important: Your <strong>Invitation Code</strong> or <strong>QR Code</strong> is required for entry. Do not share this email.
                    If the QR doesn’t scan, our team will verify your code manually.
                  </div>
                  <p style="margin:16px 0 0 0;">
                    We look forward to celebrating with you.<br/>
                    With appreciation,<br/>
                    <em style="font-family:'Great Vibes', cursive; font-size:16px; color:#FFD700;">Mr and Mrs Bandele</em>
                  </p>
                </td>
              </tr>
              <tr><td style="height:18px;"></td></tr>
            </table>
            <div style="max-width:600px; margin:10px auto 0 auto; text-align:center; color:#8f8a6e; font-size:11px; line-height:1.5; font-family:'Playfair Display', Georgia, 'Times New Roman', serif;">
              If you didn’t request this or believe you received it by mistake, you can safely ignore this email.
            </div>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}
