var router = require('express').Router();
let User = require('../models/user');
let Ledger = require('../models/ledger');
const {check, validationResult} = require('express-validator/check');



//GET /users/ledgers
//Returns the ledger array as JSON object
router.get('/ledgers', authenticate, (req, res) => {
  User.findById(req.user.id).
  populate('ledgers').
  exec((err, user) => {
    if(err) console.log(err);
    res.json(user.ledgers);
  });
});


//POST /users/ledgers
//Returns the newly added ledger
router.post('/ledgers', authenticate, (req, res) => {
  req.checkBody('title', 'Title cannot be empty').notEmpty();

  let errors = req.validationErrors();
  console.log(errors);
  if(errors) {
    res.status(422).json(errors);
  }
  else {
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
  }
});




function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    User.findOne({email: email}, (err, user) => {
      if(err) return reject(err);
      if(user) return reject(new Error('This email has been used'));
      else return resolve(email);
    });
  });
}


function authenticate(req, res, next) {
  if(req.isAuthenticated()) return next();
  else res.status(401).json({ errors: 'Not accessible' });
}

module.exports = router;
