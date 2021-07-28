const app = require('express');
const router = app.Router();
var config = require('./db.js');
var connect = config.db;
var io = require('socket.io')
const Messages = function(messages){
    this.from_user = messages.from_user,
    this.to_user = messages.to_user, 
    this.content = messages.content, 
    this.date_time = messages.date_time
}
Messages.deleteMessage = (user_from, user_to, date_send, result) =>{
    connect.query("DELETE FROM Messages WHERE from_user = ? AND to_user=? AND date_time = ?", 
    [user_from, user_to, date_send], (err, res)=>{
        if(err){
            console.log("error:", err);
            result(null, err);
            return; 
          }
          if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
          }
          console.log("deleted");
          result(null, res);
    })
}
Messages.sendMessage = (textmessage,result)=>{
    connect.query("INSERT INTO Messages SET ?", textmessage, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          console.log("New message by: ", { from_user: res.insertID, ...textmessage });
          result(null, { textmessage: res.insertId, ...textmessage });
    })
} 
Messages.showAllMessages = result =>{
    connect.query("SELECT*FROM Messages", (err, res)=>
    {if (err) {
        console.log("error: ", err);
        result(null, error);
        return;
      }
      console.log("customers: ", res);
      result(null, res);
    });      
}
Messages.showMessagesID = (send_user_id, result)=>{
    connect.query("SELECT*FROM Messages WHERE from_user = ?", send_user_id, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
      
        if (res.length) {
            console.log("found vehicle: ", res[0]);
            result(null, res[0]);
            return;
        }
            result({ kind: "not_found" }, null);
    })
}
Messages.updateMessageSent = (user_fro, user_t, date_sent, updateMes, result)=>{
    connect.query("UPDATE Messages SET content = ? WHERE from_user = ? AND to_user = ? AND date_time = ?", 
    [updateMes.content, user_fro, user_t, date_sent],
    (err, res)=>{
        if(err){
            console.log("error:", err);
            result(null, err);
            return; 
          }
          if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
          }
          console.log("update");
          result(null, res);
    })
}
router.put('/api/sendmessage/update/:user_from/:user_to/:date_send', function(req, res){
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    Messages.updateMessageSent(req.params.user_from, req.params.user_to, req.params.date_send, new Messages(req.body), (err, data)=>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found row with id ${req.params.user_from}`
              });
            } else {
              res.status(500).send({
                message: "Error updating Review with id " + req.params.user_from
              });
            }
          } else res.send(data);
    })
})
router.delete('/api/sendmessage/delete/:user_from/:user_to/:date_send', function(req, res){
    Messages.deleteMessage(req.params.user_from, req.params.user_to, req.params.date_send, (err, data)=>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found message by id ${req.params.user_from}.`
              });
            } else {
              res.status(500).send({
                message: "Could not delete message with id " + req.params.user_from
              });
            }
          } else res.send({ message: `message was deleted successfully!` });
    })
})

router.get('/api/sendmessage', function(req,res){
    Messages.showAllMessages((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving messages."
          });
        else res.send(data);
      });
})

router.get('/api/sendmessage/:send_id', function (req, res){
    Messages.showMessagesID(req.params.send_id, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Messages not found by id ${req.params.send_id}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving Messages sent by id " + req.params.send_id
              });
            }
          } else res.send(data);
    })
})

router.post('/api/sendmessage', function(req, res){
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const send_message = new Messages({
        from_user: req.body.from_user, 
        to_user: req.body.to_user, 
        content: req.body.content, 
        date_time: req.body.date_time
    })
    Messages.sendMessage(send_message, (err,data)=>{
        if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating new reviews."
      });
    else {
      io.emit('content', req.body); 
      res.send(data);
    }
    })
})

module.exports = router; 
