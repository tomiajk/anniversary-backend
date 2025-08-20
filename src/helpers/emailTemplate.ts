export default function (code: string, name: string, qrUrl: string) {
  return `<!doctype html> 
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <meta http-equiv="x-ua-compatible" content="ie=edge"/>
      <title>Anniversary Invitation</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Imperial+Script&family=Manrope:wght@200..800&family=Yellowtail&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600&display=swap" rel="stylesheet">
    </head>
    <body style="margin:0; padding:0; background:#0b0b0b; font-family: "Imperial Script", cursive;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td style="padding:24px;">
            <div style="max-width:600px; margin:auto; border-radius:16px; overflow:hidden; background:#141414; border:1px solid rgba(255, 120, 0, 0.3); box-shadow:0 8px 30px rgba(255, 60, 0, 0.25);">
              
              <!-- Header -->
              <div style="background:linear-gradient(135deg, #ff9800, #ff3d00); text-align:center; padding:32px 18px;">
                <h1 style="margin:0; font-family: "Yellowtail", cursive; font-size:20px; color:#fff;">You're Invited to Our Anniversary</h1>
              </div>

              <!-- Body -->
              <div style="padding:28px 24px; color:#e0e0e0; font-size:14px; font-family:'Playfair Display', serif;">
                <p style="margin:0 0 14px 0;">Dear ${name},</p>
                <p style="margin:0 0 14px 0;">We’re truly grateful you’ve reserved your spot to join us in celebrating this special occasion. Thank you for being a part of our story — your presence makes this event more meaningful.</p>

                <!-- Invitation Code Box -->
                <div style="margin:20px 0; padding:16px; border-radius:12px; background:#1c1c1c; border:1px solid rgba(255, 120, 0, 0.4); text-align:center;">
                  <div style="font-size:12px; text-transform:uppercase; letter-spacing:2px; color:#ffb366; margin-bottom:8px;">Invitation Code</div>
                  <div style="font-size:26px; font-weight:bold; letter-spacing:2px; color:#fff3e0; font-family:'Playfair Display', serif;">${code}</div>
                  <div style="margin-top:16px;">
                    <img src="${qrUrl}" alt="QR Code" width="120" height="120" style="border-radius:8px; display:block; margin:auto;"/>
                  </div>
                </div>

                <!-- Event Details -->
                <p style="margin:0 0 14px 0; font-size: 12px;"><strong>Event Details:</strong><br/>
                Date: 15th of September at 5:30pm<br/>
                Venue: Surulere, Lagos</p>

                <!-- Warning -->
                <div style="margin:20px 0; padding:14px; border-radius:10px; background:#2a1a1a; border:1px solid rgba(255, 100, 50, 0.6); color:#ffb199; font-size:12px;">
                  ⚠️ Important: Your <strong>Invitation Code</strong> or <strong>QR Code</strong> is required for entry. Please keep this email safe and present it upon arrival.
                </div>

                <!-- Signature -->
                <p style="margin:0; font-family: "Yellowtail", cursive;">We look forward to celebrating with you.<br/>
                With appreciation,<br/>
                <em style="font-family:'Great Vibes', cursive; font-size:22px; color:#ffcc99;">Mr and Mrs Celebrant</em></p>
              </div>

            </div>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;
}
