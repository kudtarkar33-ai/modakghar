/**
 * Modak Ghar — local server
 * Pure Node.js (no npm install required). Run with: node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');
const DATA_DIR = path.join(ROOT, 'data');
const PHOTOS_FILE = path.join(DATA_DIR, 'photos.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

// ---- Admin credentials -----------------------------------------------
// Change these any time — they only live here on the server, never sent
// to the browser and never shown anywhere on the site itself.
const ADMIN_USERNAME = 'rasika.modakghar';
const ADMIN_PASSWORD = 'Modak@9172!Ghar';
// ------------------------------------------------------------------------

// In-memory session tokens (fine for a small single-admin local site)
const sessions = new Map(); // token -> expiry timestamp
const SESSION_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours

function makeToken() {
  return crypto.randomBytes(24).toString('hex');
}

function isValidToken(token) {
  if (!token) return false;
  const expiry = sessions.get(token);
  if (!expiry) return false;
  if (Date.now() > expiry) {
    sessions.delete(token);
    return false;
  }
  return true;
}

function readJSON(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return fallback;
  }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

function sendJSON(res, statusCode, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function collectBody(req) {
  return new Promise((resolve, reject) => {
    let chunks = [];
    let size = 0;
    const MAX = 15 * 1024 * 1024; // 15MB cap per request
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function parseJSONBody(req) {
  const buf = await collectBody(req);
  if (!buf.length) return {};
  try {
    return JSON.parse(buf.toString('utf8'));
  } catch (e) {
    return {};
  }
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function serveStaticFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

function safeJoinPublic(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const resolved = path.normalize(path.join(PUBLIC_DIR, decoded));
  if (!resolved.startsWith(PUBLIC_DIR)) return null; // block path traversal
  return resolved;
}

const server = http.createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;

  // ---------------- API routes ----------------
  if (url.startsWith('/api/')) {
    // Public: list photos
    if (url === '/api/photos' && method === 'GET') {
      const photos = readJSON(PHOTOS_FILE, []);
      return sendJSON(res, 200, { photos });
    }

    // Public: get settings (instagram link etc.)
    if (url === '/api/settings' && method === 'GET') {
      const settings = readJSON(SETTINGS_FILE, { instagramUrl: '' });
      return sendJSON(res, 200, settings);
    }

    // Admin login
    if (url === '/api/admin/login' && method === 'POST') {
      const body = await parseJSONBody(req);
      if (body.username === ADMIN_USERNAME && body.password === ADMIN_PASSWORD) {
        const token = makeToken();
        sessions.set(token, Date.now() + SESSION_TTL_MS);
        return sendJSON(res, 200, { ok: true, token });
      }
      return sendJSON(res, 401, { ok: false, error: 'Invalid username or password.' });
    }

    // Admin logout
    if (url === '/api/admin/logout' && method === 'POST') {
      const body = await parseJSONBody(req);
      sessions.delete(body.token);
      return sendJSON(res, 200, { ok: true });
    }

    // Admin: check session
    if (url === '/api/admin/check' && method === 'POST') {
      const body = await parseJSONBody(req);
      return sendJSON(res, 200, { ok: isValidToken(body.token) });
    }

    // Admin: upload a photo (base64 data URL from the browser)
    if (url === '/api/admin/photos' && method === 'POST') {
      const body = await parseJSONBody(req);
      if (!isValidToken(body.token)) return sendJSON(res, 401, { ok: false, error: 'Session expired. Please log in again.' });

      const { dataUrl, captionEn, captionMr } = body;
      if (!dataUrl || !dataUrl.startsWith('data:image/')) {
        return sendJSON(res, 400, { ok: false, error: 'No valid image received.' });
      }
      const match = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
      if (!match) return sendJSON(res, 400, { ok: false, error: 'Could not read image data.' });

      let ext = match[1].toLowerCase();
      if (ext === 'jpeg') ext = 'jpg';
      const base64 = match[2];
      const id = 'ph_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex');
      const filename = `${id}.${ext}`;
      const filePath = path.join(UPLOADS_DIR, filename);

      try {
        fs.writeFileSync(filePath, Buffer.from(base64, 'base64'));
      } catch (e) {
        return sendJSON(res, 500, { ok: false, error: 'Could not save the image on the server.' });
      }

      const photos = readJSON(PHOTOS_FILE, []);
      const entry = {
        id,
        filename,
        captionEn: captionEn || 'Modak Ghar',
        captionMr: captionMr || 'मोदक घर',
      };
      photos.unshift(entry);
      writeJSON(PHOTOS_FILE, photos);
      return sendJSON(res, 200, { ok: true, photo: entry, photos });
    }

    // Admin: delete a photo
    if (url.startsWith('/api/admin/photos/') && method === 'DELETE') {
      const body = await parseJSONBody(req);
      if (!isValidToken(body.token)) return sendJSON(res, 401, { ok: false, error: 'Session expired. Please log in again.' });

      const id = decodeURIComponent(url.split('/api/admin/photos/')[1]);
      const photos = readJSON(PHOTOS_FILE, []);
      const idx = photos.findIndex((p) => p.id === id);
      if (idx === -1) return sendJSON(res, 404, { ok: false, error: 'Photo not found.' });

      const [removed] = photos.splice(idx, 1);
      writeJSON(PHOTOS_FILE, photos);
      const filePath = path.join(UPLOADS_DIR, removed.filename);
      fs.unlink(filePath, () => {}); // best-effort delete of the file itself

      return sendJSON(res, 200, { ok: true, photos });
    }

    // Admin: update settings (e.g. Instagram link)
    if (url === '/api/admin/settings' && method === 'POST') {
      const body = await parseJSONBody(req);
      if (!isValidToken(body.token)) return sendJSON(res, 401, { ok: false, error: 'Session expired. Please log in again.' });

      const settings = readJSON(SETTINGS_FILE, { instagramUrl: '' });
      if (typeof body.instagramUrl === 'string') settings.instagramUrl = body.instagramUrl.trim();
      writeJSON(SETTINGS_FILE, settings);
      return sendJSON(res, 200, { ok: true, settings });
    }

    return sendJSON(res, 404, { ok: false, error: 'Unknown API route.' });
  }

  // ---------------- Static files ----------------
  let filePath = safeJoinPublic(url === '/' ? '/index.html' : url);
  if (!filePath) {
    res.writeHead(400);
    return res.end('Bad request');
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (!fs.existsSync(filePath)) {
    // SPA-friendly fallback to index.html for unknown non-file routes
    filePath = path.join(PUBLIC_DIR, 'index.html');
  }
  serveStaticFile(res, filePath);
});

server.listen(PORT, () => {
  console.log('');
  console.log('  🌺  Modak Ghar is running!');
  console.log(`  ➜  Open http://localhost:${PORT} in your browser`);
  console.log('');
});
