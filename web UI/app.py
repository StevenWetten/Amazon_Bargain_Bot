from flask import Flask, request, render_template, redirect, url_for
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

def get_db_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host='172.17.0.2',  # Kubernetes service name for MySQL
            user='bbot',           # Update with your MySQL user
            password='csc468g6',   # Update with your MySQL password
            database='bargainBot'  # Update with your MySQL database name
        )
    except Error as e:
        print(f"The error '{e}' occurred")
    return connection

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        product_details = request.form
        name = product_details['name']
        category = product_details['category']
        price = product_details['price']
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO products (name, category, price) VALUES (%s, %s, %s)', (name, category, price))
        conn.commit()
        cursor.close()
        conn.close()
        return redirect(url_for('index'))
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
