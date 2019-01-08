const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {check, body, validationResult} = require('express-validator/check');

//Bring the user model
let User = require('../models/user');

//registration process
// router.post('/register', (req, res) => {
//   const fullname = req.body.fullname;
//   const username = req.body.username.trim();
//   const password = req.body.password.trim();
//   const passwordVerify = req.body.passwordVerify.trim();
//   const email = req.body.email.trim();
//
//   console.log("the output: " + password);
//   // req.checkBody('fullname', 'Full name is required').notEmpty();
//   // req.checkBody('email', 'Email is required').notEmpty();
//   // req.checkBody('email', 'Email is not valid').isEmail();
//   req.checkBody('username', 'User name is required').notEmpty();
//   //req.checkBody('password', 'Password is required').notEmpty();
//   // req.checkBody('passwordVerify', 'Password does not match').equals(req.body.password);
//
//   let errors = req.validationErrors();
//
//   if(errors){
//     res.json(errors);
//   }
//
//   else{
//     let newUser = new User({
//       fullname: fullname,
//       username: username,
//       password: password,
//       email: email,
//       ledgers: []
//     });
//
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(newUser.password, salt, (err, hash) => {
//           if (err) console.log(err);
//           newUser.password = hash;
//           newUser.save((err) => {
//             if(err) console.log(err);
//             else{
//               res.json({'redirect': '/login'});
//             }
//           });
//       });
//     });
//   }
// });

router.post('/register', [
  check('name')
    .isLength({min: 1}).withMessage('Name cannot be empty'),
  check('username').trim()
    .isLength({min: 1}).withMessage('Username cannot be empty')
    .isAlphanumeric().withMessage('Username can only contain alphabets and numbers'),
  check('password')
    .isLength({min: 4}).withMessage('Password need to be at least 4 characters'),
  check('passwordVerify')
    .custom((value, {req}) => {
      return value === req.body.password
    }).withMessage('Passwords needs to match in both fields'),
  check('email').trim()
    .isLength({min: 1}).withMessage('Email cannot be empty')
    .isEmail().withMessage('Valid email address is required')
    .custom((value) => {
      return User.findUserByEmail(value).then(user => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
    });
    }).withMessage('Email address is already in use')
], (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  }
  else
  next();
});

//login process

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.json(req.user.username);
});

//logout process

router.post('/logout', function(req, res){
  req.logout();
  res.json({"logout": "OK"});
});




// helper function
function findUserByEmail(value) {
  var result;
  User.findOne({email : value}, (err, user) => {
    result = user;
  })
  return result;
}

module.exports = router;
