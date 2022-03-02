var http = require('http').createServer();
var port = process.env.PORT || 3000
var url = process.env.LARAVEL_URL || "http://localhost:9000";
var io = require('socket.io')(http,{
  cors:{
    origin: ["http://localhost:8000", "http://127.0.0.1:8000", url],
    methods: ["GET", "POST", "DELETE", "OPTIONS"]
  },
  // reconnectionDelay: 5000,
  // transports: ["websocket"],
});

http.listen(port,()=>function(){
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
});
// http.listen(3000);
// io.configure(function () {
//   io.set("transports", ["xhr-polling"]);
//   io.set("polling duration", 10);
// });

io.on('connection', function(socket){
  console.log('connection');
  socket.on('room', function(n){
    socket.join(n);
  });
  socket.on('chat', function(data){
    console.log(data);
    io.to(data['room_id']).emit('chat', {text: data['text'], id: data['id']});
  });
  socket.on('chat_d', function(data){
    io.to(data['room_id']).emit('chat_d', {id: data['id']});
  })
});

io.on('disconnection', function(){
  console.log('DisConnection');
});

