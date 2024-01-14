import 'dotenv/config';
import mongoose from 'mongoose';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { DB_URI, PORT } from '#root/common/constants.js';
import app from '#root/app.js';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_DOMAIN,
  },
});

let users = [];

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('message', (data) => {
    io.emit('messageResponse', data);
  });

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  socket.on('newUser', (data) => {
    users.push(data);
    console.log('USERS', users);
    io.emit('newUserResponse', users);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');

    users = users.filter((user) => user.socketID !== socket.id);
    console.log('USERS', users);
    io.emit('newUserResponse', users);
    socket.disconnect();
  });
});

async function main() {
  try {
    await mongoose.connect(DB_URI);
    console.log('Successful connection to the database');

    server.listen(PORT, () => {
      console.log(`server running at http://localhost:${PORT}`);
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
