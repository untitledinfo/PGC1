const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {
  ADMIN_EMAIL,
  ADMIN_PASSWORD_HASH,
  JWT_SECRET,
  SECURE_COOKIES
} = process.env;

const COOKIE_NAME = 'pgc_session';
const TOKEN_TTL = '2h';

function verifyCredentials(email, password) {
  if (!email || !password) return false;
  if (email.trim().toLowerCase() !== (ADMIN_EMAIL || '').trim().toLowerCase()) return false;
  if (!ADMIN_PASSWORD_HASH) return false;
  return bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
}

function issueToken(email) {
  return jwt.sign({ sub: email, role: 'admin' }, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

function setSessionCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: SECURE_COOKIES !== 'false',
    sameSite: 'strict',
    maxAge: 2 * 60 * 60 * 1000 // 2 hours
  });
}

function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: SECURE_COOKIES !== 'false',
    sameSite: 'strict'
  });
}

// Requires a valid session cookie. Also checks Origin header on
// state-changing requests as defense-in-depth against CSRF, since the
// session is a cookie rather than a bearer token.
function requireAuth(allowedOrigins) {
  return (req, res, next) => {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const isStateChanging = ['POST', 'PATCH', 'PUT', 'DELETE'].includes(req.method);
    if (isStateChanging) {
      const origin = req.get('origin');
      if (origin && !allowedOrigins.includes(origin)) {
        return res.status(403).json({ error: 'Origin not allowed' });
      }
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.admin = payload;
      next();
    } catch {
      return res.status(401).json({ error: 'Session expired, please log in again' });
    }
  };
}

module.exports = {
  COOKIE_NAME,
  verifyCredentials,
  issueToken,
  setSessionCookie,
  clearSessionCookie,
  requireAuth
};
