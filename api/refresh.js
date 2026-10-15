const { handle } = require('./_util');
const { clearCache } = require('../lib/ehealth');

// POST /api/refresh — buang sesi paksa + buka baru ("tombol clear cache")
module.exports = handle(
  async () => {
    const s = await clearCache();
    return { refreshed: true, sessionAge: 0, cookies: Object.keys(s.cookies) };
  },
  { methods: ['POST'] }
);
