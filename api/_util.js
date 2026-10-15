/** Helper CORS + method guard untuk semua route. */
function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function handle(fn, { methods = ['GET'] } = {}) {
  return async (req, res) => {
    cors(res);
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (!methods.includes(req.method))
      return res.status(405).json({ ok: false, error: 'method not allowed' });
    try {
      const data = await fn(req);
      return res.status(200).json({ ok: true, data });
    } catch (e) {
      return res.status(502).json({ ok: false, error: e.message });
    }
  };
}

module.exports = { cors, handle };
