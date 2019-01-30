var router = require('express').Router();
var mongoose = require('mongoose');
let User = require('../models/user');
let Ledger = require('../models/ledger');
let Entry = require('../models/entry');
const {check, validationResult} = require('express-validator/check');



//GET /users/ledgers
//Returns the ledger array as JSON object
router.get('/ledgers', authenticate, (req, res) => {
  User.findById(req.user.id, 'ledgers').
  populate({path: 'ledgers', populate: {path: 'creator', select: '_id firstname email'}}).
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
      {$match : {_id : mongoose.Types.ObjectId(req.user.id)}},
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
         creator: req.user.id,
         entries: []
       });

       newLedger.save((err, updatedLedger) => {
         if(err) console.log(err);
         User.findByIdAndUpdate(req.user.id,
         {$push : {ledgers: updatedLedger.id}},
         {new: true}, (err, doc) => {
           if(err) console.log(err);
         });

         Ledger.findById(updatedLedger.id, 'id, title').
         populate({path: 'creator', select: '_id firstname email'}).
         exec((err, data) => {
           res.json(data);
         });
       });
     }
    });

  }
});

//DELETE /users/ledgers
//Returns the ledger deleted status on json
router.delete('/ledgers', authenticate, (req, res) => {
  Ledger.findByIdAndRemove(req.body._id, (err, ledger) => {
    if(err) console.log(err);
    User.findByIdAndUpdate(req.user.id,
      {$pull : {ledgers: req.body._id}},
      (err, user) => {
          if (err) console.log(err);
          res.status(200).json({ deleted: true });
    });

  });
});




//GET /users/entries
//Returns the
router.get('/entries', authenticate, (req, res) => {
  Ledger.findById(req.query.ledgerid, 'entries').
  populate({path: 'entries'}).
  exec((err, Ledger) => {
    if(err) console.log(err);
    res.json(Ledger.entries);
  });
});


//POST /users/entries
//Returns the
router.post('/entries', [
  authenticate,
  check('description')
    .trim()
    .isLength({min: 1}).withMessage('Description cannot be empty'),
  check('amount')
    .custom((value) => {
      return value > 0
    }).withMessage('Invalid amount')
]
, (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  }
  else {
    let date = req.body.date.split('-');
    let newEntry = new Entry({
      date: new Date(date[0], date[1] - 1, date[2]),
      amount: req.body.amount,
      description: req.body.description
    });

    newEntry.save((err, updatedEntry) => {
      if(err) console.log(err);

      Ledger.findByIdAndUpdate(req.body.ledgerid,
      {$push : {entries: updatedEntry.id}},
      {new: true}, (err, doc) => {
        if(err) console.log(err);
      });

      res.json(updatedEntry);
    });
  }
});









function authenticate(req, res, next) {
  if(req.isAuthenticated()) return next();
  else res.status(401).json({ errors: 'Not accessible' });
}

module.exports = router;
