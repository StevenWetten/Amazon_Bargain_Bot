Connecting to MySQL
To connect to MySQL, your Node.js application should include code like this us>

javascript
Copy code
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "mysql", // the name of your MySQL service in Kubernetes
  user: "bbot",
  password: "csc468g6",
  database: "bbotdbase"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


