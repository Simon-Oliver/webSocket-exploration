var home = require('./routes/home.js');
var express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')

const private_key="super-secret";

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
app.use(cookieParser())
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
        });
      });
    }
  });
});

const middle = (req,res,next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
  console.log(token);
  next()
}

app.post('/login',middle,(req, res) => {
  console.log(req.cookies);
  const { userName, password } = req.body;

  User.findOne({ userName }).then(user => {
    if (user) {
      bcrypt.compare(password, user.password).then(isMatch => {
        if(!isMatch){
          res.
          console.log("Login failed; Invalid user ID or password");
        } else {
          let tokenData = {}
          tokenData.userName = user.userName
          console.log(tokenData);
          const token = jwt.sign(tokenData, private_key)
          res.cookie("token", token, {maxAge: 900000, httpOnly: true}).sendStatus(200);
        }
      })
    } else {
      console.log("Login failed; Invalid user ID or password");
    }
  });
});

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));
