var http = require('http').createServer();
var port = process.env.PORT || 5000
var io = require('socket.io')(http,{
  cors:{
    origin: ["http://localhost:8000", "http://127.0.0.1:8000", "//afternoon-ocean-12045.herokuapp.com"],
    methods: ["GET", "POST", "DELETE", "OPTIONS"]
  }
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
  socket.on('room', function(n){
    socket.join(n);
  });
  socket.on('chat', function(data){
    io.to(data['room_id']).emit('chat', data['text']);
  });
});




