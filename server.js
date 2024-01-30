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

// ============= SCOKET IO ========================
const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_DOMAIN,
  },
});

let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => users.find((user) => user.userId === userId);

io.on('connection', (socket) => {
  // when ceonnect
  console.log('a user connected.');

  // take userId and socketId from user
  socket.on('addUser', (userId) => {
    console.log('USER ADDED', userId);
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  // send and get message
  socket.on('sendMessage', ({ _id, senderId, receiverId, content }) => {
    console.log('SEND MESSAGE', {
      _id,
      senderId,
      content,
    });
    const user = getUser(receiverId);

    io.to(user?.socketId).emit('getMessage', {
      _id,
      senderId,
      content,
    });
  });

  // when disconnect
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

// =============== Socket IO
async function main() {
  try {
    await mongoose.connect(DB_URI);
    console.log('Successful connection to the database');

    server.listen(PORT, () => {
      console.log(`server running on port: ${PORT}`);
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
