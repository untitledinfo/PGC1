const express = require('express');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const { db, logAction } = require('../db');
const { requireAuth } = require('../auth');
const { sendApprovalEmail, sendRejectionEmail } = require('../mailer');

const VALID_TYPES = new Set(['Staff', 'Developer', 'Creator', 'Event']);

// --- tiny SSE hub for "live updates" on the admin dashboard -----------------
const sseClients = new Set();
function broadcast(event, payload) {
  const data = `event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;
  for (const res of sseClients) res.write(data);
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeText(str, max = 2000) {
  return String(str ?? '').trim().slice(0, max);
}

function buildApplicationsRouter(allowedOrigins) {
  const router = express.Router();
  const auth = requireAuth(allowedOrigins);

  // Public: rate-limited application submission (10 per hour per IP)
  const submitLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many submissions from this network. Please try again later.' }
  });

  router.post('/', submitLimiter, (req, res) => {
    const { type, name, email, discord, role, age, message } = req.body || {};

    if (!VALID_TYPES.has(type)) return res.status(400).json({ error: 'Invalid application type' });
    if (!name || !discord || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Name, Discord username and a valid email are required' });
    }
    const ageNum = Number(age);
    if (!Number.isInteger(ageNum) || ageNum < 13 || ageNum > 120) {
      return res.status(400).json({ error: 'Age must be a number between 13 and 120' });
    }

    const ipHash = crypto.createHash('sha256').update(req.ip || '').digest('hex').slice(0, 16);

    const info = db.prepare(`
      INSERT INTO applications (type, name, email, discord, role, age, message, ip_hash)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      type,
      sanitizeText(name, 100),
      sanitizeText(email, 200),
      sanitizeText(discord, 100),
      sanitizeText(role, 200),
      ageNum,
      sanitizeText(message, 2000),
      ipHash
    );

    const row = db.prepare('SELECT * FROM applications WHERE id = ?').get(info.lastInsertRowid);
    broadcast('new-application', row);

    res.status(201).json({ ok: true, id: info.lastInsertRowid });
  });

  // Everything below requires an authenticated admin session
  router.use(auth);

  // List + filter + search
  router.get('/', (req, res) => {
    const { status, type, q } = req.query;
    let sql = 'SELECT * FROM applications WHERE 1=1';
    const params = [];

    if (status && status !== 'all') { sql += ' AND status = ?'; params.push(status); }
    if (type && type !== 'all') { sql += ' AND type = ?'; params.push(type); }
    if (q) {
      sql += ' AND (name LIKE ? OR email LIKE ? OR discord LIKE ?)';
      const like = `%${q}%`;
      params.push(like, like, like);
    }
    sql += ' ORDER BY created_at DESC LIMIT 500';

    const rows = db.prepare(sql).all(...params);
    res.json(rows);
  });

  router.get('/stats', (req, res) => {
    const total = db.prepare('SELECT COUNT(*) c FROM applications').get().c;
    const pending = db.prepare("SELECT COUNT(*) c FROM applications WHERE status='pending'").get().c;
    const approved = db.prepare("SELECT COUNT(*) c FROM applications WHERE status='approved'").get().c;
    const rejected = db.prepare("SELECT COUNT(*) c FROM applications WHERE status='rejected'").get().c;
    const last24h = db.prepare("SELECT COUNT(*) c FROM applications WHERE created_at >= datetime('now','-1 day')").get().c;
    res.json({ total, pending, approved, rejected, last24h });
  });

  // Live updates stream — the admin dashboard listens to this instead of polling
  router.get('/stream', (req, res) => {
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    });
    res.flushHeaders?.();
    res.write('retry: 3000\n\n');
    sseClients.add(res);

    const heartbeat = setInterval(() => res.write(':hb\n\n'), 25000);

    req.on('close', () => {
      clearInterval(heartbeat);
      sseClients.delete(res);
    });
  });

  router.patch('/:id/approve', async (req, res) => {
    const id = Number(req.params.id);
    const app = db.prepare('SELECT * FROM applications WHERE id = ?').get(id);
    if (!app) return res.status(404).json({ error: 'Application not found' });

    db.prepare(`
      UPDATE applications SET status='approved', decided_at=datetime('now'), decided_by=? WHERE id=?
    `).run(req.admin.sub, id);

    logAction(req.admin.sub, 'approve', id, `${app.type} — ${app.name}`);

    let emailSent = true;
    try {
      await sendApprovalEmail(app);
    } catch (err) {
      emailSent = false;
      console.error('Approval email failed:', err.message);
    }

    const updated = db.prepare('SELECT * FROM applications WHERE id = ?').get(id);
    broadcast('updated-application', updated);
    res.json({ ok: true, emailSent, application: updated });
  });

  router.patch('/:id/reject', async (req, res) => {
    const id = Number(req.params.id);
    const app = db.prepare('SELECT * FROM applications WHERE id = ?').get(id);
    if (!app) return res.status(404).json({ error: 'Application not found' });

    const reason = sanitizeText(req.body?.reason, 500);

    db.prepare(`
      UPDATE applications SET status='rejected', decided_at=datetime('now'), decided_by=? WHERE id=?
    `).run(req.admin.sub, id);

    logAction(req.admin.sub, 'reject', id, `${app.type} — ${app.name}${reason ? ` (${reason})` : ''}`);

    let emailSent = true;
    try {
      await sendRejectionEmail(app, reason);
    } catch (err) {
      emailSent = false;
      console.error('Rejection email failed:', err.message);
    }

    const updated = db.prepare('SELECT * FROM applications WHERE id = ?').get(id);
    broadcast('updated-application', updated);
    res.json({ ok: true, emailSent, application: updated });
  });

  router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const app = db.prepare('SELECT * FROM applications WHERE id = ?').get(id);
    if (!app) return res.status(404).json({ error: 'Application not found' });

    db.prepare('DELETE FROM applications WHERE id = ?').run(id);
    logAction(req.admin.sub, 'delete', id, `${app.type} — ${app.name}`);
    broadcast('deleted-application', { id });
    res.json({ ok: true });
  });

  return router;
}

module.exports = buildApplicationsRouter;
