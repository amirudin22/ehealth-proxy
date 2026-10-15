const { handle } = require('./_util');
const { apiPost } = require('../lib/ehealth');

// POST /api/cek-bpjs  { idunitkerja, NIK } — validasi BPJS (home/getbpjsnik2)
module.exports = handle(
  async (req) => {
    const { idunitkerja, NIK } = req.body || {};
    if (!idunitkerja || !NIK) throw new Error('idunitkerja & NIK wajib diisi');
    return apiPost('home/getbpjsnik2', { idunitkerja, NIK: String(NIK) });
  },
  { methods: ['POST'] }
);
