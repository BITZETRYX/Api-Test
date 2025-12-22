const mongoose = require('mongoose');

const logSchema = new mongoose.Schema(
  {
    method: { type: String, required: true },
    path: { type: String, required: true },
    statusCode: { type: Number, required: true },
    responseTimeMs: { type: Number, required: true },
    ip: { type: String, trim: true },
    userAgent: { type: String, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    meta: { type: mongoose.Schema.Types.Mixed }
  },
  { timestamps: true }
);

logSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Log', logSchema);