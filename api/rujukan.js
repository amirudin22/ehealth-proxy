const { handle } = require('./_util');
const { apiGetEncrypted, encPayload } = require('../lib/ehealth');

// GET /api/rujukan?noka=<no_kartu>&id=<id> — cek rujukan (home/getrujukan/<po>)
// po = payload terenkripsi dari string "noka/id"
module.exports = handle(
  async (req) => {
    const { noka, id } = req.query || {};
    if (!noka || !id) throw new Error('param noka & id wajib diisi');
    const po = encPayload(`${noka}/${id}`);
    return apiGetEncrypted(`home/getrujukan/${po}`);
  },
  { methods: ['GET'] }
);
