var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var expressValidator = require('express-validator');
var passport = require('passport');
var cors = require('cors');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(cookieParser());

app.use(session({secret: 'ssshhhhh'}));

//passport config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//use body bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//use express validator
app.use(expressValidator());
//allow cross origin access
app.use(cors());

//Database connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("connected to mongodb"))
  .catch(err => console.log(err));


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
