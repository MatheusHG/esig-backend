function cors(req, res, next) {
  const allowedOrigins = [
    '*'
  ];

  const origin = req.get('origin');
  const isAllowed = allowedOrigins.includes(origin) || allowedOrigins.includes('*');

  if (isAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Max-Age', '3600'); // Tempo em segundos

    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
      return;
    }
  }

  next();
}

export default cors;
