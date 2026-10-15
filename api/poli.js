const { handle } = require('./_util');
const { apiGetCompressed } = require('../lib/ehealth');

// GET /api/poli — daftar poli harian (home/getpolidaily2, LZString tanpa AES)
module.exports = handle(() => apiGetCompressed('home/getpolidaily2'), {
  methods: ['GET'],
});
