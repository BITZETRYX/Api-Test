const bcrypt = require('bcryptjs');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const { sendResponse } = require('../utils/response');
const User = require('../models/User');
const { signToken } = require('../services/tokenService');
const { registerSchema, loginSchema } = require('../validators/authValidator');

const register = asyncHandler(async (req, res) => {
  const { error, value } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new ApiError(400, 'Validation failed', error.details.map((item) => item.message));
  }

  const { name, phone, email, password } = value;
  const existing = await User.findOne({ $or: [{ phone }, ...(email ? [{ email }] : [])] });
  if (existing) {
    throw new ApiError(409, 'User already exists with this phone or email');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, phone, email, passwordHash });
  const token = signToken(user);

  sendResponse(res, 201, {
    message: 'User registered successfully',
    data: {
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role
      },
      token
    }
  });
});

const login = asyncHandler(async (req, res) => {
  const { error, value } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new ApiError(400, 'Validation failed', error.details.map((item) => item.message));
  }

  const { phone, password } = value;
  const user = await User.findOne({ phone });
  if (!user || !user.isActive) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = signToken(user);

  sendResponse(res, 200, {
    message: 'Login successful',
    data: {
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role
      },
      token
    }
  });
});

module.exports = { register, login };