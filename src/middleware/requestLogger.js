const Log = require('../models/Log');

const sanitize = (value) => {
  if (!value || typeof value !== 'object') {
    return value;
  }

  const clone = Array.isArray(value) ? [...value] : { ...value };
  const redactedKeys = ['password', 'passwordHash', 'token', 'authorization'];

  for (const key of Object.keys(clone)) {
    if (redactedKeys.includes(key)) {
      clone[key] = '[REDACTED]';
    } else if (typeof clone[key] === 'object' && clone[key] !== null) {
      clone[key] = sanitize(clone[key]);
    }
  }

  return clone;
};

const requestLogger = (req, res, next) => {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
    const meta = {
      query: sanitize(req.query),
      body: sanitize(req.body)
    };

    setImmediate(() => {
      Log.create({
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        responseTimeMs: Math.round(durationMs),
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        user: req.user ? req.user._id : undefined,
        meta
      }).catch(() => null);
    });
  });

  next();
};

module.exports = requestLogger;