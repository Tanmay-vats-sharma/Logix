// src/sockets/index.js
const { Server } = require('socket.io');
const http = require('http');
const adminEventHandler = require('./socket/adminEventHandler');
const studentEventHandler = require('./socket/studentEventHandler');

let io;

const allowedOrigins = process.env.FRONTEND_URL?.split(',') || ['http://localhost:5173', 'http://localhost:5174'];

function setupSocket(server) {
  console.log('Setting up WebSocket server...');
  console.log('Allowed Origins:', allowedOrigins);
  // const server = http.createServer(app);
  io = new Server(server, {
    path: '/ws',
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  // io.use((socket, next) => {
  //   try {
  //     console.log(socket.handshake.headers);
  //     const rawCookie = socket.handshake.headers.cookie || '';
  //     const cookies = cookie.parse(rawCookie);

  //     const unsignedToken = signedCookie(
  //       cookies.refreshToken,
  //       config.COOKIE_SECRET
  //     );
  //     console.log('Tpoken:', unsignedToken);

  //     if (!unsignedToken) {
  //       console.log('❌ Invalid or missing signed cookie refreshToken');
  //       return next(new Error('Authentication error'));
  //     }

  //     const payload = jwt.verify(unsignedToken, config.JWT_REFRESH_SECRET);
  //     socket.user = payload;
  //     next();
  //   } catch (err) {
  //     console.log('❌ Socket auth error:', err.message);
  //     next(new Error('Authentication error'));
  //   }
  // });

  io.on('connection', async (socket) => {
    console.log(`⚡ [Socket] ${socket.id} connected`);

    // You can add more event listeners here
    adminEventHandler(io, socket);
    studentEventHandler(io, socket);

    socket.on('disconnect', () => {
      console.log(`💀 [Socket] ${socket.id} disconnected`);
    });
  });
}

module.exports = { setupSocket };