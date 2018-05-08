const WebSocket = require('ws');

const ws = new WebSocket('ws://10.30.15.58:9000');

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function incoming(data) {
  console.log(data);
});