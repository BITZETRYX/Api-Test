const mongoose = require('mongoose');

const cached = global.mongooseConnection || { conn: null, promise: null };

const connectDb = async (mongoUri) => {
  if (!mongoUri) {
    throw new Error('Missing MONGO_URI');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set('strictQuery', true);
    cached.promise = mongoose.connect(mongoUri).then((connection) => connection);
  }

  cached.conn = await cached.promise;
  global.mongooseConnection = cached;
  return cached.conn;
};

module.exports = { connectDb };
