const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const { sendResponse } = require('../utils/response');
const User = require('../models/User');
const { phoneCheckSchema } = require('../validators/userValidator');

const checkRegistered = asyncHandler(async (req, res) => {
  const { error, value } = phoneCheckSchema.validate(req.query, { abortEarly: false });
  if (error) {
    throw new ApiError(400, 'Validation failed', error.details.map((item) => item.message));
  }

  const { phone } = value;
  const user = await User.findOne({ phone, isActive: true });

  sendResponse(res, 200, {
    data: {
      registered: Boolean(user),
      userId: user ? user._id : null
    }
  });
});

module.exports = { checkRegistered };