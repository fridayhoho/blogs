const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9000 });

console.log("startServer");

wss.on('connection', function connection(ws, req) {
    const ip = req.connection.remoteAddress;
    console.log("connect in ", ip)
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

  ws.send('something');
});