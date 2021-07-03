var mysql = require('mysql2');
var bcrypt = require('bcryptjs');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'johnnminh1122',
  database: 'Vehicle'
});

//connect
db.connect(function(err){
  if (err) throw err;
  console.log("Connected!");
});

/*exports.register = async function(req,res){
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds)

  var users={
     "email":req.body.email,
     "password":encryptedPassword
   }
  
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
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

exports.login = async function(req,res){
  var email= req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        const comparision = await bcrypt.compare(password, results[0].password)
        if(comparision){
            res.send({
              "code":200,
              "success":"login sucessfull"
            })
        }
        else{
          res.send({
               "code":204,
               "success":"Email and password does not match"
          })
        }
      }
      else{
        res.send({
          "code":206,
          "success":"Email does not exits"
            });
      }
    }
    });
}*/

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
       "userID": req.body.userID,
       "username": req.body.username    
     }

     db.query('INSERT INTO User SET ?',users, function (error, results, fields) {
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
    db.query('SELECT * FROM User WHERE username = ?',[username],  function (error, results, fields) {
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