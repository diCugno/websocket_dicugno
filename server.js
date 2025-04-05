const fs = require('fs');
const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { Server } = require('socket.io');

const conf = JSON.parse(fs.readFileSync("./conf.json"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log("socket connected: " + socket.id);
  
  //quando un messaggio arriva dal client
  socket.on('message', (data) => {
    const response = {
      name: data.name,
      text: data.text
    };
    console.log(`${response.name}: ${response.text}`);
    io.emit("chat", response); // lo manda a tutti
  });

  socket.on('disconnect', () => {
    console.log("socket disconnected: " + socket.id);
  });
});

server.listen(conf.port, () => {
  console.log("server running on port: " + conf.port);
});
