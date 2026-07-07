const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'pgc.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS applications (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    type          TEXT NOT NULL,               -- Staff / Developer / Creator / Event
    name          TEXT NOT NULL,
    email         TEXT NOT NULL,
    discord       TEXT NOT NULL,
    role          TEXT,
    age           INTEGER,
    message       TEXT,
    status        TEXT NOT NULL DEFAULT 'pending',  -- pending / approved / rejected
    ip_hash       TEXT,
    created_at    TEXT NOT NULL DEFAULT (datetime('now')),
    decided_at    TEXT,
    decided_by    TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
  CREATE INDEX IF NOT EXISTS idx_applications_type ON applications(type);
  CREATE INDEX IF NOT EXISTS idx_applications_created ON applications(created_at);

  CREATE TABLE IF NOT EXISTS audit_log (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    actor       TEXT NOT NULL,
    action      TEXT NOT NULL,
    target_id   INTEGER,
    detail      TEXT,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

function logAction(actor, action, targetId, detail) {
  db.prepare(
    'INSERT INTO audit_log (actor, action, target_id, detail) VALUES (?, ?, ?, ?)'
  ).run(actor, action, targetId ?? null, detail ?? null);
}

module.exports = { db, logAction };
