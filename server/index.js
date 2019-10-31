var home = require('./routes/home.js');
var express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

const private_key = 'super-secret';

var app = express();
const PORT = 8000;

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

// ...
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
  console.log(token);
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
