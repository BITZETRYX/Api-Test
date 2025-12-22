const ApiError = require('../utils/apiError');

const notFound = (_req, _res, next) => {
  next(new ApiError(404, 'Route not found'));
};

const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const payload = {
    message: err.message || 'Unexpected error'
  };

  if (err.details) {
    payload.details = err.details;
  }

  res.status(statusCode).json({
    success: false,
    ...payload
  });
};

module.exports = { notFound, errorHandler };