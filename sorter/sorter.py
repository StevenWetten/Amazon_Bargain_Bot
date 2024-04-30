import mysql.connector

connection = mysql.connector.connect(host = 'mysql', port = '3306', user = 'bbot', password = 'csc468g6', auth_plugin = 'mysql_native_password')
cursor = connection.cursor()
cursor.execute("SELECT AVG(REPLACE(CONCAT(Price), ',', '')) FROM bargainBot.results")

x = 0

for data in cursor:
  x = data[0]

strn = "%s" % x

cursor.execute("DROP TABLE IF EXISTS bargainBot.sortedResults")
cursor.execute("CREATE TABLE bargainBot.sortedResults (Description VARCHAR(1000), Price VARCHAR(1000), Rating VARCHAR(1000), Review VARCHAR(1000), URL VARCHAR(2000))")

sorts = []

cursor.execute("SELECT * FROM barganBot.results WHERE REPLACE(CONCAT(Price), ',', '') <= " + strn + " AND SUBSTRING(Rating, 1, 1) >= 4;")

for data in cursor:
  sorts.append(data)

for data in sorts:
  sql = "INSERT INTO bargainBot.sortedResults (Description, Price, Rating, Review, URL) VALUES (%s, %s, %s, %s, %s)"
  val = (data[0], data[1], data[2], data[3], data[4])
  cursor.execute(sql, val)

connection.close()

connection.close()
      
