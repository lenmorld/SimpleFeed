// add websocket to a Node server

var ws = require('ws');
exports.connect = function (server) {
    var wss = new ws.Server({server: server});
    // when a client connects to WS, connection event will be called, then it sends message to client
    wss.on('connection', function (ws) {
        ws.send('hello!');
    });

    // wss.on('message', function (data, flags) {
    //    console.log(data);
    // });
}