const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = "mongodb+srv://zeerak:KqwgM1PZjTzy5Jmf@cluster0.cmy7kot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

if (!uri) {
  console.error('Missing MONGO_URI in environment.');
  process.exit(1);
}

const getDbNameFromUri = (mongoUri) => {
  try {
    const url = new URL(mongoUri);
    const pathname = url.pathname || '';
    const dbName = pathname.replace('/', '').trim();
    return dbName || 'test';
  } catch {
    return 'test';
  }
};

const dropUsernameIndex = async () => {
  const dbName = getDbNameFromUri(uri);

  await mongoose.connect(uri, { dbName });
  const collection = mongoose.connection.db.collection('users');

  try {
    const indexes = await collection.indexes();
    const hasUsernameIndex = indexes.some((idx) => idx.name === 'username_1');

    if (!hasUsernameIndex) {
      console.log('Index username_1 not found. Nothing to drop.');
      return;
    }

    await collection.dropIndex('username_1');
    console.log('Dropped index username_1 from users collection.');
  } finally {
    await mongoose.disconnect();
  }
};

dropUsernameIndex().catch((err) => {
  console.error('Failed to drop index:', err.message);
  process.exit(1);
});
