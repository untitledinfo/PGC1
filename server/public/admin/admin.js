const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const API = ''; // same-origin: server also serves this admin panel

const loginView = $('#loginView'), dashView = $('#dashboardView');
const toastEl = $('#toast');
function toast(msg, isError = false) {
  toastEl.textContent = msg;
  toastEl.classList.toggle('error', isError);
  toastEl.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toastEl.classList.remove('show'), 2600);
}

async function api(path, options = {}) {
  const res = await fetch(API + path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (res.status === 401) { showLogin(); throw new Error('Not authenticated'); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// ---------- Auth ----------
function showLogin() { loginView.hidden = false; dashView.hidden = true; }
function showDash() { loginView.hidden = true; dashView.hidden = false; }

$('#loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = $('#loginEmail').value.trim();
  const password = $('#loginPassword').value;
  const errEl = $('#loginError');
  errEl.hidden = true;
  try {
    const data = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    $('#whoAmI').textContent = data.email;
    showDash();
    boot();
  } catch (err) {
    errEl.textContent = err.message || 'Login failed';
    errEl.hidden = false;
  }
});

$('#logoutBtn').addEventListener('click', async () => {
  await api('/api/auth/logout', { method: 'POST' });
  closeStream();
  showLogin();
});

// ---------- State ----------
let state = { status: 'all', type: 'all', q: '' };
let applications = [];

async function checkSession() {
  try {
    const data = await api('/api/auth/me');
    $('#whoAmI').textContent = data.email;
    showDash();
    boot();
  } catch {
    showLogin();
  }
}

async function boot() {
  await Promise.all([loadStats(), loadApplications()]);
  openStream();
  setInterval(refreshTimestamps, 30000);
}

// ---------- Data loading ----------
async function loadStats() {
  const s = await api('/api/applications/stats');
  $('#statTotal').textContent = s.total;
  $('#statPending').textContent = s.pending;
  $('#statApproved').textContent = s.approved;
  $('#statRejected').textContent = s.rejected;
  $('#stat24h').textContent = s.last24h;
}

async function loadApplications() {
  const params = new URLSearchParams({ status: state.status, type: state.type, q: state.q });
  applications = await api(`/api/applications?${params.toString()}`);
  renderTable();
}

function renderTable() {
  const body = $('#appsBody');
  const empty = $('#emptyState');
  if (!applications.length) {
    body.innerHTML = '';
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  body.innerHTML = applications.map(rowHtml).join('');
  $$('.msg-cell', body).forEach((el) => el.addEventListener('click', () => el.classList.toggle('expanded')));
  $$('[data-approve]', body).forEach((b) => b.addEventListener('click', () => handleApprove(b.dataset.approve)));
  $$('[data-reject]', body).forEach((b) => b.addEventListener('click', () => handleReject(b.dataset.reject)));
  $$('[data-delete]', body).forEach((b) => b.addEventListener('click', () => handleDelete(b.dataset.delete)));
}

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso + 'Z').getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
function refreshTimestamps() {
  $$('[data-created]').forEach((el) => { el.textContent = timeAgo(el.dataset.created); });
}

function rowHtml(a) {
  const actions = a.status === 'pending'
    ? `<button class="btn btn-blue btn-sm" data-approve="${a.id}">Approve</button>
       <button class="btn btn-ghost btn-sm" data-reject="${a.id}">Reject</button>`
    : '';
  return `
  <tr data-row="${a.id}">
    <td><span class="type-badge">${esc(a.type)}</span></td>
    <td class="name-cell"><b>${esc(a.name)}</b><small>${esc(a.email)}</small></td>
    <td>${esc(a.discord)}</td>
    <td>${a.age ?? '—'}</td>
    <td class="msg-cell" title="Click to expand">${esc(a.message || '—')}</td>
    <td data-created="${a.created_at}">${timeAgo(a.created_at)}</td>
    <td><span class="status-pill ${a.status}">${a.status}</span></td>
    <td><div class="row-actions">${actions}<button class="btn btn-danger btn-sm" data-delete="${a.id}">Delete</button></div></td>
  </tr>`;
}
function esc(s = '') {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ---------- Filters ----------
$$('#statusTabs button').forEach((b) => b.addEventListener('click', () => {
  $$('#statusTabs button').forEach((x) => x.classList.toggle('active', x === b));
  state.status = b.dataset.status;
  loadApplications();
}));
$('#typeFilter').addEventListener('change', (e) => { state.type = e.target.value; loadApplications(); });
let searchDebounce;
$('#searchBox').addEventListener('input', (e) => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => { state.q = e.target.value.trim(); loadApplications(); }, 300);
});
$('#refreshBtn').addEventListener('click', () => { loadStats(); loadApplications(); });

// ---------- Confirm dialog helper ----------
const confirmDialog = $('#confirmDialog');
function confirmAction({ text, needsReason = false }) {
  return new Promise((resolve) => {
    $('#confirmText').textContent = text;
    const reasonBox = $('#confirmReason');
    reasonBox.hidden = !needsReason;
    reasonBox.value = '';
    confirmDialog.showModal();
    const onOk = () => { cleanup(); resolve({ confirmed: true, reason: reasonBox.value.trim() }); };
    const onCancel = () => { cleanup(); resolve({ confirmed: false }); };
    function cleanup() {
      confirmDialog.close();
      $('#confirmOk').removeEventListener('click', onOk);
      $('#confirmCancel').removeEventListener('click', onCancel);
    }
    $('#confirmOk').addEventListener('click', onOk);
    $('#confirmCancel').addEventListener('click', onCancel);
  });
}

// ---------- Actions ----------
async function handleApprove(id) {
  const app = applications.find((a) => String(a.id) === String(id));
  const { confirmed } = await confirmAction({ text: `Approve ${app.name}'s ${app.type} application? They'll get an email.` });
  if (!confirmed) return;
  try {
    const data = await api(`/api/applications/${id}/approve`, { method: 'PATCH' });
    toast(data.emailSent ? 'Approved — email sent ✅' : 'Approved, but the email failed to send ⚠️', !data.emailSent);
    loadStats(); loadApplications();
  } catch (err) { toast(err.message, true); }
}

async function handleReject(id) {
  const app = applications.find((a) => String(a.id) === String(id));
  const { confirmed, reason } = await confirmAction({ text: `Reject ${app.name}'s ${app.type} application?`, needsReason: true });
  if (!confirmed) return;
  try {
    const data = await api(`/api/applications/${id}/reject`, { method: 'PATCH', body: JSON.stringify({ reason }) });
    toast(data.emailSent ? 'Rejected — email sent' : 'Rejected, but the email failed to send', !data.emailSent);
    loadStats(); loadApplications();
  } catch (err) { toast(err.message, true); }
}

async function handleDelete(id) {
  const app = applications.find((a) => String(a.id) === String(id));
  const { confirmed } = await confirmAction({ text: `Permanently delete ${app.name}'s application? This can't be undone.` });
  if (!confirmed) return;
  try {
    await api(`/api/applications/${id}`, { method: 'DELETE' });
    toast('Deleted');
    loadStats(); loadApplications();
  } catch (err) { toast(err.message, true); }
}

// ---------- Live updates (SSE) ----------
let stream;
function openStream() {
  closeStream();
  stream = new EventSource(`${API}/api/applications/stream`, { withCredentials: true });
  stream.addEventListener('open', () => $('#liveDot').classList.remove('offline'));
  stream.addEventListener('error', () => $('#liveDot').classList.add('offline'));
  stream.addEventListener('new-application', () => { toast('New application received 📥'); loadStats(); loadApplications(); });
  stream.addEventListener('updated-application', () => { loadStats(); loadApplications(); });
  stream.addEventListener('deleted-application', () => { loadStats(); loadApplications(); });
}
function closeStream() { if (stream) { stream.close(); stream = null; } }

checkSession();
