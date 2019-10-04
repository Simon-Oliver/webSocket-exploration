const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const uuidv1 = require('uuid/v1');
const http = require('http');

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

// I'm maintaining all active connections in this object
const clients = {};

wsServer.on('request', function(request) {
  var userID = uuidv1();
  console.log(new Date() + ' Recieved a new connection from origin ' + request.origin + '.');

  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

  connection.on('message', msg => {
    console.log(userID);
    console.log(msg);
  });
});
