const { handle } = require('./_util');
const { apiPost } = require('../lib/ehealth');

// POST /api/cek-nik  { idunitkerja, NIK } — cari data pasien (home/ajaxgetnik)
module.exports = handle(
  async (req) => {
    const { idunitkerja, NIK } = req.body || {};
    if (!idunitkerja || !NIK) throw new Error('idunitkerja & NIK wajib diisi');
    return apiPost('home/ajaxgetnik', { idunitkerja, NIK: String(NIK) });
  },
  { methods: ['POST'] }
);
