import mysql.connector

class Worker2:
  def displayAverage(self):
    connection = mysql.connector.connect(host = 'mysql', port = '3306', user = 'bbot', password = 'csc468g6', auth_plugin = 'mysql_native_password')
    cursor = connection.cursor()
    cursor.execute("SELECT AVG(Price) FROM bargainBot.results")

    connection.commit()
    connection.close()
      
