const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Bring the user model
let User = require('../models/user');

//registration process
router.post('/register', (req, res) => {
  const fullname = req.body.fullname;
  const username = req.body.username;
  const password = req.body.password;
  const passwordVerify = req.body.passwordVerify;
  const email = req.body.email;

  req.checkBody('fullname', 'Full name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'User name is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('passwordVerify', 'Password does not match').equals(req.body.password);


  let errors = req.validationErrors();

  if(errors){
    res.json(errors);
  }
  else{
    let newUser = new User({
      fullname: fullname,
      username: username,
      password: password,
      email: email,
      ledgers: []
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) console.log(err);
          newUser.password = hash;
          newUser.save((err) => {
            if(err) console.log(err);
            else{
              res.redirect('http://127.0.0.1:3000');
            }
          });
      });
    });
  }
});

//
// //registration request
// router.get('/register', (req, res) => {
//   User
//   .findOne( { username : "safal07" } )
//   .then (doc => res.json(doc)).
//   catch(err => console.log(err));
// });


//login process

router.post('/login', passport.authenticate('local'),(req, res) => {
  res.json({"verified" : true});
});


router.get('/home', (req, res) => {
  res.send("Welcome home");
});


module.exports = router;
