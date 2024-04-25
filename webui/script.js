const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// MySQL connection setup
const connection = mysql.createConnection({
    host: 'mysql', // Kubernetes service name for MySQL
    user: 'bbots', // MySQL user
    password: 'csc468g6', // MySQL password
    database: 'bargainBot', // MySQL database
    port: 3306
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.message);
        return;
    }
    console.log('Connected to MySQL Server!');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve the main HTML page with embedded JavaScript
app.get('/', function(req, res) {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Product Search UI</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                button {
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #0056b3;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
            </style>
        </head>
        <body>
            <button id="fetchProductsBtn">Fetch Products</button>
            <div id="productsTable">Products will be displayed here</div>

            <script>
                document.getElementById('fetchProductsBtn').addEventListener('click', function() {
                    fetch('/api/products')
                    .then(response => response.json())
                    .then(data => {
                        const container = document.getElementById('productsTable');
                        container.innerHTML = ''; // Clear previous content
                        const table = document.createElement('table');
                        data.forEach(product => {
                            const row = table.insertRow();
                            const nameCell = row.insertCell(0);
                            const priceCell = row.insertCell(1);
                            nameCell.textContent = product.name;
                            priceCell.textContent = product.price;
                        });
                        container.appendChild(table);
                    })
                    .catch(error => console.error('Error fetching products:', error));
                });
            </script>
        </body>
        </html>
    `);
});

// API endpoint for fetching product data
app.get('/api/products', (req, res) => {
    connection.query('SELECT * FROM products', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Handle form submissions
app.post('/sterm', (req, res) => {
    const searchQuery = connection.escape(req.body.search);
    connection.query(`INSERT INTO search VALUES(${searchQuery})`, (err, results) => {
        if (err) {
            console.error('Failed to insert:', err);
            return res.status(500).send('Error executing query');
        }
        res.redirect('/');
    });
});

// Start the server
const port = 80;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
