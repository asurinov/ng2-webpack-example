var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('assets'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(1111);
console.log('started');

module.exports = app;
