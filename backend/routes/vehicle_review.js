const app = require('express');
const router = app.Router();
var bcrypt = require('bcryptjs');
var config = require('./db.js');
var connect = config.db;

const VehicleReview = function(vehicle_review){
    this.reviewer = vehicle_review.reviewer,
    this.vehicle_reviewed = vehicle_review.vehicle_reviewed, 
    this.review_date = vehicle_review.review_date, 
    this.review_content = vehicle_review.review_content, 
    this.stars_given = vehicle_review.stars_given
}
//POST Functions
VehicleReview.postReview = (newReview, result)=>{
    connect.query("INSERT INTO VehicleReview SET ?", newReview, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          console.log("New review by: ", { reviewer: res.insertId, ...newReview });
          result(null, { reviewer: res.insertId, ...newReview });
    })
}

//GET functions
VehicleReview.getVehicleReviewByID = (vehicle_id, result) =>{
    connect.query("SELECT*FROM VehicleReview WHERE vehicle_reviewed = ?", vehicle_id, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return; 
          }
          if(res.length){
            console.log("found reviews: ", res);
            result(null, res);
            return;
          }
          result({ kind: "not_found" }, null);
    })
}
VehicleReview.getAllReview = result =>{
  connect.query("SELECT*FROM VehicleReview", (err,res)=>{
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Reviews: ", res);
    result(null, res);
  })
}

VehicleReview.updateReviewByID = (reviewerid, vehi_reviewed, reviewdate,review, result)=>{
  connect.query("UPDATE VehicleReview SET review_content = ?, stars_given = ? WHERE reviewer = ? AND vehicle_reviewed = ? AND review_date = ?",
   [review.review_content, review.stars_given, reviewerid, vehi_reviewed, reviewdate], (err,res)=>{
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
VehicleReview.deleteReviewsById = (reviewerid, revieweeid, reviewdate, result)=>{
  connect.query("DELETE FROM VehicleReview WHERE reviewer = ? AND vehicle_reviewed = ? AND review_date = ?",
   [reviewerid, revieweeid, reviewdate], (err,res)=>{
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
router.put('/updateVehicleReview/:reviewer_id/:vehi_id/:revDate', function(req, res){
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  VehicleReview.updateReviewByID(req.params.reviewer_id,req.params.vehi_id,req.params.revDate, new VehicleReview(req.body), (err, data)=>{
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found row with id ${req.params.reviewer_id}, ${req.params.vehi_id},${req.params.revDate}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating Review with id " + req.params.reviewer_id + req.params.vehi_id + req.params.revDate
        });
      }
    } else res.send(data);
})
})
router.delete('/deleteVehicleReviewBy/:reviewer_id/:reviewee_id/:revDate', function (req, res){ VehicleReview
    VehicleReview.deleteReviewsById(req.params.reviewer_id,req.params.reviewee_id,req.params.revDate, (err, data)=>{
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found reviewes by id ${req.params.reviewer_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete reviewes with id " + req.params.reviewer_id
        });
      }
    } else res.send({ message: `review was deleted successfully!` });
  })
})
//GET operations
router.get('/getAllVehicleReview', function(req,res){
  VehicleReview.getAllReview ((err,data)=>{
    if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving reviews."
          });
        else res.send(data);
  })
})
router.get('/getVehicleReviewed/:reviewed_vehicle',function(req,res){
  VehicleReview.getVehicleReviewByID(req.params.reviewed_vehicle, (err, data)=>{
    if(err){
      if(err.kind === "not_found"){
        res.status(404).send({
          message: `No reviews made by ${req.params.reviewed_vehicle} `
        })      
      }else {
        res.status(500).send({
          message: "Error retrieving reviews by  " + req.params.reviewed_vehicle
        });
      }
    } else res.send(data);
})
})

//POST operations
router.post('/api/newVehicleReview', function(req, res){
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const vehicle_reviewed = new VehicleReview({
    reviewer: req.body.reviewer,
    vehicle_reviewed: req.body.vehicle_reviewed, 
    review_date: req.body.review_date, 
    review_content: req.body.review_content, 
    stars_given: req.body.stars_given
    });
    VehicleReview.postReview(vehicle_reviewed,(err, data)=>{
        if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating new reviews."
      });
    else res.send(data);
    })
})
module.exports = router; 
