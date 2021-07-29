const app = require('express');
const router = app.Router();
var bcrypt = require('bcryptjs');
var config = require('./db.js');
var connect = config.db;
var session; 
var salt =10 //any random value
var crypto = require('crypto')


const Users = function(user){
  this.fname = user.fname;
  this.lname = user.lname; 
  this.email = user.email; 
  this.pass = user.pass;
  this.phone = user.phone; 
  this.username = user.username; 
  this.userID = user.userID; 
}

Users.createUser =  (newUser, result)=>{
  connect.query("INSERT INTO User SET ?",newUser,(err, res)=>{
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created customer: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  })
}
Users.getAll =  result => {
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

Users.getID =  (user_id, result)=>{
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

Users.removeUser =  (user_id, result)=>{
  connect.query("DELETE FROM User WHERE userID = ?", user_id, (err,res)=>{
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted vehicle with id: ", user_id);
    result(null, res);
  })
}

Users.updateUser =  (user_id,user, result)=>{
  connect.query("UPDATE User SET fname = ?, lname = ?, email = ?, pass = ?, phone = ?, username = ? WHERE userID = ?",
  [user.fname, user.lname, user.email, user.pass, user.phone, user.username, user_id],
  (err, res)=>{
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("updated customer: ", { user_id: user_id, ...user });
    result(null, { user_id: user_id, ...user });
  })
}

router.put('/api/user/update/:user_id', function(req,res){
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Users.updateUser (req.params.user_id, new Users(req.body), (err, data)=>{
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.user_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id " + req.params.user_id
        });
      }
    } else res.send(data);
  })
})

router.delete('/api/user/delete/:user_id', function(req,res){
  Users.removeUser(req.params.user_id, (err, data)=>{
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.user_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.user_id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  })
})

router.get('/api/user', function(req,res){
  Users.getAll((err, data)=>{
    if(err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Users."
      })
    else res.send(data);
  })
})

router.get('/api/user/:user_id', function(req,res){
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

router.post('/api/user/register',async function(req,res){
  /*try {

    const encryptedPassword = await bcrypt.hash(req.body.pass, salt)
    var users= new Users({
      "fname":req.body.fname, 
      "lname": req.body.lname, 
      "email":req.body.email,
      "pass": encryptedPassword,
      "phone": req.body.phone,  
      "username": req.body.username    
    });
   }
   catch (error){
    console.log(error);
   }*/
   async function digestMessage(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return hash;
  }
   const encrypted = digestMessage("minhlecanh")
   console.log(encrypted)
   const encryptedPassword = digestMessage("minhlecanh").then(digestBuffer => console.log(digestBuffer.byteLength));
  
   var users= new Users({
    "fname":req.body.fname, 
    "lname": req.body.lname, 
    "email":req.body.email,
    "pass": encryptedPassword,
    "phone": req.body.phone,  
    "username": req.body.username    
  });
   Users.createUser(users, (err, data)=>{
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
    })
})
router.get('/api/logout',  function(req, res){
  req.session.destroy();
    res.redirect('/');
})

router.post('/api/user/login', async function(req,res){
  var username= req.body.username;
  var password = req.body.pass; 
  connect.query('SELECT * FROM User WHERE username = ?',[username], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        const comparison =  await bcrypt.compare(password, results[0].password)
        if(comparison){
          /*session=req.session;
          session.userid=req.body.username;
          console.log(req.session)*/
            res.send({
              "code":201,
              "message":"success",
             results
            })
        }
        else{
          res.send({
               "code":200,
               "message":"Username and password does not match"
          })
        }
      }
      else{
        res.send({
          "code":200,
          "message":"username does not exits"
            });
      }
    }
    });
})

module.exports = router; 
