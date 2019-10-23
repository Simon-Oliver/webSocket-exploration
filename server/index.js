var home = require('./routes/home.js');
var express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
app.use('/home', home);

let count = 0;
app.get('/test', function(req, res) {
  count++;
  console.log(count);
  res.send('Hello');
});

app.post('/register', (req, res) => {
  User.findOne({ userName: req.body.userName }).then(user => {
    if (user) {
      console.log('Users exists');
    } else {
      let user = new User({ userName: req.body.userName, password: req.body.password });

      bcrypt.hash(user.password, 12, (err, hash) => {
        if (err) {
          console.log(err);
        }
        user.password = hash;
      });
      user.save((err, doc) => {
        if (err) {
          console.log(err);
        }
        console.log('Saved', doc);
      });
    }
  });
});

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));
