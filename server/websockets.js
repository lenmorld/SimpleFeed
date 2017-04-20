// add websocket to a Node server

var ws = require('ws');
var _  = require('lodash');
var clients = [];

exports.connect = function (server) {
    var wss = new ws.Server({server: server});
    // when a client connects to WS, connection event will be called, then it sends message to client
    wss.on('connection', function (ws) {
        // ws.send('hello!');     // REMOVE this when Angular app, since it will corrupt data
        clients.push(ws);       // push new clients to array on conn
        exports.broadcast("new client joined");
        ws.on('close', function () {
            console.log("remove this client: ", ws);
            _.remove(clients, ws);      // remove the client that disconnects
        });
    });

    // wss.on('message', function (data, flags) {
    //    console.log(data);
    // });
}

// topic determines type of message, i.e. new post, etc
exports.broadcast = function (topic, data) {
    var json = JSON.stringify({topic: topic, data: data})
    clients.forEach(function (client) {             // send JSON to each client
        client.send(json)
    })
}