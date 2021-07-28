const app = require('express');
var config = require('./db.js');
var connect = config.db;
const router = app.Router();
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
    connect.query(`SELECT*FROM Vehicle WHERE Vehicle.vehicleID = ${vehicleID}`, (err, res)=>
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

Vehicle.removeVehicle = (vehicleID, result) =>{
  connect.query("DELETE FROM Vehicle WHERE vehicleID = ? ", vehicleID, (err, res)=>{
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

    console.log("deleted vehicle with id: ", vehicleID);
    result(null, res);
  })
}

Vehicle.updateById=(vehicleID, host, result)=>{
  connect.query("UPDATE Vehicle SET price = ?, vehicle_name = ?, vehicle_type = ?, vehicle_description = ?, address = ?, start_date = ?, end_date = ?, total_quantity = ? WHERE vehicleID = ?",
  [host.price, host.vehicle_name, host.vehicle_type, host.vehicle_description, host.address, host.start_date, host.end_date, host.total_quantity, vehicleID],
  (err, res) => {
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

    console.log("updated customer: ", { vehicleID: vehicleID, ...host });
    result(null, { vehicleID: vehicleID, ...host });
})
}

router.put('/api/vehiclelist/update/:updateByID', (req, res)=>{
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Vehicle.updateById (req.params.updateByID, new Vehicle(req.body), (err, data)=>{
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Vehicle with id ${req.params.updateByID}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating Vehicle with id " + req.params.updateByID
        });
      }
    } else res.send(data);
  })
})

router.delete('/api/vehiclelist/delete/:id', function(req, res){
  Vehicle.removeVehicle(req.params.id, (err, data)=>{
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found vehicle with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete vehicle with id " + req.params.id
        });
      }
    } else res.send({ message: `vehicle was deleted successfully!` });
  })
})

router.get('/api/vehiclelist', function(req,res){
    Vehicle.showVehicle((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving vehicles."
          });
        else res.send(data);
      });
})

router.get('/api/vehiclelist/:id', function(req,res){
    Vehicle.getVehicleID(req.params.id, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Vehicle with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving Vehicle with id " + req.params.id
              });
            }
          } else res.send(data);
    })
})

router.post('/api/vehiclelist', function(req, res){
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

