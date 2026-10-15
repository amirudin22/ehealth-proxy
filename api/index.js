// GET / — landing page dokumentasi API (HTML)
const { cors } = require('./_util');

const ROWS = [
  ['GET', '/api/health', 'Cek hidup + panaskan sesi'],
  ['GET', '/api/poli', 'Daftar poli harian'],
  ['GET', '/api/tanggal?idunitkerja=&idbppoli=', 'Tanggal layanan + sisa kuota'],
  ['POST', '/api/cek-nik', '{idunitkerja, NIK} — cari data pasien'],
  ['POST', '/api/cek-bpjs', '{idunitkerja, NIK} — validasi BPJS'],
  ['POST', '/api/daftar', '{...arrdata} — buat antrean'],
  ['GET', '/api/batal?id=', 'Batalkan antrean'],
  ['GET', '/api/rujukan?noka=&id=', 'Cek rujukan'],
  ['GET', '/api/master?jenis=', 'bahasa | pekerjaan | suku'],
  ['POST', '/api/refresh', 'Buang sesi + buka baru (clear cache)'],
];

module.exports = async (req, res) => {
  cors(res);
  const rows = ROWS.map(
    ([m, p, d]) =>
      `<tr><td><b>${m}</b></td><td><code>${p}</code></td><td>${d}</td></tr>`
  ).join('');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">
<title>eHealth Proxy</title><style>body{font-family:system-ui,sans-serif;max-width:720px;margin:2em auto;padding:0 1em}
table{border-collapse:collapse;width:100%}td,th{border:1px solid #ddd;padding:8px;text-align:left}
code{background:#f4f4f4;padding:2px 6px;border-radius:4px}</style></head>
<body><h1>eHealth Proxy</h1><p>Backend proxy API pendaftaran eHealth Surabaya. Semua response JSON:
<code>{ok:true, data:...}</code></p>
<table><tr><th>Method</th><th>Path</th><th>Fungsi</th></tr>${rows}</table>
<p>Coba: <a href="/api/poli">/api/poli</a> · <a href="/api/health">/api/health</a></p>
</body></html>`);
};
