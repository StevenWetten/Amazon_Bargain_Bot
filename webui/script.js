var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

// MySQL connection setup
var connection = mysql.createConnection({
    host: 'mysql',  // Kubernetes service name for MySQL
    user: 'bbots',  // Your MySQL user
    password: 'csc468g6',  // Your MySQL password
    database: 'bargainBot',  // Your MySQL database
    port: 3306
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var server = app.listen(80, function(){
    console.log('Web UI running on port 80');
});

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/files/index.html');  // Ensure this path is correct for your setup
});

app.get('/api/products', (req, res) => {
    connection.query('SELECT * FROM products', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post('/sterm', (req, res) => {
    const search = connection.escape(req.body.search);
    connection.query(`INSERT INTO search VALUE(${search});`);
    res.redirect('/searched');
});
