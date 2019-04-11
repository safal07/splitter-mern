var router = require('express').Router();
var mongoose = require('mongoose');
let User = require('../models/user');
let Ledger = require('../models/ledger');
let Entry = require('../models/entry');
const {check, validationResult} = require('express-validator/check');


//GET /users/entries
//Returns the
router.get('/entries', authenticate, (req, res) => {
  let response = {};
  Ledger.estimatedDocumentCount({_id: req.query.ledgerid}, (err, count) => {
    if(err) console.log(err);
    if(count < 1) {
      res.status(410).json({"errors" : [{
        msg: "This ledger does not exist."
      }] });
    }
    else {
        Ledger.findById(req.query.ledgerid)
        .populate({path: 'creator', select: '_id firstname email'})
        .populate({path: 'members', select: '_id firstname email'})
        .populate({path: 'entries', populate: {path: 'creator', select: '_id firstname email'}, options: { sort: { 'created': -1 } } })
        .exec((err, ledger) => {
          if(err) console.log(err);
          res.json(ledger);
      });
    }
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
  console.log(req.body);

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  }
  else {
    let date = req.body.date.split('-');

    let newEntry = new Entry({
      dateOfExpense: new Date(date[0], date[1] - 1, date[2]),
      amountofExpense: req.body.amount,
      descriptionOfExpense: req.body.description,
      creator: req.user.id,
      ledger: req.body.ledgerid
    });

    newEntry.save((err, updatedEntry) => {
      if(err) console.log(err);

      Ledger.findByIdAndUpdate(req.body.ledgerid,
      {$push : {entries: updatedEntry._id}},{new: true})
      .populate({path: 'creator', select: '_id firstname email'})
      .populate({path: 'members', select: '_id firstname email'})
      .populate({path: 'entries', populate: {path: 'creator', select: '_id firstname email'}, options: { sort: { 'created': -1 } } })
      .exec((err, ledger) => {
        if(err) console.log(err);
        res.json(ledger);
    });
    });
  }
});


//DELETE /apis/entries
//Returns the ledger deleted status on json
router.delete('/entries', authenticate, (req, res) => {
  if (req.user.id == req.body.creator_id) {
    Entry.findByIdAndRemove(req.body._id, (err, entry) => {
      if(err) console.log(err);
      Ledger.findByIdAndUpdate(req.body.ledger_id, {$pull : {entries: req.body._id}})
        .populate({path: 'creator', select: '_id firstname email'})
        .populate({path: 'members', select: '_id firstname email'})
        .populate({path: 'entries', populate: {path: 'creator', select: '_id firstname email'}, options: { sort: { 'created': -1 } } })
        .exec((err, ledger) => {
          if(err) console.log(err);
          res.json(ledger);
      });  
    });
  }
  else {
    res.status(422).json({"errors" : [{
      msg: "You cannot delete someone else entry."
    }] });
  }
});






function authenticate(req, res, next) {
  if(req.isAuthenticated()) return next();
  else res.status(401).json({ errors: 'Not accessible' });
}

module.exports = router;
