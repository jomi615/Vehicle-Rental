var mysql = require('mysql2');
config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Vehicle'
}
var db = mysql.createConnection(config);
  //connect
  db.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
  });
module.exports={
    db: mysql.createConnection(config)
} 