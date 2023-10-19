import mysql from 'mysql';
connection = mysql.createConnection({
  host     : '34.64.200.128',
  port     : '3306',
  user: 'admin',
  password: 'demodemo',
  database: 'demo'
});
document.addEventListener("DOMContentLoaded", function(event) {
  const signIn = document.getElementById("signIn");
  signIn.addEventListener("click", function() {
    connection.connect();
   
    connection.query('SELECT * FROM user_db', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  });
  connection.end();
  });
});



function creat_id() {
    var wa = document.querySelector("#walletAdress").value;

    location.href = 'main.html'
}