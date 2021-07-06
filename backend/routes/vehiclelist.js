const app = require('express');
var config = require('./db.js');
var connect = config.db;
const router = app.Router();
router.post('/', function(req, res){
    var vehicles={
        "price": req.body.price, 
        "vehicle_name":req.body.vehicle_name, 
        "vehicle_description":req.body.vehicle_description,
        "address":req.body.address,
        "vehicle_type": req.body.vehicle_type,
        "vehicle_host": req.body.vehicle_host,
        "start_date":req.body.start_date,
        "end_date": req.body.end_date,
        "total_quantity": req.body.total_quantity
    }
    connect.query('INSERT INTO Vehicle SET ?', vehicles,(error, results, fields)=>{
        if(error){
            res.send({
                "code":400,
                "failed":"Cannot add new vehicle"
            })
        }
        else {
            res.send({
              "code":200,
              "success":"Vehicle added sucessfully"
                });
        }
    });
});
module.exports = router; 

