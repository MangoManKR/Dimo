import db from './db.js';

// document.addEventListener("DOMContentLoaded", function(event) {
//   const signIn = document.getElementById("signIn");
//   signIn.addEventListener("click", function() {
//     db.query('SELECT * FROM user_db', function (error, results, fields) {
//       if (error) throw error;
//       console.log('The solution is: ', results);
//     });
//   });
//   connection.end();
//   });

  db.query('SELECT * FROM user_db', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });

function creat_id() {
    var wa = document.querySelector("#walletAdress").value;

    location.href = 'main.html'
}

db.end();