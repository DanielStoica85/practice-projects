var express = require('express');
var path = require('path');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 8080;

app.use(express.static(path.join(__dirname, "public")));

io.on('connection', function(socket) {
    console.log('New connection made.');

    // On new connection send message from server to client
    socket.emit('message-from-server', {
        greeting: 'Hello from server!'
    });

    // Listen for message from client to server
    socket.on('message-from-client', function(msg) {
        console.log(msg);
    });
});

server.listen(port, function() {
    console.log('Listening on port ' + port);
});