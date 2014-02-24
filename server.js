(function(){
  var http = require('http');
  var express = require('express');
  var app = express();
  var port = process.env.PORT || 8080;
  var server = http.createServer(app);
  var io = require('socket.io').listen(server);
  io.set('destroy upgrade',false);
  app.use(express.static(__dirname + '/'));
  server.listen(port);
  console.log('HTTP server listening on %d', port);
  console.log('Socket server created');

  io.sockets.on('connection', function(socket){
    console.log('New connection!');
    var interval = setInterval(function(){
      socket.send('Message!');
    }, 1000);

    socket.on('disconnect', function(){
      clearInterval(interval);
    });
  });
}());
