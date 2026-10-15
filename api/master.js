const { handle } = require('./_util');
const { apiGetPlain } = require('../lib/ehealth');

const ALLOWED = { bahasa: 'home/bahasa', pekerjaan: 'home/pekerjaan', suku: 'home/suku' };

// GET /api/master?jenis=bahasa|pekerjaan|suku — data master
module.exports = handle(
  async (req) => {
    const { jenis } = req.query || {};
    if (!ALLOWED[jenis]) throw new Error('jenis harus: bahasa, pekerjaan, atau suku');
    return apiGetPlain(ALLOWED[jenis]);
  },
  { methods: ['GET'] }
);
