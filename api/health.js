const { handle } = require('./_util');
const { getSession } = require('../lib/ehealth');

// GET /api/health — cek hidup + panaskan sesi (biar request pertama user tidak kena cold scrape)
module.exports = handle(
  async () => {
    const s = await getSession();
    return { status: 'ok', sessionAge: Date.now() - s.fetchedAt };
  },
  { methods: ['GET'] }
);
