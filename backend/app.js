const { response } = require("express");
const express = require("express");
var app = express();
const session = require('express-session');
const https = require('https');
const fs = require('fs');
const redis = require('redis');
const connectRedis = require('connect-redis');


var privateKey  = fs.readFileSync('backend/localhost-key.pem');
var certificate = fs.readFileSync('backend/localhost.pem');
var credentials = {key: privateKey, cert: certificate};


const RedisStore = connectRedis(session)
//Configure redis client
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
})
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

//session middleware
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'secret$%^134',
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie 
      maxAge: 1000 * 60 * 10 // session max age in miliseconds
  }
}))

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
//app.use(cookieParser());

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