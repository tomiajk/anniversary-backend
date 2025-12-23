export default function (code: string, name: string, qrUrl: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <title>Event Reminder — Your Invitation & Entry Pass</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Great+Vibes&display=swap" rel="stylesheet">
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f7f7f7;
        font-family: 'Poppins', Arial, sans-serif;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 8px 20px rgba(0,0,0,0.08);
      }
      .header {
        background: linear-gradient(135deg, #111, #222);
        text-align: center;
        padding: 32px 20px;
        color: #FFD700;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
        font-weight: 600;
      }
      .subheader {
        margin-top: 6px;
        color: #f4f4f4;
        font-size: 14px;
      }
      .divider {
        height: 2px;
        background: linear-gradient(to right, transparent, #FFD700, transparent);
        width: 120px;
        margin: 16px auto;
      }
      .content {
        padding: 28px 24px 18px 24px;
        font-size: 14px;
        line-height: 1.6;
        color: #444;
      }
      .invite-box {
        background-color: #faf9f5;
        border: 1px solid rgba(255,215,0,0.4);
        border-radius: 12px;
        text-align: center;
        padding: 20px;
        margin: 20px 0;
      }
      .invite-box h2 {
        font-size: 12px;
        letter-spacing: 2px;
        color: #c7a40f;
        text-transform: uppercase;
        margin: 0 0 10px 0;
      }
      .invite-code {
        font-size: 26px;
        font-weight: 600;
        color: #111;
        letter-spacing: 2px;
      }
      .event-details {
        background-color: #fffbea;
        border-radius: 10px;
        padding: 12px;
        font-size: 13px;
        color: #5a4b1e;
        margin-top: 20px;
      }
      .warning {
        background-color: #fff5f5;
        border: 1px solid #f5b1b1;
        border-radius: 10px;
        padding: 14px;
        color: #a12727;
        font-size: 12px;
        margin-top: 20px;
      }
      .footer {
        text-align: center;
        color: #999;
        font-size: 11px;
        margin: 20px auto 40px auto;
        max-width: 600px;
        line-height: 1.6;
      }
      img.qr {
        display: block;
        margin: 14px auto 0 auto;
        border-radius: 8px;
        border: 1px solid rgba(255,215,0,0.3);
      }
      .signature {
        font-family: 'Great Vibes', cursive;
        font-size: 22px;
        color: #c6a300;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Event Reminder</h1>
        <div class="subheader">Funmbi & Tope</div>
        <div class="divider"></div>
      </div>
      <div class="content">
        <p>Dear ${name},</p>
        <p>
          We are so excited to celebrate with you! This is a gentle reminder that our event is coming up THIS Saturday!.
        </p>
        <p>
          Please keep this email handy as it contains your <strong>Invitation Code</strong> and <strong>QR Code</strong>, which you will need for entry.
        </p>
        <div class="invite-box">
          <h2>Invitation Code</h2>
          <div class="invite-code">${code}</div>
          <div style="margin-top:8px;font-size:12px;color:#555;">
            Name on RSVP: <strong style="color:#c7a40f;">${name}</strong>
          </div>
          <img src="cid:${qrUrl}" alt="QR Code" width="120" height="120" class="qr"/>
          <div style="margin-top:8px;font-size:11px;color:#777;">
            Present this code or QR at the entrance
          </div>
        </div>
        <div class="event-details">
          <strong>Event Details</strong><br/>
          📅 December 27, 12:00 noon prompt<br/>
          📍 Mayfair Hall, Otunba Jobi-Fele Way, Alausa, Ikeja.
        </div>
        <div class="warning">
          ⚠️ <strong>Important:</strong> Your Invitation Code or QR Code is required for entry. Do not share this email.
        </div>
        <p style="margin-top:20px;">
          See you soon!<br/>
          With appreciation,<br/>
          <span class="signature">Mr and Mrs Bandele</span>
        </p>
      </div>
    </div>
    <div class="footer">
      If you didn’t request this or believe you received it by mistake, you can safely ignore this email.
    </div>
  </body>
</html>`;
}
