const { response } = require("express");
const express = require("express");
var app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const vehicleAdding = require('./routes/vehiclelist');
const login = require('./routes/loginroutes');
const rental = require('./routes/rental');
const userReview = require('./routes/review');
//route to handle user registration
app.use('/', login);
app.use('/', rental); 
app.use('/', userReview); 
app.use('/', vehicleAdding);
app.listen(4000);