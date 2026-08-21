import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    // Google shows app passwords as "xxxx xxxx xxxx xxxx"; the spaces are display
    // only and must be stripped or SMTP auth fails with 535 BadCredentials.
    pass: (process.env.GMAIL_APP_PASSWORD || '').replace(/\s/g, ''),
  },
})

export async function sendOtpEmail(email: string, code: string) {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: `${code} is your access code`,
      html: `
        <div style="max-width:480px;margin:0 auto;font-family:ui-monospace,Menlo,monospace;background:#000;color:#e5e5e5;border:1px solid rgba(239,68,68,0.25);border-radius:16px;padding:32px">
          <p style="letter-spacing:0.2em;font-size:11px;color:#9ca3af;margin:0 0 8px">DEV_CAROLINE // SYSTEM ACCESS</p>
          <h1 style="color:#fff;font-size:22px;margin:0 0 16px">Verify your access</h1>
          <p style="color:#9ca3af;font-size:14px;margin:0 0 24px">Use this one-time code to enter the portfolio. It expires in 10 minutes.</p>
          <div style="font-size:34px;font-weight:700;letter-spacing:0.35em;color:#f87171;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:18px;text-align:center">${code}</div>
          <p style="color:#6b7280;font-size:12px;margin:24px 0 0">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('OTP email send failed:', error)
    return { success: false, error: String(error) }
  }
}

export async function sendContactEmail(name: string, email: string, message: string) {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Contact: ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Email send failed:', error)
    return { success: false, error: String(error) }
  }
}
