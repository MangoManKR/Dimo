import mysql from 'mysql2';
var connection = mysql.createConnection({
  host     : '34.64.200.128',
  port     : '3306',
  user: 'admin',
  password: 'demodemo',
  database: 'demo'
});

connection.connect();

export default connection;