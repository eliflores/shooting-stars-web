var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:3000
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000);