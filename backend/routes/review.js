const app = require('express');
const router = app.Router();
var bcrypt = require('bcryptjs');
var config = require('./db.js');
var connect = config.db;

const Reviews = function(review){
    this.reviewer = review.reviewer,
    this.reviewee = review.reviewee, 
    this.review_date = review.review_date, 
    this.review_content = review.review_content, 
    this.stars_given = review.stars_given
}
//POST Functions
Reviews.postReview = (newReview, result)=>{
    connect.query("INSERT INTO Review SET ?", newReview, (err,res)=>{
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
Reviews.getReviewerReview = (reviewer_id, result)=>{
  connect.query("SELECT*FROM Review WHERE reviewer = ?", reviewer_id, (err, res)=>{
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

Reviews.getRevieweeReview = (reviewee_id, result) =>{
    connect.query("SELECT*FROM Review WHERE reviewee = ?", reviewee_id, (err, res)=>{
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
Reviews.getAllReview = result =>{
  connect.query("SELECT*FROM Review", (err,res)=>{
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Reviews: ", res);
    result(null, res);
  })
}

Reviews.updateReviewByID = (reviewerid, revieweeid, reviewdate,review, result)=>{
  connect.query("UPDATE Review SET review_content = ?, stars_given = ? WHERE reviewer = ? AND reviewee = ? AND review_date = ?",
   [review.review_content, review.stars_given, reviewerid, revieweeid, reviewdate], (err,res)=>{
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
Reviews.deleteReviewsById = (reviewerid, revieweeid, reviewdate, result)=>{
  connect.query("DELETE FROM Review WHERE reviewer = ? AND reviewee = ? AND review_date = ?",
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
router.put('/updateReview/:reviewer_id/:reviewee_id/:revDate', function(req, res){
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Reviews.updateReviewByID(req.params.reviewer_id,req.params.reviewee_id,req.params.revDate, new Reviews(req.body), (err, data)=>{
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found row with id ${req.params.reviewer_id}, ${req.params.reviewee_id},${req.params.revDate}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating Review with id " + req.params.reviewer_id + req.params.reviewee_id + req.params.revDate
        });
      }
    } else res.send(data);
})
})
router.delete('/deleteReviewesBy/:reviewer_id/:reviewee_id/:revDate', function (req, res){
  Reviews.deleteReviewsById(req.params.reviewer_id,req.params.reviewee_id,req.params.revDate, (err, data)=>{
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
router.get('/getAllReview', function(req,res){
  Reviews.getAllReview ((err,data)=>{
    if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving reviews."
          });
        else res.send(data);
  })
})
router.get('/getReviewerReviews/:reviewer_id',function(req,res){
  Reviews.getReviewerReview(req.params.reviewer_id, (err, data)=>{
    if(err){
      if(err.kind === "not_found"){
        res.status(404).send({
          message: `No reviews made by ${req.params.reviewer_id} `
        })      
      }else {
        res.status(500).send({
          message: "Error retrieving reviews by  " + req.params.reviewer_id
        });
      }
    } else res.send(data);
})
})
router.get('/getReviewee/:reviewee_id', function(req, res){
    Reviews.getRevieweeReview(req.params.reviewee_id, (err, data)=>{
        if(err){
            if(err.kind === "not_found"){
              res.status(404).send({
                message: `No reviews for ${req.params.reviewee_id} `
              })      
            }else {
              res.status(500).send({
                message: "Error retrieving reviews for  " + req.params.reviewee_id
              });
            }
          } else res.send(data);
    })
})

//POST operations
router.post('/api/newReview', function(req, res){
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const user_review = new Reviews({
    reviewer: req.body.reviewer,
    reviewee: req.body.reviewee, 
    review_date: req.body.review_date, 
    review_content: req.body.review_content, 
    stars_given: req.body.stars_given
    });
    Reviews.postReview(user_review,(err, data)=>{
        if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating new reviews."
      });
    else res.send(data);
    })
})
module.exports = router; 
