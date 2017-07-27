let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', socket => {
  console.warn('A user connected');
  console.log('socket: ', socket.request)
  socket.on('chat message', (msg) => {
    io.emit('chat message');
  });
  socket.on('disconnect', () => {
    console.warn('user disconnected');
  });
})

http.listen(3000, () => { console.log('listening on *:3000') });
