var http = require('http').createServer();
var io = require('socket.io')(http,{
  cors:{
    origin: ["http://localhost:8000", "http://127.0.0.1:8000"],
    methods: ["GET", "POST", "DELETE", "OPTIONS"]
  }
});

http.listen(3000);

io.on('connection', function(socket){
  socket.on('room', function(n){
    socket.join(n);
  });
  socket.on('chat', function(data){
    io.to(data['room_id']).emit('chat', data['text']);
  });
});




