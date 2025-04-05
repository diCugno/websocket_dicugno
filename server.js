const fs = require('fs');
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const conf = JSON.parse(fs.readFileSync('./conf.json'));

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use('/', express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log("socket connected: " + socket.id);
  io.emit("chat", "new client: " + socket.id);

  socket.on('message', (message) => {
    const response = socket.id + ': ' + message;
    console.log(response);
    io.emit("chat", response);
  });

  socket.on('disconnect', () => {
    console.log("socket disconnected: " + socket.id);
  });
});

server.listen(conf.port, () => {
  console.log("server running on port: " + conf.port);
});
