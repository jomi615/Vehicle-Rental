const app = require('express');
var config = require('./db.js');
var connect = config.db;
const router = app.Router();
const Rent = function(rent){
    this.renter = rent.renter;
    this.vehicle_rented = rent.vehicle_rented; 
    this.end_date = rent.end_date; 
    this.start_date = rent.start_date;
    this.rent_quantity = rent.rent_quantity; 
}

Rent.createRent = (newRental, result)=>{
connect.query("INSERT INTO Rent SET ?", newRental, (err,res)=>{
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created rental by: ", { renter: res.insertId, ...newRental });
      result(null, { renter: res.insertId, ...newRental });
    });
}

Rent.getRentByUserID = (user_id, result)=>{
  connect.query(`SELECT*FROM Rent WHERE renter = ${user_id}`, (err,res)=>{
    if(err){
      console.log("error: ", err);
      result(err, null);
      return; 
    }
    if(res.length){
      console.log("found rentals: ", res);
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  })
}
Rent.getRentByVehicleID = (vehicle_id, result)=>{
  connect.query(`SELECT*FROM Rent WHERE vehicle_rented = ${vehicle_id}`, (err,res)=>{
    if(err){
      console.log("error: ", err);
      result(err, null);
      return; 
    }
    if(res.length){
      console.log("found rentals: ", res);
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  })
}

Rent.removeRentalByID = (vehicle_id,result)=>{
  connect.query("DELETE FROM Rent WHERE vehicle_rented = ?", vehicle_id, (err, res)=>{
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted rental hitsory of vehicle with id: ", vehicle_id);
    result(null, res);
  })
}
Rent.updateRental = (vehicle_id, enddate, user_rent , rent_er, result)=>{
  connect.query("UPDATE Rent SET renter = ?, vehicle_rented = ?, end_date = ?, start_date = ?, rent_quantity = ? WHERE renter = ? AND vehicle_rented = ? AND end_date = ? ",
  [rent_er.renter, rent_er.vehicle_rented, rent_er.end_date, rent_er.start_date, rent_er.rent_quantity,user_rent,vehicle_id,enddate], 
  (err, res)=>{
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("updated customer: ", { vehicle_id: vehicle_id, enddate: enddate, user_rent: user_rent, ...rent_er });
    result(null, { vehicle_id: vehicle_id, enddate: enddate, user_rent: user_rent, ...rent_er });
  }
  )
}

router.put('/api/rental/update/:renter_id/:vehicleid/:enddate_id', function(req,res){
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Rent.updateRental(req.params.vehicleid,req.params.enddate_id,req.params.renter_id, new Rent(req.body), (err, data)=>{
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found row with id ${req.params.vehicleid}, ${req.params.enddate_id},${req.params.renter_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id " + req.params.vehicleid + req.params.enddate_id + req.params.renter_id
        });
      }
    } else res.send(data);
})
})
router.delete('/api/rental/delete/:vehicle_id', function(req,res){
  Rent.removeRentalByID(req.params.vehicle_id, (err,data)=>{
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found vehicle with id ${req.params.vehicle_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete rental with vehicleid " + req.params.vehicle_id
        });
      }
    } else res.send({ message: `Rental was deleted successfully!` });
  })
})

router.get('/api/rental/user/:user_id', function(req,res){
  Rent.getRentByUserID(req.params.user_id, (err, data)=>{
    if(err){
      if(err.kind === "not_found"){
        res.status(404).send({
          message: `No rental by user ${req.params.user_id} found`
        })      
      }else {
        res.status(500).send({
          message: "Error retrieving rentals by userid " + req.params.user_id
        });
      }
    } else res.send(data);
  })
})

router.get('/api/rental/vehicle/:vehicle_id', function(req,res){
  Rent.getRentByVehicleID(req.params.vehicle_id, (err, data)=>{
    if(err){
      if(err.kind === "not_found"){
        res.status(404).send({
          message: `No rental history of ${req.params.vehicle_id} found`
        })      
      }else {
        res.status(500).send({
          message: "Error retrieving rental history of  " + req.params.vehicle_id
        });
      }
    } else res.send(data);
  })
})



router.post('/api/rental',function(req, res){
    // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const rental = new Rent({
    renter: req.body.renter,
    vehicle_rented: req.body.vehicle_rented,
    end_date: req.body.end_date,
    start_date: req.body.start_date, 
    rent_quantity: req.body.rent_quantity
  });
    Rent.createRent(rental, (err, data)=>
    {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
    })
})

module.exports = router; 
