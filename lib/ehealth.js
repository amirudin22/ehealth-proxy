/**
 * eHealth Surabaya proxy lib — Vercel serverless (Node 20, CommonJS)
 * npm i crypto-js lz-string
 *
 * Catatan serverless: `session` di module-scope = best-effort cache
 * (warm instance pakai ulang). Kalau 419/403 -> sesi baru + retry sekali,
 * jadi correctness tidak bergantung pada cache.
 */
const https = require('https');
const CryptoJS = require('crypto-js');
const LZString = require('lz-string');

const PAGE_URL = 'https://ehealth.surabaya.go.id/pendaftaranv2/';
const AES_KEY = 'ABCDEFGHIJLMNOPQRSTUWXYZbcdefghijklmnopqrstvwxyz0123456789+/=';

const JsonFormatter = {
  stringify(cp) {
    const j = { ct: cp.ciphertext.toString(CryptoJS.enc.Base64) };
    if (cp.iv) j.iv = cp.iv.toString();
    if (cp.salt) j.s = cp.salt.toString();
    return JSON.stringify(j);
  },
  parse(s) {
    const j = JSON.parse(s);
    const cp = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(j.ct),
    });
    if (j.iv) cp.iv = CryptoJS.enc.Hex.parse(j.iv);
    if (j.s) cp.salt = CryptoJS.enc.Hex.parse(j.s);
    return cp;
  },
};

function encPayload(obj) {
  const pa = CryptoJS.AES.encrypt(JSON.stringify(obj), AES_KEY, {
    format: JsonFormatter,
  }).toString();
  return LZString.compressToEncodedURIComponent(JSON.stringify(pa));
}

function decResponse(body) {
  const inner = JSON.parse(LZString.decompressFromBase64(JSON.parse(body)));
  const plain = CryptoJS.AES.decrypt(inner, AES_KEY, {
    format: JsonFormatter,
  }).toString(CryptoJS.enc.Utf8);
  return JSON.parse(plain);
}

// ---------- HTTP + cookie jar ----------
function request(url, { method = 'GET', headers = {}, body = null } = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method,
        headers,
        timeout: 25000,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(request(res.headers.location, { method, headers, body }));
        }
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () =>
          resolve({ status: res.statusCode, headers: res.headers, body: data })
        );
      }
    );
    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('timeout')));
    if (body) req.write(body);
    req.end();
  });
}

function mergeCookies(jar, setCookie) {
  jar = jar || {};
  for (const sc of setCookie || []) {
    const pair = sc.split(';')[0];
    const i = pair.indexOf('=');
    if (i > 0) jar[pair.slice(0, i).trim()] = pair.slice(i + 1).trim();
  }
  return jar;
}
const jarHeader = (jar) =>
  Object.entries(jar || {})
    .map(([k, v]) => `${k}=${v}`)
    .join('; ');

function decodeBlock(code) {
  let captured = null;
  try {
    new Function('eval', code)((s) => {
      captured = s;
    });
  } catch {
    /* abaikan */
  }
  return captured;
}

// ---------- session ----------
let session = null;

async function openSession() {
  const res = await request(PAGE_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10)' },
  });
  if (res.status !== 200) throw new Error('gagal buka halaman: ' + res.status);
  const cookies = mergeCookies(null, res.headers['set-cookie']);
  let token = null;
  const blocks = [
    ...res.body.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi),
  ]
    .map((m) => m[1])
    .filter((s) => s.includes('eval('));
  for (const code of blocks) {
    const dec = decodeBlock(code);
    if (!dec) continue;
    token = token || /_token="\+\"([^\"]+)"/.exec(dec)?.[1];
    if (token) break;
  }
  if (!token) throw new Error('token tidak ketemu di HTML terbaru');
  session = { token, cookies, fetchedAt: Date.now() };
  return session;
}

async function getSession(maxAgeMs = 30 * 60 * 1000) {
  if (session && Date.now() - session.fetchedAt < maxAgeMs) return session;
  return openSession();
}

async function clearCache() {
  session = null;
  return openSession();
}

const BASE_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Linux; Android 10)',
  Referer: PAGE_URL,
};

async function ehealthFetch(endpoint, { method = 'GET', body = null } = {}, attempt = 0) {
  const s = await getSession();
  const headers = {
    ...BASE_HEADERS,
    Cookie: jarHeader(s.cookies),
  };
  let finalBody = body;
  if (method === 'POST') {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    finalBody = body.replace(/_token=[^&]*/, `_token=${s.token}`);
  }
  const res = await request(PAGE_URL + endpoint, { method, headers, body: finalBody });
  if ((res.status === 419 || res.status === 403) && attempt === 0) {
    await clearCache();
    return ehealthFetch(endpoint, { method, body }, 1);
  }
  return res;
}

/** POST terenkripsi -> object hasil decrypt. */
async function apiPost(endpoint, obj) {
  const res = await ehealthFetch(endpoint, {
    method: 'POST',
    body: 'po=' + encPayload(obj) + '&_token=x',
  });
  if (res.status !== 200) throw new Error(`HTTP ${res.status} dari ${endpoint}`);
  return decResponse(res.body);
}

/** GET terenkripsi (response LZString+AES, mis. getpolidaily2). */
async function apiGetEncrypted(endpoint) {
  const res = await ehealthFetch(endpoint);
  if (res.status !== 200) throw new Error(`HTTP ${res.status} dari ${endpoint}`);
  return decResponse(res.body);
}

/** GET terkompres LZString TANPA enkripsi AES (mis. home/getpolidaily2). */
async function apiGetCompressed(endpoint) {
  const res = await ehealthFetch(endpoint);
  if (res.status !== 200) throw new Error(`HTTP ${res.status} dari ${endpoint}`);
  return JSON.parse(LZString.decompressFromBase64(JSON.parse(res.body)));
}

/** GET polos (master data, batalkan). */
async function apiGetPlain(endpoint) {
  const res = await ehealthFetch(endpoint);
  if (res.status !== 200) throw new Error(`HTTP ${res.status} dari ${endpoint}`);
  try {
    return JSON.parse(res.body);
  } catch {
    return res.body;
  }
}

module.exports = {
  apiPost,
  apiGetEncrypted,
  apiGetCompressed,
  apiGetPlain,
  clearCache,
  getSession,
  encPayload,
  decResponse,
};
