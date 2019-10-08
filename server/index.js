const uuidv1 = require('uuid/v1');

// Optional. You will see this name in eg. 'ps' or 'top' command
//process.title = 'node-chat'; // Port where we'll run the websocket server
var webSocketsServerPort = 8000; // websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');

// list of currently connected clients (users)
var clients = [];

//HTTP server

var server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server,
  // not HTTP server
});
server.listen(webSocketsServerPort, function() {
  console.log(' Server is listening on port ' + webSocketsServerPort);
});

//WebSocket server
var wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket
  // request is just an enhanced HTTP request. For more info
  // http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
  // accept connection - you should check 'request.origin' to
  // make sure that client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  var connection = request.accept(null, request.origin);
  // we need to know client index to remove them on 'close' event

  console.log(new Date() + ' Connection accepted.');
  //connection.sendUTF(JSON.stringify({ type: 'history', data: 'test' }));

  // user sent some message
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      const data = JSON.parse(message.utf8Data).data;

      connection.sendUTF(JSON.stringify({ type: 'name', data: data }));
    }
  });

  // user disconnected
  connection.on('close', function(connection) {
    console.log(connection.remoteAddress + ' disconnected.'); // remove user from the list of connected clients
  });
});
