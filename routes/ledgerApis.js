var router = require('express').Router();
var mongoose = require('mongoose');
let User = require('../models/user');
let Ledger = require('../models/ledger');
let Entry = require('../models/entry');
const {check, validationResult} = require('express-validator/check');
const sendMail = require('../email/sendMail');
const inviteTemplate = require('../email/inviteTemplate');


//GET /users/ledgers
//Returns the ledger array as JSON object
router.get('/ledgers', authenticate, (req, res) => {
  User.findById(req.user.id, 'ledgers').
  populate({path: 'ledgers', populate: {path: 'creator members', select: '_id firstname email'}}).
  exec((err, user) => {
    if(err) console.log(err);
    console.log(user);
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
           User.populate(user, {path: 'ledgers', populate: {path: 'creator', select: '_id firstname email'}}, (err, user) => {
             res.json(user.ledgers);
           });
         });
       });
     }
    });

  }
});


//DELETE /users/ledgers
//Returns the ledger deleted status on json
router.delete('/ledgers', authenticate, (req, res) => {
  if (req.user.id == req.body.creator._id) {

    Ledger.findByIdAndRemove(req.body._id, (err, ledger) => {
      if(err) console.log(err);
      let objectIdList = ledger.entries.map((item) => {
        return  mongoose.Types.ObjectId(item);
      });

      Entry.deleteMany({_id: {$in: objectIdList}}, (err, data) => {
        if(err) console.log(err);
          for(var i = 0; i < ledger.members.length; i++) {
            User.findByIdAndUpdate(ledger.members[i],
              {$pull : {ledgers: req.body._id}},
              (err, user) => {
                  if (err) console.log(err);
            });
          }
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
          sendMail(req.body.member_email, 'Invitation to splitter', inviteTemplate(req.user.firstname, req.body.member_email, 'http://localhost:3000/invitation/' + req.body.ledger_id))
          .then((result) => {
            console.log(result);
            res.json('Invitation sent');
          })
          .catch((error) => {
            console.log(error);
            res.status(422).json({"errors" : [{
              msg: "Could not invite the member."
            }] });
          });
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
