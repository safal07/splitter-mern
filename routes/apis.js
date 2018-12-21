var router = require('express').Router();

let Ledger = require('../models/ledger');


router.get('/ledgers', (req, res) => {
  Ledger.find({}, (err, doc) => {
    if(err) throw err;
    else {
    res.json(doc);
    }
  });
});



module.exports = router;
