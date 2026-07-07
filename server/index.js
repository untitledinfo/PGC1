require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const buildAuthRouter = require('./routes/auth');
const buildApplicationsRouter = require('./routes/applications');

const REQUIRED_ENV = ['ADMIN_EMAIL', 'ADMIN_PASSWORD_HASH', 'JWT_SECRET', 'EMAIL_USER', 'EMAIL_APP_PASSWORD'];
const missing = REQUIRED_ENV.filter((k) => !process.env[k] || process.env[k].startsWith('replace_with'));
if (missing.length) {
  console.error(`\n⚠️  Missing/placeholder environment variables: ${missing.join(', ')}`);
  console.error('   Copy .env.example to .env and fill in real values before starting.\n');
  process.exit(1);
}

const app = express();
app.set('trust proxy', 1); // needed for secure cookies behind Render/Railway/NGINX

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

// --- Security headers -------------------------------------------------------
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"]
    }
  },
  crossOriginResourcePolicy: { policy: 'same-site' }
}));

// --- CORS: only the site's own origins may call the API --------------------
app.use(cors({
  origin(origin, cb) {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json({ limit: '20kb' }));
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Global safety-net rate limit on top of the per-route ones
app.use(rateLimit({ windowMs: 60 * 1000, limit: 120, standardHeaders: true, legacyHeaders: false }));

app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.use('/api/auth', buildAuthRouter(allowedOrigins));
app.use('/api/applications', buildApplicationsRouter(allowedOrigins));

// Serve the admin panel UI
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public/admin/index.html')));

// 404 + error handling
app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ PGC admin server running on port ${PORT}`);
  console.log(`   Admin panel: http://localhost:${PORT}/admin`);
});
