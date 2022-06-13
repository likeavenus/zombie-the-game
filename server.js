const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});


io.on('connection', (socket) => {
    
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
});



server.listen(5000, () => {
    console.log('Server listening on the port: 5000');
});