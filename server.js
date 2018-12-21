var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var expressValidator = require('express-validator');
var passport = require('passport');
require('dotenv').config();


//use body bodyParser
app.use(bodyParser.urlencoded({extended: true}));
//use express validator
app.use(expressValidator());
//Database connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("connected to mongodb"))
  .catch(err => console.log(err));

//passport config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

let apis = require('./routes/apis');
app.use('/apis', apis);


//use register route
let users = require('./routes/users');
app.use('/users', users);

//create server and listen to port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server have started on port ${port}`);
});
