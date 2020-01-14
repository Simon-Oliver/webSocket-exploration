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
const MenuItem = require('./models/MenuItem');
const Order = require('./models/Order');

// DB connection
const mongo_uri = process.env.MONGODB_URI || 'mongodb://localhost/kitchenTest';

mongoose.connect(
  mongo_uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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
          res.status(200).json({ redirect: '/items' });
        });
      });
    }
  });
});

const middle = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
  if (!token) {
    return res.json({ message: 'No access token provided. Please login.', redirect: '/login' });
  }
  //console.log('Token –', token);
  try {
    const data = jwt.verify(token, private_key);
    req.user = { ...data, isAuth: true };
    res.cookie('token', token, { expires: new Date(Date.now() + 600000), httpOnly: true });
    next();
  } catch {
    return res.json({ message: 'No access token provided. Please login.', redirect: '/login' });
  }
};

app.post('/auth', middle, (req, res) => {
  res.json(req.user);
});

app.post('/items', middle, (req, res) => {
  console.log(req.body);
  const { item, price, options, userID } = req.body;
  const newitem = new MenuItem({ item, price, options, createdBy: userID });
  newitem.save((err, doc) => {
    if (err) {
      console.log(err);
    }
    console.log('Saved', doc);
    res.status(200).json({ redirect: '/items' });
  });
});

app.get('/order', middle, (req, res) => {
  Order.find({})
    .select('-__v -createdAt -updatedAt')
    .then(items => {
      res.status(200).json({ items });
    });
});

app.get('/items', middle, (req, res) => {
  MenuItem.find({})
    .select('-__v -createdAt -updatedAt')
    .populate('createdBy', '-password -__v -date')
    .then(items => {
      res.status(200).json({ items });
    });
});

app.delete('/items', middle, (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  console.log('delete fired');

  MenuItem.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      console.log(err);
    }
    console.log(doc);
    res.status(200).json({ redirect: '/items' });
  });
});

app.put('/items', middle, (req, res) => {
  res.status(200).json({ redirect: '/items' });
  const { _id, item, price, options } = req.body;
  console.log(req.body);
  MenuItem.findOneAndUpdate({ _id }, { item, price, options }, (err, doc) => {
    if (err) {
      console.log(err);
    }
    console.log(doc);
  });
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
            .cookie('token', token, { expires: new Date(Date.now() + 60000), httpOnly: true })
            .status(200)
            .json({ redirect: '/items' });
        }
      });
    } else {
      res.json({ message: 'Login failed; Invalid user ID or password' });
      console.log('Login failed; Invalid user ID or password');
    }
  });
});

app.get('/logout', middle, (req, res) => {
  res.clearCookie('token');
  res.send('cookie foo cleared');
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
  console.log(new Date() + ' Connection accepted.');
  console.log('Connected ---------------------- ', connection.id);

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
    console.log('message ws fired');
    if (message.type === 'utf8') {
      const data = JSON.parse(message.utf8Data);
      console.log('ws socket received -----', data);

      const { order, userID, userName } = data;
      //console.log('-------order_____', order);
      const neworder = new Order({
        name: userName,
        orderFrom: userID,
        tableNum: '99',
        orderItems: order,
        notes: '',
        orderIn: Date(),
        orderOut: ''
      });

      neworder.save((err, doc) => {
        if (err) {
          console.log(err);
        }
        console.log('Saved', doc);
        Order.find({})
          .select('-__v -createdAt -updatedAt')
          .then(items => {
            // console.log('ITEMS____________>>>>', items);
            clients.forEach(function(client) {
              client.sendUTF(JSON.stringify({ type: 'order', data: items }));
            });

            // clients.broadcast = function(data, sender) {
            //   clients.forEach(function(client) {
            //     if (client !== sender) {
            //       client.sendUTF(JSON.stringify({ type: 'order', data: items }));
            //     }
            //   });
            // };
          });

        //res.status(200).json({ redirect: '/items' });
      });

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

      //connection.sendUTF(JSON.stringify({ type: 'order', data }));
    }
  });

  // user disconnected
  connection.on('close', function(connection) {
    clients.splice(index - 1, 1);
    console.log(connection.remoteAddress + ' disconnected.'); // remove user from the list of connected clients
  });
});
