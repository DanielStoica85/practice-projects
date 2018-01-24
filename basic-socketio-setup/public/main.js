var socket = io('http://localhost:8080');

// Listen for message from server to client
socket.on('message-from-server', function(event) {
    var message = document.createTextNode(event.greeting);
    document.body.appendChild(message);

    // send message from client to server
    socket.emit('message-from-client', {
        greeting: 'Hello from client!'
    });
});