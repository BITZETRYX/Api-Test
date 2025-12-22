const app = require('./app');
const config = require('./config/env');
const { connectDb } = require('./config/db');

const start = async () => {
  await connectDb(config.mongoUri);
  app.listen(config.port, () => {
    console.log(`API listening on port ${config.port}`);
  });
};

start().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
