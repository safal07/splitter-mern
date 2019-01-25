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
  req.sanitize('title').trim();
  req.checkBody('title', 'Ledger title cannot be empty').notEmpty();

  let errors = req.validationErrors();
  if(errors) {
    res.status(422).json({"errors": errors});
  }
  else {
    User.aggregate([
      { $unwind: "$ledgers" },
      {
        $lookup:
          {
            from: "ledgers",
            localField: "ledgers",
            foreignField: "_id",
            as: "ledgers_docs"
          }
      },
      {$match : {"ledgers_docs.title" : req.body.title}}
    ], (err, doc) => {
      if(err) console.log(err);
      if(doc.length != 0) {
        res.status(422).json({"errors" : [{
          msg: "This ledger already exists."
        }] });
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
         });
         res.json(updatedLedger);
       });
     }
    });

  }
});


function authenticate(req, res, next) {
  if(req.isAuthenticated()) return next();
  else res.status(401).json({ errors: 'Not accessible' });
}

module.exports = router;
