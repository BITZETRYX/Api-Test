const sendResponse = (res, statusCode, payload) => {
  res.status(statusCode).json({
    success: statusCode < 400,
    ...payload
  });
};

module.exports = { sendResponse };