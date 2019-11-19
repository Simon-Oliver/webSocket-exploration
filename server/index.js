var home = require('./routes/home.js');
var express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

// Websocket
// Optional. You will see this name in eg. 'ps' or 'top' command
//process.title = 'node-chat'; // Port where we'll run the websocket server
var webSocketsServerPort = 8080; // websocket and http servers
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
  console.log('Websocket Server is listening on port ' + webSocketsServerPort);
});

//WebSocket server
var wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket
  // request is just an enhanced HTTP request. For more info
  // http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
});

// JWT Secret
const private_key = 'super-secret';

// Express
var app = express();
const PORT = 8000;

// Mongoose Models
const User = require('./models/User');

// DB connection
const mongo_uri = process.env.MONGODB_URI || 'mongodb://localhost/kitchenTest';

mongoose.connect(
  mongo_uri,
  {
    useNewUrlParser: true
  },
  function(err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to ${mongo_uri}`);
    }
  }
);

// Express Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/home', home);

app.post('/register', (req, res) => {
  User.findOne({ userName: req.body.userName }).then(user => {
    if (user) {
      console.log('Users exists', user);
    } else {
      let user = new User({ userName: req.body.userName, password: req.body.password });

      bcrypt.hash(user.password, 12, (err, hash) => {
        if (err) {
          console.log(err);
        }
        user.password = hash;
        user.save((err, doc) => {
          if (err) {
            console.log(err);
          }
          console.log('Saved', doc);
          res.status(200).json({ redirect: '/auth' });
        });
      });
    }
  });
});

const middle = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
  if (!token) {
    return res.json({ message: 'No access token provided', redirect: '/login' });
  }
  console.log('Token –', token);
  try {
    const data = jwt.verify(token, private_key);
    req.user = { ...data, isAuth: true };
    next();
  } catch {
    return res.json({ message: 'No access token provided', redirect: '/login' });
  }
};

app.post('/auth', middle, (req, res) => {
  res.json(req.user);
});

app.post('/items:id', middle, (req, res) => {
  console.log(req);
});

app.post('/login', (req, res) => {
  const { userName, password } = req.body;

  User.findOne({ userName }).then(user => {
    if (user) {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) {
          res.json({ message: 'Login failed; Invalid user ID or password' });
          console.log('Login failed; Invalid user ID or password');
        } else {
          let tokenData = {};
          tokenData.userName = user.userName;
          tokenData.userID = user._id;
          console.log(tokenData);
          const token = jwt.sign(tokenData, private_key);
          res
            .cookie('token', token, { maxAge: 900000, httpOnly: true })
            .status(200)
            .json({ redirect: '/auth' });
        }
      });
    } else {
      res.json({ message: 'Login failed; Invalid user ID or password' });
      console.log('Login failed; Invalid user ID or password');
    }
  });
});

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

// websocket
// list of currently connected clients (users)
var clients = [];

wsServer.on('request', function(request) {
  // accept connection - you should check 'request.origin' to
  // make sure that client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  var connection = request.accept(null, request.origin);
  // we need to know client index to remove them on 'close' event
  let index = clients.push(connection);
  console.log(new Date() + ' Connection accepted.', connection);
  //connection.sendUTF(JSON.stringify({ type: 'history', data: 'test' }));

  // Order.find({}, function(error, documents) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     connection.sendUTF(JSON.stringify({ data: documents }));
  //   }
  // });

  // user sent some message
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      const data = JSON.parse(message.utf8Data);
      console.log('ws socket received -----', data);

      //const { name, id } = data;

      // Order.findOneAndUpdate(
      //   { orderID: id },
      //   { name },
      //   { new: true, upsert: true, useFindAndModify: false },
      //   function(err, doc) {
      //     console.log(doc);
      //     if (err) {
      //       console.log(err);
      //       console.log('Error registering new order please try again.');
      //     } else {
      //       clients.forEach(client => {
      //         Order.find({}, function(error, documents) {
      //           if (error) {
      //             console.log(error);
      //           } else {
      //             client.sendUTF(JSON.stringify({ data: documents }));
      //           }
      //         });
      //       });
      //       console.log('Order has been saved!');
      //     }
      //   }
      // );

      // const newOrder = { id, name, orderFrom: 'test' };
      // const order = new Order(newOrder);
      // order.save(function(err) {
      //   if (err) {
      //     console.log('Error registering new order please try again.');
      //   } else {
      //     console.log('Order has been saved!');

      //     clients.forEach(client => {
      //       Order.find({}, function(error, documents) {
      //         client.sendUTF(JSON.stringify({ data: documents }));
      //       });
      //     });
      //   }
      // });

      connection.sendUTF(JSON.stringify({ type: 'name', data: 'TEST1234' }));
    }
  });

  // user disconnected
  connection.on('close', function(connection) {
    clients.splice(index - 1, 1);
    console.log(connection.remoteAddress + ' disconnected.'); // remove user from the list of connected clients
  });
});
