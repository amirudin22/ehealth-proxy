# eHealth Proxy — Backend untuk API Pendaftaran eHealth Surabaya

Proxy serverless (Vercel) yang membungkus endpoint `pendaftaranv2`
ehealth.surabaya.go.id jadi REST JSON sederhana. Untuk pengujian.

## Deploy ke Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/amirudin22/ehealth-proxy)

atau via CLI: `vercel --prod` (perlu `vercel login` dulu)

## Endpoints

| Method | Path | Body / Query | Fungsi |
|---|---|---|---|
| GET | `/api/health` | — | Cek hidup + panaskan sesi |
| GET | `/api/poli` | — | Daftar poli harian |
| POST | `/api/cek-nik` | `{idunitkerja, NIK}` | Cari data pasien |
| POST | `/api/cek-bpjs` | `{idunitkerja, NIK}` | Validasi BPJS |
| POST | `/api/daftar` | `{...arrdata}` | Buat antrean |
| GET | `/api/batal?id=` | — | Batalkan antrean |
| GET | `/api/rujukan?noka=&id=` | — | Cek rujukan |
| GET | `/api/master?jenis=` | `bahasa\|pekerjaan\|suku` | Data master |
| POST | `/api/refresh` | — | Buang sesi + buka baru (clear cache) |

Semua response: `{ ok: true, data: ... }` atau `{ ok: false, error }`.

## Cara kerja

Situs aslinya mengenkripsi payload (AES + LZString) dengan `_token` yang
berubah tiap page load + cookie session Laravel. Proxy ini otomatis:
buka sesi (scrape token fresh) → panggil endpoint → kembalikan JSON bersih.
Kalau 419/403 → sesi baru + retry sekali, otomatis.

## Pengembangan lokal

```bash
npm install
node -e "require('./api/poli.js')({method:'GET',query:{}},{setHeader(){},status(c){this.c=c;return this},json(o){console.log(this.c,JSON.stringify(o).slice(0,200))},end(){}})"
```
