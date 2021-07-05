var mysql = require('mysql2');
config = {
    host: 'localhost',
    user: 'root',
    password: 'johnnminh1122',
    database: 'Vehicle'
}
var db = mysql.createConnection(config);
  //connect
  db.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
  });
module.exports={
    db
} 