const { response } = require("express");
const express = require("express");
var login = require('./routes/loginroutes');

var app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var router = express.Router();

//test router
/*router.get('/', function(req, res) {
  res.json({ message: 'welcome to our upload module apis' });
});*/
app.get('/', function (req, res){
  res.json({message: "Hello bitches!!!"});
})
const vehicleAdding = require('./routes/vehiclelist');
//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login);
app.use('/api', router);
app.use('/vehicleAdd', vehicleAdding);
app.use('/vehicleDelete', )
app.listen(4000);