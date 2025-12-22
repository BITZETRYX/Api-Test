const asyncHandler = require('../utils/asyncHandler');
const { sendResponse } = require('../utils/response');
const Log = require('../models/Log');

const listLogs = asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || '100', 10), 500);
  const logs = await Log.find().sort({ createdAt: -1 }).limit(limit);

  sendResponse(res, 200, { data: logs });
});

module.exports = { listLogs };