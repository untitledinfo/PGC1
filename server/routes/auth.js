const express = require('express');
const rateLimit = require('express-rate-limit');
const { verifyCredentials, issueToken, setSessionCookie, clearSessionCookie, requireAuth } = require('../auth');

function buildAuthRouter(allowedOrigins) {
  const router = express.Router();

  // Slow brute-force login attempts to a crawl: 8 tries per 15 min per IP.
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 8,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many login attempts. Try again in a few minutes.' }
  });

  router.post('/login', loginLimiter, (req, res) => {
    const { email, password } = req.body || {};
    if (!verifyCredentials(email, password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = issueToken(email.trim().toLowerCase());
    setSessionCookie(res, token);
    res.json({ ok: true, email: email.trim().toLowerCase() });
  });

  router.post('/logout', (req, res) => {
    clearSessionCookie(res);
    res.json({ ok: true });
  });

  router.get('/me', requireAuth(allowedOrigins), (req, res) => {
    res.json({ email: req.admin.sub });
  });

  return router;
}

module.exports = buildAuthRouter;
