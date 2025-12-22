const dotenv = require('dotenv');

dotenv.config();

const toInt = (value, fallback) => {
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const config = {
  port: toInt(process.env.PORT, 4000),
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  rateLimitWindowMs: toInt(process.env.RATE_LIMIT_WINDOW_MS, 60000),
  rateLimitMax: toInt(process.env.RATE_LIMIT_MAX, 120),
  corsOrigin: process.env.CORS_ORIGIN || '*'
};

if (!config.mongoUri) {
  console.warn('Missing MONGO_URI in environment.');
}

if (!config.jwtSecret) {
  console.warn('Missing JWT_SECRET in environment.');
}

module.exports = config;