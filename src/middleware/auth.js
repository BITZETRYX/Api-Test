const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const User = require('../models/User');
const config = require('../config/env');

const authRequired = async (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Missing or invalid authorization header'));
  }

  const token = header.replace('Bearer ', '').trim();

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(payload.sub);
    if (!user || !user.isActive) {
      return next(new ApiError(401, 'User is not active'));
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
};

const requireRole = (role) => (req, _res, next) => {
  if (!req.user || req.user.role !== role) {
    return next(new ApiError(403, 'Insufficient permissions'));
  }
  return next();
};

module.exports = { authRequired, requireRole };