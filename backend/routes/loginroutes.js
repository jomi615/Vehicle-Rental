var bcrypt = require('bcryptjs');
var config = require('./db.js');
var connect = config.db;
exports.register = function(req,res){
  //const password = await req.body.password;
  //const saltRounds = 10;
  //const encryptedPassword = bcrypt.hash(password, saltRounds)
  var users={
     "fname":req.body.fname, 
     "lname": req.body.lname, 
     "email":req.body.email,
     "pass": req.body.pass,
     "phone": req.body.phone,  
     "username": req.body.username    
   }

   connect.query('INSERT INTO User SET ?',users, function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    } else {
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
      }
  });
}

exports.login = function(req,res){
  var username= req.body.username;
  var password = req.body.pass;
  connect.query('SELECT * FROM User WHERE username = ?',[username],  function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        const comparision = bcrypt.compare(password, results[0].password)
        if(comparision){
            res.send({
              "code":200,
              "success":"login sucessfull"
            })
        }
        else{
          res.send({
               "code":204,
               "success":"Username and password does not match"
          })
        }
      }
      else{
        res.send({
          "code":206,
          "success":"username does not exits"
            });
      }
    }
    });
}