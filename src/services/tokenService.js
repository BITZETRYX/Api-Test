const jwt = require('jsonwebtoken');
const config = require('../config/env');

const signToken = (user) =>
  jwt.sign({ sub: user._id.toString(), role: user.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });

module.exports = { signToken };