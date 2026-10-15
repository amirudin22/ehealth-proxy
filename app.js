/* Antre Puskesmas — logika frontend (vanilla JS, mobile-first). */
'use strict';

// ======== DATA (63 puskesmas, diekstrak dari ehealth.surabaya.go.id) ========
const PUSKESMAS=[{"id": 42, "nama": "Puskesmas Asemrowo", "wilayah": "BARAT"}, {"id": 41, "nama": "Puskesmas Balongsari", "wilayah": "BARAT"}, {"id": 103, "nama": "Puskesmas Bangkingan", "wilayah": "BARAT"}, {"id": 44, "nama": "Puskesmas Benowo", "wilayah": "BARAT"}, {"id": 45, "nama": "Puskesmas Jeruk", "wilayah": "BARAT"}, {"id": 46, "nama": "Puskesmas Lidah Kulon", "wilayah": "BARAT"}, {"id": 47, "nama": "Puskesmas Lontar", "wilayah": "BARAT"}, {"id": 104, "nama": "Puskesmas Made", "wilayah": "BARAT"}, {"id": 40, "nama": "Puskesmas Manukan Kulon", "wilayah": "BARAT"}, {"id": 43, "nama": "Puskesmas Sememi", "wilayah": "BARAT"}, {"id": 39, "nama": "Puskesmas Simomulyo", "wilayah": "BARAT"}, {"id": 38, "nama": "Puskesmas Tanjungsari", "wilayah": "BARAT"}, {"id": 51, "nama": "Puskesmas Dr. Soetomo", "wilayah": "PUSAT"}, {"id": 53, "nama": "Puskesmas Gundih", "wilayah": "PUSAT"}, {"id": 50, "nama": "Puskesmas Kedungdoro", "wilayah": "PUSAT"}, {"id": 49, "nama": "Puskesmas Ketabang", "wilayah": "PUSAT"}, {"id": 48, "nama": "Puskesmas Peneleh", "wilayah": "PUSAT"}, {"id": 55, "nama": "Puskesmas Simolawang", "wilayah": "PUSAT"}, {"id": 54, "nama": "Puskesmas Tambakrejo", "wilayah": "PUSAT"}, {"id": 52, "nama": "Puskesmas Tembok Dukuh", "wilayah": "PUSAT"}, {"id": 148, "nama": "Puskesmas Balas Klumprik", "wilayah": "SELATAN"}, {"id": 79, "nama": "Puskesmas Banyu Urip", "wilayah": "SELATAN"}, {"id": 85, "nama": "Puskesmas Dukuh Kupang", "wilayah": "SELATAN"}, {"id": 87, "nama": "Puskesmas Gayungan", "wilayah": "SELATAN"}, {"id": 81, "nama": "Puskesmas Jagir", "wilayah": "SELATAN"}, {"id": 88, "nama": "Puskesmas Jemursari", "wilayah": "SELATAN"}, {"id": 90, "nama": "Puskesmas Kebonsari", "wilayah": "SELATAN"}, {"id": 84, "nama": "Puskesmas Kedurus", "wilayah": "SELATAN"}, {"id": 83, "nama": "Puskesmas Ngagel Rejo", "wilayah": "SELATAN"}, {"id": 80, "nama": "Puskesmas Pakis", "wilayah": "SELATAN"}, {"id": 78, "nama": "Puskesmas Putat Jaya", "wilayah": "SELATAN"}, {"id": 77, "nama": "Puskesmas Sawahan", "wilayah": "SELATAN"}, {"id": 89, "nama": "Puskesmas Sidosermo", "wilayah": "SELATAN"}, {"id": 151, "nama": "Puskesmas Siwalankerto", "wilayah": "SELATAN"}, {"id": 86, "nama": "Puskesmas Wiyung", "wilayah": "SELATAN"}, {"id": 82, "nama": "Puskesmas Wonokromo", "wilayah": "SELATAN"}, {"id": 67, "nama": "Puskesmas Gading", "wilayah": "TIMUR"}, {"id": 73, "nama": "Puskesmas Gunung Anyar", "wilayah": "TIMUR"}, {"id": 138, "nama": "Puskesmas Kalijudan", "wilayah": "TIMUR"}, {"id": 70, "nama": "Puskesmas Kalirungkut", "wilayah": "TIMUR"}, {"id": 135, "nama": "Puskesmas Keputih", "wilayah": "TIMUR"}, {"id": 75, "nama": "Puskesmas Klampis Ngasem", "wilayah": "TIMUR"}, {"id": 71, "nama": "Puskesmas Medokan Ayu", "wilayah": "TIMUR"}, {"id": 74, "nama": "Puskesmas Menur", "wilayah": "TIMUR"}, {"id": 69, "nama": "Puskesmas Mojo", "wilayah": "TIMUR"}, {"id": 76, "nama": "Puskesmas Mulyorejo", "wilayah": "TIMUR"}, {"id": 66, "nama": "Puskesmas Pacarkeling", "wilayah": "TIMUR"}, {"id": 68, "nama": "Puskesmas Pucangsewu", "wilayah": "TIMUR"}, {"id": 65, "nama": "Puskesmas Rangkah", "wilayah": "TIMUR"}, {"id": 72, "nama": "Puskesmas Tenggilis", "wilayah": "TIMUR"}, {"id": 122, "nama": "Puskesmas Bulak Banteng", "wilayah": "UTARA"}, {"id": 61, "nama": "Puskesmas Dupak", "wilayah": "UTARA"}, {"id": 62, "nama": "Puskesmas Kenjeran", "wilayah": "UTARA"}, {"id": 60, "nama": "Puskesmas Krembangan Selatan", "wilayah": "UTARA"}, {"id": 117, "nama": "Puskesmas Moro Krembangan ", "wilayah": "UTARA"}, {"id": 57, "nama": "Puskesmas Pegirian", "wilayah": "UTARA"}, {"id": 56, "nama": "Puskesmas Perak Timur", "wilayah": "UTARA"}, {"id": 984, "nama": "Puskesmas Sawah Pulo", "wilayah": "UTARA"}, {"id": 58, "nama": "Puskesmas Sidotopo", "wilayah": "UTARA"}, {"id": 64, "nama": "Puskesmas Sidotopo Wetan", "wilayah": "UTARA"}, {"id": 121, "nama": "Puskesmas Tambak Wedi", "wilayah": "UTARA"}, {"id": 63, "nama": "Puskesmas Tanah Kali Kedinding", "wilayah": "UTARA"}, {"id": 59, "nama": "Puskesmas Wonokusumo", "wilayah": "UTARA"}];
const WILAYAH = ['BARAT', 'TIMUR', 'UTARA', 'SELATAN', 'PUSAT'];
const EMOJI_W = { BARAT: '🌅', TIMUR: '🌄', UTARA: '⚓', SELATAN: '🏘️', PUSAT: '🏛️' };

// ======== STATE ========
const S = {
  wilayah: '', idunitkerja: '', namaPuskesmas: '',
  idbppoli: '', poli: '', klaster: '',
  tanggal: '', tglformat: '',
  nik: '', pasien: null,
  idtypepasien: '', kodekartu: '',
  kodeBatal: '',
};

// ======== NAVIGASI ========
function go(id) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ======== API ========
function overlay(show, text) {
  const o = document.getElementById('overlay');
  o.style.display = show ? 'flex' : 'none';
  if (text) document.getElementById('overlay-text').textContent = text;
}
async function api(path, opts = {}) {
  const res = await fetch(path, {
    method: opts.method || 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const json = await res.json().catch(() => null);
  if (!json || !json.ok) throw new Error((json && json.error) || 'Gagal menghubungi server. Coba lagi.');
  return json.data;
}
function err(id, msg) {
  document.getElementById(id).textContent = msg || '';
}

// ======== 1. WILAYAH ========
function renderWilayah() {
  document.getElementById('list-wilayah').innerHTML = WILAYAH.map((w) => `
    <div class="card" onclick="pilihWilayah('${w}')">
      <div class="card-body"><div class="card-title">${EMOJI_W[w] || '📍'} Surabaya ${w[0] + w.slice(1).toLowerCase()}</div></div>
      <div class="check"></div>
    </div>`).join('');
}
function pilihWilayah(w) {
  S.wilayah = w;
  document.getElementById('cari-pusk').value = '';
  document.getElementById('sub-puskesmas').textContent =
    'Wilayah Surabaya ' + w[0] + w.slice(1).toLowerCase();
  renderPuskesmas();
  go('s-puskesmas');
}

// ======== 2. PUSKESMAS ========
function renderPuskesmas() {
  const q = document.getElementById('cari-pusk').value.trim().toLowerCase();
  const list = PUSKESMAS.filter((p) => p.wilayah === S.wilayah && p.nama.toLowerCase().includes(q));
  document.getElementById('list-puskesmas').innerHTML = list.length
    ? list.map((p) => `
      <div class="card" onclick="pilihPuskesmas(${p.id}, '${p.nama.replace(/'/g, "\\'")}')">
        <div class="card-body"><div class="card-title">${p.nama}</div></div>
        <div class="check"></div>
      </div>`).join('')
    : '<p class="muted">Tidak ketemu. Coba kata kunci lain.</p>';
}
function pilihPuskesmas(id, nama) {
  S.idunitkerja = String(id);
  S.namaPuskesmas = nama;
  document.getElementById('sub-poli').textContent = nama;
  loadPoli();
  go('s-poli');
}

// ======== 3. POLI ========
async function loadPoli() {
  const box = document.getElementById('list-poli');
  box.innerHTML = '<div class="loading">Mengambil data…</div>';
  try {
    const all = await api('/api/poli');
    const list = all.filter((p) => String(p.idunitkerja) === S.idunitkerja);
    box.innerHTML = list.length ? list.map((p) => {
      const sisa = (p.servesmax || 0) - (p.servesno || 0);
      const badge = p.servesmax > 0 ? `<span class="badge">Sisa kuota: ${sisa}</span>` : '';
      const nama = (p.policaption || p.nama).replace(/'/g, "\\'");
      const klas = (p.namaklaster || '').replace(/'/g, "\\'");
      return `<div class="card" onclick="pilihPoli('${p.noid}', '${nama}', '${klas}')">
        <div class="card-body">
          <div class="card-title">${p.policaption || p.nama}</div>
          ${p.namaklaster ? `<div class="card-sub">${p.namaklaster}</div>` : ''}
          ${badge}
        </div><div class="check"></div>
      </div>`;
    }).join('') : '<p class="muted">Belum ada poli tersedia.</p>';
  } catch (e) {
    box.innerHTML = `<p class="err">${e.message}</p><button class="btn secondary" onclick="loadPoli()">🔄 Coba Lagi</button>`;
  }
}
function pilihPoli(noid, nama, klaster) {
  S.idbppoli = String(noid);
  S.poli = nama;
  S.klaster = klaster;
  document.getElementById('sub-tanggal').textContent = `${S.namaPuskesmas} — ${nama}`;
  loadTanggal();
  go('s-tanggal');
}

// ======== 4. TANGGAL ========
function fmtTgl(val, hari, bulan) {
  const [y, m, d] = val.split('-');
  return `${hari}, ${parseInt(d, 10)} ${bulan} ${y}`;
}
async function loadTanggal() {
  const box = document.getElementById('list-tanggal');
  box.innerHTML = '<div class="loading">Mengambil data…</div>';
  try {
    const d = await api(`/api/tanggal?idunitkerja=${S.idunitkerja}&idbppoli=${S.idbppoli}`);
    const list = d.listdate || [];
    box.innerHTML = list.length ? list.map((t) => {
      const sisa = t.max ? t.max.sisa : null;
      const penuh = sisa !== null && sisa <= 0;
      const label = fmtTgl(t.val, t.dayofweek_string, t.month_string);
      const badge = sisa !== null
        ? `<span class="badge${penuh ? ' full' : ''}">${penuh ? 'PENUH' : 'Sisa kuota: ' + sisa}</span>` : '';
      return `<div class="card${penuh ? ' disabled' : ''}" ${penuh ? '' : `onclick="pilihTanggal('${t.val}', '${label.replace(/'/g, "\\'")}')"`}>
        <div class="card-body">
          <div class="card-title">${label}</div>
          ${t.isholidays ? '<div class="card-sub">Hari libur</div>' : ''}
          ${badge}
        </div><div class="check"></div>
      </div>`;
    }).join('') : '<p class="muted">Belum ada jadwal tersedia.</p>';
  } catch (e) {
    box.innerHTML = `<p class="err">${e.message}</p><button class="btn secondary" onclick="loadTanggal()">🔄 Coba Lagi</button>`;
  }
}
function pilihTanggal(val, label) {
  S.tanggal = val;
  S.tglformat = label;
  document.getElementById('sub-nik').textContent = `NIK: (diisi di bawah)`;
  go('s-nik');
}

// ======== 5. NIK ========
document.getElementById('in-nik').addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g, '');
  document.getElementById('hint-nik').textContent = `${e.target.value.length}/16 digit`;
});
async function cekNik() {
  const nik = document.getElementById('in-nik').value;
  err('err-nik', '');
  if (nik.length !== 16) return err('err-nik', 'NIK harus 16 angka. Periksa lagi ya.');
  overlay(true, 'Mengecek data ke puskesmas…');
  try {
    const hasil = await api('/api/cek-nik', { method: 'POST', body: { idunitkerja: S.idunitkerja, NIK: nik } });
    S.nik = nik;
    const data = Array.isArray(hasil) ? hasil[0] : hasil;
    S.pasien = data || null;
    renderData();
    go('s-data');
  } catch (e) {
    err('err-nik', e.message);
  } finally {
    overlay(false);
  }
}

// ======== 6. DATA PASIEN ========
function irow(l, v) {
  return `<div class="irow"><div class="ilabel">${l}</div><div class="ivalue">${v || '-'}</div></div>`;
}
function renderData() {
  const box = document.getElementById('box-data');
  document.getElementById('sub-nik').textContent = `NIK: ${S.nik}`;
  if (S.pasien) {
    const p = S.pasien;
    box.innerHTML = `
      <div class="infocard"><h3>Data ditemukan ✅</h3>
        ${irow('Nama lengkap', p.NAMA_LGKP)}
        ${irow('Alamat', p.ALAMAT)}
        ${irow('Tanggal lahir', p.TGL_LAHIR)}
        ${irow('Jenis kelamin', p.JENIS_KELAMIN)}
      </div>
      <button class="btn primary" onclick="go('s-penjamin')">Data Benar, Lanjut →</button>
      <button class="btn secondary" onclick="renderManual(true)">Isi Manual Saja</button>`;
  } else {
    renderManual(false);
  }
}
function renderManual(dariKetemu) {
  const box = document.getElementById('box-data');
  box.innerHTML = `
    ${dariKetemu ? '' : '<p class="muted">Data tidak ditemukan di puskesmas. Isi manual ya:</p>'}
    <label class="lbl">Nama lengkap (sesuai KTP)</label>
    <input class="input" id="m-nama" placeholder="Contoh: Siti Aminah">
    <label class="lbl">Alamat</label>
    <input class="input" id="m-alamat" placeholder="Contoh: Jl. Kenjeran 123">
    <label class="lbl">No. HP / Telepon</label>
    <input class="input" id="m-telp" inputmode="tel" placeholder="Contoh: 08123456789">
    <label class="lbl">Tanggal Lahir</label>
    <div class="row3">
      <div><input class="input" id="m-d" inputmode="numeric" maxlength="2" placeholder="Tgl"></div>
      <div><input class="input" id="m-m" inputmode="numeric" maxlength="2" placeholder="Bln"></div>
      <div><input class="input" id="m-y" inputmode="numeric" maxlength="4" placeholder="Tahun"></div>
    </div>
    <label class="lbl">Jenis Kelamin</label>
    <div class="card" id="jk-l" onclick="pilihJk('L')"><div class="card-body"><div class="card-title">👨 Laki-laki</div></div><div class="check"></div></div>
    <div class="card" id="jk-p" onclick="pilihJk('P')"><div class="card-body"><div class="card-title">👩 Perempuan</div></div><div class="check"></div></div>
    <div class="err" id="err-manual"></div>
    <button class="btn primary" onclick="simpanManual()">Simpan & Lanjut →</button>`;
  S._jk = '';
}
function pilihJk(v) {
  S._jk = v;
  document.getElementById('jk-l').classList.toggle('selected', v === 'L');
  document.getElementById('jk-p').classList.toggle('selected', v === 'P');
}
function simpanManual() {
  const nama = document.getElementById('m-nama').value.trim();
  const d = document.getElementById('m-d').value, m = document.getElementById('m-m').value, y = document.getElementById('m-y').value;
  if (!nama) return err('err-manual', 'Nama lengkap wajib diisi.');
  if (!d || !m || !y) return err('err-manual', 'Tanggal lahir wajib lengkap.');
  if (!S._jk) return err('err-manual', 'Pilih jenis kelamin.');
  err('err-manual', '');
  S.pasien = {
    NIK: S.nik,
    NAMA_LGKP: nama.toUpperCase(),
    ALAMAT: document.getElementById('m-alamat').value.trim().toUpperCase(),
    NO_TLP: document.getElementById('m-telp').value.trim(),
    TGL_LAHIR: `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`,
    JENIS_KELAMIN: S._jk === 'L' ? 'Laki-laki' : 'Perempuan',
    pasienkode: '', statusnik: 0,
  };
  go('s-penjamin');
}

// ======== 7. PENJAMIN ========
function pilihTipe(t) {
  S.idtypepasien = t;
  document.getElementById('card-bpjs').classList.toggle('selected', t === '2');
  document.getElementById('card-umum').classList.toggle('selected', t === '1');
  document.getElementById('box-noka').style.display = t === '2' ? 'block' : 'none';
}
document.getElementById('in-noka').addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g, '');
  document.getElementById('hint-noka').textContent = `${e.target.value.length}/13 digit`;
});
function lanjutPenjamin() {
  err('err-penjamin', '');
  if (!S.idtypepasien) return err('err-penjamin', 'Pilih salah satu: BPJS atau Umum.');
  if (S.idtypepasien === '2') {
    const noka = document.getElementById('in-noka').value;
    if (noka.length !== 13) return err('err-penjamin', 'Nomor kartu BPJS harus 13 angka.');
    S.kodekartu = noka;
  } else {
    S.kodekartu = '';
  }
  renderKonfirmasi();
  go('s-konfirmasi');
}

// ======== 8. KONFIRMASI ========
function renderKonfirmasi() {
  document.getElementById('box-konfirmasi').innerHTML = `
    <div class="infocard"><h3>Rencana Kunjungan</h3>
      ${irow('Puskesmas', S.namaPuskesmas)}
      ${irow('Poli', S.poli)}
      ${irow('Tanggal', S.tglformat)}
    </div>
    <div class="infocard"><h3>Data Pasien</h3>
      ${irow('Nama', S.pasien.NAMA_LGKP)}
      ${irow('NIK', S.nik)}
      ${irow('Pembayaran', S.idtypepasien === '2' ? 'BPJS Kesehatan' : 'Umum')}
    </div>`;
}
async function daftar() {
  err('err-daftar', '');
  const btn = document.getElementById('btn-daftar');
  btn.disabled = true;
  overlay(true, 'Mendaftarkan antrean…');
  try {
    const hasil = await api('/api/daftar', {
      method: 'POST',
      body: {
        idunitkerja: S.idunitkerja,
        idunitkerjaasal: S.idunitkerja,
        unitkerja: S.namaPuskesmas,
        wilayah: S.wilayah,
        NIK: S.nik,
        NAMA_LGKP: S.pasien.NAMA_LGKP || '',
        ALAMAT: S.pasien.ALAMAT || '',
        NO_TLP: S.pasien.NO_TLP || '',
        TGL_LAHIR: S.pasien.TGL_LAHIR || '',
        JENIS_KELAMIN: S.pasien.JENIS_KELAMIN || '',
        kodekartu: S.kodekartu || '',
        NORUJUKAN: '',
        pasienkode: S.pasien.pasienkode || '',
        statusnik: S.pasien.statusnik ?? 0,
        idtypepasien: S.idtypepasien || '1',
        idbppoli: S.idbppoli,
        poli: S.poli,
        klaster: S.klaster,
        tanggal: S.tanggal,
        tglformat: S.tglformat,
        data_details: '',
      },
    });
    const d = hasil.data || {};
    document.getElementById('ok-nomor').textContent = d.noantrian || '-';
    document.getElementById('ok-kode').textContent = d.randomkey ? 'Kode: ' + d.randomkey : '';
    document.getElementById('box-sukses').innerHTML = `
      <div class="infocard">
        ${irow('Nama', d.NAMA_LGKP)}
        ${irow('NIK', d.NIK)}
        ${irow('Jadwal', d.dateserves)}
      </div>`;
    go('s-sukses');
  } catch (e) {
    err('err-daftar', e.message);
  } finally {
    overlay(false);
    btn.disabled = false;
  }
}

// ======== BATAL ========
function batalLanjut() {
  const kode = document.getElementById('in-kode').value.trim();
  err('err-batal', '');
  if (!kode) return err('err-batal', 'Masukkan kode antrean dulu.');
  S.kodeBatal = kode;
  document.getElementById('batal-kode').textContent = kode;
  go('s-batal-ok');
}
async function batalkan() {
  err('err-batal2', '');
  const btn = document.getElementById('btn-batal');
  btn.disabled = true;
  overlay(true, 'Membatalkan…');
  try {
    await api(`/api/batal?id=${encodeURIComponent(S.kodeBatal)}`);
    document.getElementById('batal-hasil-sub').innerHTML =
      `Kode <b>${S.kodeBatal}</b> sudah tidak berlaku.<br>Silakan daftar lagi jika berubah pikiran.`;
    go('s-batal-hasil');
  } catch (e) {
    err('err-batal2', e.message);
  } finally {
    overlay(false);
    btn.disabled = false;
  }
}

// ======== INIT ========
renderWilayah();
