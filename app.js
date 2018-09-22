const express = require('express');
const socket = require('socket.io');

const app = express();
app.use(express.static('public'));

const port = 3000 || process.env.PORT;
const server = app.listen(port, () => console.log(`server active on port ${port}`));

const io = socket(server);

io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data)
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
})
