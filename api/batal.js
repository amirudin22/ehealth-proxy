const { handle } = require('./_util');
const { getSession, apiGetPlain } = require('../lib/ehealth');

// GET /api/batal?id=<id_antrean> — batalkan antrean (home/batalkanantrean)
module.exports = handle(
  async (req) => {
    const { id } = req.query || {};
    if (!id) throw new Error('param id wajib diisi');
    const s = await getSession();
    return apiGetPlain(`home/batalkanantrean?id=${encodeURIComponent(id)}&_token=${s.token}`);
  },
  { methods: ['GET'] }
);
