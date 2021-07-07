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
const Vehicle = function(vehicle){
    this.price = vehicle.price;
    this.vehicle_name = vehicle.vehicle_name; 
    this.vehicle_description = vehicle.vehicle_description; 
    this.vehicle_type = vehicle.vehicle_type;
    this.address = vehicle.address; 
    this.vehicle_host = vehicle.vehicle_host; 
    this.start_date = vehicle.start_date; 
    this.end_date=vehicle.end_date; 
    this.total_quantity = vehicle.total_quantity;
}

Vehicle.showVehicle = result =>{
    connect.query("SELECT*FROM Vehicle", (error, results)=>
    {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
          }
          console.log("customers: ", results);
          result(null, results);
        });      
}

Vehicle.getVehicleID = (vehicleID, result) => {
    connect.query(`SELECT*FROM Vehicle WHERE vehicleID = ${vehicleID}`, (err, res)=>
    {
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
router.get('/', function(req,res){
    Vehicle.showVehicle((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
      });
})

router.get('/:id', function(req,res){
    Vehicle.getVehicleID(req.params.vehicleID, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Vehicle with id ${req.params.vehicleID}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving Vehicle with id " + req.params.vehicleID
              });
            }
          } else res.send(data);
    })
})

module.exports = router; 
