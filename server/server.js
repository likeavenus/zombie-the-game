const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require('cors')

// app.use(express.static(__dirname));
app.use(cors());

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

const players = {};


io.on('connection', (socket) => {
  console.log('a user connected');
  players[socket.id] = {
    rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id,
    team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
  };
  socket.broadcast.emit('Hi')

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
  
server.listen(3000, '0.0.0.0', () => {
  console.log('listening on *:3000');
});