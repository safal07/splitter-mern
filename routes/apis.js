var router = require('express').Router();
let User = require('../models/user');
let Ledger = require('../models/ledger');


//authenticate and send data
router.get('/ledgers', authenticate, (req, res) => {
  User.findById(req.user.id).
  populate('ledgers').
  exec((err, user) => {
    if(err) console.log(err);
    res.json(user.ledgers);
  });
});







router.post('/ledgers', authenticate, (req, res) => {
  let newLedger = new Ledger({
    title: req.body.title,
    creator: req.user.id
  });

  newLedger.save((err, updatedLedger) => {
    if(err) console.log(err);
    User.findByIdAndUpdate(req.user.id,
    {$push : {ledgers: updatedLedger.id}},
    {new: true}, (err, doc) => {
      if(err) console.log(err);
      console.log(doc);
    });
    res.json(updatedLedger);
  });
});



function authenticate(req, res, next) {
  if(req.isAuthenticated()){
      return next();
  }

  else {
    res.status(401).json({ errors: 'Not accessible' });
  }
}

module.exports = router;






// 
// var express = require('express');
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// var expressValidator = require('express-validator');
// var passport = require('passport');
// var cors = require('cors');
// var session  = require('express-session');
// var cookieParser = require('cookie-parser');
// var uuid = require('uuid');
// var dotenv = require('dotenv');
// var morgan = require('morgan');
// var MongoStore = require('connect-mongo')(session);
//
// var app = express();
// //config for environment variables
// dotenv.config();
// app.use(morgan('dev'));
// app.use(session({
//     genid: (req) => {
//       console.log('Inside the session middleware');
//       console.log(req.sessionID);
//       return uuid(); // use UUIDs for session IDs
//     },
//     resave: false,
//     saveUninitialized: false,
//     secret: 'sdlfjljrowuroweu',
//     store: new MongoStore({
//       mongooseConnection: mongoose.connection,
//       ttl: 30 * 24 * 60 * 60
//     })
// }));
//
// //passport config
// require('./config/passport')(passport);
// app.use(passport.initialize());
// app.use(passport.session());
//
// //use body bodyParser
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
//
// //use express validator
// app.use(expressValidator());
// //allow cross origin access
//
// var corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200,
//   credentials: true
// }
//
// app.use(cors(corsOptions));
//
// //Database connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true })
//   .then(() => console.log("connected to mongodb"))
//   .catch(err => console.log(err));
//
//
// let apis = require('./routes/apis');
// app.use('/apis', apis);
//
// //use register route
// let users = require('./routes/users');
// app.use('/users', users);
//
// app.get('/', (req, res) => {
//   console.log('Inside the homepage callback function');
//   console.log(req.sessionID);
//   console.log('Lets check if there is a session for this');
//   console.log(req.session);
//   res.json('test');
// })
//
// //create server and listen to port
// const port = process.env.PORT || 5000;
//
// app.listen(port, () => {
//   console.log(`server have started on port ${port}`);
// });
