const net = require('net');

// Create a server
const server = net.createServer((socket) => {
  socket.write('Hello! You are connected.\n');

  // Listen for incoming data
  socket.on('data', (chunk) => {
    console.log(`Received: ${chunk}`);
    socket.write(`You said: ${chunk}`);
  });

  // Handle socket closure
  socket.on('end', () => {
    console.log('Connection closed');
  });

  // Handle errors
  socket.on('error', (err) => {
    console.error(`Socket error: ${err.message}`);
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
