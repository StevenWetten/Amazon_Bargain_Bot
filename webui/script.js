var mysql = require('mysql');
var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host: 'mysql',
    user: 'bbots',
    password: 'csc468g6',
    database: 'bargainBot',
    port: 3306,
});

connection.connect(function(err) {
    if (err) throw err;
});

app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(80, function(){
    console.log('webui running on port 80');
});

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/files/');
});

app.get('/searched', function(req, res) {
    res.sendFile(process.cwd() + '/files/');
});

app.post('/sterm', (req, res) => {
    connection.query('INSERT INTO search VALUE("' + req.body.search + '");');
    res.redirect('/searched');
});
