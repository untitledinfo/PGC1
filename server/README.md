# PGC Admin Server

A small, secure Node.js + Express + SQLite backend that gives your site:

- **A real database** of applications (Staff / Developer / Creator / Event), instead of `localStorage` + an emailed form.
- **An admin panel** at `/admin` — login, live-updating table of every application, filters/search, one-click **Approve** / **Reject** / **Delete**.
- **Automatic emails** — when you click Approve or Reject, the applicant gets an email from your Gmail address.
- Security basics: hashed password (never stored in plain text), signed session cookies, rate limiting, CORS lockdown, security headers.

---

## 1. Why this is a separate server

Your site (`pgcmc.fun`) is hosted on **GitHub Pages**, which only serves static files — it cannot run a database or send email. So this backend runs **separately**, on any Node.js host (Render, Railway, Fly.io, a VPS, etc.), and your site's forms call it over the network.

```
pgcmc.fun (GitHub Pages, static)  ──fetch()──▶  your-api-domain (this server)  ──▶  SQLite DB + Gmail
```

---

## 2. Local setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env`:

1. **Admin password** — never put the plain password in a file. Generate a hash instead:
   ```bash
   npm run hash-password -- "YourRealPassword"
   ```
   Copy the printed `ADMIN_PASSWORD_HASH=...` line into `.env`.

2. **JWT secret** — any long random string:
   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ```

3. **Gmail app password** — Gmail rejects your normal account password for SMTP. You need an **App Password**:
   - Turn on 2-Step Verification: https://myaccount.google.com/security
   - Create an app password: https://myaccount.google.com/apppasswords
   - Paste the 16-character code as `EMAIL_APP_PASSWORD` (no spaces).

4. **ALLOWED_ORIGINS** — your real site origins, comma-separated (already filled in with `pgcmc.fun` + GitHub Pages).

Then run it:

```bash
npm start
```

Visit `http://localhost:4000/admin` and log in with your admin email + the real password you hashed above.

---

## 3. Deploying it for real (pick one)

**Render (easiest, free tier available)**
1. Push this repo to GitHub (make sure `.env` is *not* committed — it's git-ignored already).
2. Render → New → Web Service → connect the repo → set **root directory** to `server`.
3. Build command: `npm install` · Start command: `npm start`.
4. Add every variable from `.env.example` under Render's "Environment" tab (with your real values).
5. Once live, copy the Render URL (e.g. `https://pgc-admin.onrender.com`).

**Railway / Fly.io / a VPS** — same idea: set the environment variables from `.env.example`, run `npm install && npm start`, point a domain at it (e.g. `api.pgcmc.fun`).

Then in the main site's `app.js`, update:
```js
const PGC_API_BASE='https://api.pgcmc.fun'; // ← your deployed URL
```

And add that same URL's origin to `ALLOWED_ORIGINS` on the server.

---

## 4. Using the admin panel

- Go to `https://your-api-domain/admin`
- Log in with your admin email + password
- See live stats (total / pending / approved / rejected / last 24h)
- Filter by status/type, search by name/email/discord
- Click **Approve** → applicant instantly gets an email; the row updates for every open admin session in real time (Server-Sent Events, no refresh needed)
- Click **Reject** → optional reason, applicant gets a polite email
- Click **Delete** → removes the record permanently

---

## 5. Security notes (read this)

- The password you use to log in is **hashed with bcrypt** — the plain text is never written to disk or committed to Git.
- **`.env` must never be committed.** It's already in `.gitignore`. Double-check before your first `git push`.
- The session is a short-lived (2h), `httpOnly`, `Secure`, `SameSite=Strict` cookie — JavaScript on the page (and therefore XSS) can't read it, and cross-site requests can't ride along with it.
- Login attempts are rate-limited (8 per 15 minutes per IP); public application submissions are rate-limited too (10/hour per IP) to stop spam floods.
- CORS only allows the origins you list in `ALLOWED_ORIGINS` — random websites can't call your API.
- All database queries are parameterized (no SQL injection surface).
- If you ever suspect the admin password or JWT secret leaked, rotate both immediately (`npm run hash-password` again, generate a new `JWT_SECRET`, redeploy — this instantly logs out every session).

**About the credentials you shared in chat:** please treat `admin@gmail.com` / that password as already-rotated from here — don't reuse a password you've pasted into a chat for anything sensitive. Generate a fresh one, hash it locally, and use that.
