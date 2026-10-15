const { handle } = require('./_util');
const { apiPostCompressed } = require('../lib/ehealth');

// POST /api/daftar  { ...arrdata } — buat antrean (home/sendantrean)
// Field arrdata: idunitkerja, idunitkerjaasal, unitkerja, wilayah, NIK,
// NAMA_LGKP, ALAMAT, NO_TLP, TGL_LAHIR (YYYY-MM-DD), JENIS_KELAMIN,
// kodekartu, NORUJUKAN, pasienkode, statusnik, idtypepasien, idbppoli,
// poli, klaster, tanggal, tglformat, data_details
module.exports = handle(
  async (req) => {
    const b = req.body || {};
    if (!b.NIK || !b.idunitkerja) throw new Error('NIK & idunitkerja wajib diisi');
    return apiPostCompressed('home/sendantrean', b);
  },
  { methods: ['POST'] }
);
