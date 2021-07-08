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

router.post('/api/newRental',function(req, res){
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
