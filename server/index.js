var home = require('./routes/home.js');
var express = require('express');
var app = express();
const PORT = 8000;

// ...
app.use(express.json());
app.use('/home', home);

let count = 0;
app.get('/test', function(req, res) {
  count++;
  console.log(count);
  res.send('Hello');
});

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));
