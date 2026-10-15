const { handle } = require('./_util');
const { apiGetCompressed } = require('../lib/ehealth');

// GET /api/tanggal?idunitkerja=<id>&idbppoli=<noid>
// Tanggal layanan poli + sisa kuota per tanggal (home/getdatepoli)
module.exports = handle(
  async (req) => {
    const { idunitkerja, idbppoli } = req.query || {};
    if (!idunitkerja || !idbppoli) throw new Error('idunitkerja & idbppoli wajib diisi');
    return apiGetCompressed(`home/getdatepoli/${idunitkerja}/${idbppoli}`);
  },
  { methods: ['GET'] }
);
