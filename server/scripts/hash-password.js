#!/usr/bin/env node
/**
 * Generates a bcrypt hash for the admin password.
 *
 * Usage:
 *   node scripts/hash-password.js "YourPasswordHere"
 *
 * Copy the printed hash into .env as ADMIN_PASSWORD_HASH.
 * The plain-text password is never stored anywhere after this.
 */
const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/hash-password.js "YourPasswordHere"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
console.log('\nAdd this line to your .env file:\n');
console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
