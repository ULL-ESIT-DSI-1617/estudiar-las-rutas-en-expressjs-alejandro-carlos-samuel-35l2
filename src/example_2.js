var express = require('express');
var app = express();


app.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
app.get('/', function (req, res) {
  res.send('Birds home page');
});
// define the about route
app.get('/about', function (req, res) {
  res.send('About birds');
});

var server = app.listen(4000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://localhost:%s', port);
});
