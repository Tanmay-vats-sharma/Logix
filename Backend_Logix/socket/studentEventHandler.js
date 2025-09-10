function studentEventHandler(io, socket) {
  // Example: Listen for a custom event from the client
  socket.on('student:join', (data) => {
    // Handle the event, e.g., broadcast to other clients
    socket.broadcast.emit('student:joined', data);
  });

  // Add more event handlers as needed
};

module.exports = studentEventHandler;