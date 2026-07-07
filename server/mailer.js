const nodemailer = require('nodemailer');

const { EMAIL_USER, EMAIL_APP_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_APP_PASSWORD
  }
});

function wrapper(title, bodyHtml) {
  return `
  <div style="font-family:Manrope,Arial,sans-serif;background:#05080e;padding:32px;color:#f5f8fc">
    <div style="max-width:520px;margin:0 auto;background:#0a1910;border:1px solid #1a3828;border-radius:14px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#16ff87,#06d763);padding:22px 28px">
        <span style="font-weight:800;font-size:20px;color:#052012;letter-spacing:.02em">PGC — Pakistan Gamers Community</span>
      </div>
      <div style="padding:30px 28px">
        <h2 style="margin:0 0 14px;font-size:22px;color:#f5f8fc">${title}</h2>
        <div style="font-size:14px;line-height:1.7;color:#c9dcd1">${bodyHtml}</div>
      </div>
      <div style="padding:18px 28px;border-top:1px solid #1a3828;font-size:11px;color:#6f8e7d">
        © ${new Date().getFullYear()} Pakistan Gamers Community · pgcmc.fun
      </div>
    </div>
  </div>`;
}

async function sendApprovalEmail(application) {
  const html = wrapper(
    'Your application has been approved 🎉',
    `<p>Hey <b>${escapeHtml(application.name)}</b>,</p>
     <p>Great news — your <b>${escapeHtml(application.type)}</b> application to Pakistan Gamers Community has been <b style="color:#16ff87">approved</b>.</p>
     <p>Please join our Discord and open a ticket so we can get you set up with your role:</p>
     <p><a href="https://discord.gg/qnHJZddjTW" style="color:#38ffc7">discord.gg/qnHJZddjTW</a></p>
     <p>Welcome aboard!</p>`
  );

  return transporter.sendMail({
    from: `"Pakistan Gamers Community" <${EMAIL_USER}>`,
    to: application.email,
    subject: `Your ${application.type} application — Approved ✅`,
    html
  });
}

async function sendRejectionEmail(application, reason) {
  const html = wrapper(
    'An update on your application',
    `<p>Hey <b>${escapeHtml(application.name)}</b>,</p>
     <p>Thanks for applying for <b>${escapeHtml(application.type)}</b> at Pakistan Gamers Community. After review, we won't be moving forward with your application at this time.</p>
     ${reason ? `<p><i>${escapeHtml(reason)}</i></p>` : ''}
     <p>You're welcome to apply again in the future — feel free to stay active in our Discord.</p>`
  );

  return transporter.sendMail({
    from: `"Pakistan Gamers Community" <${EMAIL_USER}>`,
    to: application.email,
    subject: `Your ${application.type} application — Update`,
    html
  });
}

function escapeHtml(str = '') {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

module.exports = { sendApprovalEmail, sendRejectionEmail };
