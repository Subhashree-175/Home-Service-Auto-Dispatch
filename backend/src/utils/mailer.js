const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: Number(process.env.SMTP_PORT || 465) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendPasswordResetEmail(email, resetLink) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('Email service is not configured');
  }

  await transporter.sendMail({
    from: `"DispatchHub" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Reset your DispatchHub password',
    text: `You requested a password reset.

Open this link to reset your password:
${resetLink}

This link expires in 15 minutes. If you did not request this, ignore this email.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
        <h2>Reset your DispatchHub password</h2>
        <p>You requested a password reset for your account.</p>
        <p>
          <a href="${resetLink}"
             style="background:#2563eb;color:white;padding:12px 20px;
                    text-decoration:none;border-radius:6px">
            Reset Password
          </a>
        </p>
        <p>This link expires in 15 minutes.</p>
        <p>If you did not request this, you can ignore this email.</p>
      </div>
    `,
  });
}

module.exports = { sendPasswordResetEmail };