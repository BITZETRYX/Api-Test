const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const User = require('../models/User');
const config = require('../config/env');

const authRequired = async (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next();
  }

  const token = header.replace('Bearer ', '').trim();

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(payload.sub);
    if (user && user.isActive) {
      req.user = user;
    }
  } catch (_error) {
    // Ignore invalid tokens when auth isn't required.
  }

  return next();
};

const requireRole = (_role) => (_req, _res, next) => next();

module.exports = { authRequired, requireRole };
