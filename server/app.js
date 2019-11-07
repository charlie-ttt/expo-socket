const express = require('express');
const app = express();

var server = require('http').Server(app);
// var io = require('socket.io')(server);
const socket = require('socket.io');
const serverSocket = socket(server);

server.listen(3000);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

serverSocket.on('connection', socket => {
  console.log(socket.id);

  socket.on('update', () => {
    console.log('update in server');
    serverSocket.emit('hiupdate');
  });
});
