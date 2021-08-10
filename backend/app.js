const { response } = require("express");
const express = require("express");
var app = express();
const session = require('express-session');
const cookieParser = require("cookie-parser");

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(__dirname));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const vehicleAdding = require('./routes/vehiclelist');
const login = require('./routes/loginroutes');
const rental = require('./routes/rental');
const userReview = require('./routes/review');
const vehicleReview = require('./routes/vehicle_review');
const sendMessaging = require('./routes/messages');
//route to handle user registration
app.use('/', login);
app.use('/', rental); 
app.use('/', userReview); 
app.use('/', vehicleAdding);
app.use('/', vehicleReview);
app.use('/',sendMessaging )
app.listen(4000);
/*var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8000);*/