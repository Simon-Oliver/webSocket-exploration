// home.js - Home route module.

var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function(req, res) {
  res.send('home page');
});

// About page route.
router.get('/about', function(req, res) {
  res.send('About this homepage');
});

module.exports = router;
