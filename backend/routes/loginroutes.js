const app = require('express');
const router = app.Router();
var bcrypt = require('bcryptjs');
var config = require('./db.js');
var connect = config.db;

const Users = function(user){
  this.fname = user.fname;
  this.lname = user.lname; 
  this.email = user.email; 
  this.pass = user.pass;
  this.phone = user.phone; 
  this.username = user.username; 
  this.userID = user.userID; 
}
Users.getAll = result => {
  connect.query("SELECT*FROM User", (err, res)=>{
    if(err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Users: ", res); 
    result(null, res);
  })
}

Users.getID = (user_id, result)=>{
  connect.query(`SELECT*FROM User WHERE userID = ${user_id}`, (err, res)=>{
    if(err){
      console.log("error: ", err);
      result(err, null);
      return; 
    }
    if(res.length){
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  })
}

router.get('/', function(req,res){
  Users.getAll((err, data)=>{
    if(err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Users."
      })
    else res.send(data);
  })
})

router.get('/:user_id', function(req,res){
  Users.getID(req.params.user_id, (err, data)=>{
    if(err){
      if(err.kind === "not_found"){
        res.status(404).send({
          message: `Not found user with ID ${req.params.user_id}`
        })      
      }else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.user_id
        });
      }
    } else res.send(data);
   })
})

router.post('/api/register', function(req,res){
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
    })
})

router.post('/api/login', function(req,res){
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
})



module.exports = router; 
