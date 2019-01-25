const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {check, validationResult} = require('express-validator/check');

//Bring the user model
let User = require('../models/user');

//registration process
router.post('/register',
  [
    check('firstname')
      .trim()
      .isLength({min: 1}).withMessage('First Name cannot be empty'),
    check('lastname')
      .trim()
      .isLength({min: 1}).withMessage('Last Name cannot be empty'),
    check('email', 'Email address is already in use')
      .trim()
      .isEmail().withMessage('Please enter a valid email address')
      .custom(value => {return findUserByEmail(value)}).withMessage('Email is associated with an account'),
    check('password')
      .isLength({min: 4}).withMessage('Password need to be at least 4 characters'),
    check('passwordVerify')
      .custom((value, {req}) => {
        return value === req.body.password
      }).withMessage('Passwords needs to match in both fields')
  ],
  (req, res, next) => {
  //check for errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    console.log(errors.array());
    res.status(422).json({ errors: errors.array() });
  }
  else {

    //create new user
    let newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      ledgers: []
    });

    //encrypt password using bcrypt
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if(err) console.log(err);
        newUser.password = hash;
        newUser.save((err) => {
          if(err) console.log(err);
          User.findOne({email: newUser.email}, (err, user) => {
              if(err) console.log(err);
              req.login(user, (err) => {
                if (err) { return next(err); }
                return res.status(200).json({ userid: req.user.id });
              })
          });
        });
      })
    });
  }
});


//login process

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    if(req.user) {
        res.status(200).json(
          {
            userid: req.user.id,
            firstname: req.user.firstname,
            email: req.user.email 
          }
        );
    }
    else {
      res.status(401).json({ errors: 'Could not login, try again' });
    }
});

//logout process

router.post('/logout', function(req, res){
  if(req.user) {
      req.logout();
  }
  res.status(200).json({ "logout": "SUCESS" });
});


// helper function to find user by email
function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    User.findOne({email: email}, (err, user) => {
      if(err) return reject(err);
      if(user) return reject(new Error('This email has been used'));
      else return resolve(email);
    });
  });
}

module.exports = router;
