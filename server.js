import 'dotenv/config';
import mongoose from 'mongoose';
import { DB_URI, PORT } from '#root/common/constants.js';
import app from '#root/app.js';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

async function main() {
  try {
    await mongoose.connect(DB_URI);
    console.log('Successful connection to the database');
    app.listen(PORT, () => {
      console.log(`App running on: ${PORT}`);
    });
  } catch (err) {
    return console.log(err);
  }
}

main();

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('The application has terminated');
  process.exit();
});
