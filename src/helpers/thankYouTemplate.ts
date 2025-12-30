export default function (name: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <title>Thank You for Joining Us</title>
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
      .content {
        padding: 28px 24px 18px 24px;
        font-size: 14px;
        line-height: 1.6;
        color: #444;
      }
      .footer {
        text-align: center;
        color: #999;
        font-size: 11px;
        margin: 20px auto 40px auto;
        max-width: 600px;
        line-height: 1.6;
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
        <h1>Thank You!</h1>
        <div class="subheader">Funmbi & Tope</div>
      </div>
      <div class="content">
        <p>Dear ${name},</p>
        <p>
          On behalf of myself and my family, we'll like to appreciate you for gracing our celebration with your presence and gift at my 40th birthday and 15th wedding anniversary. It was a great delight seeing you.
        </p>
        <p>
          We are very grateful.
        </p>
        <p style="margin-top:20px;">
          With love and appreciation,<br/>
          <span class="signature">Mr and Mrs Bandele</span>
        </p>
      </div>
    </div>
    <div class="footer">
      If you believe you received this by mistake, you can safely ignore this email.
    </div>
  </body>
</html>`;
}
