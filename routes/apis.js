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
  populate({path: 'ledgers', select: '_id title'}).
  exec((err, user) => {
    if(err) console.log(err);
    res.json(user.ledgers);
    // User.populate(user, {path: 'ledgers.creator', select: '_id firstname email'}, (err, user) => {
    //   User.populate(user, {path: 'ledgers.members', select: '_id firstname email'}, (err, doc) => {
    //     res.json(doc.ledgers);
    //   });
    // });

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
    Ledger.aggregate([
      {$match : {creator : mongoose.Types.ObjectId(req.user.id)}},
      {$match : {title : req.body.title}}
    ], (err, doc) => {
      if(err) console.log(err);
      console.log(doc);
      if(doc.length != 0) {
        res.status(422).json({"errors" : [{
          msg: "This ledger already exists."
        }] });
      }
      else {
       let newLedger = new Ledger({
         title: req.body.title,
         creator: req.user.id,
         members: [req.user.id],
         entries: []
       });

       newLedger.save((err, updatedLedger) => {
         if(err) console.log(err);
         User.findByIdAndUpdate(req.user.id,
         {$push : {ledgers: updatedLedger.id}},
         {new: true}, (err, user) => {
           if(err) console.log(err);
           User.populate(user, {path: 'ledgers', select: '_id title'}, (err, user) => {
             res.json(user.ledgers);
           });
         });

         // Ledger.findById(updatedLedger.id, 'id, title members').
         // populate({path: 'creator', select: '_id firstname email'}).
         // exec((err, data) => {
         //   res.json(data);
         // });
       });
     }
    });

  }
});

// //POST /users/ledgers
// //Returns the newly added ledger
// router.post('/ledgers', authenticate, (req, res) => {
//   req.sanitize('title').trim();
//   req.checkBody('title', 'Ledger title cannot be empty').notEmpty();
//
//   let errors = req.validationErrors();
//   if(errors) {
//     res.status(422).json({"errors": errors});
//   }
//   else {
//     User.aggregate([
//       { $unwind: "$ledgers" },
//       {
//         $lookup:
//           {
//             from: "ledgers",
//             localField: "ledgers",
//             foreignField: "_id",
//             as: "ledgers_docs"
//           }
//       },
//       {$match : {_id : mongoose.Types.ObjectId(req.user.id)}},
//       {$match : {"ledgers_docs.title" : req.body.title}}
//     ], (err, doc) => {
//       if(err) console.log(err);
//       if(doc.length != 0) {
//         res.status(422).json({"errors" : [{
//           msg: "This ledger already exists."
//         }] });
//       }
//       else {
//        let newLedger = new Ledger({
//          title: req.body.title,
//          creator: req.user.id,
//          members: [req.user.id],
//          entries: []
//        });
//
//        newLedger.save((err, updatedLedger) => {
//          if(err) console.log(err);
//          User.findByIdAndUpdate(req.user.id,
//          {$push : {ledgers: updatedLedger.id}},
//          {new: true}, (err, doc) => {
//            if(err) console.log(err);
//          });
//
//          Ledger.findById(updatedLedger.id, 'id, title members').
//          populate({path: 'creator', select: '_id firstname email'}).
//          exec((err, data) => {
//            res.json(data);
//          });
//        });
//      }
//     });
//
//   }
// });




router.get('/ledgerSummary', authenticate, (req, res) => {
  Entries.aggregate([
    { $unwind: "$members" },
    {$match : {_id : mongoose.Types.ObjectId(req.user.id)}},
  ], (err,doc) => {
    if(err) console.log(err);
    res.json(doc);
  });
});


//DELETE /users/ledgers
//Returns the ledger deleted status on json
router.delete('/ledgers', authenticate, (req, res) => {
  if (req.user.id == req.body.creator._id) {
    Ledger.findByIdAndRemove(req.body._id, (err, ledger) => {
      if(err) console.log(err);
      User.findByIdAndUpdate(req.user.id,
        {$pull : {ledgers: req.body._id}},
        (err, user) => {
            if (err) console.log(err);
            res.status(200).json({ deleted: true });
      });
    });
  }
  else {
    res.status(422).json({"errors" : [{
      msg: "You cannot delete someone else ledger."
    }] });
  }
});




//GET /users/entries
//Returns the
router.get('/entries', authenticate, (req, res) => {
  let response = {};
  console.log(req.query.ledgerid);
  Entry.aggregate([
    {$match : {ledger : mongoose.Types.ObjectId(req.query.ledgerid)}},
    {
        $group : {
           _id : "$creator",
           userExpense: {$sum : "$amountofExpense"}
        }
    }
  ], (err,doc) => {
    if(err) console.log(err);
    console.log(doc);
    response.summary = doc;
    Ledger.findById(req.query.ledgerid, 'entries').
    populate({path: 'entries', populate: {path: 'creator', select: 'firstname email'}, options: { sort: { 'created': -1 } } }).
    exec((err, ledger) => {
      if(err) console.log(err);
      response.entries = ledger.entries;
      res.json(response);
    });
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
      dateOfExpense: new Date(date[0], date[1] - 1, date[2]),
      amountofExpense: req.body.amount,
      descriptionOfExpense: req.body.description,
      creator: req.user.id,
      ledger: req.body.ledgerid
    });

    newEntry.save((err, updatedEntry) => {
      if(err) console.log(err);
      console.log(updatedEntry);
      Ledger.findByIdAndUpdate(req.body.ledgerid,
      {$push : {entries: updatedEntry._id}},
      {new: true}, (err, doc) => {
        if(err) console.log(err);
      });

      Entry.findById(updatedEntry._id).
      populate({path: 'creator'}).
      exec((err, data) => {
          res.json(data);
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
      Ledger.findByIdAndUpdate(req.body.ledger_id,
        {$pull : {entries: req.body._id}},
        (err, user) => {
            if (err) console.log(err);
            res.status(200).json({ deleted: true });
      });
    });
  }
  else {
    res.status(422).json({"errors" : [{
      msg: "You cannot delete someone else entry."
    }] });
  }
});


router.post('/addMember', [
  authenticate,
  check('member_email')
    .isEmail().withMessage('Please provide a valid email')
], (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  }
  else {
      User.findOne({email: req.body.member_email}, (err, user) => {
        if (!user) {
          res.status(422).json({"errors" : [{
            msg: "This member is not in splitter."
          }] });
        }

        else {
          User.findOneAndUpdate({email: req.body.member_email}, {$push : {ledgers: req.body.ledger_id}},
          {new: true} , (err, user) => {
            if(err) console.log(err);

            Ledger.findByIdAndUpdate(req.body.ledger_id, {$push : {members: user._id}},
            {new: true}, (err, newLedger) => {
                if (err) console.log(err);
                  res.json(newLedger);
            });
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
