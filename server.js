var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var passport = require('passport');
var cors = require('cors');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var uuid = require('uuid');
var dotenv = require('dotenv');
var morgan = require('morgan');
var MongoStore = require('connect-mongo')(session);

var app = express();
//config for environment variables

dotenv.config();
app.use(morgan('dev'));
app.use(session({
    genid: (req) => {
      console.log('Inside the session middleware');
      console.log(req.sessionID);
      return uuid(); // use UUIDs for session IDs
    },
    resave: false,
    saveUninitialized: false,
    secret: 'sdlfjljrowuroweu',
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 30 * 24 * 60 * 60
    })
}));

app.use(express.static(path.join(__dirname , "client", "build")));

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

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(cors(corsOptions));

//Database connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("connected to mongodb"))
  .catch(err => console.log(err));


let ledgerApis = require('./routes/ledgerApis');
app.use('/ledgerApis', ledgerApis);


let entryApis = require('./routes/entryApis');
app.use('/entryApis', entryApis);

//use register route
let userApis = require('./routes/userApis');
app.use('/userApis', userApis);

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//create server and listen to port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server have started on port ${port}`);
});
